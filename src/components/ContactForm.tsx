'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getLocalizedPath, type Locale } from '@/config/site';
import type { SiteDictionary } from '@/i18n';

interface ContactFormProps {
  locale: Locale;
  dict: SiteDictionary;
}

type ValidationKey = keyof SiteDictionary['contact']['form']['validation'];

export function ContactForm({ locale, dict }: ContactFormProps) {
  const f = dict.contact.form;

  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const [fieldErrors, setFieldErrors] = useState<Record<string, ValidationKey>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error' | 'rate_limited'>(
    'idle'
  );

  // Pre-select category if provided via URL query parameter (?category=...)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const catParam = params.get('category');
    if (catParam && f.categories.some((c) => c.value === catParam)) {
      setCategory(catParam);
    }
  }, [f.categories]);

  const validateClient = (): Record<string, ValidationKey> => {
    const errors: Record<string, ValidationKey> = {};
    if (!fullName.trim()) {
      errors.fullName = 'fullNameRequired';
    }
    if (!email.trim()) {
      errors.email = 'emailRequired';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      errors.email = 'emailInvalid';
    }
    if (!country.trim()) {
      errors.country = 'countryRequired';
    }
    if (!category) {
      errors.category = 'categoryRequired';
    }
    if (!message.trim()) {
      errors.message = 'messageRequired';
    } else if (message.trim().length < 20) {
      errors.message = 'messageTooShort';
    }
    if (!privacyAccepted) {
      errors.privacyAccepted = 'privacyRequired';
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('idle');

    const clientErrors = validateClient();
    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      return;
    }

    setFieldErrors({});
    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          organization,
          email,
          country,
          category,
          message,
          privacyAccepted,
          locale,
          website_url: honeypot,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.status === 429 || data.errorCode === 'RATE_LIMITED') {
        setStatus('rate_limited');
        return;
      }

      if (response.status === 422 && data.fieldErrors) {
        setFieldErrors(data.fieldErrors);
        setStatus('idle');
        return;
      }

      if (!response.ok || !data.ok) {
        setStatus('error');
        return;
      }

      setStatus('success');
      setFullName('');
      setOrganization('');
      setEmail('');
      setCountry('');
      setMessage('');
      setPrivacyAccepted(false);
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="contact-form-card">
      {status === 'success' && (
        <div className="form-alert form-alert-success" role="status" aria-live="polite">
          <p style={{ marginBottom: '0.35rem' }}>{f.successMessage}</p>
          <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: 0 }}>
            <strong>ceo@ibrahimatraore.net</strong>
          </p>
        </div>
      )}

      {status === 'error' && (
        <div className="form-alert form-alert-error" role="alert" aria-live="assertive">
          <p style={{ marginBottom: '0.35rem' }}>{f.errorMessage}</p>
          <p style={{ fontSize: '0.9rem', margin: 0 }}>
            <a
              href="mailto:ceo@ibrahimatraore.net"
              style={{ color: 'inherit', textDecoration: 'underline', fontWeight: 600 }}
            >
              ceo@ibrahimatraore.net
            </a>
          </p>
        </div>
      )}

      {status === 'rate_limited' && (
        <div className="form-alert form-alert-error" role="alert" aria-live="assertive">
          {f.validation.rateLimited}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Honeypot Spam Trap (hidden from visual users and assistive tech) */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '-9999px',
            width: '1px',
            height: '1px',
            overflow: 'hidden',
          }}
        >
          <label htmlFor="website_url">Website</label>
          <input
            id="website_url"
            name="website_url"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        <div className="form-grid-two">
          {/* Full Name */}
          <div className="form-field">
            <label htmlFor="contact-full-name" className="form-label">
              {f.fullNameLabel}
              <span className="form-required-star" aria-hidden="true">
                *
              </span>
            </label>
            <input
              id="contact-full-name"
              name="fullName"
              type="text"
              autoComplete="name"
              required
              className="form-input"
              placeholder={f.fullNamePlaceholder}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              aria-invalid={Boolean(fieldErrors.fullName)}
              aria-describedby={fieldErrors.fullName ? 'error-full-name' : undefined}
            />
            {fieldErrors.fullName && (
              <p id="error-full-name" className="field-error" role="alert">
                {f.validation[fieldErrors.fullName]}
              </p>
            )}
          </div>

          {/* Organization */}
          <div className="form-field">
            <label htmlFor="contact-organization" className="form-label">
              {f.organizationLabel}
            </label>
            <input
              id="contact-organization"
              name="organization"
              type="text"
              autoComplete="organization"
              className="form-input"
              placeholder={f.organizationPlaceholder}
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
            />
          </div>
        </div>

        <div className="form-grid-two">
          {/* Business Email */}
          <div className="form-field">
            <label htmlFor="contact-email" className="form-label">
              {f.emailLabel}
              <span className="form-required-star" aria-hidden="true">
                *
              </span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="form-input"
              placeholder={f.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? 'error-email' : undefined}
            />
            {fieldErrors.email && (
              <p id="error-email" className="field-error" role="alert">
                {f.validation[fieldErrors.email]}
              </p>
            )}
          </div>

          {/* Country */}
          <div className="form-field">
            <label htmlFor="contact-country" className="form-label">
              {f.countryLabel}
              <span className="form-required-star" aria-hidden="true">
                *
              </span>
            </label>
            <input
              id="contact-country"
              name="country"
              type="text"
              autoComplete="country-name"
              required
              className="form-input"
              placeholder={f.countryPlaceholder}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              aria-invalid={Boolean(fieldErrors.country)}
              aria-describedby={fieldErrors.country ? 'error-country' : undefined}
            />
            {fieldErrors.country && (
              <p id="error-country" className="field-error" role="alert">
                {f.validation[fieldErrors.country]}
              </p>
            )}
          </div>
        </div>

        {/* Enquiry Category */}
        <div className="form-field">
          <label htmlFor="contact-category" className="form-label">
            {f.categoryLabel}
            <span className="form-required-star" aria-hidden="true">
              *
            </span>
          </label>
          <select
            id="contact-category"
            name="category"
            required
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-invalid={Boolean(fieldErrors.category)}
            aria-describedby={fieldErrors.category ? 'error-category' : undefined}
          >
            <option value="">{f.categoryPlaceholder}</option>
            {f.categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
          {fieldErrors.category && (
            <p id="error-category" className="field-error" role="alert">
              {f.validation[fieldErrors.category]}
            </p>
          )}
        </div>

        {/* Message */}
        <div className="form-field">
          <label htmlFor="contact-message" className="form-label">
            {f.messageLabel}
            <span className="form-required-star" aria-hidden="true">
              *
            </span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            className="form-textarea"
            placeholder={f.messagePlaceholder}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={fieldErrors.message ? 'error-message' : undefined}
          />
          {fieldErrors.message && (
            <p id="error-message" className="field-error" role="alert">
              {f.validation[fieldErrors.message]}
            </p>
          )}
        </div>

        {/* Privacy Acknowledgement */}
        <div className="form-field">
          <div className="form-checkbox-row">
            <input
              id="contact-privacy"
              name="privacyAccepted"
              type="checkbox"
              required
              className="form-checkbox"
              checked={privacyAccepted}
              onChange={(e) => setPrivacyAccepted(e.target.checked)}
              aria-invalid={Boolean(fieldErrors.privacyAccepted)}
              aria-describedby={fieldErrors.privacyAccepted ? 'error-privacy' : undefined}
            />
            <label htmlFor="contact-privacy" className="form-checkbox-label">
              {f.privacyAcknowledgement}{' '}
              <Link href={getLocalizedPath(locale, 'privacy')}>
                {f.privacyLinkText}
              </Link>
              .
              <span className="form-required-star" aria-hidden="true">
                *
              </span>
            </label>
          </div>
          {fieldErrors.privacyAccepted && (
            <p id="error-privacy" className="field-error" role="alert">
              {f.validation[fieldErrors.privacyAccepted]}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={status === 'submitting'}
          style={{ width: '100%', justifyContent: 'center' }}
        >
          <span>{status === 'submitting' ? f.submittingButton : f.submitButton}</span>
          <span aria-hidden="true">→</span>
        </button>
      </form>
    </div>
  );
}
