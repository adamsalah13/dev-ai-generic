# API Security Best Practices

## 🛡️ Overview

This guide covers comprehensive API security best practices for building secure REST APIs using modern frameworks, with specific focus on AI-assisted development techniques.

## 🔒 API Security Fundamentals

### 1. Secure API Design Principles

```typescript
/**
 * Secure API endpoint design template
 * 
 * Security considerations:
 * - Authentication required for all endpoints
 * - Authorization based on user roles and resource ownership
 * - Input validation and sanitization
 * - Rate limiting and throttling
 * - Request/response logging for audit
 * - Error handling without information disclosure
 * - CORS configuration for web clients
 * - API versioning for security updates
 */
interface SecureAPIEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  authentication: 'required' | 'optional' | 'none';
  authorization: AuthorizationRule[];
  validation: ValidationSchema;
  rateLimit: RateLimitConfig;
  logging: LoggingConfig;
  documentation: APIDocumentation;
}

/**
 * Example: Secure product management API
 */
const productAPIEndpoints: SecureAPIEndpoint[] = [
  {
    method: 'GET',
    path: '/api/v1/products',
    authentication: 'optional', // Public product listing
    authorization: [],
    validation: {
      query: {
        page: { type: 'number', min: 1, max: 1000, default: 1 },
        limit: { type: 'number', min: 1, max: 100, default: 20 },
        category: { type: 'string', enum: ['electronics', 'clothing', 'books'] },
        search: { type: 'string', maxLength: 100, sanitize: true }
      }
    },
    rateLimit: { windowMs: 60000, max: 100 }, // 100 requests per minute
    logging: { level: 'info', includeQuery: true, excludeBody: true }
  },
  {
    method: 'POST',
    path: '/api/v1/products',
    authentication: 'required',
    authorization: [{ role: 'vendor', action: 'create', resource: 'product' }],
    validation: {
      body: {
        name: { type: 'string', required: true, maxLength: 200, sanitize: true },
        description: { type: 'string', required: true, maxLength: 2000, sanitize: true },
        price: { type: 'number', required: true, min: 0.01, max: 999999.99 },
        category: { type: 'string', required: true, enum: ['electronics', 'clothing', 'books'] },
        images: { type: 'array', maxItems: 10, items: { type: 'string', format: 'url' } }
      }
    },
    rateLimit: { windowMs: 60000, max: 10 }, // 10 product creations per minute
    logging: { level: 'info', includeBody: true, excludeFields: ['sensitiveData'] }
  }
];
```

### 2. Authentication Patterns

```javascript
/**
 * Multi-factor API authentication system
 * 
 * Authentication methods:
 * - JWT tokens (primary method)
 * - API keys (for service-to-service)
 * - OAuth 2.0 (for third-party integrations)
 * - Mutual TLS (for high-security environments)
 * 
 * Security features:
 * - Token rotation and refresh
 * - Device fingerprinting
 * - Geographic anomaly detection
 * - Concurrent session limits
 * - Brute force protection
 */
class APIAuthenticationService {
  /**
   * JWT-based authentication middleware
   * 
   * Features:
   * - RS256 signature verification
   * - Token expiration validation
   * - Blacklist checking for revoked tokens
   * - Rate limiting for invalid tokens
   * - Automatic token refresh handling
   */
  createJWTMiddleware(options = {}) {
    return async (req, res, next) => {
      try {
        // 1. Extract token from Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
          return this.sendAuthError(res, 'MISSING_TOKEN', 'Authorization header required');
        }
        
        const token = authHeader.substring(7);
        
        // 2. Validate token format and structure
        if (!this.isValidTokenFormat(token)) {
          await this.logSecurityEvent('INVALID_TOKEN_FORMAT', { ip: req.ip, userAgent: req.headers['user-agent'] });
          return this.sendAuthError(res, 'INVALID_TOKEN', 'Malformed token');
        }
        
        // 3. Verify JWT signature and claims
        const payload = await this.verifyJWT(token, {
          algorithms: ['RS256'],
          audience: process.env.JWT_AUDIENCE,
          issuer: process.env.JWT_ISSUER,
          maxAge: '15m' // Access tokens expire in 15 minutes
        });
        
        // 4. Check if token is blacklisted
        const isBlacklisted = await this.isTokenBlacklisted(payload.jti);
        if (isBlacklisted) {
          await this.logSecurityEvent('BLACKLISTED_TOKEN_USED', { userId: payload.sub, ip: req.ip });
          return this.sendAuthError(res, 'TOKEN_REVOKED', 'Token has been revoked');
        }
        
        // 5. Validate user account status
        const user = await this.getUserById(payload.sub);
        if (!user || !user.active) {
          return this.sendAuthError(res, 'ACCOUNT_INACTIVE', 'User account is inactive');
        }
        
        // 6. Check for suspicious activity patterns
        const riskScore = await this.calculateRiskScore(payload.sub, req.ip, req.headers['user-agent']);
        if (riskScore > RISK_THRESHOLD) {
          await this.triggerAdditionalVerification(user, req);
          return this.sendAuthError(res, 'ADDITIONAL_VERIFICATION_REQUIRED', 'Please verify your identity');
        }
        
        // 7. Update session activity
        await this.updateSessionActivity(payload.sessionId, {
          ip: req.ip,
          userAgent: req.headers['user-agent'],
          endpoint: req.path,
          timestamp: new Date()
        });
        
        // 8. Attach user context to request
        req.user = {
          id: payload.sub,
          email: user.email,
          role: payload.role,
          permissions: user.permissions,
          sessionId: payload.sessionId
        };
        
        next();
        
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          return this.sendAuthError(res, 'TOKEN_EXPIRED', 'Token has expired', {
            refreshEndpoint: '/api/auth/refresh'
          });
        }
        
        if (error.name === 'JsonWebTokenError') {
          await this.logSecurityEvent('JWT_VERIFICATION_FAILED', { 
            error: error.message, 
            ip: req.ip 
          });
          return this.sendAuthError(res, 'INVALID_TOKEN', 'Token verification failed');
        }
        
        // Log unexpected errors
        console.error('Authentication middleware error:', error);
        return res.status(500).json({ error: 'Authentication service unavailable' });
      }
    };
  }
  
  /**
   * API key authentication for service-to-service communication
   * 
   * Features:
   * - Scoped permissions per API key
   * - Usage tracking and quotas
   * - Automatic key rotation
   * - IP whitelist restrictions
   * - Request signing for integrity
   */
  createAPIKeyMiddleware(options = {}) {
    return async (req, res, next) => {
      try {
        // 1. Extract API key from header
        const apiKey = req.headers['x-api-key'];
        if (!apiKey) {
          return this.sendAuthError(res, 'MISSING_API_KEY', 'API key required');
        }
        
        // 2. Validate API key format and lookup
        const keyInfo = await this.validateAPIKey(apiKey);
        if (!keyInfo) {
          await this.logSecurityEvent('INVALID_API_KEY_USED', { 
            keyPrefix: apiKey.substring(0, 8),
            ip: req.ip 
          });
          return this.sendAuthError(res, 'INVALID_API_KEY', 'Invalid API key');
        }
        
        // 3. Check IP restrictions
        if (keyInfo.ipRestrictions && !keyInfo.ipRestrictions.includes(req.ip)) {
          await this.logSecurityEvent('API_KEY_IP_VIOLATION', {
            keyId: keyInfo.id,
            attemptedIP: req.ip,
            allowedIPs: keyInfo.ipRestrictions
          });
          return this.sendAuthError(res, 'IP_NOT_ALLOWED', 'IP address not authorized');
        }
        
        // 4. Check usage quotas
        const usage = await this.checkAPIKeyUsage(keyInfo.id);
        if (usage.exceeded) {
          return this.sendAuthError(res, 'QUOTA_EXCEEDED', 'API key quota exceeded', {
            resetTime: usage.resetTime
          });
        }
        
        // 5. Verify request signature if required
        if (keyInfo.requiresSignature) {
          const signatureValid = await this.verifyRequestSignature(req, keyInfo.secret);
          if (!signatureValid) {
            await this.logSecurityEvent('INVALID_REQUEST_SIGNATURE', { keyId: keyInfo.id });
            return this.sendAuthError(res, 'INVALID_SIGNATURE', 'Request signature verification failed');
          }
        }
        
        // 6. Record usage
        await this.recordAPIKeyUsage(keyInfo.id, req.path, req.method);
        
        // 7. Attach API key context
        req.apiKey = {
          id: keyInfo.id,
          name: keyInfo.name,
          permissions: keyInfo.permissions,
          rateLimit: keyInfo.rateLimit
        };
        
        next();
        
      } catch (error) {
        console.error('API key authentication error:', error);
        return res.status(500).json({ error: 'Authentication service unavailable' });
      }
    };
  }
}
```

### 3. Advanced Authorization Patterns

```typescript
/**
 * Attribute-Based Access Control (ABAC) system
 * 
 * Authorization factors:
 * - Subject attributes (user role, department, clearance level)
 * - Resource attributes (classification, owner, category)
 * - Environment attributes (time, location, network)
 * - Action attributes (operation type, urgency, impact)
 */
interface ABACPolicy {
  id: string;
  name: string;
  description: string;
  rules: ABACRule[];
  priority: number;
  active: boolean;
}

interface ABACRule {
  effect: 'ALLOW' | 'DENY';
  conditions: ABACCondition[];
  obligations?: ABACObligation[];
}

interface ABACCondition {
  attribute: string;
  operator: 'EQUALS' | 'IN' | 'GREATER_THAN' | 'LESS_THAN' | 'CONTAINS' | 'MATCHES';
  value: any;
  source: 'SUBJECT' | 'RESOURCE' | 'ENVIRONMENT' | 'ACTION';
}

/**
 * ABAC authorization service implementation
 */
class ABACAuthorizationService {
  /**
   * Evaluate authorization request against ABAC policies
   * 
   * Process:
   * 1. Collect all relevant attributes
   * 2. Find applicable policies
   * 3. Evaluate policy rules in priority order
   * 4. Apply policy combining algorithm
   * 5. Execute any obligations
   * 6. Return final decision with reasoning
   */
  async authorize(authRequest: AuthorizationRequest): Promise<AuthorizationResult> {
    const startTime = Date.now();
    
    try {
      // 1. Collect attributes from various sources
      const attributes = await this.collectAttributes(authRequest);
      
      // 2. Find policies applicable to this request
      const applicablePolicies = await this.findApplicablePolicies(
        authRequest.subject,
        authRequest.resource,
        authRequest.action
      );
      
      // 3. Evaluate each policy
      const policyResults = await Promise.all(
        applicablePolicies.map(policy => this.evaluatePolicy(policy, attributes))
      );
      
      // 4. Combine policy results using deny-overrides algorithm
      const finalDecision = this.combinePolicyResults(policyResults);
      
      // 5. Execute obligations if access is granted
      if (finalDecision.decision === 'ALLOW' && finalDecision.obligations.length > 0) {
        await this.executeObligations(finalDecision.obligations, authRequest);
      }
      
      // 6. Log authorization decision
      await this.logAuthorizationDecision({
        subject: authRequest.subject.id,
        resource: authRequest.resource.id,
        action: authRequest.action,
        decision: finalDecision.decision,
        reason: finalDecision.reason,
        evaluationTime: Date.now() - startTime,
        policies: applicablePolicies.map(p => p.id)
      });
      
      return finalDecision;
      
    } catch (error) {
      console.error('Authorization evaluation error:', error);
      
      // Fail securely - default to deny
      return {
        decision: 'DENY',
        reason: 'Authorization evaluation failed',
        obligations: []
      };
    }
  }
  
  /**
   * Dynamic policy evaluation with real-time attribute collection
   */
  private async collectAttributes(request: AuthorizationRequest): Promise<AttributeSet> {
    const attributes: AttributeSet = {
      subject: {},
      resource: {},
      environment: {},
      action: {}
    };
    
    // Subject attributes (cached for performance)
    const subjectKey = `subject:${request.subject.id}`;
    let subjectAttrs = await this.cache.get(subjectKey);
    if (!subjectAttrs) {
      subjectAttrs = await this.collectSubjectAttributes(request.subject);
      await this.cache.setex(subjectKey, 300, JSON.stringify(subjectAttrs)); // 5-minute cache
    }
    attributes.subject = JSON.parse(subjectAttrs);
    
    // Resource attributes
    attributes.resource = await this.collectResourceAttributes(request.resource);
    
    // Environment attributes (current context)
    attributes.environment = {
      currentTime: new Date().toISOString(),
      clientIP: request.clientIP,
      userAgent: request.userAgent,
      isBusinessHours: this.isBusinessHours(),
      securityLevel: await this.getNetworkSecurityLevel(request.clientIP),
      geolocation: await this.getClientGeolocation(request.clientIP)
    };
    
    // Action attributes
    attributes.action = {
      type: request.action,
      sensitivity: this.getActionSensitivity(request.action),
      impact: this.getActionImpact(request.action, request.resource),
      urgency: request.urgency || 'normal'
    };
    
    return attributes;
  }
  
  /**
   * Policy rule evaluation with complex condition logic
   */
  private async evaluateRule(rule: ABACRule, attributes: AttributeSet): Promise<RuleResult> {
    // Evaluate all conditions - must all be true for rule to apply
    const conditionResults = await Promise.all(
      rule.conditions.map(condition => this.evaluateCondition(condition, attributes))
    );
    
    const allConditionsMet = conditionResults.every(result => result.satisfied);
    
    return {
      effect: rule.effect,
      applies: allConditionsMet,
      conditions: conditionResults,
      obligations: rule.obligations || []
    };
  }
  
  /**
   * Complex condition evaluation with multiple operators
   */
  private async evaluateCondition(
    condition: ABACCondition, 
    attributes: AttributeSet
  ): Promise<ConditionResult> {
    const sourceAttributes = attributes[condition.source.toLowerCase()];
    const actualValue = this.getNestedAttribute(sourceAttributes, condition.attribute);
    
    let satisfied = false;
    
    switch (condition.operator) {
      case 'EQUALS':
        satisfied = actualValue === condition.value;
        break;
        
      case 'IN':
        satisfied = Array.isArray(condition.value) && condition.value.includes(actualValue);
        break;
        
      case 'GREATER_THAN':
        satisfied = Number(actualValue) > Number(condition.value);
        break;
        
      case 'LESS_THAN':
        satisfied = Number(actualValue) < Number(condition.value);
        break;
        
      case 'CONTAINS':
        satisfied = String(actualValue).includes(String(condition.value));
        break;
        
      case 'MATCHES':
        satisfied = new RegExp(condition.value).test(String(actualValue));
        break;
        
      default:
        throw new Error(`Unsupported operator: ${condition.operator}`);
    }
    
    return {
      attribute: condition.attribute,
      operator: condition.operator,
      expectedValue: condition.value,
      actualValue,
      satisfied
    };
  }
}

/**
 * Authorization middleware with ABAC integration
 */
const createABACMiddleware = (resourceExtractor, actionExtractor) => {
  return async (req, res, next) => {
    try {
      // Build authorization request
      const authRequest = {
        subject: {
          id: req.user.id,
          type: 'user'
        },
        resource: await resourceExtractor(req),
        action: actionExtractor(req),
        clientIP: req.ip,
        userAgent: req.headers['user-agent'],
        urgency: req.headers['x-urgency'] || 'normal'
      };
      
      // Evaluate authorization
      const result = await abacService.authorize(authRequest);
      
      if (result.decision === 'DENY') {
        return res.status(403).json({
          error: 'Access denied',
          reason: result.reason,
          code: 'AUTHORIZATION_FAILED'
        });
      }
      
      // Store authorization context for potential obligations
      req.authorization = {
        decision: result.decision,
        obligations: result.obligations
      };
      
      next();
      
    } catch (error) {
      console.error('Authorization middleware error:', error);
      return res.status(500).json({ error: 'Authorization service unavailable' });
    }
  };
};
```

## 🔐 Input Validation and Sanitization

### 1. Comprehensive Input Validation

```javascript
/**
 * Advanced input validation framework
 * 
 * Features:
 * - Schema-based validation with custom rules
 * - Nested object and array validation
 * - Async validation for database checks
 * - Business rule validation
 * - Sanitization and normalization
 * - Detailed error reporting
 */
class APIValidationService {
  /**
   * Create validation middleware with comprehensive checks
   * 
   * Validation layers:
   * 1. Schema structure validation
   * 2. Data type and format validation
   * 3. Business rule validation
   * 4. Security validation (injection prevention)
   * 5. Performance validation (size limits)
   */
  createValidationMiddleware(schema, options = {}) {
    return async (req, res, next) => {
      const validationContext = {
        user: req.user,
        ip: req.ip,
        userAgent: req.headers['user-agent'],
        requestId: req.headers['x-request-id'] || uuidv4()
      };
      
      try {
        // 1. Pre-validation security checks
        await this.performSecurityChecks(req, validationContext);
        
        // 2. Schema structure validation
        const structureValidation = await this.validateStructure(req.body, schema);
        if (!structureValidation.valid) {
          return this.sendValidationError(res, 'SCHEMA_VALIDATION_FAILED', structureValidation.errors);
        }
        
        // 3. Data sanitization and normalization
        const sanitizedData = await this.sanitizeInput(req.body, schema);
        
        // 4. Business rule validation
        const businessValidation = await this.validateBusinessRules(sanitizedData, schema, validationContext);
        if (!businessValidation.valid) {
          return this.sendValidationError(res, 'BUSINESS_RULE_VIOLATION', businessValidation.errors);
        }
        
        // 5. Security-specific validation
        const securityValidation = await this.validateSecurity(sanitizedData, schema);
        if (!securityValidation.valid) {
          await this.logSecurityViolation(validationContext, securityValidation.violations);
          return this.sendValidationError(res, 'SECURITY_VALIDATION_FAILED', securityValidation.errors);
        }
        
        // 6. Performance validation (payload size, complexity)
        const performanceValidation = this.validatePerformance(sanitizedData, schema);
        if (!performanceValidation.valid) {
          return this.sendValidationError(res, 'PERFORMANCE_LIMITS_EXCEEDED', performanceValidation.errors);
        }
        
        // 7. Attach validated data to request
        req.validatedData = sanitizedData;
        req.validationContext = validationContext;
        
        next();
        
      } catch (error) {
        console.error('Validation middleware error:', error);
        return res.status(500).json({ 
          error: 'Validation service unavailable',
          requestId: validationContext.requestId
        });
      }
    };
  }
  
  /**
   * Advanced sanitization with security focus
   */
  async sanitizeInput(data, schema, path = '') {
    const sanitized = {};
    
    for (const [key, fieldSchema] of Object.entries(schema)) {
      const fieldPath = path ? `${path}.${key}` : key;
      const value = data[key];
      
      if (value === undefined || value === null) {
        if (fieldSchema.required) {
          throw new ValidationError(`Required field missing: ${fieldPath}`);
        }
        if (fieldSchema.default !== undefined) {
          sanitized[key] = fieldSchema.default;
        }
        continue;
      }
      
      // Type-specific sanitization
      switch (fieldSchema.type) {
        case 'string':
          sanitized[key] = await this.sanitizeString(value, fieldSchema, fieldPath);
          break;
          
        case 'number':
          sanitized[key] = this.sanitizeNumber(value, fieldSchema, fieldPath);
          break;
          
        case 'boolean':
          sanitized[key] = this.sanitizeBoolean(value, fieldSchema, fieldPath);
          break;
          
        case 'array':
          sanitized[key] = await this.sanitizeArray(value, fieldSchema, fieldPath);
          break;
          
        case 'object':
          sanitized[key] = await this.sanitizeInput(value, fieldSchema.properties, fieldPath);
          break;
          
        case 'email':
          sanitized[key] = await this.sanitizeEmail(value, fieldSchema, fieldPath);
          break;
          
        case 'url':
          sanitized[key] = await this.sanitizeURL(value, fieldSchema, fieldPath);
          break;
          
        default:
          throw new ValidationError(`Unsupported field type: ${fieldSchema.type} at ${fieldPath}`);
      }
    }
    
    return sanitized;
  }
  
  /**
   * String sanitization with XSS and injection prevention
   */
  async sanitizeString(value, schema, path) {
    if (typeof value !== 'string') {
      throw new ValidationError(`Expected string at ${path}, got ${typeof value}`);
    }
    
    let sanitized = value;
    
    // 1. Length validation
    if (schema.maxLength && sanitized.length > schema.maxLength) {
      throw new ValidationError(`String too long at ${path}: ${sanitized.length} > ${schema.maxLength}`);
    }
    
    if (schema.minLength && sanitized.length < schema.minLength) {
      throw new ValidationError(`String too short at ${path}: ${sanitized.length} < ${schema.minLength}`);
    }
    
    // 2. Pattern validation
    if (schema.pattern && !new RegExp(schema.pattern).test(sanitized)) {
      throw new ValidationError(`String pattern mismatch at ${path}`);
    }
    
    // 3. Enum validation
    if (schema.enum && !schema.enum.includes(sanitized)) {
      throw new ValidationError(`Invalid enum value at ${path}: ${sanitized}`);
    }
    
    // 4. Security sanitization
    if (schema.sanitize !== false) {
      // HTML sanitization for content fields
      if (schema.allowHTML) {
        sanitized = DOMPurify.sanitize(sanitized, {
          ALLOWED_TAGS: schema.allowedTags || ['p', 'br', 'strong', 'em'],
          ALLOWED_ATTR: schema.allowedAttributes || [],
          FORBID_SCRIPT: true
        });
      } else {
        // Strip all HTML for non-content fields
        sanitized = sanitized.replace(/<[^>]*>/g, '');
      }
      
      // SQL injection prevention patterns
      const sqlPatterns = [
        /('|(\\'))|(;|--|\/\*|\*\/)/gi,
        /(union|select|insert|update|delete|drop|create|alter|exec|execute)/gi
      ];
      
      if (sqlPatterns.some(pattern => pattern.test(sanitized))) {
        await this.logSecurityViolation({ path, value: sanitized }, 'SQL_INJECTION_ATTEMPT');
        throw new ValidationError(`Potentially dangerous content detected at ${path}`);
      }
      
      // XSS prevention
      const xssPatterns = [
        /<script[^>]*>.*?<\/script>/gi,
        /javascript:/gi,
        /on\w+\s*=/gi,
        /<iframe[^>]*>.*?<\/iframe>/gi
      ];
      
      if (xssPatterns.some(pattern => pattern.test(sanitized))) {
        await this.logSecurityViolation({ path, value: sanitized }, 'XSS_ATTEMPT');
        throw new ValidationError(`Potentially dangerous content detected at ${path}`);
      }
    }
    
    // 5. Normalization
    if (schema.normalize) {
      sanitized = sanitized.trim();
      if (schema.lowercase) sanitized = sanitized.toLowerCase();
      if (schema.uppercase) sanitized = sanitized.toUpperCase();
    }
    
    return sanitized;
  }
  
  /**
   * Business rule validation with async database checks
   */
  async validateBusinessRules(data, schema, context) {
    const errors = [];
    const validationPromises = [];
    
    for (const [key, fieldSchema] of Object.entries(schema)) {
      const value = data[key];
      if (value === undefined) continue;
      
      // Async uniqueness validation
      if (fieldSchema.unique) {
        validationPromises.push(
          this.validateUniqueness(key, value, fieldSchema.unique, context)
            .catch(error => errors.push({ field: key, error: error.message }))
        );
      }
      
      // Foreign key validation
      if (fieldSchema.foreignKey) {
        validationPromises.push(
          this.validateForeignKey(key, value, fieldSchema.foreignKey, context)
            .catch(error => errors.push({ field: key, error: error.message }))
        );
      }
      
      // Custom validation functions
      if (fieldSchema.validate) {
        for (const validator of fieldSchema.validate) {
          validationPromises.push(
            Promise.resolve(validator(value, data, context))
              .catch(error => errors.push({ field: key, error: error.message }))
          );
        }
      }
      
      // Permission-based validation
      if (fieldSchema.permissions) {
        const hasPermission = await this.checkFieldPermission(
          key, 
          fieldSchema.permissions, 
          context.user
        );
        if (!hasPermission) {
          errors.push({ 
            field: key, 
            error: 'Insufficient permissions to modify this field' 
          });
        }
      }
    }
    
    // Wait for all async validations
    await Promise.allSettled(validationPromises);
    
    return {
      valid: errors.length === 0,
      errors
    };
  }
}

/**
 * Example usage: Product creation validation
 */
const productValidationSchema = {
  name: {
    type: 'string',
    required: true,
    minLength: 3,
    maxLength: 200,
    sanitize: true,
    unique: { table: 'products', field: 'name', scope: 'vendorId' }
  },
  description: {
    type: 'string',
    required: true,
    maxLength: 2000,
    allowHTML: true,
    allowedTags: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li'],
    sanitize: true
  },
  price: {
    type: 'number',
    required: true,
    min: 0.01,
    max: 999999.99,
    validate: [
      (value, data, context) => {
        if (context.user.role === 'vendor' && value > 10000) {
          throw new Error('Vendors cannot set prices above $10,000');
        }
      }
    ]
  },
  category: {
    type: 'string',
    required: true,
    enum: ['electronics', 'clothing', 'books', 'home', 'sports'],
    foreignKey: { table: 'categories', field: 'slug' }
  },
  tags: {
    type: 'array',
    maxItems: 10,
    items: {
      type: 'string',
      maxLength: 50,
      pattern: '^[a-zA-Z0-9-_]+$'
    }
  },
  images: {
    type: 'array',
    maxItems: 10,
    items: {
      type: 'url',
      validate: [
        async (url) => {
          const isValidImage = await this.validateImageURL(url);
          if (!isValidImage) {
            throw new Error('Invalid image URL or unsupported format');
          }
        }
      ]
    }
  }
};
```

## 🚨 Rate Limiting and Throttling

### 1. Advanced Rate Limiting Strategies

```javascript
/**
 * Multi-tier rate limiting system
 * 
 * Rate limiting tiers:
 * 1. Global rate limits (per IP address)
 * 2. User-specific rate limits (per authenticated user)
 * 3. Endpoint-specific rate limits (per API endpoint)
 * 4. Resource-specific rate limits (per resource type)
 * 5. Burst and sustained rate limits
 * 6. Adaptive rate limits based on system load
 */
class AdvancedRateLimiter {
  /**
   * Create multi-tier rate limiting middleware
   * 
   * Features:
   * - Redis-based distributed rate limiting
   * - Sliding window algorithm for accuracy
   * - Different limits for authenticated vs anonymous users
   * - Graceful degradation during Redis failures
   * - Rate limit headers in responses
   * - Bypass mechanisms for trusted sources
   */
  createRateLimitMiddleware(config) {
    return async (req, res, next) => {
      try {
        const clientId = this.getClientIdentifier(req);
        const endpoint = this.normalizeEndpoint(req.path, req.method);
        
        // 1. Check bypass conditions
        if (await this.shouldBypassRateLimit(req, clientId)) {
          return next();
        }
        
        // 2. Apply multiple rate limit checks
        const rateLimitChecks = [
          this.checkGlobalRateLimit(clientId, config.global),
          this.checkUserRateLimit(req.user?.id, config.user),
          this.checkEndpointRateLimit(clientId, endpoint, config.endpoints[endpoint]),
          this.checkBurstRateLimit(clientId, config.burst)
        ];
        
        const results = await Promise.all(rateLimitChecks.filter(Boolean));
        
        // 3. Find most restrictive limit that's been exceeded
        const exceededLimit = results.find(result => !result.allowed);
        
        if (exceededLimit) {
          // Set rate limit headers
          this.setRateLimitHeaders(res, exceededLimit);
          
          // Log rate limit violation
          await this.logRateLimitViolation(clientId, endpoint, exceededLimit);
          
          // Return rate limit error
          return res.status(429).json({
            error: 'Rate limit exceeded',
            type: exceededLimit.type,
            limit: exceededLimit.limit,
            remaining: exceededLimit.remaining,
            resetTime: exceededLimit.resetTime,
            retryAfter: Math.ceil(exceededLimit.resetTime - Date.now()) / 1000
          });
        }
        
        // 4. Set success rate limit headers
        const mostRestrictive = results.reduce((min, current) => 
          current.remaining < min.remaining ? current : min
        );
        this.setRateLimitHeaders(res, mostRestrictive);
        
        next();
        
      } catch (error) {
        console.error('Rate limiting error:', error);
        
        // Fail open - allow request but log error
        await this.logRateLimitError(error, req);
        next();
      }
    };
  }
  
  /**
   * Sliding window rate limiter implementation
   * 
   * More accurate than fixed window, prevents burst at window boundaries
   */
  async checkSlidingWindowRateLimit(key, limit, windowMs) {
    const now = Date.now();
    const windowStart = now - windowMs;
    
    // Use Redis sorted set to track requests with timestamps
    const pipeline = this.redis.pipeline();
    
    // Remove expired entries
    pipeline.zremrangebyscore(key, 0, windowStart);
    
    // Count current requests in window
    pipeline.zcard(key);
    
    // Add current request
    pipeline.zadd(key, now, `${now}-${Math.random()}`);
    
    // Set expiry for cleanup
    pipeline.expire(key, Math.ceil(windowMs / 1000) + 1);
    
    const results = await pipeline.exec();
    const currentCount = results[1][1];
    
    const allowed = currentCount < limit;
    const remaining = Math.max(0, limit - currentCount - 1);
    
    // Calculate reset time (when oldest request in window expires)
    let resetTime = now + windowMs;
    if (currentCount > 0) {
      const oldestEntries = await this.redis.zrange(key, 0, 0, 'WITHSCORES');
      if (oldestEntries.length > 0) {
        resetTime = parseInt(oldestEntries[1]) + windowMs;
      }
    }
    
    return {
      allowed,
      limit,
      remaining,
      resetTime,
      currentCount: currentCount + 1
    };
  }
  
  /**
   * Adaptive rate limiting based on system metrics
   * 
   * Adjusts rate limits based on:
   * - CPU usage
   * - Memory usage  
   * - Database connection pool status
   * - Response time percentiles
   * - Error rates
   */
  async getAdaptiveRateLimit(baseLimit, endpoint) {
    try {
      // Get current system metrics
      const metrics = await this.getSystemMetrics();
      
      let adaptedLimit = baseLimit;
      
      // Reduce limits under high CPU load
      if (metrics.cpuUsage > 80) {
        adaptedLimit *= 0.5;
      } else if (metrics.cpuUsage > 60) {
        adaptedLimit *= 0.7;
      }
      
      // Reduce limits under memory pressure
      if (metrics.memoryUsage > 85) {
        adaptedLimit *= 0.4;
      } else if (metrics.memoryUsage > 70) {
        adaptedLimit *= 0.6;
      }
      
      // Reduce limits if database is under stress
      if (metrics.dbConnectionsUsed / metrics.dbConnectionsTotal > 0.9) {
        adaptedLimit *= 0.3;
      }
      
      // Reduce limits if response times are high
      const endpointMetrics = await this.getEndpointMetrics(endpoint);
      if (endpointMetrics.p95ResponseTime > 2000) { // 2 seconds
        adaptedLimit *= 0.5;
      }
      
      // Reduce limits if error rate is high
      if (endpointMetrics.errorRate > 0.05) { // 5% error rate
        adaptedLimit *= 0.6;
      }
      
      // Ensure minimum limit
      adaptedLimit = Math.max(1, Math.floor(adaptedLimit));
      
      // Cache adapted limit for 30 seconds
      await this.redis.setex(
        `adaptive_limit:${endpoint}`, 
        30, 
        adaptedLimit
      );
      
      return adaptedLimit;
      
    } catch (error) {
      console.error('Adaptive rate limiting error:', error);
      return baseLimit; // Fallback to base limit
    }
  }
  
  /**
   * Circuit breaker integration with rate limiting
   * 
   * Opens circuit breaker when error rate exceeds threshold,
   * which triggers more aggressive rate limiting
   */
  async checkCircuitBreakerStatus(endpoint) {
    const circuitState = await this.redis.hgetall(`circuit:${endpoint}`);
    
    if (!circuitState.state) {
      return { state: 'CLOSED', errorRate: 0 };
    }
    
    const now = Date.now();
    const windowStart = now - 60000; // 1-minute window
    
    // Get recent request metrics
    const [totalRequests, errorRequests] = await Promise.all([
      this.redis.zcount(`requests:${endpoint}`, windowStart, now),
      this.redis.zcount(`errors:${endpoint}`, windowStart, now)
    ]);
    
    const errorRate = totalRequests > 0 ? errorRequests / totalRequests : 0;
    
    // State transitions
    if (circuitState.state === 'CLOSED' && errorRate > 0.1) { // 10% error rate
      await this.openCircuitBreaker(endpoint);
      return { state: 'OPEN', errorRate };
    }
    
    if (circuitState.state === 'OPEN' && (now - parseInt(circuitState.openTime)) > 60000) {
      await this.halfOpenCircuitBreaker(endpoint);
      return { state: 'HALF_OPEN', errorRate };
    }
    
    if (circuitState.state === 'HALF_OPEN' && errorRate < 0.05) { // 5% error rate
      await this.closeCircuitBreaker(endpoint);
      return { state: 'CLOSED', errorRate };
    }
    
    return { state: circuitState.state, errorRate };
  }
}
```

## 📊 Security Monitoring and Logging

### 1. Comprehensive Security Event Logging

```javascript
/**
 * Security event logging and monitoring system
 * 
 * Features:
 * - Structured logging with correlation IDs
 * - Real-time security event detection
 * - Automated incident response triggers
 * - Compliance logging (GDPR, SOX, PCI DSS)
 * - Performance monitoring integration
 * - Threat intelligence correlation
 */
class SecurityMonitoringService {
  /**
   * Security event logging middleware
   * 
   * Captures:
   * - Authentication events (success/failure)
   * - Authorization decisions
   * - Input validation violations
   * - Rate limiting violations
   * - Suspicious activity patterns
   * - Error conditions and exceptions
   */
  createSecurityLoggingMiddleware() {
    return async (req, res, next) => {
      const requestId = req.headers['x-request-id'] || uuidv4();
      const startTime = Date.now();
      
      // Enhance request with security context
      req.securityContext = {
        requestId,
        timestamp: new Date().toISOString(),
        clientIP: req.ip,
        userAgent: req.headers['user-agent'],
        forwardedFor: req.headers['x-forwarded-for'],
        userId: req.user?.id,
        sessionId: req.user?.sessionId,
        endpoint: `${req.method} ${req.path}`,
        correlation: {
          traceId: req.headers['x-trace-id'],
          spanId: req.headers['x-span-id']
        }
      };
      
      // Log incoming request
      await this.logSecurityEvent('REQUEST_RECEIVED', {
        ...req.securityContext,
        queryParams: this.sanitizeLogData(req.query),
        headers: this.sanitizeHeaders(req.headers)
      });
      
      // Capture response
      const originalSend = res.send;
      res.send = function(data) {
        const responseTime = Date.now() - startTime;
        
        // Log response
        securityMonitor.logSecurityEvent('RESPONSE_SENT', {
          ...req.securityContext,
          statusCode: res.statusCode,
          responseTime,
          contentLength: Buffer.byteLength(data || ''),
          success: res.statusCode < 400
        });
        
        // Check for security-relevant response codes
        if (res.statusCode === 401) {
          securityMonitor.logSecurityEvent('AUTHENTICATION_FAILED', req.securityContext);
        } else if (res.statusCode === 403) {
          securityMonitor.logSecurityEvent('AUTHORIZATION_DENIED', req.securityContext);
        } else if (res.statusCode >= 500) {
          securityMonitor.logSecurityEvent('SERVER_ERROR', {
            ...req.securityContext,
            error: data ? JSON.parse(data).error : 'Unknown error'
          });
        }
        
        return originalSend.call(this, data);
      };
      
      next();
    };
  }
  
  /**
   * Real-time threat detection engine
   * 
   * Analyzes patterns to detect:
   * - Brute force attacks
   * - Credential stuffing
   * - Account enumeration
   * - SQL injection attempts
   * - XSS attempts
   * - Suspicious geographic activity
   * - Rapid successive failures
   */
  async analyzeSecurityEvents(event) {
    const analysisPromises = [
      this.detectBruteForceAttack(event),
      this.detectCredentialStuffing(event),
      this.detectInjectionAttempts(event),
      this.detectAnomalousGeography(event),
      this.detectRapidFailures(event),
      this.detectAccountEnumeration(event)
    ];
    
    const detectionResults = await Promise.allSettled(analysisPromises);
    
    // Process detection results
    for (const result of detectionResults) {
      if (result.status === 'fulfilled' && result.value.threat) {
        await this.handleThreatDetection(result.value);
      }
    }
  }
  
  /**
   * Brute force attack detection
   * 
   * Detects patterns of repeated authentication failures
   * from same IP or targeting same account
   */
  async detectBruteForceAttack(event) {
    if (event.eventType !== 'AUTHENTICATION_FAILED') {
      return { threat: false };
    }
    
    const timeWindow = 300000; // 5 minutes
    const now = Date.now();
    
    // Check for IP-based brute force
    const ipFailures = await this.redis.zcount(
      `auth_failures:ip:${event.clientIP}`,
      now - timeWindow,
      now
    );
    
    // Check for account-based brute force
    const accountFailures = event.targetAccount ? await this.redis.zcount(
      `auth_failures:account:${event.targetAccount}`,
      now - timeWindow,
      now
    ) : 0;
    
    const ipThreat = ipFailures >= 10; // 10 failures from same IP
    const accountThreat = accountFailures >= 5; // 5 failures on same account
    
    if (ipThreat || accountThreat) {
      return {
        threat: true,
        type: 'BRUTE_FORCE_ATTACK',
        severity: 'HIGH',
        details: {
          ipFailures,
          accountFailures,
          targetIP: event.clientIP,
          targetAccount: event.targetAccount
        },
        recommendedActions: [
          'BLOCK_IP_ADDRESS',
          'LOCK_TARGET_ACCOUNT',
          'REQUIRE_ADDITIONAL_VERIFICATION'
        ]
      };
    }
    
    return { threat: false };
  }
  
  /**
   * SQL injection attempt detection
   * 
   * Analyzes input patterns for SQL injection signatures
   */
  async detectInjectionAttempts(event) {
    if (!event.inputData) {
      return { threat: false };
    }
    
    const sqlPatterns = [
      /(\b(union|select|insert|update|delete|drop|create|alter|exec|execute)\b)/gi,
      /(;|--|\/\*|\*\/)/g,
      /('|(\\')).*('|(\\'))/g,
      /\b(or|and)\s+\d+\s*=\s*\d+/gi,
      /\b(or|and)\s+['"]\w+['"]?\s*=\s*['"]\w+['"]?/gi
    ];
    
    const xssPatterns = [
      /<script[^>]*>.*?<\/script>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /<iframe[^>]*>.*?<\/iframe>/gi,
      /eval\s*\(/gi,
      /document\.(cookie|write|domain)/gi
    ];
    
    const inputString = JSON.stringify(event.inputData);
    
    const sqlMatches = sqlPatterns.filter(pattern => pattern.test(inputString));
    const xssMatches = xssPatterns.filter(pattern => pattern.test(inputString));
    
    if (sqlMatches.length > 0 || xssMatches.length > 0) {
      return {
        threat: true,
        type: sqlMatches.length > 0 ? 'SQL_INJECTION_ATTEMPT' : 'XSS_ATTEMPT',
        severity: 'HIGH',
        details: {
          inputData: inputString.substring(0, 500), // Truncate for logging
          sqlMatches: sqlMatches.length,
          xssMatches: xssMatches.length,
          endpoint: event.endpoint
        },
        recommendedActions: [
          'BLOCK_REQUEST',
          'RATE_LIMIT_CLIENT',
          'ALERT_SECURITY_TEAM'
        ]
      };
    }
    
    return { threat: false };
  }
  
  /**
   * Automated incident response
   * 
   * Takes immediate action based on threat severity
   */
  async handleThreatDetection(threat) {
    // Log threat detection
    await this.logSecurityEvent('THREAT_DETECTED', {
      threat: threat.type,
      severity: threat.severity,
      details: threat.details,
      timestamp: new Date().toISOString()
    });
    
    // Execute recommended actions
    for (const action of threat.recommendedActions) {
      try {
        await this.executeSecurityAction(action, threat);
      } catch (error) {
        console.error(`Failed to execute security action ${action}:`, error);
      }
    }
    
    // Send alerts based on severity
    if (threat.severity === 'CRITICAL') {
      await this.sendCriticalSecurityAlert(threat);
    } else if (threat.severity === 'HIGH') {
      await this.sendHighPriorityAlert(threat);
    }
    
    // Update threat intelligence
    await this.updateThreatIntelligence(threat);
  }
  
  /**
   * Security metrics dashboard data
   * 
   * Provides real-time security monitoring metrics
   */
  async getSecurityMetrics(timeRange = '1h') {
    const timeMs = this.parseTimeRange(timeRange);
    const now = Date.now();
    const startTime = now - timeMs;
    
    const [
      authFailures,
      authSuccesses,
      rateLimitViolations,
      threatDetections,
      blockedIPs,
      errorRates
    ] = await Promise.all([
      this.redis.zcount('security_events:auth_failed', startTime, now),
      this.redis.zcount('security_events:auth_success', startTime, now),
      this.redis.zcount('security_events:rate_limit', startTime, now),
      this.redis.zcount('security_events:threat_detected', startTime, now),
      this.redis.scard('blocked_ips'),
      this.getErrorRateMetrics(startTime, now)
    ]);
    
    const totalAuthAttempts = authFailures + authSuccesses;
    const authFailureRate = totalAuthAttempts > 0 ? authFailures / totalAuthAttempts : 0;
    
    return {
      authentication: {
        totalAttempts: totalAuthAttempts,
        successfulLogins: authSuccesses,
        failedLogins: authFailures,
        failureRate: Math.round(authFailureRate * 100) / 100
      },
      security: {
        rateLimitViolations,
        threatDetections,
        blockedIPs,
        riskScore: this.calculateOverallRiskScore({
          authFailureRate,
          threatDetections,
          rateLimitViolations
        })
      },
      performance: {
        errorRates,
        averageResponseTime: await this.getAverageResponseTime(startTime, now),
        uptime: await this.getUptimeMetrics()
      },
      timeRange,
      generatedAt: new Date().toISOString()
    };
  }
}
```

---

**Next Steps:** Implement these security patterns in your own API projects and regularly audit your security posture using automated tools and manual reviews.