#!/bin/bash
set -e

echo "Starting Laravel..."

php artisan config:cache
php artisan route:cache

# IMPORTANT: Render provides PORT
PORT=${PORT:-10000}

echo "Starting Laravel server on port $PORT"

php artisan serve --host=0.0.0.0 --port=$PORT