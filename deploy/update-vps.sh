#!/usr/bin/env bash
# ============================================================================
# ZERO-DOWNTIME UPDATE SCRIPT FOR HOSTINGER VPS (ibrahimatraore.net)
# Run from /var/www/ibrahimatraore.net:
#   bash deploy/update-vps.sh
# ============================================================================

set -euo pipefail

APP_DIR="/var/www/ibrahimatraore.net"
cd "${APP_DIR}"

echo "==> Pulling latest changes from GitHub..."
git pull origin main

echo "==> Installing dependencies..."
npm ci

echo "==> Running TypeScript check & building production bundle..."
npm run lint
npm run build

echo "==> Reloading PM2 process (ibrahimatraore-web)..."
pm2 reload ibrahimatraore-web --update-env || pm2 start ecosystem.config.cjs
pm2 save

echo "==> Update complete! https://ibrahimatraore.net is live."
