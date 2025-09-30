# Test Case Generation Template for AI-Assisted QA

## 🎯 Purpose

This template helps QA Engineers generate comprehensive test cases using AI assistance for the ShopFlow e-commerce platform and similar web applications.

## 📝 Test Case Structure

### Basic Test Case Template
```text
**Test Case ID:** TC_[MODULE]_[NUMBER]
**Test Case Title:** [Descriptive title]
**Priority:** [High/Medium/Low]
**Complexity:** [Simple/Medium/Complex]
**Test Type:** [Functional/Performance/Security/Usability]
**Module:** [Application module/feature]
**Prerequisites:** [Required setup or conditions]
**Test Data:** [Required test data]
**Expected Result:** [Expected outcome]
**Status:** [Pass/Fail/Blocked/Not Executed]
```

## 🤖 AI Prompt for Test Case Generation

### Comprehensive Test Case Generation
```text
Act as an expert QA Engineer specializing in e-commerce testing. Generate comprehensive test cases for [FEATURE_NAME] in the ShopFlow e-commerce platform.

**Application Context:**
- Platform: Modern e-commerce web application
- Technology: React frontend, Node.js backend, MongoDB database
- Users: Customers, Admins, Guest users
- Features: Product catalog, shopping cart, user accounts, order management

**Test Case Requirements:**
Generate test cases for [FEATURE_NAME] including:

1. **Functional Test Cases**
   - Happy path scenarios
   - Alternative flows
   - Edge cases and boundary conditions
   - Error handling scenarios
   - Input validation testing

2. **UI/UX Test Cases**
   - User interface elements
   - Navigation and workflow
   - Responsive design testing
   - Accessibility compliance
   - Cross-browser compatibility

3. **Integration Test Cases**
   - API integration testing
   - Database interaction testing
   - Third-party service integration
   - End-to-end workflow testing
   - Data flow validation

4. **Security Test Cases**
   - Authentication and authorization
   - Input sanitization
   - SQL injection prevention
   - XSS attack prevention
   - Data protection validation

5. **Performance Test Cases**
   - Load time validation
   - Concurrent user handling
   - Large dataset processing
   - Memory usage optimization
   - Database query performance

Please provide detailed test cases with step-by-step instructions, expected results, and test data requirements.
```

## 🏷️ Test Case Categories

### E-Commerce Feature Testing

#### User Authentication Test Cases
```text
Generate test cases for user authentication system including:

**Test Scenarios:**
- User registration (email/password, social login)
- User login (valid/invalid credentials)
- Password reset functionality
- Account verification process
- Session management
- Multi-factor authentication
- Account lockout scenarios

**Security Considerations:**
- Password strength validation
- Brute force attack prevention
- Session timeout handling
- Cross-site request forgery protection
- Secure cookie implementation

**Test Data Requirements:**
- Valid/invalid email formats
- Strong/weak passwords
- Existing/non-existing user accounts
- Expired/active verification tokens
```

#### Product Catalog Test Cases
```text
Create test cases for product catalog functionality:

**Core Features:**
- Product listing and display
- Product search and filtering
- Product details and specifications
- Product images and media
- Product categories and navigation
- Inventory status display
- Price display and calculations

**Advanced Features:**
- Product recommendations
- Recently viewed products
- Product comparison
- Wishlist functionality
- Product reviews and ratings
- Stock availability updates

**Test Scenarios:**
- Search with various keywords
- Filter combinations
- Sorting options
- Pagination functionality
- Product availability changes
- Price updates and promotions
```

#### Shopping Cart Test Cases
```text
Generate comprehensive test cases for shopping cart:

**Cart Operations:**
- Add products to cart
- Update product quantities
- Remove products from cart
- Save cart for later
- Cart persistence across sessions
- Guest cart functionality

**Cart Validation:**
- Maximum quantity limits
- Stock availability validation
- Price calculations accuracy
- Tax and shipping calculations
- Discount code applications
- Cart total validations

**Edge Cases:**
- Empty cart handling
- Invalid product removal
- Concurrent cart modifications
- Cart expiration scenarios
- Out-of-stock item handling
```

## 📊 Test Case Formats

### Gherkin/BDD Format
```text
Generate test cases in Gherkin format for [FEATURE_NAME]:

**Feature:** [Feature description]

**Background:**
Given [common setup conditions]
And [additional context]

**Scenario:** [Scenario description]
Given [initial context]
When [action taken]
Then [expected result]
And [additional validations]

**Scenario Outline:** [Parameterized scenario]
Given [context with parameters]
When [action with <parameter>]
Then [result with <parameter>]

Examples:
| parameter | expected_result |
| value1    | result1        |
| value2    | result2        |

Please include multiple scenarios covering happy path, alternative flows, and error conditions.
```

### Detailed Step-by-Step Format
```text
Create detailed test cases for [FEATURE_NAME] with step-by-step instructions:

**Test Case Structure:**
1. **Test Case Information**
   - ID, Title, Priority, Type
   - Module and sub-module
   - Prerequisites and dependencies

2. **Test Steps**
   - Step-by-step instructions
   - Expected results for each step
   - Test data requirements
   - Screenshots or mockups (if needed)

3. **Validation Points**
   - UI element validations
   - Data accuracy checks
   - Performance expectations
   - Error message verifications

4. **Post-conditions**
   - System state after test
   - Data cleanup requirements
   - Environment reset needs

Include comprehensive coverage of normal flows, alternative paths, and error scenarios.
```

## 🧪 Specialized Testing Templates

### API Testing Template
```text
Generate API test cases for [API_ENDPOINT]:

**API Testing Requirements:**
- Endpoint: [HTTP method and URL]
- Authentication: [Required auth type]
- Request format: [JSON/XML/Form data]
- Response format: [Expected response type]

**Test Categories:**
1. **Request Validation**
   - Valid request parameters
   - Invalid parameter values
   - Missing required parameters
   - Parameter boundary testing
   - Data type validation

2. **Response Validation**
   - Status code verification
   - Response body structure
   - Data accuracy validation
   - Response time limits
   - Error message format

3. **Security Testing**
   - Authentication requirements
   - Authorization levels
   - Input sanitization
   - Rate limiting validation
   - HTTPS enforcement

4. **Performance Testing**
   - Response time benchmarks
   - Concurrent request handling
   - Large payload processing
   - Database query optimization
   - Memory usage validation

Provide test cases with sample requests, expected responses, and validation criteria.
```

### Mobile Testing Template
```text
Create mobile-specific test cases for ShopFlow mobile interface:

**Mobile Testing Focus:**
- Responsive design validation
- Touch interface functionality
- Mobile-specific features
- Device compatibility
- Performance on mobile devices

**Test Categories:**
1. **Responsive Design**
   - Layout adaptation to screen sizes
   - Element positioning and sizing
   - Font readability and scaling
   - Image optimization and loading
   - Navigation menu functionality

2. **Touch Interface**
   - Tap, swipe, and pinch gestures
   - Touch target size validation
   - Scroll behavior and momentum
   - Multi-touch functionality
   - Haptic feedback (if applicable)

3. **Mobile Performance**
   - Page load times on mobile networks
   - Battery usage optimization
   - Memory consumption
   - Offline functionality
   - Background app behavior

4. **Device-Specific Features**
   - Camera integration for product photos
   - GPS for location-based features
   - Push notification handling
   - Biometric authentication
   - Device orientation changes

Generate test cases covering various mobile devices, operating systems, and network conditions.
```

### Security Testing Template
```text
Generate security test cases for ShopFlow application:

**Security Testing Areas:**
- Authentication and authorization
- Input validation and sanitization
- Session management
- Data protection
- Communication security

**Test Categories:**
1. **Authentication Security**
   - Password complexity enforcement
   - Account lockout mechanisms
   - Session timeout validation
   - Multi-factor authentication
   - Password reset security

2. **Authorization Testing**
   - Role-based access control
   - Privilege escalation prevention
   - Resource-level permissions
   - API endpoint authorization
   - Administrative function protection

3. **Input Validation**
   - SQL injection prevention
   - Cross-site scripting (XSS) protection
   - Command injection testing
   - File upload security
   - Input length and format validation

4. **Data Protection**
   - Sensitive data encryption
   - Personal information handling
   - Payment data security (PCI compliance)
   - Data transmission security
   - Data storage protection

5. **Session Management**
   - Session token security
   - Session hijacking prevention
   - Concurrent session handling
   - Session invalidation
   - Cross-site request forgery protection

Provide test cases with specific attack scenarios and validation criteria.
```

## 📈 Performance Testing Templates

### Load Testing Template
```text
Create performance test cases for [APPLICATION_FEATURE]:

**Performance Requirements:**
- Response time: < [X] seconds for [Y]% of requests
- Throughput: [X] requests per second
- Concurrent users: [X] simultaneous users
- System availability: [X]% uptime

**Test Scenarios:**
1. **Normal Load Testing**
   - Expected user load simulation
   - Regular usage patterns
   - Baseline performance measurement
   - Resource utilization monitoring

2. **Stress Testing**
   - Maximum capacity identification
   - Breaking point determination
   - System recovery validation
   - Error handling under stress

3. **Spike Testing**
   - Sudden load increases
   - Traffic spike handling
   - Auto-scaling behavior
   - Performance degradation patterns

4. **Endurance Testing**
   - Long-duration testing
   - Memory leak detection
   - Performance consistency
   - Resource cleanup validation

Include test data requirements, monitoring criteria, and success metrics.
```

## 🎯 Test Planning Templates

### Test Strategy Template
```text
Create a comprehensive test strategy for [PROJECT/FEATURE]:

**Test Strategy Components:**
1. **Scope and Objectives**
   - Features in scope
   - Features out of scope
   - Quality objectives
   - Success criteria

2. **Test Approach**
   - Testing methodology
   - Test levels (unit, integration, system, acceptance)
   - Test types (functional, performance, security, usability)
   - Test techniques and methods

3. **Test Environment**
   - Environment requirements
   - Test data management
   - Configuration management
   - Environment maintenance

4. **Resource Planning**
   - Team structure and roles
   - Skill requirements
   - Tool and technology needs
   - Timeline and milestones

5. **Risk Management**
   - Identified risks and mitigation
   - Contingency planning
   - Quality gates and checkpoints
   - Escalation procedures

Provide a complete test strategy document with actionable plans and clear deliverables.
```

## 📋 Test Execution Checklists

### Pre-Testing Checklist
- [ ] Test environment setup completed
- [ ] Test data prepared and validated
- [ ] Test cases reviewed and approved
- [ ] Testing tools configured
- [ ] Team roles and responsibilities assigned
- [ ] Baseline performance metrics established
- [ ] Defect tracking system ready
- [ ] Communication channels established

### Test Execution Checklist
- [ ] Test cases executed according to schedule
- [ ] Test results documented thoroughly
- [ ] Defects logged with proper details
- [ ] Test coverage metrics tracked
- [ ] Regression testing completed
- [ ] Performance benchmarks validated
- [ ] Security tests passed
- [ ] User acceptance criteria met

### Post-Testing Checklist
- [ ] Test summary report prepared
- [ ] Defect analysis completed
- [ ] Lessons learned documented
- [ ] Test artifacts archived
- [ ] Environment cleanup performed
- [ ] Test metrics analyzed
- [ ] Recommendations provided
- [ ] Sign-off obtained from stakeholders

---

**Template Version:** 1.0  
**Last Updated:** September 30, 2025  
**Compatible with:** Web applications, mobile apps, API testing, e-commerce platforms