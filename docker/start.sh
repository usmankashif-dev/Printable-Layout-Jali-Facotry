#!/bin/bash
set -e

echo "Starting Laravel application..."

# NEVER generate key in production
echo "Skipping APP_KEY generation (use Render env vars)"

# Cache config (safe)
php /app/artisan config:cache
php /app/artisan route:cache
php /app/artisan view:cache

# OPTIONAL: migrations (ONLY if you really want auto-migrate)
if [ "$RUN_MIGRATIONS" = "true" ]; then
    echo "Running migrations..."
    php /app/artisan migrate --force
fi

echo "Starting PHP-FPM..."
php-fpm