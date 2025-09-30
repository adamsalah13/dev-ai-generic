# User Story Template for AI-Assisted Development

## 🎯 Purpose
This template helps Business Analysts create comprehensive user stories using AI assistance for the ShopFlow e-commerce platform.

## 📝 User Story Structure

### Basic Template
```
As a [type of user]
I want [some goal]
So that [some reason/benefit]
```

### Enhanced Template with AI Prompts

#### AI Prompt for User Story Generation
```
Act as an expert Business Analyst specializing in e-commerce platforms. Help me create detailed user stories for ShopFlow, a comprehensive online shopping platform.

**Context:**
- Platform: Modern e-commerce web application
- Technology: React frontend, Node.js backend, MongoDB database
- Users: Customers, Admins, Guest users
- Key features: Product catalog, shopping cart, user accounts, order management

**Requirements:**
Create user stories for [FEATURE/FUNCTIONALITY] that include:

1. **Primary User Story**
   - Clear user type identification
   - Specific goal or need
   - Business value or benefit

2. **Acceptance Criteria** (Given/When/Then format)
   - Happy path scenarios
   - Edge cases and error handling
   - Performance requirements
   - Security considerations

3. **Definition of Done**
   - Technical implementation requirements
   - Testing criteria
   - Documentation requirements
   - Accessibility compliance

4. **Dependencies and Assumptions**
   - Technical dependencies
   - Business assumptions
   - External service requirements

Please provide comprehensive user stories with all acceptance criteria and edge cases.
```

## 🏷️ User Story Categories

### Customer Journey Stories
- Account Creation & Authentication
- Product Discovery & Search
- Shopping Cart Management
- Checkout & Payment
- Order Tracking
- Returns & Refunds

### Admin Management Stories
- Product Catalog Management
- Order Processing
- Customer Management
- Analytics & Reporting
- System Configuration

### Technical Stories
- Performance Optimization
- Security Implementation
- Integration Requirements
- Monitoring & Alerting

## 📊 Acceptance Criteria Format

### Template Structure
```
**Given** [initial context or state]
**When** [action taken by user]
**Then** [expected outcome or system response]
**And** [additional expected outcomes]
```

### Example Acceptance Criteria

#### User Story: Product Search
**As a** customer  
**I want** to search for products using keywords  
**So that** I can quickly find items I'm interested in purchasing

**Acceptance Criteria:**

1. **Basic Search Functionality**
   - **Given** I am on the ShopFlow homepage
   - **When** I enter "wireless headphones" in the search bar
   - **Then** I should see a list of relevant products
   - **And** results should be displayed within 2 seconds

2. **Search Filters**
   - **Given** I have performed a search
   - **When** I apply price range filters
   - **Then** results should update to show only products within my selected range
   - **And** the number of filtered results should be displayed

3. **No Results Handling**
   - **Given** I search for a non-existent product
   - **When** no matches are found
   - **Then** I should see a "No results found" message
   - **And** suggestions for alternative searches should be provided

## 🎯 Definition of Done Checklist

- [ ] User story follows the standard format
- [ ] Acceptance criteria are complete and measurable
- [ ] Edge cases and error scenarios are covered
- [ ] Performance requirements are specified
- [ ] Security considerations are addressed
- [ ] Dependencies are identified
- [ ] Story is estimated and prioritized
- [ ] Mockups or wireframes are attached (if needed)
- [ ] Technical feasibility is confirmed
- [ ] Stakeholder approval is obtained

## 📈 Story Prioritization Matrix

| Priority | Business Value | Technical Complexity | Dependencies |
|----------|----------------|---------------------|---------------|
| High     | Critical functionality | Low-Medium | Few/None |
| Medium   | Important features | Medium | Some |
| Low      | Nice-to-have | High | Many |

## 🔄 Story Refinement Process

1. **Initial Draft** - Create basic user story
2. **AI Enhancement** - Use AI prompts to expand details
3. **Stakeholder Review** - Get feedback from team
4. **Technical Validation** - Confirm feasibility with developers
5. **Final Approval** - Ready for sprint planning

## 📝 AI Prompt Templates

### For Story Expansion
```
Expand this user story with detailed acceptance criteria:
[INSERT BASIC USER STORY]

Consider:
- Happy path scenarios
- Edge cases and error handling
- Performance requirements
- Security implications
- Accessibility needs
```

### For Edge Case Discovery
```
Analyze this user story and identify potential edge cases:
[INSERT USER STORY]

Focus on:
- Invalid input scenarios
- System limitations
- Network/connectivity issues
- Concurrent user actions
- Data validation requirements
```

---

**Template Version:** 1.0  
**Last Updated:** September 30, 2025  
**Compatible with:** ShopFlow E-Commerce Platform