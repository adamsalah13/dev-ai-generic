# Azure Deployment Guide

This guide covers deploying the dev-ai-generic sample application to Microsoft Azure using various deployment strategies.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Azure App Service Deployment](#azure-app-service-deployment)
- [Container Deployment](#container-deployment)
- [Static Web App Deployment](#static-web-app-deployment)
- [Database Setup](#database-setup)
- [CI/CD Pipeline](#cicd-pipeline)
- [Monitoring and Logging](#monitoring-and-logging)
- [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Tools

- Azure CLI (`az`)
- Node.js 18+ and npm
- Docker (for container deployments)
- Git

### Azure Resources

- Azure subscription
- Resource Group
- App Service Plan (for web apps)
- Azure Database for PostgreSQL/MySQL (if using database)
- Application Insights (for monitoring)

## Azure App Service Deployment

### 1. Create Azure Resources

```bash
# Login to Azure
az login

# Create resource group
az group create --name rg-dev-ai-generic --location "East US"

# Create App Service Plan
az appservice plan create \
  --name asp-dev-ai-generic \
  --resource-group rg-dev-ai-generic \
  --sku B1 \
  --is-linux

# Create Web App for Frontend
az webapp create \
  --name wa-dev-ai-generic-frontend \
  --resource-group rg-dev-ai-generic \
  --plan asp-dev-ai-generic \
  --runtime "NODE:18-lts"

# Create Web App for Backend API
az webapp create \
  --name wa-dev-ai-generic-api \
  --resource-group rg-dev-ai-generic \
  --plan asp-dev-ai-generic \
  --runtime "NODE:18-lts"
```

### 2. Configure App Settings

```bash
# Set environment variables for the API
az webapp config appsettings set \
  --name wa-dev-ai-generic-api \
  --resource-group rg-dev-ai-generic \
  --settings \
    NODE_ENV=production \
    PORT=8080 \
    DATABASE_URL="your-database-connection-string" \
    JWT_SECRET="your-jwt-secret"

# Set environment variables for the Frontend
az webapp config appsettings set \
  --name wa-dev-ai-generic-frontend \
  --resource-group rg-dev-ai-generic \
  --settings \
    NODE_ENV=production \
    REACT_APP_API_URL="https://wa-dev-ai-generic-api.azurewebsites.net"
```

### 3. Deploy Using Azure CLI

```bash
# Deploy Frontend
cd sample-app/frontend
npm run build
az webapp deploy \
  --name wa-dev-ai-generic-frontend \
  --resource-group rg-dev-ai-generic \
  --src-path build.zip \
  --type zip

# Deploy Backend
cd ../backend
npm install --production
az webapp deploy \
  --name wa-dev-ai-generic-api \
  --resource-group rg-dev-ai-generic \
  --src-path . \
  --type zip
```

## Container Deployment

### 1. Create Container Registry

```bash
# Create Azure Container Registry
az acr create \
  --name acrdaiigeneric \
  --resource-group rg-dev-ai-generic \
  --sku Basic \
  --admin-enabled true

# Login to ACR
az acr login --name acrdaiigeneric
```

### 2. Build and Push Images

```bash
# Build and push frontend image
cd sample-app/frontend
docker build -t acrdaiigeneric.azurecr.io/frontend:latest .
docker push acrdaiigeneric.azurecr.io/frontend:latest

# Build and push backend image
cd ../backend
docker build -t acrdaiigeneric.azurecr.io/backend:latest .
docker push acrdaiigeneric.azurecr.io/backend:latest
```

### 3. Deploy to Container Instances

```bash
# Deploy backend container
az container create \
  --name aci-dev-ai-generic-api \
  --resource-group rg-dev-ai-generic \
  --image acrdaiigeneric.azurecr.io/backend:latest \
  --cpu 1 \
  --memory 1.5 \
  --ports 8080 \
  --dns-name-label dev-ai-generic-api \
  --registry-login-server acrdaiigeneric.azurecr.io \
  --registry-username acrdaiigeneric \
  --registry-password $(az acr credential show --name acrdaiigeneric --query passwords[0].value -o tsv)

# Deploy frontend container
az container create \
  --name aci-dev-ai-generic-frontend \
  --resource-group rg-dev-ai-generic \
  --image acrdaiigeneric.azurecr.io/frontend:latest \
  --cpu 1 \
  --memory 1 \
  --ports 80 \
  --dns-name-label dev-ai-generic-frontend \
  --registry-login-server acrdaiigeneric.azurecr.io \
  --registry-username acrdaiigeneric \
  --registry-password $(az acr credential show --name acrdaiigeneric --query passwords[0].value -o tsv)
```

## Static Web App Deployment

### 1. Create Static Web App

```bash
# Create Static Web App
az staticwebapp create \
  --name swa-dev-ai-generic \
  --resource-group rg-dev-ai-generic \
  --source https://github.com/your-username/dev-ai-generic \
  --location "East US 2" \
  --branch main \
  --app-location "sample-app/frontend" \
  --api-location "sample-app/backend" \
  --output-location "build"
```

### 2. Configure GitHub Actions

The Static Web App will automatically create a GitHub Actions workflow. Update the generated `.github/workflows/azure-static-web-apps-*.yml` file as needed.

## Database Setup

### 1. Create Azure Database for PostgreSQL

```bash
# Create PostgreSQL server
az postgres server create \
  --name pg-dev-ai-generic \
  --resource-group rg-dev-ai-generic \
  --location "East US" \
  --admin-user pgadmin \
  --admin-password "YourSecurePassword123!" \
  --sku-name GP_Gen5_2

# Create database
az postgres db create \
  --name dev_ai_generic_db \
  --server-name pg-dev-ai-generic \
  --resource-group rg-dev-ai-generic

# Configure firewall rules
az postgres server firewall-rule create \
  --name AllowAzureServices \
  --server-name pg-dev-ai-generic \
  --resource-group rg-dev-ai-generic \
  --start-ip-address 0.0.0.0 \
  --end-ip-address 0.0.0.0
```

### 2. Connection String

```bash
# Get connection string
az postgres show-connection-string \
  --server-name pg-dev-ai-generic \
  --database-name dev_ai_generic_db \
  --admin-user pgadmin \
  --admin-password "YourSecurePassword123!"
```

## CI/CD Pipeline

### GitHub Actions Workflow

Create `.github/workflows/azure-deploy.yml`:

```yaml
name: Deploy to Azure

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        cache-dependency-path: sample-app/frontend/package-lock.json
    
    - name: Install and build frontend
      run: |
        cd sample-app/frontend
        npm ci
        npm run build
    
    - name: Deploy to Azure App Service
      uses: azure/webapps-deploy@v2
      with:
        app-name: 'wa-dev-ai-generic-frontend'
        publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
        package: sample-app/frontend/build
```

## Monitoring and Logging

### 1. Application Insights

```bash
# Create Application Insights
az monitor app-insights component create \
  --app ai-dev-ai-generic \
  --location "East US" \
  --resource-group rg-dev-ai-generic \
  --application-type web

# Get instrumentation key
az monitor app-insights component show \
  --app ai-dev-ai-generic \
  --resource-group rg-dev-ai-generic \
  --query instrumentationKey
```

### 2. Configure Logging

Add to your application:

```javascript
// For Node.js applications
const appInsights = require('applicationinsights');
appInsights.setup('YOUR_INSTRUMENTATION_KEY').start();
```

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for TypeScript compilation errors

2. **Database Connection Issues**
   - Verify firewall rules
   - Check connection string format
   - Ensure SSL is properly configured

3. **CORS Issues**
   - Configure CORS in your API
   - Check allowed origins in production

4. **Environment Variables**
   - Verify all required environment variables are set
   - Check for typos in variable names
   - Ensure sensitive data is stored in Key Vault

### Useful Commands

```bash
# View application logs
az webapp log tail --name wa-dev-ai-generic-frontend --resource-group rg-dev-ai-generic

# Check application status
az webapp show --name wa-dev-ai-generic-frontend --resource-group rg-dev-ai-generic --query state

# Restart application
az webapp restart --name wa-dev-ai-generic-frontend --resource-group rg-dev-ai-generic
```

## Best Practices

1. **Security**
   - Use Azure Key Vault for secrets
   - Enable HTTPS only
   - Configure proper authentication
   - Implement proper CORS policies

2. **Performance**
   - Use CDN for static assets
   - Enable gzip compression
   - Implement caching strategies
   - Monitor application performance

3. **Reliability**
   - Set up health checks
   - Configure auto-scaling
   - Implement proper error handling
   - Set up backup strategies

4. **Cost Optimization**
   - Choose appropriate service tiers
   - Implement auto-shutdown for dev environments
   - Monitor resource utilization
   - Use reserved instances for production
