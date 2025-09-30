# Security Patterns with AI-Assisted Development

## 🔒 Overview

This guide covers essential security patterns and how to effectively use AI tools like GitHub Copilot to implement secure coding practices in modern web applications.

## 🛡️ Core Security Principles

### 1. Defense in Depth

Implement multiple layers of security controls:

```typescript
/**
 * Multi-layered authentication system for e-commerce platform
 * 
 * Security layers:
 * 1. Network security (WAF, DDoS protection)
 * 2. Application security (input validation, CSRF protection)
 * 3. Authentication (MFA, JWT with refresh tokens)
 * 4. Authorization (RBAC, resource-level permissions)
 * 5. Data protection (encryption at rest and in transit)
 * 6. Monitoring (security event logging, anomaly detection)
 * 
 * Implementation requirements:
 * - Rate limiting: 5 login attempts per minute per IP
 * - Password policy: 12+ characters, complexity requirements
 * - Session management: Secure cookies, automatic logout
 * - Account lockout: Progressive delays for failed attempts
 * - Security headers: HSTS, CSP, X-Frame-Options
 */
interface SecureAuthenticationSystem {
  authenticate(credentials: LoginCredentials): Promise<AuthResult>;
  validateSession(token: string): Promise<SessionInfo>;
  refreshToken(refreshToken: string): Promise<TokenPair>;
  logout(sessionId: string): Promise<void>;
  lockAccount(userId: string, reason: string): Promise<void>;
}
```

### 2. Principle of Least Privilege

```javascript
/**
 * Role-based access control (RBAC) system
 * 
 * User roles hierarchy:
 * - Customer: View products, manage own orders, update profile
 * - Vendor: Manage own products, view own sales, respond to reviews
 * - Support: View customer info, process returns, update order status
 * - Manager: Access analytics, manage users, configure settings
 * - Admin: Full system access, security configurations, user management
 * 
 * Permission model:
 * - Resource-based permissions (products, orders, users)
 * - Action-based permissions (create, read, update, delete)
 * - Contextual permissions (own resources vs. all resources)
 * - Time-based permissions (temporary elevated access)
 */
class RBACService {
  async checkPermission(userId, resource, action, context = {}) {
    /**
     * Permission checking algorithm:
     * 1. Retrieve user roles and permissions
     * 2. Check direct permissions for resource/action
     * 3. Check inherited permissions from roles
     * 4. Apply contextual restrictions (ownership, time limits)
     * 5. Log permission checks for audit trail
     * 6. Return boolean result with reasoning
     */
  }
  
  async grantTemporaryAccess(userId, permission, duration, grantor) {
    /**
     * Temporary access management:
     * - Validate grantor has permission to grant access
     * - Create time-limited permission entry
     * - Set automatic revocation job
     * - Log access grant for security audit
     * - Notify user of temporary access
     */
  }
}
```

## 🚨 Common Vulnerability Patterns

### 1. Input Validation and Sanitization

```javascript
/**
 * Comprehensive input validation middleware for Express.js
 * 
 * Protection against:
 * - SQL Injection (parameterized queries)
 * - XSS (input sanitization, output encoding)
 * - Command Injection (input whitelisting)
 * - Path Traversal (path normalization)
 * - LDAP Injection (input escaping)
 * - XML External Entity (XXE) attacks
 * 
 * Validation strategies:
 * - Whitelist approach (preferred)
 * - Input length limits
 * - Data type validation
 * - Format validation (email, phone, etc.)
 * - Business logic validation
 * - File upload restrictions
 */
const createValidationMiddleware = (schema) => {
  return async (req, res, next) => {
    try {
      // 1. Validate request structure
      const validatedData = await validateInput(req.body, schema);
      
      // 2. Sanitize string inputs
      const sanitizedData = sanitizeInputs(validatedData);
      
      // 3. Apply business rule validation
      const businessValidation = await validateBusinessRules(sanitizedData, req.user);
      
      // 4. Check rate limits and quotas
      await checkRateLimits(req.ip, req.user?.id);
      
      // 5. Log validation events
      logValidationEvent(req, sanitizedData);
      
      req.validatedData = sanitizedData;
      next();
    } catch (error) {
      // Security-safe error responses (no sensitive info leaked)
      handleValidationError(error, res);
    }
  };
};

/**
 * SQL Injection prevention example
 * 
 * Vulnerable pattern (NEVER do this):
 * const query = `SELECT * FROM users WHERE email = '${email}'`;
 * 
 * Secure pattern (always use parameterized queries):
 */
const getUserByEmail = async (email) => {
  // Parameterized query prevents SQL injection
  const query = 'SELECT id, email, role FROM users WHERE email = ? AND active = 1';
  const result = await db.execute(query, [email]);
  return result.rows[0];
};

/**
 * XSS prevention example
 */
const sanitizeUserContent = (content) => {
  // Use DOMPurify for HTML sanitization
  const clean = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: ['class'],
    FORBID_SCRIPT: true,
    FORBID_TAGS: ['script', 'object', 'embed', 'iframe']
  });
  
  // Additional validation for business rules
  if (clean.length > MAX_CONTENT_LENGTH) {
    throw new ValidationError('Content too long');
  }
  
  return clean;
};
```

### 2. Authentication and Session Management

```typescript
/**
 * Secure JWT-based authentication system
 * 
 * Security features:
 * - Short-lived access tokens (15 minutes)
 * - Long-lived refresh tokens (7 days, rotating)
 * - Token blacklisting for logout
 * - Device fingerprinting for additional security
 * - Geographic anomaly detection
 * - Concurrent session limits
 */
interface JWTAuthService {
  /**
   * Generate secure token pair with proper claims
   * 
   * Access token claims:
   * - sub (user ID)
   * - iat (issued at)
   * - exp (expiration - 15 minutes)
   * - aud (audience - application domain)
   * - iss (issuer - auth service)
   * - role (user role for authorization)
   * - jti (JWT ID for blacklisting)
   * 
   * Refresh token claims:
   * - sub (user ID)
   * - iat (issued at)
   * - exp (expiration - 7 days)
   * - type: 'refresh'
   * - device_id (for device tracking)
   */
  generateTokens(user: User, deviceInfo: DeviceInfo): Promise<TokenPair>;
  
  /**
   * Validate access token with comprehensive checks
   * 
   * Validation steps:
   * 1. Verify JWT signature using RS256
   * 2. Check token expiration
   * 3. Validate audience and issuer
   * 4. Check if token is blacklisted
   * 5. Verify user account is still active
   * 6. Check for suspicious activity patterns
   * 7. Update last activity timestamp
   */
  validateAccessToken(token: string): Promise<UserContext>;
  
  /**
   * Secure token refresh with rotation
   * 
   * Security measures:
   * - Invalidate old refresh token immediately
   * - Generate new refresh token
   * - Check device fingerprint consistency
   * - Limit refresh attempts per time window
   * - Log all refresh activities
   */
  refreshTokens(refreshToken: string, deviceInfo: DeviceInfo): Promise<TokenPair>;
}

/**
 * Session security middleware
 */
const sessionSecurityMiddleware = () => {
  return async (req, res, next) => {
    // 1. Extract and validate JWT from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid authorization header' });
    }
    
    const token = authHeader.substring(7);
    
    try {
      // 2. Validate token and extract user context
      const userContext = await jwtService.validateAccessToken(token);
      
      // 3. Check for concurrent session limits
      const activeSessions = await getActiveSessionCount(userContext.userId);
      if (activeSessions > MAX_CONCURRENT_SESSIONS) {
        await invalidateOldestSession(userContext.userId);
      }
      
      // 4. Update session activity
      await updateSessionActivity(userContext.sessionId, req.ip, req.headers['user-agent']);
      
      // 5. Attach user context to request
      req.user = userContext;
      
      // 6. Set security headers
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('X-Frame-Options', 'DENY');
      res.setHeader('X-XSS-Protection', '1; mode=block');
      
      next();
    } catch (error) {
      // 7. Handle authentication errors securely
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expired', code: 'TOKEN_EXPIRED' });
      }
      
      // Log suspicious activity
      await logSecurityEvent('INVALID_TOKEN_ATTEMPT', {
        ip: req.ip,
        userAgent: req.headers['user-agent'],
        token: token.substring(0, 20) + '...' // Partial token for investigation
      });
      
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
};
```

### 3. Authorization Patterns

```javascript
/**
 * Resource-based authorization system
 * 
 * Features:
 * - Hierarchical permissions
 * - Resource ownership checks
 * - Dynamic permission evaluation
 * - Permission caching for performance
 * - Audit logging for compliance
 */
class AuthorizationService {
  /**
   * Check if user can perform action on resource
   * 
   * Permission evaluation order:
   * 1. Check explicit deny rules (highest priority)
   * 2. Check explicit allow rules
   * 3. Check role-based permissions
   * 4. Check resource ownership
   * 5. Check contextual permissions
   * 6. Default to deny
   */
  async authorize(userId, action, resourceType, resourceId, context = {}) {
    // Build permission key for caching
    const permissionKey = `perm:${userId}:${action}:${resourceType}:${resourceId}`;
    
    // Check cache first (with TTL of 5 minutes)
    const cachedResult = await redis.get(permissionKey);
    if (cachedResult) {
      return JSON.parse(cachedResult);
    }
    
    // Evaluate permissions
    const result = await this.evaluatePermissions(userId, action, resourceType, resourceId, context);
    
    // Cache result
    await redis.setex(permissionKey, 300, JSON.stringify(result));
    
    // Log authorization decision
    await this.logAuthorizationEvent(userId, action, resourceType, resourceId, result);
    
    return result;
  }
  
  /**
   * Resource ownership middleware
   * 
   * Automatically checks if user owns the requested resource
   * before allowing access to modify operations
   */
  requireOwnership(resourceType) {
    return async (req, res, next) => {
      const userId = req.user.id;
      const resourceId = req.params.id;
      
      try {
        const isOwner = await this.checkResourceOwnership(userId, resourceType, resourceId);
        
        if (!isOwner) {
          // Check if user has admin permissions as fallback
          const hasAdminAccess = await this.authorize(userId, 'admin', resourceType, resourceId);
          
          if (!hasAdminAccess.allowed) {
            await this.logSecurityEvent('UNAUTHORIZED_RESOURCE_ACCESS', {
              userId,
              resourceType,
              resourceId,
              ip: req.ip
            });
            
            return res.status(403).json({ 
              error: 'Access denied',
              code: 'INSUFFICIENT_PERMISSIONS'
            });
          }
        }
        
        next();
      } catch (error) {
        res.status(500).json({ error: 'Authorization check failed' });
      }
    };
  }
}

/**
 * Permission decorator for API endpoints
 */
const requirePermission = (action, resourceType) => {
  return (target, propertyName, descriptor) => {
    const method = descriptor.value;
    
    descriptor.value = async function(...args) {
      const [req, res] = args;
      const userId = req.user.id;
      const resourceId = req.params.id;
      
      const authResult = await authService.authorize(userId, action, resourceType, resourceId);
      
      if (!authResult.allowed) {
        return res.status(403).json({
          error: 'Insufficient permissions',
          required: authResult.required,
          missing: authResult.missing
        });
      }
      
      return method.apply(this, args);
    };
    
    return descriptor;
  };
};

// Usage example
class ProductController {
  @requirePermission('create', 'product')
  async createProduct(req, res) {
    // Product creation logic here
    // User authorization already verified by decorator
  }
  
  @requirePermission('update', 'product')
  async updateProduct(req, res) {
    // Product update logic here
  }
}
```

## 🔐 Encryption and Data Protection

### 1. Data Encryption Patterns

```javascript
/**
 * Comprehensive encryption service for sensitive data
 * 
 * Encryption strategies:
 * - AES-256-GCM for symmetric encryption (data at rest)
 * - RSA-2048 for asymmetric encryption (key exchange)
 * - bcrypt for password hashing (work factor 12)
 * - PBKDF2 for key derivation (100,000 iterations)
 * - Secure random key generation
 * - Key rotation every 90 days
 */
class EncryptionService {
  /**
   * Encrypt sensitive data with authenticated encryption
   * 
   * Features:
   * - AES-256-GCM provides confidentiality and authenticity
   * - Randomized initialization vectors
   * - Associated authenticated data (AAD) support
   * - Automatic key versioning for rotation
   */
  async encryptData(plaintext, associatedData = null) {
    // Generate random IV for each encryption
    const iv = crypto.randomBytes(12); // 96-bit IV for GCM
    
    // Get current encryption key (with version)
    const keyInfo = await this.getCurrentEncryptionKey();
    
    // Create cipher
    const cipher = crypto.createCipher('aes-256-gcm', keyInfo.key);
    cipher.setAAD(Buffer.from(associatedData || ''));
    
    // Encrypt data
    const encrypted = Buffer.concat([
      cipher.update(plaintext, 'utf8'),
      cipher.final()
    ]);
    
    // Get authentication tag
    const authTag = cipher.getAuthTag();
    
    // Return encrypted package with metadata
    return {
      encrypted: encrypted.toString('base64'),
      iv: iv.toString('base64'),
      authTag: authTag.toString('base64'),
      keyVersion: keyInfo.version,
      algorithm: 'aes-256-gcm'
    };
  }
  
  /**
   * Decrypt data with integrity verification
   */
  async decryptData(encryptedPackage, associatedData = null) {
    // Get decryption key by version
    const keyInfo = await this.getEncryptionKey(encryptedPackage.keyVersion);
    
    // Create decipher
    const decipher = crypto.createDecipher(encryptedPackage.algorithm, keyInfo.key);
    decipher.setAAD(Buffer.from(associatedData || ''));
    decipher.setAuthTag(Buffer.from(encryptedPackage.authTag, 'base64'));
    
    // Decrypt data
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(encryptedPackage.encrypted, 'base64')),
      decipher.final()
    ]);
    
    return decrypted.toString('utf8');
  }
  
  /**
   * Hash passwords with adaptive cost factor
   */
  async hashPassword(password) {
    // Validate password strength first
    await this.validatePasswordStrength(password);
    
    // Use bcrypt with adaptive cost factor
    const saltRounds = await this.getOptimalSaltRounds();
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    return {
      hash: hashedPassword,
      algorithm: 'bcrypt',
      costFactor: saltRounds,
      createdAt: new Date().toISOString()
    };
  }
  
  /**
   * Verify password with timing attack protection
   */
  async verifyPassword(password, passwordData) {
    try {
      const isValid = await bcrypt.compare(password, passwordData.hash);
      
      // Check if password needs rehashing (cost factor upgrade)
      if (isValid && this.needsRehashing(passwordData)) {
        // Return flag to trigger password update
        return { valid: true, needsRehash: true };
      }
      
      return { valid: isValid, needsRehash: false };
    } catch (error) {
      // Always take same time to prevent timing attacks
      await bcrypt.compare('dummy', '$2b$12$dummy.hash.to.prevent.timing.attacks');
      return { valid: false, needsRehash: false };
    }
  }
}
```

### 2. Secure Communication Patterns

```typescript
/**
 * TLS configuration and secure communication
 * 
 * Requirements:
 * - TLS 1.3 minimum (disable older versions)
 * - Perfect Forward Secrecy (PFS)
 * - HSTS enforcement
 * - Certificate pinning for mobile apps
 * - OCSP stapling for certificate validation
 */
interface SecureCommConfig {
  /**
   * Express.js HTTPS server configuration
   */
  createSecureServer(): https.Server;
  
  /**
   * Security headers middleware
   */
  setSecurityHeaders(): express.RequestHandler;
  
  /**
   * Certificate management
   */
  rotateCertificates(): Promise<void>;
}

/**
 * Implementation of secure communication patterns
 */
const secureCommService = {
  createSecureServer() {
    const options = {
      // TLS configuration
      secureProtocol: 'TLSv1_3_method',
      ciphers: [
        'ECDHE-RSA-AES128-GCM-SHA256',
        'ECDHE-RSA-AES256-GCM-SHA384',
        'ECDHE-RSA-CHACHA20-POLY1305',
        'ECDHE-ECDSA-AES128-GCM-SHA256',
        'ECDHE-ECDSA-AES256-GCM-SHA384',
        'ECDHE-ECDSA-CHACHA20-POLY1305'
      ].join(':'),
      
      // Certificate configuration
      key: fs.readFileSync('./certs/private-key.pem'),
      cert: fs.readFileSync('./certs/certificate.pem'),
      ca: fs.readFileSync('./certs/ca-bundle.pem'),
      
      // Security options
      honorCipherOrder: true,
      requestCert: false,
      rejectUnauthorized: true
    };
    
    return https.createServer(options, app);
  },
  
  setSecurityHeaders() {
    return (req, res, next) => {
      // HSTS - force HTTPS for 1 year
      res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
      
      // Content Security Policy
      res.setHeader('Content-Security-Policy', [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' https://js.stripe.com",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data: https:",
        "connect-src 'self' https://api.stripe.com",
        "frame-src 'none'",
        "object-src 'none'",
        "base-uri 'self'"
      ].join('; '));
      
      // Prevent clickjacking
      res.setHeader('X-Frame-Options', 'DENY');
      
      // Prevent MIME type sniffing
      res.setHeader('X-Content-Type-Options', 'nosniff');
      
      // XSS protection
      res.setHeader('X-XSS-Protection', '1; mode=block');
      
      // Referrer policy
      res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
      
      // Feature policy
      res.setHeader('Permissions-Policy', [
        'geolocation=()',
        'microphone=()',
        'camera=()',
        'payment=(self)'
      ].join(', '));
      
      next();
    };
  }
};
```

## 🚀 Security Testing with AI

### 1. Automated Security Testing

```javascript
/**
 * Security test suite using AI-assisted generation
 * 
 * Test categories:
 * - Authentication bypass attempts
 * - Authorization escalation tests
 * - Input validation tests
 * - Session management tests
 * - CSRF protection tests
 * - Rate limiting tests
 * - Data exposure tests
 */
describe('Security Test Suite', () => {
  /**
   * Authentication security tests
   * 
   * Test scenarios:
   * - SQL injection in login form
   * - Brute force protection
   * - Session fixation attacks
   * - JWT token manipulation
   * - Password reset vulnerabilities
   */
  describe('Authentication Security', () => {
    test('should prevent SQL injection in login', async () => {
      const maliciousPayloads = [
        "admin' OR '1'='1",
        "admin'; DROP TABLE users; --",
        "admin' UNION SELECT * FROM users --"
      ];
      
      for (const payload of maliciousPayloads) {
        const response = await request(app)
          .post('/api/auth/login')
          .send({
            email: payload,
            password: 'password'
          });
        
        // Should return 400 (validation error) or 401 (unauthorized)
        expect([400, 401]).toContain(response.status);
        expect(response.body).not.toContain('users');
        expect(response.body).not.toContain('SELECT');
      }
    });
    
    test('should enforce rate limiting on login attempts', async () => {
      const loginAttempts = Array(10).fill().map(() => 
        request(app)
          .post('/api/auth/login')
          .send({
            email: 'test@example.com',
            password: 'wrongpassword'
          })
      );
      
      const responses = await Promise.all(loginAttempts);
      
      // Later attempts should be rate limited
      const rateLimitedResponses = responses.slice(5);
      rateLimitedResponses.forEach(response => {
        expect(response.status).toBe(429);
        expect(response.body.error).toMatch(/rate limit/i);
      });
    });
    
    test('should validate JWT token integrity', async () => {
      // Create valid token
      const validToken = jwt.sign({ userId: '123' }, process.env.JWT_SECRET);
      
      // Tamper with token
      const tamperedToken = validToken.slice(0, -5) + 'AAAAA';
      
      const response = await request(app)
        .get('/api/user/profile')
        .set('Authorization', `Bearer ${tamperedToken}`);
      
      expect(response.status).toBe(401);
      expect(response.body.error).toMatch(/invalid token/i);
    });
  });
  
  /**
   * Authorization security tests
   */
  describe('Authorization Security', () => {
    test('should prevent horizontal privilege escalation', async () => {
      // User A tries to access User B's resources
      const userAToken = await createUserToken('userA');
      const userBOrderId = await createOrderForUser('userB');
      
      const response = await request(app)
        .get(`/api/orders/${userBOrderId}`)
        .set('Authorization', `Bearer ${userAToken}`);
      
      expect(response.status).toBe(403);
      expect(response.body.error).toMatch(/access denied/i);
    });
    
    test('should prevent vertical privilege escalation', async () => {
      const customerToken = await createUserToken('customer');
      
      const response = await request(app)
        .get('/api/admin/users')
        .set('Authorization', `Bearer ${customerToken}`);
      
      expect(response.status).toBe(403);
      expect(response.body.error).toMatch(/insufficient permissions/i);
    });
  });
  
  /**
   * Input validation security tests
   */
  describe('Input Validation Security', () => {
    test('should prevent XSS in user input', async () => {
      const xssPayloads = [
        '<script>alert("XSS")</script>',
        'javascript:alert("XSS")',
        '<img src=x onerror=alert("XSS")>',
        '<svg onload=alert("XSS")>'
      ];
      
      for (const payload of xssPayloads) {
        const response = await request(app)
          .post('/api/products/reviews')
          .set('Authorization', `Bearer ${userToken}`)
          .send({
            rating: 5,
            comment: payload
          });
        
        // Should either reject or sanitize
        if (response.status === 200) {
          expect(response.body.comment).not.toContain('<script>');
          expect(response.body.comment).not.toContain('javascript:');
          expect(response.body.comment).not.toContain('onerror=');
        } else {
          expect(response.status).toBe(400);
        }
      }
    });
  });
});
```

## 📋 Security Checklist

### Development Phase

- [ ] Input validation implemented for all user inputs
- [ ] Output encoding applied to prevent XSS
- [ ] Parameterized queries used to prevent SQL injection
- [ ] Authentication system properly implemented
- [ ] Authorization checks in place for all protected resources
- [ ] Secure session management configured
- [ ] Password hashing with strong algorithm (bcrypt, Argon2)
- [ ] Rate limiting implemented for sensitive operations
- [ ] CSRF protection enabled
- [ ] Security headers configured

### Deployment Phase

- [ ] TLS 1.3 configured with strong cipher suites
- [ ] Security headers enforced (HSTS, CSP, etc.)
- [ ] Database connections encrypted
- [ ] Sensitive data encrypted at rest
- [ ] API keys and secrets properly managed
- [ ] Error messages don't leak sensitive information
- [ ] Logging configured for security events
- [ ] Regular security scans scheduled
- [ ] Dependency vulnerability scanning enabled
- [ ] Security monitoring alerts configured

### Monitoring Phase

- [ ] Authentication failures tracked
- [ ] Authorization violations logged
- [ ] Unusual access patterns detected
- [ ] Performance anomalies monitored
- [ ] Security patches applied promptly
- [ ] Incident response plan tested
- [ ] Regular security assessments conducted
- [ ] Team security training up to date

---

**Next Steps:** Practice implementing these patterns in the [API Security Best Practices](./api-best-practices.md) exercise.