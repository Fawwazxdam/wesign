# Gunakan PHP 8.3 FPM
FROM php:8.3-fpm

# Install dependensi sistem yang dibutuhkan Laravel & Extension PHP
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    curl \
    && docker-php-ext-install pdo_mysql gd zip

# Ambil Composer dari image resmi
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copy file project
COPY . .

# Install dependencies Laravel
RUN composer install --no-dev --optimize-autoloader

# Atur permission agar Laravel bisa menulis log dan cache
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Generate application key jika belum ada
RUN php artisan key:generate --force

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
