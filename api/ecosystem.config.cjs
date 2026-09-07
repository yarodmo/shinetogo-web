const path = require('path')

module.exports = {
  apps: [
    {
      name: 'shinetogo-api',
      script: './server.js',
      // __dirname resuelve a /home/<VPS_USER>/app/api en cualquier cuenta
      // donde el pipeline haga rsync — nada hardcodeado al usuario.
      cwd: __dirname,
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '200M',
      // ──────────────────────────────────────────────────────
      // Solo NODE_ENV aquí. PORT también es por-dominio (dos cuentas en
      // el mismo VPS no pueden compartir puerto TCP) → igual que
      // SMTP_HOST/SMTP_USER/ALLOWED_ORIGINS, vive ÚNICAMENTE en el .env
      // físico que escribe el pipeline por cuenta (ver deploy.yml). Si se
      // duplicara aquí, PM2 lo inyecta ANTES de que dotenv cargue el
      // .env, y dotenv no sobreescribe vars ya seteadas — el .env
      // quedaría ignorado para esa clave.
      // ──────────────────────────────────────────────────────
      env_production: {
        NODE_ENV: 'production',
        // PORT / SMTP_HOST / SMTP_PORT / SMTP_USER / ALLOWED_ORIGINS / SMTP_PASS / RECIPIENT
        // → escritos por GitHub Actions en api/.env por cuenta/dominio
      },
      env: {
        NODE_ENV: 'production',
        // PORT NOT here either — same reason as env_production above.
        // This block only matters for a bare `pm2 start` without --env,
        // which the pipeline never does.
      },
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      error_file:      path.join(__dirname, '../../logs/api-error.log'),
      out_file:        path.join(__dirname, '../../logs/api-out.log'),
      merge_logs:      true,
    }
  ]
};
