# -------------------------
# BUILD STAGE
# -------------------------
FROM php:8.2-fpm AS build

RUN apt-get update && apt-get install -y \
    git curl unzip zip libpng-dev libjpeg-dev libfreetype6-dev \
    libzip-dev libonig-dev libxml2-dev nodejs npm \
    && docker-php-ext-install pdo pdo_mysql mbstring zip exif pcntl

# Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Copy everything first (important for proper installs)
COPY . .

# PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# React build (Vite / CRA both fine)
RUN npm install
RUN npm run build


# -------------------------
# PRODUCTION STAGE
# -------------------------
FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    nginx curl zip unzip git \
    libpng-dev libjpeg-dev libfreetype6-dev libzip-dev \
    && docker-php-ext-install pdo pdo_mysql mbstring zip

WORKDIR /app

# Copy built app
COPY --from=build /app /app

# Permissions
RUN chown -R www-data:www-data /app \
    && chmod -R 775 /app/storage /app/bootstrap/cache

# Nginx config
COPY docker/nginx.conf /etc/nginx/nginx.conf

# Start script
COPY docker/start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 80

CMD ["/start.sh"]