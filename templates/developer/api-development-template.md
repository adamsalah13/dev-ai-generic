# API Development Template for AI-Assisted Development

## 🎯 Purpose

This template provides developers with structured approaches for building robust APIs using AI assistance, specifically designed for modern web applications like the ShopFlow e-commerce platform.

## 🚀 RESTful API Design Prompts

### Complete API Endpoint Generation
```text
Act as an expert API developer. Create a complete RESTful API endpoint for [RESOURCE_NAME] in the ShopFlow e-commerce application.

**Technical Specifications:**
- Framework: Express.js with TypeScript
- Database: MongoDB with Mongoose ODM
- Authentication: JWT Bearer tokens
- Validation: Joi or Zod schemas
- Error Handling: Centralized error middleware
- Documentation: OpenAPI/Swagger specs

**Endpoint Requirements:**
- Method: [GET/POST/PUT/DELETE]
- Route: /api/v1/[resource]
- Authentication: [Required/Optional]
- Authorization: [Role-based access control]

**Implementation Deliverables:**
1. **Route Handler**
   - Express route definition
   - Middleware chain setup
   - Request/response handling
   - Error handling and logging

2. **Data Model**
   - Mongoose schema with TypeScript
   - Validation rules and constraints
   - Indexes for performance
   - Relationships with other models

3. **Validation Schema**
   - Input validation with Joi/Zod
   - Request body validation
   - Query parameter validation
   - Response format validation

4. **Security Implementation**
   - Authentication middleware
   - Authorization checks
   - Input sanitization
   - Rate limiting

5. **Testing Suite**
   - Unit tests with Jest
   - Integration tests with Supertest
   - Mock data and fixtures
   - Edge case coverage

Please provide production-ready code with comprehensive error handling and TypeScript types.
```

## 📊 API Architecture Patterns

### Microservices API Template
```text
Design and implement a microservice API for [SERVICE_NAME] in the ShopFlow architecture.

**Service Context:**
- Purpose: [SERVICE_FUNCTIONALITY]
- Dependencies: [OTHER_SERVICES]
- Data Store: MongoDB/Redis/Other
- Communication: REST/GraphQL/gRPC
- Deployment: Docker containers

**Architecture Requirements:**
1. **Service Structure**
   - Clean architecture layers
   - Dependency injection
   - Service interfaces
   - Repository pattern

2. **API Gateway Integration**
   - Route registration
   - Load balancing
   - Circuit breaker pattern
   - Request/response transformation

3. **Inter-Service Communication**
   - HTTP client configuration
   - Message queue integration
   - Error handling and retries
   - Service discovery

4. **Data Management**
   - Database per service
   - Event sourcing (if applicable)
   - CQRS pattern (if applicable)
   - Data synchronization

5. **Monitoring & Observability**
   - Health check endpoints
   - Metrics collection
   - Distributed tracing
   - Structured logging

Provide complete service implementation with deployment configuration.
```

### GraphQL API Template
```text
Create a GraphQL API schema and resolvers for [DOMAIN_AREA] in ShopFlow.

**GraphQL Requirements:**
- Schema-first approach
- Type-safe resolvers with TypeScript
- Query optimization and N+1 prevention
- Authentication and authorization
- Error handling and field-level errors

**Schema Components:**
1. **Type Definitions**
   - Object types with relationships
   - Input types for mutations
   - Custom scalar types
   - Interface and union types

2. **Query Operations**
   - Efficient data fetching
   - Pagination implementation
   - Filtering and sorting
   - Search functionality

3. **Mutation Operations**
   - Data creation and updates
   - Validation and error handling
   - Optimistic updates support
   - Transaction management

4. **Subscription Operations**
   - Real-time data updates
   - Event-driven notifications
   - Connection management
   - Scalability considerations

Provide complete GraphQL implementation with Apollo Server setup.
```

## 🔒 Authentication & Authorization

### JWT Authentication Template
```text
Implement JWT-based authentication system for ShopFlow API:

**Authentication Requirements:**
- User registration and login
- JWT token generation and validation
- Refresh token mechanism
- Password hashing with bcrypt
- Rate limiting for auth endpoints

**Implementation Components:**
1. **Authentication Middleware**
   - JWT token verification
   - User session management
   - Token blacklisting
   - Error handling

2. **Authorization Middleware**
   - Role-based access control
   - Permission checking
   - Resource ownership validation
   - Dynamic authorization rules

3. **Security Features**
   - Password strength validation
   - Account lockout mechanism
   - Two-factor authentication (optional)
   - OAuth integration (optional)

4. **Token Management**
   - Access token configuration
   - Refresh token rotation
   - Token expiration handling
   - Secure cookie implementation

Provide complete authentication system with security best practices.
```

### Role-Based Access Control
```text
Implement RBAC (Role-Based Access Control) for the ShopFlow API:

**RBAC Requirements:**
- User roles: Admin, Manager, Customer, Guest
- Permission-based resource access
- Dynamic role assignment
- Hierarchical permissions

**Implementation Structure:**
1. **Role and Permission Models**
   - Database schema design
   - Role hierarchy definition
   - Permission categorization
   - Relationship management

2. **Authorization Middleware**
   - Role verification logic
   - Permission checking
   - Resource-level authorization
   - Dynamic permission evaluation

3. **Admin Interface**
   - Role management endpoints
   - Permission assignment
   - User role updates
   - Audit logging

Provide complete RBAC implementation with administrative controls.
```

## 📝 API Documentation

### OpenAPI/Swagger Documentation
```text
Generate comprehensive API documentation for [API_ENDPOINTS] using OpenAPI 3.0:

**Documentation Requirements:**
- Complete endpoint specifications
- Request/response schemas
- Authentication requirements
- Error response formats
- Code examples in multiple languages

**Documentation Structure:**
1. **API Overview**
   - Base URL and versioning
   - Authentication methods
   - Rate limiting information
   - Status codes and errors

2. **Endpoint Documentation**
   - Path parameters and query strings
   - Request body schemas
   - Response body schemas
   - Example requests and responses

3. **Schema Definitions**
   - Data model definitions
   - Validation rules
   - Relationship descriptions
   - Enum values and constraints

4. **Interactive Documentation**
   - Swagger UI integration
   - Try-it-out functionality
   - Code generation tools
   - Postman collection export

Provide complete OpenAPI specification with interactive documentation setup.
```

## ⚡ Performance Optimization

### Database Query Optimization
```text
Optimize database queries for the [ENDPOINT_NAME] API endpoint:

**Current Implementation:**
[INSERT CURRENT CODE]

**Optimization Requirements:**
1. **Query Performance**
   - Index optimization
   - Query complexity reduction
   - Aggregation pipeline efficiency
   - Connection pooling

2. **Caching Strategy**
   - Redis caching implementation
   - Cache invalidation logic
   - Cache warming strategies
   - Memory usage optimization

3. **Data Loading Patterns**
   - Lazy loading implementation
   - Eager loading optimization
   - Pagination best practices
   - Batch processing

4. **Monitoring & Metrics**
   - Query performance tracking
   - Slow query identification
   - Memory usage monitoring
   - Cache hit rate analysis

Provide optimized implementation with performance benchmarks.
```

### API Response Optimization
```text
Optimize API response handling for better performance:

**Optimization Areas:**
1. **Response Compression**
   - Gzip compression setup
   - Content encoding optimization
   - Payload size reduction
   - Binary data handling

2. **Response Caching**
   - HTTP caching headers
   - ETags implementation
   - Conditional requests
   - Cache validation

3. **Data Serialization**
   - JSON response optimization
   - Field selection/filtering
   - Data transformation efficiency
   - Streaming responses

4. **Network Optimization**
   - Keep-alive connections
   - HTTP/2 implementation
   - CDN integration
   - Geographic distribution

Provide complete optimization implementation with performance metrics.
```

## 🧪 API Testing Strategies

### Integration Testing Template
```text
Create comprehensive integration tests for [API_ENDPOINTS]:

**Testing Framework:**
- Jest with Supertest
- Test database setup
- Mock external services
- Test data management

**Test Categories:**
1. **Happy Path Tests**
   - Successful request/response cycles
   - Data persistence verification
   - Status code validation
   - Response format checking

2. **Error Handling Tests**
   - Invalid input handling
   - Authentication failures
   - Authorization denials
   - Server error scenarios

3. **Edge Case Tests**
   - Boundary value testing
   - Large payload handling
   - Concurrent request testing
   - Rate limiting validation

4. **Security Tests**
   - SQL injection prevention
   - XSS attack prevention
   - CSRF protection
   - Input sanitization

Provide complete test suite with setup/teardown procedures.
```

### Load Testing Template
```text
Implement load testing for [API_ENDPOINTS] using k6 or similar tools:

**Load Testing Requirements:**
- Concurrent user simulation
- Performance benchmarking
- Bottleneck identification
- Scalability assessment

**Test Scenarios:**
1. **Basic Load Test**
   - Normal user behavior
   - Expected traffic patterns
   - Response time measurements
   - Throughput analysis

2. **Stress Test**
   - Maximum capacity testing
   - Breaking point identification
   - Recovery behavior
   - Error rate monitoring

3. **Spike Test**
   - Sudden traffic increases
   - Auto-scaling behavior
   - Performance degradation
   - System stability

4. **Endurance Test**
   - Long-duration testing
   - Memory leak detection
   - Resource utilization
   - Performance consistency

Provide complete load testing suite with reporting and analysis.
```

## 🔍 API Monitoring & Observability

### Monitoring Implementation
```text
Implement comprehensive monitoring for [API_SERVICE]:

**Monitoring Requirements:**
- Real-time metrics collection
- Error tracking and alerting
- Performance monitoring
- User behavior analytics

**Implementation Components:**
1. **Metrics Collection**
   - Request/response metrics
   - Database query performance
   - Memory and CPU usage
   - Custom business metrics

2. **Logging Strategy**
   - Structured logging format
   - Log aggregation setup
   - Error log categorization
   - Security event logging

3. **Alerting System**
   - Threshold-based alerts
   - Anomaly detection
   - Escalation procedures
   - Alert fatigue prevention

4. **Dashboard Creation**
   - Real-time monitoring views
   - Historical trend analysis
   - Service health overview
   - Business metrics tracking

Provide complete monitoring setup with dashboard configurations.
```

## 📋 API Development Checklist

### Pre-Development Checklist
- [ ] API design review completed
- [ ] Database schema finalized
- [ ] Authentication strategy defined
- [ ] Rate limiting requirements set
- [ ] Error handling strategy planned
- [ ] Testing approach documented
- [ ] Performance requirements defined
- [ ] Security requirements identified

### Development Checklist
- [ ] Route handlers implemented
- [ ] Input validation added
- [ ] Error handling implemented
- [ ] Authentication/authorization integrated
- [ ] Database operations optimized
- [ ] Logging and monitoring added
- [ ] Unit tests written
- [ ] Integration tests implemented

### Pre-Production Checklist
- [ ] Load testing completed
- [ ] Security testing performed
- [ ] Documentation updated
- [ ] Monitoring alerts configured
- [ ] Performance benchmarks met
- [ ] Code review approved
- [ ] Deployment pipeline tested
- [ ] Rollback procedures documented

---

**Template Version:** 1.0  
**Last Updated:** September 30, 2025  
**Compatible with:** Express.js, MongoDB, TypeScript, JWT authentication