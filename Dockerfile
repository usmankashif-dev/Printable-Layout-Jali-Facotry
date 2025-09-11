FROM composer:2.6 AS vendor
WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader

FROM node:18 AS frontend
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM php:8.2-cli
WORKDIR /app
COPY --from=vendor /app /app
COPY --from=frontend /app/public/build /app/public/build
COPY . .
RUN apt-get update && apt-get install -y unzip libpq-dev && docker-php-ext-install pdo pdo_mysql
CMD php artisan serve --host=0.0.0.0 --port=10000
