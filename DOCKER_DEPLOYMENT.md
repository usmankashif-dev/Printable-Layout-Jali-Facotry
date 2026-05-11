# Docker Deployment Guide

This guide explains how to build and deploy the Laravel application using Docker on Render.

## Prerequisites

- Docker and Docker Compose installed locally
- Render account (https://render.com)
- GitHub repository with this code

## Local Development with Docker

### Build the Docker image locally:

```bash
docker-compose build
```

### Run the application locally:

```bash
docker-compose up
```

The application will be available at `http://localhost:8080`

### Access the container:

```bash
docker-compose exec app bash
```

### View logs:

```bash
docker-compose logs -f app
```

### Stop the application:

```bash
docker-compose down
```

## Deployment on Render

### 1. Connect Your GitHub Repository

1. Go to https://dashboard.render.com/
2. Click "New +" and select "Web Service"
3. Connect your GitHub account and select this repository
4. Choose the branch to deploy (typically `main`)

### 2. Configure the Service

1. **Name**: Enter your service name (e.g., `printable-jali-factory`)
2. **Environment**: Select `Docker`
3. **Dockerfile Path**: Leave as `./Dockerfile` (default)
4. **Plan**: Choose Standard or higher (Free plan has limitations)

### 3. Set Environment Variables

In the Render dashboard, add the following environment variables:

```
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-app-name.onrender.com
DB_CONNECTION=sqlite
DB_DATABASE=/app/storage/database.sqlite
CACHE_DRIVER=file
SESSION_DRIVER=file
QUEUE_CONNECTION=database
LOG_CHANNEL=stderr
```

**Important**: Render will automatically generate and set `APP_KEY` or you can set it manually.

### 4. Deploy

1. Click "Create Web Service"
2. Render will automatically build and deploy your application
3. Once deployed, you'll receive a URL like `https://your-app-name.onrender.com`

## File Structure

```
docker/
├── nginx.conf          # Nginx web server configuration
├── default.conf        # Nginx site configuration
├── supervisord.conf    # Supervisor process manager configuration
└── start.sh           # Startup script for the container

Dockerfile            # Multi-stage Docker build configuration
render.yaml          # Render service configuration
docker-compose.yml   # Local development configuration
.dockerignore        # Files to exclude from Docker build
```

## Services Running in Container

The Docker container runs the following services via Supervisor:

1. **PHP-FPM** - PHP application server
2. **Nginx** - Web server
3. **Laravel Queue Worker** - Background job processing
4. **Laravel Scheduler** - Scheduled tasks

## Database

The application uses SQLite by default. The database file is stored at:
```
/app/storage/database.sqlite
```

For persistent data on Render, consider:
- Using PostgreSQL or MySQL instead
- Implementing automated backups
- Using Render's backup features

### To use PostgreSQL instead:

1. Add a PostgreSQL instance in Render
2. Update environment variables:
   ```
   DB_CONNECTION=pgsql
   DB_HOST=your-postgres-host
   DB_PORT=5432
   DB_DATABASE=your_db_name
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

## Troubleshooting

### View Application Logs

On Render, go to your service → Logs tab to view real-time logs.

### Check PHP Errors

```bash
docker-compose logs app
```

### Database Migration Issues

SSH into Render and run:
```bash
php artisan migrate:fresh --seed
```

### Clear Caches

```bash
php artisan cache:clear
php artisan view:clear
php artisan route:clear
```

### Restart the Service

In Render dashboard, click "Manual Deploy" or "Restart" button.

## Performance Optimization

1. **Enable Caching**: Configure Redis for better performance
2. **Optimize Assets**: CSS and JS files are compressed via Gzip
3. **Database Indexes**: Ensure important database columns are indexed
4. **CDN**: Consider using a CDN for static assets

## Security Considerations

1. **APP_DEBUG=false** in production
2. **APP_KEY** must be set and kept secret
3. Regularly update dependencies: `composer update`
4. Use HTTPS (Render provides free SSL/TLS)
5. Set strong database passwords
6. Keep sensitive data in environment variables

## Scaling

For production deployments:

1. **Multiple Instances**: Upgrade Render plan to run multiple instances
2. **Load Balancing**: Render handles this automatically
3. **Database**: Migrate to managed PostgreSQL/MySQL
4. **Cache**: Use Redis for improved performance
5. **Static Files**: Serve via CDN

## Support

For Render-specific issues, visit: https://render.com/docs
For Laravel-specific issues, visit: https://laravel.com/docs
