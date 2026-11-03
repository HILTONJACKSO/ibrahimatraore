#!/usr/bin/env bash
# ============================================================================
# AUTOMATED HOSTINGER VPS SETUP SCRIPT FOR: ibrahimatraore.net
# Executive Website: Ibrahima Traore (CEO of Sport World Africa & Kouankan IV SL)
# Official Email:    ceo@ibrahimatraore.net
#
# Usage on Ubuntu/Debian Hostinger VPS (as root):
#   bash setup-hostinger-vps.sh https://github.com/YOUR_USERNAME/YOUR_REPO.git
# ============================================================================

set -euo pipefail

REPO_URL="${1:-}"
APP_DIR="/var/www/ibrahimatraore.net"
DOMAIN="ibrahimatraore.net"
WWW_DOMAIN="www.ibrahimatraore.net"
ADMIN_EMAIL="ceo@ibrahimatraore.net"

if [ -z "$REPO_URL" ]; then
  echo "Usage: bash setup-hostinger-vps.sh <GITHUB_REPO_URL>"
  echo "Example: bash setup-hostinger-vps.sh https://github.com/your-org/ibrahimatraore-website.git"
  exit 1
fi

echo "==> [1/7] Updating Ubuntu/Debian packages and installing Nginx, Git, Certbot, UFW..."
apt-get update -y
apt-get install -y curl git nginx certbot python3-certbot-nginx ufw build-essential

echo "==> [2/7] Installing Node.js 20 LTS and PM2..."
if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi
npm install -g pm2

echo "==> [3/7] Cloning or updating repository in ${APP_DIR}..."
mkdir -p /var/www
if [ -d "${APP_DIR}/.git" ]; then
  cd "${APP_DIR}"
  git pull origin main
else
  git clone "${REPO_URL}" "${APP_DIR}"
  cd "${APP_DIR}"
fi

echo "==> [4/7] Creating production .env file if not already present..."
if [ ! -f "${APP_DIR}/.env" ]; then
  cp "${APP_DIR}/.env.example" "${APP_DIR}/.env"
  echo "Created ${APP_DIR}/.env from .env.example."
  echo "IMPORTANT: Edit ${APP_DIR}/.env to add your SMTP_PASS for ceo@ibrahimatraore.net."
fi

echo "==> [5/7] Installing dependencies and building Next.js production bundle..."
cd "${APP_DIR}"
npm ci
npm run build

echo "==> [6/7] Starting application with PM2 on port 3008..."
pm2 delete ibrahimatraore-web 2>/dev/null || true
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup systemd -u root --hp /root || true

echo "==> [7/7] Configuring Nginx & Firewall for ${DOMAIN}..."
cp "${APP_DIR}/deploy/nginx-ibrahimatraore.net.conf" /etc/nginx/sites-available/ibrahimatraore.net
ln -sf /etc/nginx/sites-available/ibrahimatraore.net /etc/nginx/sites-enabled/ibrahimatraore.net
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx

ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

echo ""
echo "============================================================================"
echo " Deployment Complete for ${DOMAIN}!"
echo " Next Step — Enable Free Let's Encrypt HTTPS SSL Certificate:"
echo "   certbot --nginx -d ${DOMAIN} -d ${WWW_DOMAIN} --non-interactive --agree-tos -m ${ADMIN_EMAIL} --redirect"
echo "============================================================================"
