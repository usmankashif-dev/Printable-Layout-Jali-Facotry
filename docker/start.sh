#!/bin/bash
set -e

echo "Starting Laravel application..."

# Generate APP_KEY if not set
if [ -z "$APP_KEY" ]; then
    echo "Generating APP_KEY..."
    php /app/artisan key:generate --no-interaction
fi

# Run migrations
echo "Running database migrations..."
php /app/artisan migrate --force --no-interaction

# Clear caches
echo "Clearing caches..."
php /app/artisan config:clear
php /app/artisan cache:clear
php /app/artisan view:clear
php /app/artisan route:clear

# Create necessary directories
mkdir -p /var/log/supervisor
mkdir -p /app/storage/logs

# Fix permissions
chown -R www-data:www-data /app/storage /app/bootstrap/cache

echo "Starting services with supervisor..."
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
