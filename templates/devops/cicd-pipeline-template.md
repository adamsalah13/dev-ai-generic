# CI/CD Pipeline Template for AI-Assisted DevOps

## 🎯 Purpose

This template provides DevOps Engineers with comprehensive guidance for implementing CI/CD pipelines using AI assistance, specifically designed for modern web applications like the ShopFlow e-commerce platform.

## 🚀 CI/CD Pipeline Overview

### Pipeline Stages
- **Source Control**: Code repository management and branching
- **Build**: Code compilation, dependency management, and artifact creation
- **Test**: Automated testing (unit, integration, e2e)
- **Security**: Vulnerability scanning and security testing
- **Deploy**: Application deployment to various environments
- **Monitor**: Performance monitoring and alerting

## 🤖 AI Prompt for CI/CD Pipeline Design

### Comprehensive CI/CD Strategy
```text
Act as an expert DevOps Engineer specializing in modern CI/CD pipelines. Design a comprehensive CI/CD pipeline for the ShopFlow e-commerce platform.

**Technical Context:**
- Application: Full-stack e-commerce web application
- Frontend: React with TypeScript, Vite build system
- Backend: Node.js with Express and TypeScript
- Database: MongoDB with Redis caching
- Infrastructure: Cloud-based deployment (AWS/Azure/GCP)
- Container Platform: Docker with Kubernetes orchestration

**Pipeline Requirements:**
Create a complete CI/CD pipeline including:

1. **Source Control Integration**
   - Git workflow strategy (GitFlow, GitHub Flow, or similar)
   - Branch protection and merge policies
   - Automated triggering on code changes
   - Parallel pipeline execution for different components

2. **Build and Package Stage**
   - Multi-stage Docker builds for optimization
   - Dependency caching and optimization
   - Build artifact generation and storage
   - Container image scanning and security

3. **Testing Strategy**
   - Unit test execution with coverage reporting
   - Integration testing with test databases
   - End-to-end testing with browser automation
   - Performance testing and benchmarking

4. **Security and Quality Gates**
   - Static code analysis (SonarQube, CodeClimate)
   - Dependency vulnerability scanning
   - Container image security scanning
   - Quality gates and failure criteria

5. **Deployment Strategy**
   - Multi-environment deployment (dev, staging, production)
   - Blue-green or canary deployment patterns
   - Database migration handling
   - Rollback procedures and automation

6. **Monitoring and Observability**
   - Application performance monitoring
   - Infrastructure monitoring and alerting
   - Log aggregation and analysis
   - Business metrics tracking

Please provide detailed pipeline configuration with tool recommendations and best practices.
```

## 🏗️ Pipeline Architecture Templates

### GitHub Actions CI/CD Template
```yaml
# .github/workflows/ci-cd.yml
name: ShopFlow CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '18'
  DOCKER_REGISTRY: ghcr.io
  IMAGE_NAME: shopflow

jobs:
  # Build and Test Frontend
  frontend-test:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./frontend
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linting
        run: npm run lint
      
      - name: Run type checking
        run: npm run type-check
      
      - name: Run unit tests
        run: npm run test:coverage
      
      - name: Upload coverage reports
        uses: codecov/codecov-action@v3
        with:
          file: ./frontend/coverage/lcov.info
      
      - name: Build frontend
        run: npm run build
      
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: frontend-build
          path: frontend/dist

  # Build and Test Backend
  backend-test:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./backend
    
    services:
      mongodb:
        image: mongo:6.0
        ports:
          - 27017:27017
      redis:
        image: redis:7-alpine
        ports:
          - 6379:6379
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
          cache-dependency-path: backend/package-lock.json
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linting
        run: npm run lint
      
      - name: Run type checking
        run: npm run type-check
      
      - name: Run unit tests
        run: npm run test:unit
        env:
          MONGODB_URI: mongodb://localhost:27017/shopflow-test
          REDIS_URL: redis://localhost:6379
      
      - name: Run integration tests
        run: npm run test:integration
        env:
          MONGODB_URI: mongodb://localhost:27017/shopflow-test
          REDIS_URL: redis://localhost:6379
      
      - name: Build backend
        run: npm run build

  # Security Scanning
  security-scan:
    runs-on: ubuntu-latest
    needs: [frontend-test, backend-test]
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          scan-ref: '.'
          format: 'sarif'
          output: 'trivy-results.sarif'
      
      - name: Upload Trivy scan results
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: 'trivy-results.sarif'
      
      - name: Run npm audit
        run: |
          cd frontend && npm audit --audit-level high
          cd ../backend && npm audit --audit-level high

  # Build and Push Docker Images
  build-images:
    runs-on: ubuntu-latest
    needs: [frontend-test, backend-test, security-scan]
    if: github.ref == 'refs/heads/main'
    
    outputs:
      frontend-image: ${{ steps.meta-frontend.outputs.tags }}
      backend-image: ${{ steps.meta-backend.outputs.tags }}
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
      
      - name: Login to Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.DOCKER_REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Extract metadata (frontend)
        id: meta-frontend
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.DOCKER_REGISTRY }}/${{ github.repository }}/frontend
          tags: |
            type=ref,event=branch
            type=sha,prefix={{branch}}-
            type=raw,value=latest,enable={{is_default_branch}}
      
      - name: Build and push frontend image
        uses: docker/build-push-action@v5
        with:
          context: ./frontend
          push: true
          tags: ${{ steps.meta-frontend.outputs.tags }}
          labels: ${{ steps.meta-frontend.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
      
      - name: Extract metadata (backend)
        id: meta-backend
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.DOCKER_REGISTRY }}/${{ github.repository }}/backend
          tags: |
            type=ref,event=branch
            type=sha,prefix={{branch}}-
            type=raw,value=latest,enable={{is_default_branch}}
      
      - name: Build and push backend image
        uses: docker/build-push-action@v5
        with:
          context: ./backend
          push: true
          tags: ${{ steps.meta-backend.outputs.tags }}
          labels: ${{ steps.meta-backend.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

  # Deploy to Staging
  deploy-staging:
    runs-on: ubuntu-latest
    needs: build-images
    environment: staging
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Configure kubectl
        uses: azure/k8s-set-context@v3
        with:
          method: kubeconfig
          kubeconfig: ${{ secrets.KUBE_CONFIG }}
      
      - name: Deploy to staging
        run: |
          envsubst < k8s/staging/deployment.yaml | kubectl apply -f -
        env:
          FRONTEND_IMAGE: ${{ needs.build-images.outputs.frontend-image }}
          BACKEND_IMAGE: ${{ needs.build-images.outputs.backend-image }}
      
      - name: Wait for deployment
        run: |
          kubectl rollout status deployment/shopflow-frontend -n staging
          kubectl rollout status deployment/shopflow-backend -n staging

  # End-to-End Testing
  e2e-tests:
    runs-on: ubuntu-latest
    needs: deploy-staging
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
      
      - name: Install Playwright
        run: |
          npm install -g @playwright/test
          npx playwright install
      
      - name: Run E2E tests
        run: npx playwright test
        env:
          BASE_URL: https://staging.shopflow.com
      
      - name: Upload test results
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: e2e-test-results
          path: test-results/

  # Deploy to Production
  deploy-production:
    runs-on: ubuntu-latest
    needs: [deploy-staging, e2e-tests]
    environment: production
    if: github.ref == 'refs/heads/main'
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Configure kubectl
        uses: azure/k8s-set-context@v3
        with:
          method: kubeconfig
          kubeconfig: ${{ secrets.KUBE_CONFIG_PROD }}
      
      - name: Deploy to production (Blue-Green)
        run: |
          # Update green deployment
          envsubst < k8s/production/deployment-green.yaml | kubectl apply -f -
          kubectl rollout status deployment/shopflow-green -n production
          
          # Switch traffic to green
          kubectl patch service shopflow-service -n production -p '{"spec":{"selector":{"version":"green"}}}'
          
          # Wait and verify
          sleep 30
          curl -f https://shopflow.com/health || exit 1
          
          # Scale down blue deployment
          kubectl scale deployment shopflow-blue --replicas=0 -n production
        env:
          FRONTEND_IMAGE: ${{ needs.build-images.outputs.frontend-image }}
          BACKEND_IMAGE: ${{ needs.build-images.outputs.backend-image }}
```

### Jenkins Pipeline Template
```groovy
// Jenkinsfile
pipeline {
    agent any
    
    environment {
        DOCKER_REGISTRY = 'your-registry.com'
        IMAGE_NAME = 'shopflow'
        KUBECONFIG = credentials('kubeconfig')
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build and Test') {
            parallel {
                stage('Frontend') {
                    steps {
                        dir('frontend') {
                            sh 'npm ci'
                            sh 'npm run lint'
                            sh 'npm run test:coverage'
                            sh 'npm run build'
                        }
                    }
                    post {
                        always {
                            publishTestResults testResultsPattern: 'frontend/test-results.xml'
                            publishCoverage adapters: [coberturaAdapter('frontend/coverage/cobertura-coverage.xml')]
                        }
                    }
                }
                
                stage('Backend') {
                    steps {
                        dir('backend') {
                            sh 'npm ci'
                            sh 'npm run lint'
                            sh 'npm run test:unit'
                            sh 'npm run test:integration'
                            sh 'npm run build'
                        }
                    }
                }
            }
        }
        
        stage('Security Scan') {
            steps {
                script {
                    sh 'trivy fs --format json -o trivy-report.json .'
                    archiveArtifacts artifacts: 'trivy-report.json'
                }
            }
        }
        
        stage('Build Images') {
            when {
                branch 'main'
            }
            steps {
                script {
                    def frontendImage = docker.build("${DOCKER_REGISTRY}/${IMAGE_NAME}-frontend:${BUILD_NUMBER}", "./frontend")
                    def backendImage = docker.build("${DOCKER_REGISTRY}/${IMAGE_NAME}-backend:${BUILD_NUMBER}", "./backend")
                    
                    docker.withRegistry("https://${DOCKER_REGISTRY}", 'docker-registry-credentials') {
                        frontendImage.push()
                        frontendImage.push('latest')
                        backendImage.push()
                        backendImage.push('latest')
                    }
                }
            }
        }
        
        stage('Deploy to Staging') {
            when {
                branch 'main'
            }
            steps {
                script {
                    sh """
                        helm upgrade --install shopflow-staging ./helm/shopflow \\
                            --namespace staging \\
                            --set frontend.image.tag=${BUILD_NUMBER} \\
                            --set backend.image.tag=${BUILD_NUMBER} \\
                            --set environment=staging
                    """
                }
            }
        }
        
        stage('E2E Tests') {
            when {
                branch 'main'
            }
            steps {
                sh 'npm install -g @playwright/test'
                sh 'npx playwright install'
                sh 'BASE_URL=https://staging.shopflow.com npx playwright test'
            }
            post {
                always {
                    publishTestResults testResultsPattern: 'test-results/results.xml'
                    archiveArtifacts artifacts: 'test-results/**/*'
                }
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                input message: 'Deploy to production?', ok: 'Deploy'
                script {
                    sh """
                        helm upgrade --install shopflow-production ./helm/shopflow \\
                            --namespace production \\
                            --set frontend.image.tag=${BUILD_NUMBER} \\
                            --set backend.image.tag=${BUILD_NUMBER} \\
                            --set environment=production
                    """
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        failure {
            emailext (
                subject: "Pipeline Failed: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
                body: "The pipeline has failed. Please check: ${env.BUILD_URL}",
                to: "${env.CHANGE_AUTHOR_EMAIL}"
            )
        }
    }
}
```

## 🐳 Container and Kubernetes Templates

### Docker Configuration Templates
```dockerfile
# Frontend Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```dockerfile
# Backend Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine AS runtime

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

USER nodejs

EXPOSE 3000
CMD ["node", "dist/index.js"]
```

### Kubernetes Deployment Templates
```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: shopflow-backend
  namespace: production
spec:
  replicas: 3
  selector:
    matchLabels:
      app: shopflow-backend
  template:
    metadata:
      labels:
        app: shopflow-backend
    spec:
      containers:
      - name: backend
        image: ${BACKEND_IMAGE}
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: MONGODB_URI
          valueFrom:
            secretKeyRef:
              name: shopflow-secrets
              key: mongodb-uri
        - name: JWT_SECRET
          valueFrom:
            secretKeyRef:
              name: shopflow-secrets
              key: jwt-secret
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"

---
apiVersion: v1
kind: Service
metadata:
  name: shopflow-backend-service
  namespace: production
spec:
  selector:
    app: shopflow-backend
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: ClusterIP

---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: shopflow-ingress
  namespace: production
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/rate-limit: "100"
spec:
  tls:
  - hosts:
    - api.shopflow.com
    secretName: shopflow-tls
  rules:
  - host: api.shopflow.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: shopflow-backend-service
            port:
              number: 80
```

## 📊 Monitoring and Observability

### Monitoring Stack Template
```text
Implement comprehensive monitoring for [APPLICATION_NAME]:

**Monitoring Architecture:**
1. **Application Monitoring**
   - APM (Application Performance Monitoring)
   - Error tracking and alerting
   - Business metrics collection
   - User experience monitoring

2. **Infrastructure Monitoring**
   - Server and container metrics
   - Database performance monitoring
   - Network and load balancer metrics
   - Storage and backup monitoring

3. **Log Management**
   - Centralized log aggregation
   - Log parsing and indexing
   - Search and analysis capabilities
   - Alert generation from logs

4. **Alerting and Notifications**
   - Threshold-based alerting
   - Anomaly detection
   - Escalation procedures
   - Multi-channel notifications

**Tool Stack:**
- Metrics: Prometheus + Grafana
- Logging: ELK Stack (Elasticsearch, Logstash, Kibana)
- APM: New Relic, DataDog, or Jaeger
- Alerting: AlertManager, PagerDuty

**Dashboard Configuration:**
```yaml
# Grafana dashboard for ShopFlow
apiVersion: v1
kind: ConfigMap
metadata:
  name: shopflow-dashboard
data:
  dashboard.json: |
    {
      "dashboard": {
        "title": "ShopFlow Application Metrics",
        "panels": [
          {
            "title": "Request Rate",
            "type": "graph",
            "targets": [
              {
                "expr": "rate(http_requests_total[5m])"
              }
            ]
          },
          {
            "title": "Response Time",
            "type": "graph",
            "targets": [
              {
                "expr": "histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))"
              }
            ]
          },
          {
            "title": "Error Rate",
            "type": "singlestat",
            "targets": [
              {
                "expr": "rate(http_requests_total{status!~'2..'}[5m]) / rate(http_requests_total[5m])"
              }
            ]
          }
        ]
      }
    }
```

Include complete monitoring setup with alerting rules and runbooks.
```

## 🔒 Security and Compliance

### Security Pipeline Integration
```text
Integrate security scanning into CI/CD pipeline for [APPLICATION_NAME]:

**Security Scanning Tools:**
1. **Static Code Analysis**
   - SonarQube for code quality and security
   - Semgrep for custom security rules
   - ESLint security plugins for JavaScript/TypeScript

2. **Dependency Scanning**
   - npm audit for Node.js dependencies
   - Snyk for comprehensive vulnerability scanning
   - OWASP Dependency Check

3. **Container Security**
   - Trivy for container image scanning
   - Clair for vulnerability analysis
   - Docker Bench for security best practices

4. **Infrastructure Security**
   - Terraform security scanning with Checkov
   - Kubernetes security with Polaris
   - Network security with Nmap

**Security Pipeline Configuration:**
```yaml
# Security scanning stage in GitHub Actions
security-scan:
  runs-on: ubuntu-latest
  steps:
    - name: Run Snyk to check for vulnerabilities
      uses: snyk/actions/node@master
      env:
        SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
      with:
        args: --severity-threshold=high
    
    - name: Run Trivy scanner
      uses: aquasecurity/trivy-action@master
      with:
        scan-type: 'fs'
        format: 'sarif'
        output: 'trivy-results.sarif'
    
    - name: Upload results to GitHub Security
      uses: github/codeql-action/upload-sarif@v2
      with:
        sarif_file: 'trivy-results.sarif'
```

**Compliance Requirements:**
- GDPR compliance for data handling
- PCI DSS for payment processing
- SOC 2 for security controls
- ISO 27001 for information security

Include security policy templates and compliance checklists.
```

## 📋 DevOps Best Practices Checklist

### Pipeline Design Checklist
- [ ] Multi-stage pipeline with proper gates
- [ ] Parallel execution where possible
- [ ] Comprehensive testing at each stage
- [ ] Security scanning integrated
- [ ] Artifact management and versioning
- [ ] Environment promotion strategy
- [ ] Rollback and recovery procedures
- [ ] Performance monitoring and alerting

### Security Checklist
- [ ] Secrets management implemented
- [ ] Container images scanned for vulnerabilities
- [ ] Dependencies checked for known issues
- [ ] Static code analysis performed
- [ ] Access controls and RBAC configured
- [ ] Audit logging enabled
- [ ] Compliance requirements met
- [ ] Security incident response plan ready

### Operational Checklist
- [ ] Monitoring and alerting configured
- [ ] Log aggregation and analysis setup
- [ ] Backup and disaster recovery tested
- [ ] Documentation updated and accessible
- [ ] Team training and knowledge sharing
- [ ] Change management process established
- [ ] Performance baselines established
- [ ] Capacity planning and scaling strategies

---

**Template Version:** 1.0  
**Last Updated:** September 30, 2025  
**Compatible with:** GitHub Actions, Jenkins, GitLab CI, Azure DevOps, Docker, Kubernetes