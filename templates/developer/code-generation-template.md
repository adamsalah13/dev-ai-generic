# Code Generation Template for AI-Assisted Development

## 🎯 Purpose

This template provides developers with structured prompts and guidelines for generating high-quality code using AI assistance in modern web development projects, specifically optimized for the ShopFlow e-commerce platform.

## 🚀 Quick Start AI Prompts

### Full-Stack Feature Development
```text
Act as an expert full-stack developer specializing in modern web applications. Help me implement [FEATURE_NAME] for ShopFlow e-commerce platform.

**Tech Stack:**
- Frontend: React 18+ with TypeScript, Vite, Tailwind CSS
- Backend: Node.js with Express.js and TypeScript
- Database: MongoDB with Mongoose ODM
- Authentication: JWT tokens with bcrypt
- State Management: React Context API or Zustand
- Testing: Jest, React Testing Library, Supertest

**Requirements:**
Implement [FEATURE_NAME] with:

1. **Backend API Implementation**
   - RESTful endpoints with proper HTTP methods
   - Input validation using Joi or Zod
   - Error handling middleware
   - Database models and relationships
   - Unit tests for all endpoints

2. **Frontend Implementation**
   - React components with TypeScript interfaces
   - Custom hooks for data fetching
   - Form handling with validation
   - Loading states and error handling
   - Responsive design with Tailwind CSS

3. **Integration & Testing**
   - API integration with proper error handling
   - End-to-end functionality
   - Unit tests for components and utilities
   - Type safety throughout the application

Please provide complete, production-ready code with proper error handling, validation, and best practices.
```

## 📁 Project Structure Templates

### React Component Structure
```text
Generate a React component for [COMPONENT_NAME] with the following structure:

**Requirements:**
- TypeScript with proper interfaces
- Functional component with hooks
- Props validation and default values
- Error boundary compatibility
- Accessibility features (ARIA labels, keyboard navigation)
- Responsive design with Tailwind CSS
- Loading and error states
- Unit tests using React Testing Library

**Component Features:**
[LIST SPECIFIC FEATURES]

Please include:
1. Component implementation file
2. TypeScript interface definitions
3. Custom hooks if needed
4. Test file with comprehensive coverage
5. Usage example with props
```

### API Endpoint Template
```text
Create a RESTful API endpoint for [ENDPOINT_PURPOSE] in the ShopFlow backend.

**Specifications:**
- Method: [GET/POST/PUT/DELETE]
- Route: /api/v1/[resource]
- Authentication: JWT required (if applicable)
- Authorization: [Role requirements]

**Requirements:**
1. **Express.js Route Handler**
   - Proper middleware chain
   - Input validation with Joi/Zod
   - Database operations with Mongoose
   - Error handling and logging
   - Response formatting

2. **Data Models**
   - MongoDB schema definition
   - Validation rules
   - Indexes for performance
   - Relationships with other models

3. **Validation & Security**
   - Input sanitization
   - Rate limiting
   - CORS configuration
   - SQL injection prevention

4. **Testing**
   - Unit tests with Jest
   - Integration tests with Supertest
   - Mock data and fixtures
   - Edge case coverage

Provide complete implementation with proper TypeScript types and comprehensive error handling.
```

## 🛠️ Code Generation Patterns

### Database Model Generation
```text
Create a MongoDB model for [MODEL_NAME] in the ShopFlow application.

**Model Requirements:**
- Mongoose schema with TypeScript
- Field validation and constraints
- Custom methods and statics
- Indexes for query optimization
- Pre/post middleware hooks
- Relationship definitions

**Fields to include:**
[LIST FIELDS WITH TYPES AND CONSTRAINTS]

**Additional Requirements:**
- Audit fields (createdAt, updatedAt, createdBy)
- Soft delete capability
- Data validation rules
- Search optimization
- Performance considerations

Please provide:
1. Complete Mongoose schema
2. TypeScript interface
3. Model methods and statics
4. Index definitions
5. Validation rules
6. Usage examples
```

### React Hook Generation
```text
Create a custom React hook for [HOOK_PURPOSE] in the ShopFlow application.

**Hook Requirements:**
- TypeScript with proper return types
- Error handling and loading states
- Memoization for performance
- Proper dependency management
- Cleanup on unmount
- Reusable across components

**Functionality:**
[DESCRIBE SPECIFIC FUNCTIONALITY]

**Dependencies:**
- React hooks (useState, useEffect, useCallback, etc.)
- API client integration
- Error handling
- Type safety

Provide:
1. Complete hook implementation
2. TypeScript interfaces
3. Usage examples
4. Unit tests
5. Documentation comments
```

## 🎨 Frontend Development Templates

### Component Development Workflow
```text
Generate a complete component implementation for [COMPONENT_NAME]:

**Component Specifications:**
- Purpose: [COMPONENT_PURPOSE]
- Props: [LIST_PROPS_WITH_TYPES]
- State: [DESCRIBE_LOCAL_STATE]
- Side Effects: [LIST_SIDE_EFFECTS]

**Design Requirements:**
- Mobile-first responsive design
- Accessibility compliance (WCAG 2.1)
- Dark/light theme support
- Loading and error states
- Form validation (if applicable)
- Performance optimization

**Code Structure:**
1. TypeScript interfaces
2. Component implementation
3. Custom hooks (if needed)
4. Styling with Tailwind CSS
5. Unit tests
6. Storybook stories (optional)

Follow React best practices and include proper error boundaries and key optimization.
```

### Form Handling Template
```text
Create a form component for [FORM_PURPOSE] with the following requirements:

**Form Specifications:**
- Fields: [LIST_FORM_FIELDS]
- Validation: Client-side and server-side
- Submission: API integration
- Error handling: Field-level and form-level
- Accessibility: Proper labels and error announcements

**Implementation Requirements:**
1. **Form Component**
   - React Hook Form or Formik integration
   - TypeScript interfaces for form data
   - Real-time validation
   - Loading states during submission
   - Success/error feedback

2. **Validation Schema**
   - Yup or Zod validation schema
   - Custom validation rules
   - Async validation (if needed)
   - Error message handling

3. **API Integration**
   - Form submission handling
   - Error response parsing
   - Optimistic updates
   - Retry logic

Provide complete implementation with proper TypeScript types and comprehensive validation.
```

## 🔧 Backend Development Templates

### Service Layer Pattern
```text
Create a service layer for [SERVICE_PURPOSE] in the ShopFlow backend:

**Service Requirements:**
- Business logic implementation
- Database abstraction
- Error handling and logging
- Input validation
- Caching strategy (if applicable)
- Transaction management

**Service Structure:**
1. **Service Class/Module**
   - CRUD operations
   - Business rules implementation
   - Data transformation
   - External API integration

2. **Data Access Layer**
   - Repository pattern
   - Query optimization
   - Connection management
   - Error handling

3. **Validation & Security**
   - Input sanitization
   - Business rule validation
   - Authorization checks
   - Audit logging

Provide complete service implementation with proper error handling and TypeScript types.
```

### Middleware Development
```text
Create Express.js middleware for [MIDDLEWARE_PURPOSE]:

**Middleware Requirements:**
- Purpose: [SPECIFIC_FUNCTIONALITY]
- Request/Response modification
- Error handling and propagation
- Logging and monitoring
- Performance considerations

**Implementation Specs:**
1. **Middleware Function**
   - Proper Express middleware signature
   - TypeScript types for req/res/next
   - Error handling chain
   - Performance optimization

2. **Configuration Options**
   - Configurable parameters
   - Environment-specific settings
   - Default values
   - Validation

3. **Testing & Documentation**
   - Unit tests with mocking
   - Integration tests
   - JSDoc documentation
   - Usage examples

Provide complete middleware implementation with proper TypeScript types and comprehensive testing.
```

## 🧪 Testing Templates

### Component Testing Template
```text
Create comprehensive tests for the [COMPONENT_NAME] React component:

**Testing Requirements:**
- React Testing Library
- Jest assertions
- Mock external dependencies
- Accessibility testing
- User interaction testing

**Test Coverage:**
1. **Rendering Tests**
   - Component renders correctly
   - Props are handled properly
   - Conditional rendering works
   - Default props function

2. **Interaction Tests**
   - User input handling
   - Click events and callbacks
   - Form submissions
   - State changes

3. **Edge Cases**
   - Error scenarios
   - Loading states
   - Empty data handling
   - Network failures

Provide complete test suite with proper mocking and assertion patterns.
```

### API Testing Template
```text
Create integration tests for [API_ENDPOINT]:

**Testing Requirements:**
- Supertest for HTTP testing
- Test database setup/teardown
- Mock external services
- Authentication testing
- Input validation testing

**Test Categories:**
1. **Happy Path Tests**
   - Successful requests
   - Proper response format
   - Status codes
   - Data persistence

2. **Error Handling Tests**
   - Invalid input
   - Unauthorized access
   - Server errors
   - Database failures

3. **Edge Cases**
   - Boundary conditions
   - Race conditions
   - Large datasets
   - Performance limits

Provide complete test suite with proper setup, teardown, and assertion patterns.
```

## 🚀 Performance Optimization

### Optimization Prompts
```text
Analyze and optimize the following code for performance:

[INSERT CODE]

**Optimization Focus:**
1. **Runtime Performance**
   - Algorithm complexity
   - Memory usage
   - Rendering optimization
   - Bundle size reduction

2. **Database Performance**
   - Query optimization
   - Index usage
   - Connection pooling
   - Caching strategies

3. **Frontend Performance**
   - Code splitting
   - Lazy loading
   - Image optimization
   - Critical CSS

Provide specific recommendations with before/after code examples and performance metrics.
```

## 📋 Code Review Checklist

### Development Standards
- [ ] TypeScript types are properly defined
- [ ] Error handling is comprehensive
- [ ] Input validation is implemented
- [ ] Security best practices followed
- [ ] Performance considerations addressed
- [ ] Accessibility requirements met
- [ ] Tests provide adequate coverage
- [ ] Documentation is complete
- [ ] Code follows project conventions
- [ ] No hardcoded values or secrets

### AI-Generated Code Review
```text
Review this code for quality, security, and best practices:

[INSERT CODE]

**Review Criteria:**
- Code quality and maintainability
- Security vulnerabilities
- Performance implications
- TypeScript usage
- Error handling
- Testing coverage
- Documentation completeness
- Accessibility compliance

Provide specific feedback with actionable recommendations and code examples.
```

---

**Template Version:** 1.0  
**Last Updated:** September 30, 2025  
**Compatible with:** React, Node.js, TypeScript, MongoDB stack