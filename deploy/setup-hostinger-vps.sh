#!/usr/bin/env bash
# ============================================================================
# SAFE MULTI-SITE HOSTINGER VPS DEPLOYMENT SCRIPT FOR: ibrahimatraore.net
# Executive Website: Ibrahima Traore (CEO of Sport World Africa & Kouankan IV SL)
# Official Email:    ceo@ibrahimatraore.net
#
# SAFE FOR MULTI-SITE VPS:
# - Does NOT remove /etc/nginx/sites-enabled/default or any other site config
# - Does NOT alter existing PM2 apps, databases, or firewall rules
# - Only adds /var/www/ibrahimatraore.net, PM2 app "ibrahimatraore-web" (port 3008),
#   and /etc/nginx/sites-available/ibrahimatraore.net
# ============================================================================

set -euo pipefail

REPO_URL="${1:-https://github.com/HILTONJACKSO/ibrahimatraore.git}"
APP_DIR="/var/www/ibrahimatraore.net"
DOMAIN="ibrahimatraore.net"
WWW_DOMAIN="www.ibrahimatraore.net"
ADMIN_EMAIL="ceo@ibrahimatraore.net"

echo "==> [1/5] Checking required tools (git, nginx, node, pm2) without touching existing services..."
if ! command -v git >/dev/null 2>&1; then
  apt-get update -y && apt-get install -y git
fi
if ! command -v nginx >/dev/null 2>&1; then
  apt-get update -y && apt-get install -y nginx
fi
if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi
if ! command -v pm2 >/dev/null 2>&1; then
  npm install -g pm2
fi

echo "==> [2/5] Checking port 3008 is free (protects your other sites)..."
if ss -tln | grep -q ':3008 ' && ! pm2 describe ibrahimatraore-web >/dev/null 2>&1; then
  echo "ERROR: Port 3008 is already used by another service on this VPS."
  echo "Pick a free port, then edit 'args' and 'PORT' in ecosystem.config.cjs and proxy_pass in deploy/nginx-ibrahimatraore.net.conf."
  echo "Ports currently listening:"
  ss -tlnp | grep LISTEN
  exit 1
fi

echo "==> Cloning or updating ${REPO_URL} in ${APP_DIR}..."
mkdir -p /var/www
if [ -d "${APP_DIR}/.git" ]; then
  cd "${APP_DIR}"
  git fetch origin
  git reset --hard origin/main
else
  git clone "${REPO_URL}" "${APP_DIR}"
  cd "${APP_DIR}"
fi

echo "==> [3/5] Ensuring production .env exists..."
if [ ! -f "${APP_DIR}/.env" ]; then
  cp "${APP_DIR}/.env.example" "${APP_DIR}/.env"
  echo "Created ${APP_DIR}/.env from .env.example."
fi

echo "==> [4/5] Installing dependencies and building Next.js production bundle..."
cd "${APP_DIR}"
npm ci
npm run build

echo "==> [5/5] Starting/Reloading ONLY 'ibrahimatraore-web' in PM2 (port 3008) & adding Nginx vhost..."
pm2 reload ibrahimatraore-web --update-env 2>/dev/null || pm2 start ecosystem.config.cjs
pm2 save

cp "${APP_DIR}/deploy/nginx-ibrahimatraore.net.conf" /etc/nginx/sites-available/ibrahimatraore.net
ln -sf /etc/nginx/sites-available/ibrahimatraore.net /etc/nginx/sites-enabled/ibrahimatraore.net

# Test Nginx configuration before reloading so existing sites are never interrupted
nginx -t
systemctl reload nginx

echo ""
echo "============================================================================"
echo " Safe Multi-Site Deployment Complete for ${DOMAIN}!"
echo " App Directory : ${APP_DIR}"
echo " Local Port    : 127.0.0.1:3008 (PM2 process: ibrahimatraore-web)"
echo " Nginx Config  : /etc/nginx/sites-available/ibrahimatraore.net"
echo " Optional SSL  : certbot --nginx -d ${DOMAIN} -d ${WWW_DOMAIN} --non-interactive --agree-tos -m ${ADMIN_EMAIL} --redirect"
echo "============================================================================"
