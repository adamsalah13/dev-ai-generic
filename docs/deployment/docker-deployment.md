# Docker Deployment Guide

This guide covers containerizing and deploying the dev-ai-generic sample application using Docker and Docker Compose.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Frontend Dockerfile](#frontend-dockerfile)
- [Backend Dockerfile](#backend-dockerfile)
- [Docker Compose Setup](#docker-compose-setup)
- [Environment Configuration](#environment-configuration)
- [Building and Running](#building-and-running)
- [Production Deployment](#production-deployment)
- [Monitoring and Logs](#monitoring-and-logs)
- [Troubleshooting](#troubleshooting)

## Prerequisites

- Docker 20.10+
- Docker Compose 2.0+
- Node.js 18+ (for local development)
- Git

## Frontend Dockerfile

Create `sample-app/frontend/Dockerfile`:

```dockerfile
# Multi-stage build for React frontend
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

### Nginx Configuration

Create `sample-app/frontend/nginx.conf`:

```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
    
    sendfile        on;
    keepalive_timeout  65;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    
    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;
        
        # Handle client-side routing
        location / {
            try_files $uri $uri/ /index.html;
        }
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
        
        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header Referrer-Policy "no-referrer-when-downgrade" always;
        add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    }
}
```

## Backend Dockerfile

Create `sample-app/backend/Dockerfile`:

```dockerfile
# Use official Node.js runtime
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .

# Change ownership to nodejs user
RUN chown -R nodejs:nodejs /app
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node healthcheck.js

# Start the application
CMD ["npm", "start"]
```

### Health Check Script

Create `sample-app/backend/healthcheck.js`:

```javascript
const http = require('http');

const options = {
  hostname: 'localhost',
  port: process.env.PORT || 3000,
  path: '/health',
  method: 'GET',
  timeout: 2000
};

const req = http.request(options, (res) => {
  if (res.statusCode === 200) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});

req.on('error', () => {
  process.exit(1);
});

req.on('timeout', () => {
  req.destroy();
  process.exit(1);
});

req.end();
```

## Docker Compose Setup

Create `docker-compose.yml` in the project root:

```yaml
version: '3.8'

services:
  # Database
  postgres:
    image: postgres:15-alpine
    container_name: dev-ai-generic-db
    environment:
      POSTGRES_DB: ${DB_NAME:-dev_ai_generic}
      POSTGRES_USER: ${DB_USER:-postgres}
      POSTGRES_PASSWORD: ${DB_PASSWORD:-password}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./database/init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"
    networks:
      - app-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER:-postgres}"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Redis for caching/sessions
  redis:
    image: redis:7-alpine
    container_name: dev-ai-generic-redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - app-network
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Backend API
  backend:
    build:
      context: ./sample-app/backend
      dockerfile: Dockerfile
    container_name: dev-ai-generic-api
    environment:
      NODE_ENV: ${NODE_ENV:-development}
      PORT: 3000
      DATABASE_URL: postgresql://${DB_USER:-postgres}:${DB_PASSWORD:-password}@postgres:5432/${DB_NAME:-dev_ai_generic}
      REDIS_URL: redis://redis:6379
      JWT_SECRET: ${JWT_SECRET:-your-jwt-secret}
      CORS_ORIGIN: ${CORS_ORIGIN:-http://localhost:3001}
    ports:
      - "3000:3000"
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    networks:
      - app-network
    volumes:
      - ./sample-app/backend:/app
      - /app/node_modules
    restart: unless-stopped

  # Frontend
  frontend:
    build:
      context: ./sample-app/frontend
      dockerfile: Dockerfile
      args:
        REACT_APP_API_URL: ${REACT_APP_API_URL:-http://localhost:3000}
    container_name: dev-ai-generic-frontend
    ports:
      - "3001:80"
    depends_on:
      - backend
    networks:
      - app-network
    restart: unless-stopped

  # Nginx reverse proxy (for production)
  nginx:
    image: nginx:alpine
    container_name: dev-ai-generic-nginx
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./nginx/ssl:/etc/nginx/ssl
    depends_on:
      - frontend
      - backend
    networks:
      - app-network
    profiles:
      - production

volumes:
  postgres_data:
  redis_data:

networks:
  app-network:
    driver: bridge
```

### Development Override

Create `docker-compose.override.yml`:

```yaml
version: '3.8'

services:
  backend:
    environment:
      NODE_ENV: development
    volumes:
      - ./sample-app/backend:/app
      - /app/node_modules
    command: npm run dev
    
  frontend:
    build:
      target: development
    volumes:
      - ./sample-app/frontend:/app
      - /app/node_modules
    command: npm start
    ports:
      - "3001:3000"
```

## Environment Configuration

Create `.env` file:

```env
# Database
DB_NAME=dev_ai_generic
DB_USER=postgres
DB_PASSWORD=password

# Application
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key
CORS_ORIGIN=http://localhost:3001

# Frontend
REACT_APP_API_URL=http://localhost:3000

# Production overrides
# NODE_ENV=production
# CORS_ORIGIN=https://yourdomain.com
# REACT_APP_API_URL=https://api.yourdomain.com
```

Create `.env.production`:

```env
# Production environment variables
NODE_ENV=production
DB_PASSWORD=your-secure-production-password
JWT_SECRET=your-super-secure-production-jwt-key
CORS_ORIGIN=https://yourdomain.com
REACT_APP_API_URL=https://api.yourdomain.com
```

## Building and Running

### Development Environment

```bash
# Start all services in development mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild and start
docker-compose up --build -d
```

### Production Environment

```bash
# Start with production profile
docker-compose --profile production up -d

# Or use production environment file
docker-compose --env-file .env.production up -d

# Build for production
docker-compose -f docker-compose.yml build --no-cache
```

### Individual Services

```bash
# Build specific service
docker-compose build backend

# Start specific service
docker-compose up backend

# Scale services
docker-compose up --scale backend=3

# Execute commands in running container
docker-compose exec backend npm run migrate
```

## Production Deployment

### Docker Swarm

Create `docker-stack.yml`:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: dev_ai_generic
      POSTGRES_USER_FILE: /run/secrets/db_user
      POSTGRES_PASSWORD_FILE: /run/secrets/db_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - app-network
    secrets:
      - db_user
      - db_password
    deploy:
      replicas: 1
      placement:
        constraints:
          - node.role == manager

  backend:
    image: your-registry/dev-ai-generic-backend:latest
    environment:
      NODE_ENV: production
      DATABASE_URL_FILE: /run/secrets/database_url
      JWT_SECRET_FILE: /run/secrets/jwt_secret
    networks:
      - app-network
    secrets:
      - database_url
      - jwt_secret
    deploy:
      replicas: 3
      update_config:
        parallelism: 1
        delay: 10s
      restart_policy:
        condition: on-failure

  frontend:
    image: your-registry/dev-ai-generic-frontend:latest
    networks:
      - app-network
    deploy:
      replicas: 2
      update_config:
        parallelism: 1
        delay: 10s

volumes:
  postgres_data:

networks:
  app-network:
    driver: overlay

secrets:
  db_user:
    external: true
  db_password:
    external: true
  database_url:
    external: true
  jwt_secret:
    external: true
```

### Kubernetes Deployment

Create `k8s/` directory with manifests:

```yaml
# k8s/namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: dev-ai-generic

---
# k8s/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
  namespace: dev-ai-generic
data:
  NODE_ENV: "production"
  REDIS_URL: "redis://redis:6379"

---
# k8s/secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
  namespace: dev-ai-generic
type: Opaque
data:
  DATABASE_URL: <base64-encoded-database-url>
  JWT_SECRET: <base64-encoded-jwt-secret>

---
# k8s/backend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
  namespace: dev-ai-generic
spec:
  replicas: 3
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
      - name: backend
        image: your-registry/dev-ai-generic-backend:latest
        ports:
        - containerPort: 3000
        envFrom:
        - configMapRef:
            name: app-config
        - secretRef:
            name: app-secrets
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
```

## Monitoring and Logs

### Logging Configuration

Add to `docker-compose.yml`:

```yaml
services:
  backend:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

### Monitoring Stack

Create `docker-compose.monitoring.yml`:

```yaml
version: '3.8'

services:
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml
    networks:
      - app-network

  grafana:
    image: grafana/grafana:latest
    container_name: grafana
    ports:
      - "3003:3000"
    environment:
      GF_SECURITY_ADMIN_PASSWORD: admin
    volumes:
      - grafana_data:/var/lib/grafana
    networks:
      - app-network

  node-exporter:
    image: prom/node-exporter:latest
    container_name: node-exporter
    ports:
      - "9100:9100"
    networks:
      - app-network

volumes:
  grafana_data:

networks:
  app-network:
    external: true
```

### Useful Commands

```bash
# View logs
docker-compose logs -f backend
docker-compose logs --tail=100 frontend

# Monitor resource usage
docker stats

# Inspect containers
docker-compose ps
docker inspect dev-ai-generic-api

# Execute commands
docker-compose exec backend bash
docker-compose exec postgres psql -U postgres -d dev_ai_generic

# Backup database
docker-compose exec postgres pg_dump -U postgres dev_ai_generic > backup.sql

# Restore database
docker-compose exec -T postgres psql -U postgres dev_ai_generic < backup.sql
```

## Troubleshooting

### Common Issues

1. **Port Conflicts**

  ```bash
  # Check what's using the port
  netstat -tlnp | grep :3000
  # Or use different ports in docker-compose.yml
  ```

1. **Permission Issues**

  ```bash
  # Fix ownership
  sudo chown -R $USER:$USER ./sample-app
  ```

1. **Database Connection Issues**

  ```bash
  # Check if database is ready
  docker-compose exec postgres pg_isready -U postgres
  # Check logs
  docker-compose logs postgres
  ```

1. **Build Failures**

  ```bash
  # Clean build
  docker-compose build --no-cache
  # Remove unused images
  docker image prune -f
  ```

1. **Container Won't Start**

  ```bash
  # Check container logs
  docker logs dev-ai-generic-api
  # Run container interactively
  docker run -it --rm your-image /bin/sh
  ```

### Performance Optimization

1. **Multi-stage Builds**: Use multi-stage builds to reduce image size
2. **Layer Caching**: Order Dockerfile commands to maximize cache efficiency
3. **Health Checks**: Implement proper health checks for all services
4. **Resource Limits**: Set appropriate CPU and memory limits
5. **Image Security**: Scan images for vulnerabilities regularly

### Best Practices

1. **Security**
   - Use non-root users in containers
   - Scan images for vulnerabilities
   - Use secrets management
   - Keep base images updated

2. **Performance**
   - Use .dockerignore files
   - Minimize image layers
   - Use appropriate base images
   - Implement proper caching strategies

3. **Reliability**
   - Implement health checks
   - Use proper restart policies
   - Set resource limits
   - Monitor container metrics

4. **Development**
   - Use volumes for local development
   - Implement hot reload
   - Use override files for different environments
   - Document all environment variables
