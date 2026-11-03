# Deployment Guide — `ibrahimatraore.net` (GitHub & Hostinger VPS)

This repository is pre-configured for production deployment to **`https://ibrahimatraore.net`** on a **Hostinger VPS**, with all website enquiries routed to **`ceo@ibrahimatraore.net`**.

---

## 1. Push the Codebase to GitHub

From your local project folder (`c:\Users\User\Videos\ceowebsite`), run:

```powershell
git init
git branch -M main
git add .
git commit -m "Initial executive website for Ibrahima Traore (ibrahimatraore.net)"
git remote add origin https://github.com/HILTONJACKSO/ibrahimatraore.git
git push -u origin main
```

---

## 2. Configure DNS Records in Hostinger (`ibrahimatraore.net`)

In your **Hostinger hPanel → Domains → `ibrahimatraore.net` → DNS / Nameservers**, point the domain to your Hostinger VPS IPv4 address (`YOUR_VPS_IP`):

| Type | Name | Target / Value | TTL |
|---|---|---|---|
| **A** | `@` | `YOUR_VPS_IP` | `3600` |
| **A** | `www` | `YOUR_VPS_IP` | `3600` |

> **Email DNS (`ceo@ibrahimatraore.net`):** Keep your existing Hostinger Email `MX`, `SPF` (`v=spf1 include:_spf.mail.hostinger.com ~all`), and `DKIM` records intact so `ceo@ibrahimatraore.net` sends and receives mail with full deliverability.

---

## 3. One-Command Provisioning on Hostinger VPS

SSH into your Hostinger VPS (Ubuntu 22.04 / 24.04 or Debian 12):

```bash
ssh root@YOUR_VPS_IP
```

Clone the repository and run the automated provisioning script:

```bash
git clone https://github.com/HILTONJACKSO/ibrahimatraore.git /var/www/ibrahimatraore.net
cd /var/www/ibrahimatraore.net
bash deploy/setup-hostinger-vps.sh https://github.com/HILTONJACKSO/ibrahimatraore.git
```

This script automatically:
1. Installs **Node.js 20 LTS**, **PM2**, **Nginx**, **Certbot**, and **UFW Firewall**.
2. Copies `.env.example` to `/var/www/ibrahimatraore.net/.env`.
3. Runs `npm ci` and `npm run build`.
4. Starts the app under PM2 (`ibrahimatraore-web` on port `3010`) and registers PM2 to auto-start on server reboot.
5. Configures Nginx (`/etc/nginx/sites-available/ibrahimatraore.net`) to proxy `ibrahimatraore.net` to `127.0.0.1:3010`.

---

## 4. Enable Free HTTPS SSL Certificate (Let's Encrypt)

Once DNS `A` records resolve to your VPS IP, run:

```bash
certbot --nginx -d ibrahimatraore.net -d www.ibrahimatraore.net --non-interactive --agree-tos -m ceo@ibrahimatraore.net --redirect
```

Certbot will automatically install the SSL certificate and configure automatic HTTPS renewal.

---

## 5. Activate Live Email Delivery to `ceo@ibrahimatraore.net`

All enquiries submitted through the website Contact Form are configured to go to **`ceo@ibrahimatraore.net`** (and are also backed up locally on the VPS at `/var/www/ibrahimatraore.net/data/enquiries.jsonl`).

To enable live SMTP dispatch via your Hostinger mailbox:

1. Open `/var/www/ibrahimatraore.net/.env` on your VPS:
   ```bash
   nano /var/www/ibrahimatraore.net/.env
   ```
2. Set your `ceo@ibrahimatraore.net` mailbox password in `SMTP_PASS`:
   ```env
   NEXT_PUBLIC_SITE_URL=https://ibrahimatraore.net
   NEXT_PUBLIC_VERIFIED_EMAIL=ceo@ibrahimatraore.net
   CONTACT_DELIVERY_ENABLED=true
   CONTACT_SIMULATE_DELIVERY=false
   CONTACT_RECIPIENT_EMAIL=ceo@ibrahimatraore.net
   CONTACT_FROM_EMAIL=ceo@ibrahimatraore.net
   CONTACT_PROVIDER=smtp
   SMTP_HOST=smtp.hostinger.com
   SMTP_PORT=465
   SMTP_SECURE=true
   SMTP_USER=ceo@ibrahimatraore.net
   SMTP_PASS=YOUR_MAILBOX_PASSWORD
   ```
3. Reload PM2 so the new environment variables take effect:
   ```bash
   pm2 reload ibrahimatraore-web --update-env
   ```

---

## 6. Automatic GitHub → Hostinger VPS Deployment (Optional CI/CD)

A GitHub Actions workflow is included at [`.github/workflows/deploy.yml`](file:///.github/workflows/deploy.yml).

To enable automatic deployment on every `git push origin main`, add these 3 Repository Secrets in **GitHub → Settings → Secrets and variables → Actions**:
- `VPS_HOST` — Your Hostinger VPS IP address
- `VPS_USER` — `root` (or your deploy user)
- `VPS_SSH_KEY` — Your private SSH key authorized on the VPS

Or update manually on the VPS anytime with:
```bash
cd /var/www/ibrahimatraore.net && bash deploy/update-vps.sh
```
