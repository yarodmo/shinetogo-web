module.exports = {
  apps: [
    {
      name: 'shinetogo-api',
      script: './server.js',
      cwd: './api',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '200M',
      env: {
        NODE_ENV: 'production',
        PORT: 6015
      },
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      error_file: './logs/api-error.log',
      out_file: './logs/api-out.log'
    }
  ]
};
