/**
 * PM2 Production Process Configuration for Hostinger VPS
 * Domain: https://ibrahimatraore.net
 * Usage:  pm2 start ecosystem.config.cjs && pm2 save
 */
module.exports = {
  apps: [
    {
      name: 'ibrahimatraore-web',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3010',
      cwd: '/var/www/ibrahimatraore.net',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        PORT: 3010,
        NEXT_PUBLIC_SITE_URL: 'https://ibrahimatraore.net',
        CONTACT_RECIPIENT_EMAIL: 'ceo@ibrahimatraore.net',
        CONTACT_FROM_EMAIL: 'ceo@ibrahimatraore.net',
      },
    },
  ],
};
