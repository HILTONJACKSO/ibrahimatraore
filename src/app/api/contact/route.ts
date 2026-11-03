import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import nodemailer from 'nodemailer';

const VALID_CATEGORIES = new Set([
  'football-representation',
  'sporting-investment',
  'business-partnership',
  'institutional-cooperation',
  'media-enquiry',
  'other-enquiry',
]);

const CATEGORY_LABELS: Record<string, string> = {
  'football-representation': 'Football representation (Sport World Africa)',
  'sporting-investment': 'Sporting investment (Kouankan IV SL)',
  'business-partnership': 'Business partnership (Kouankan IV SL / Sport World Africa)',
  'institutional-cooperation': 'Institutional cooperation',
  'media-enquiry': 'Media enquiry',
  'other-enquiry': 'Other enquiry',
};

// Sliding-window rate limiter per client IP (max 5 requests per 10 minutes)
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitStore = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitStore.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitStore.set(ip, recent);
    return true;
  }
  recent.push(now);
  rateLimitStore.set(ip, recent);
  return false;
}

function sanitizeText(input: unknown, maxLength: number): string {
  if (typeof input !== 'string') return '';
  return input.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, maxLength);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

async function persistEnquiryToDisk(record: Record<string, unknown>): Promise<void> {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    await fs.mkdir(dataDir, { recursive: true });
    const logPath = path.join(dataDir, 'enquiries.jsonl');
    await fs.appendFile(logPath, `${JSON.stringify(record)}\n`, 'utf8');
  } catch (err) {
    console.warn('Could not persist enquiry backup to disk:', err);
  }
}

export async function POST(request: NextRequest) {
  try {
    const forwardedFor = request.headers.get('x-forwarded-for');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { ok: false, errorCode: 'RATE_LIMITED' },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { ok: false, errorCode: 'INVALID_PAYLOAD' },
        { status: 400 }
      );
    }

    // 1. Honeypot Spam Protection: if hidden field is populated, reject
    const honeypot = sanitizeText(body.website_url, 200);
    if (honeypot.length > 0) {
      // Return 200 to avoid tipping off automated bots while discarding message
      return NextResponse.json({ ok: true, simulated: true }, { status: 200 });
    }

    // 2. Sanitize & Validate Form Inputs
    const fullName = sanitizeText(body.fullName, 120);
    const organization = sanitizeText(body.organization, 160);
    const email = sanitizeText(body.email, 160);
    const country = sanitizeText(body.country, 100);
    const category = sanitizeText(body.category, 60);
    const message = sanitizeText(body.message, 4000);
    const locale = sanitizeText(body.locale, 10) || 'en';
    const privacyAccepted = body.privacyAccepted === true;

    const fieldErrors: Record<string, string> = {};

    if (!fullName) fieldErrors.fullName = 'fullNameRequired';
    if (!email) {
      fieldErrors.email = 'emailRequired';
    } else if (!isValidEmail(email)) {
      fieldErrors.email = 'emailInvalid';
    }
    if (!country) fieldErrors.country = 'countryRequired';
    if (!category || !VALID_CATEGORIES.has(category)) {
      fieldErrors.category = 'categoryRequired';
    }
    if (!message) {
      fieldErrors.message = 'messageRequired';
    } else if (message.length < 20) {
      fieldErrors.message = 'messageTooShort';
    }
    if (!privacyAccepted) {
      fieldErrors.privacyAccepted = 'privacyRequired';
    }

    if (Object.keys(fieldErrors).length > 0) {
      return NextResponse.json(
        { ok: false, errorCode: 'VALIDATION_ERROR', fieldErrors },
        { status: 422 }
      );
    }

    // 3. Check Delivery Configuration — All messages route to ceo@ibrahimatraore.net
    const deliveryEnabled = process.env.CONTACT_DELIVERY_ENABLED !== 'false';
    if (!deliveryEnabled) {
      return NextResponse.json(
        { ok: false, errorCode: 'DELIVERY_DISABLED' },
        { status: 503 }
      );
    }

    const recipientEmail =
      process.env.CONTACT_RECIPIENT_EMAIL || 'ceo@ibrahimatraore.net';
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL || 'ceo@ibrahimatraore.net';
    const provider = (process.env.CONTACT_PROVIDER || 'smtp').toLowerCase();
    const simulateDelivery = process.env.CONTACT_SIMULATE_DELIVERY !== 'false';
    const submittedAt = new Date().toISOString();

    const subject = `[ibrahimatraore.net — ${CATEGORY_LABELS[category] || category}] ${fullName}${
      organization ? ` (${organization})` : ''
    }`;

    const plainTextContent = [
      'IBRAHIMA TRAORE — OFFICIAL WEBSITE ENQUIRY (ibrahimatraore.net)',
      '===============================================================',
      `To:           ${recipientEmail}`,
      `Category:     ${CATEGORY_LABELS[category] || category}`,
      `Full Name:    ${fullName}`,
      `Organization: ${organization || 'Not specified'}`,
      `Email:        ${email}`,
      `Country:      ${country}`,
      `Language:     ${locale.toUpperCase()}`,
      `Submitted At: ${submittedAt}`,
      '',
      'Message:',
      '---------------------------------------------------------------',
      message,
    ].join('\n');

    // Persist a server-side backup copy on the VPS disk (data/enquiries.jsonl)
    await persistEnquiryToDisk({
      to: recipientEmail,
      fullName,
      organization,
      email,
      country,
      category,
      categoryLabel: CATEGORY_LABELS[category] || category,
      message,
      locale,
      submittedAt,
    });

    // 4. Dispatch via Configured Provider to ceo@ibrahimatraore.net
    if (provider === 'resend' && process.env.RESEND_API_KEY) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [recipientEmail],
          reply_to: email,
          subject,
          text: plainTextContent,
        }),
      });
      if (!res.ok) {
        throw new Error(`Resend API error: ${res.status}`);
      }
      return NextResponse.json({ ok: true, recipient: recipientEmail });
    }

    if (provider === 'sendgrid' && process.env.SENDGRID_API_KEY) {
      const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: recipientEmail }] }],
          from: { email: fromEmail, name: 'Ibrahima Traore Website' },
          reply_to: { email, name: fullName },
          subject,
          content: [{ type: 'text/plain', value: plainTextContent }],
        }),
      });
      if (!res.ok) {
        throw new Error(`SendGrid API error: ${res.status}`);
      }
      return NextResponse.json({ ok: true, recipient: recipientEmail });
    }

    if (provider === 'webhook' && process.env.CONTACT_WEBHOOK_URL) {
      const res = await fetch(process.env.CONTACT_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(process.env.CONTACT_WEBHOOK_SECRET
            ? { 'X-Webhook-Secret': process.env.CONTACT_WEBHOOK_SECRET }
            : {}),
        },
        body: JSON.stringify({
          to: recipientEmail,
          fullName,
          organization,
          email,
          country,
          category,
          message,
          locale,
          submittedAt,
        }),
      });
      if (!res.ok) {
        throw new Error(`Webhook error: ${res.status}`);
      }
      return NextResponse.json({ ok: true, recipient: recipientEmail });
    }

    const smtpHost = process.env.SMTP_HOST || 'smtp.hostinger.com';
    const smtpUser = process.env.SMTP_USER || 'ceo@ibrahimatraore.net';
    const smtpPass = process.env.SMTP_PASS || '';
    const smtpPort = Number(process.env.SMTP_PORT || 465);
    const smtpSecure =
      process.env.SMTP_SECURE !== undefined
        ? process.env.SMTP_SECURE === 'true'
        : smtpPort === 465;

    if (
      provider === 'smtp' &&
      smtpHost &&
      smtpHost !== 'smtp.example.com' &&
      smtpUser &&
      smtpPass
    ) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"Ibrahima Traore Executive Website" <${fromEmail}>`,
        to: recipientEmail,
        replyTo: email,
        subject,
        text: plainTextContent,
      });

      return NextResponse.json({ ok: true, recipient: recipientEmail });
    }

    // 5. Safe Fallback / Simulation Mode when SMTP password is not yet set in .env
    if (simulateDelivery) {
      return NextResponse.json({
        ok: true,
        simulated: true,
        recipient: recipientEmail,
      });
    }

    return NextResponse.json(
      { ok: false, errorCode: 'DELIVERY_NOT_CONFIGURED' },
      { status: 503 }
    );
  } catch (error) {
    console.error('Contact enquiry error:', error);
    return NextResponse.json(
      { ok: false, errorCode: 'SERVER_ERROR' },
      { status: 500 }
    );
  }
}
