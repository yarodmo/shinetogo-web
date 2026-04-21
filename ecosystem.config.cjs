module.exports = {
  apps: [
    {
      name: 'shinetogo-api',
      script: './server.js',
      cwd: '/home/detailshine/app/api',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '200M',
      // ──────────────────────────────────────────────────────
      // Configuración NO sensible (va a Git).
      // SMTP_PASS y RECIPIENT son inyectados por GitHub Actions
      // vía Secrets — nunca aparecen aquí ni en .env.
      // ──────────────────────────────────────────────────────
      env_production: {
        NODE_ENV:        'production',
        PORT:            '6015',
        SMTP_HOST:       'mail.detailshine2go.com',
        SMTP_PORT:       '465',
        SMTP_USER:       'contact@detailshine2go.com',
        ALLOWED_ORIGINS: 'https://detailshine2go.com,https://www.detailshine2go.com',
        // SMTP_PASS  → GitHub Secret: SMTP_PASS
        // RECIPIENT  → GitHub Secret: RECIPIENT
      },
      env: {
        NODE_ENV: 'production',
        PORT: '6015'
      },
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      error_file:      '/home/detailshine/logs/api-error.log',
      out_file:        '/home/detailshine/logs/api-out.log',
      merge_logs:      true,
    }
  ]
};
