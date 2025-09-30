# Performance Testing Template for AI-Assisted QA

## 🎯 Purpose

This template provides QA Engineers with comprehensive guidance for performance testing using AI assistance, specifically designed for modern web applications like the ShopFlow e-commerce platform.

## ⚡ Performance Testing Overview

### Performance Testing Types
- **Load Testing**: Testing with expected user load
- **Stress Testing**: Testing beyond normal capacity
- **Volume Testing**: Testing with large amounts of data
- **Spike Testing**: Testing sudden load increases
- **Endurance Testing**: Testing over extended periods
- **Scalability Testing**: Testing system's ability to scale

## 🤖 AI Prompt for Performance Test Planning

### Comprehensive Performance Test Strategy
```text
Act as an expert Performance Testing Engineer. Create a comprehensive performance testing strategy for [FEATURE/APPLICATION] in the ShopFlow e-commerce platform.

**Application Context:**
- Platform: Modern e-commerce web application
- Architecture: React frontend, Node.js backend, MongoDB database
- Infrastructure: Cloud-based deployment (AWS/Azure/GCP)
- Expected Load: [X] concurrent users, [Y] transactions per second
- Critical User Journeys: Product browsing, cart management, checkout process

**Performance Requirements:**
- Page Load Time: < 3 seconds for 95% of requests
- API Response Time: < 500ms for 90% of API calls
- Concurrent Users: Support [X] simultaneous users
- System Availability: 99.9% uptime SLA
- Database Query Time: < 200ms for 95% of queries

**Performance Test Strategy Requirements:**
Create detailed performance testing approach including:

1. **Performance Test Planning**
   - Test objectives and success criteria
   - Performance baseline establishment
   - Test environment requirements
   - Test data and user simulation needs

2. **Test Scenario Design**
   - Normal load test scenarios
   - Stress and spike test scenarios
   - Endurance test scenarios
   - Scalability test scenarios

3. **Tool Selection and Setup**
   - Load testing tool recommendations
   - Monitoring and profiling tools
   - Test environment configuration
   - CI/CD integration approach

4. **Test Execution and Analysis**
   - Test execution procedures
   - Performance metrics collection
   - Bottleneck identification methods
   - Reporting and recommendations

Please provide detailed test scenarios, tool configurations, and success criteria.
```

## 📊 Performance Test Scenarios

### Load Testing Scenarios
```text
Design load testing scenarios for [APPLICATION_FEATURE]:

**Scenario 1: Normal Business Load**
- **Objective**: Validate system performance under expected load
- **User Load**: [X] concurrent users
- **Duration**: 30 minutes steady state
- **User Behavior**: 
  - Browse products (40% of time)
  - Search and filter (20% of time)
  - Add to cart (15% of time)
  - Checkout process (15% of time)
  - Account management (10% of time)

**Success Criteria:**
- Average response time < 2 seconds
- 95th percentile response time < 5 seconds
- Error rate < 1%
- System resource utilization < 70%

**Scenario 2: Peak Business Load**
- **Objective**: Test system during peak business hours
- **User Load**: [Y] concurrent users (2x normal load)
- **Duration**: 1 hour with ramp-up/ramp-down
- **Peak Periods**: Black Friday, flash sales, marketing campaigns

**Success Criteria:**
- Average response time < 3 seconds
- 95th percentile response time < 7 seconds
- Error rate < 2%
- System remains functional and responsive

**Scenario 3: Gradual Load Increase**
- **Objective**: Identify system capacity limits
- **User Load**: Gradual increase from 10 to [Z] users
- **Duration**: 2 hours with 15-minute steps
- **Monitoring**: Resource utilization, response times, error rates

Provide detailed scenario scripts and monitoring requirements.
```

### Stress Testing Scenarios
```text
Create stress testing scenarios for [APPLICATION_NAME]:

**Scenario 1: Maximum Capacity Testing**
- **Objective**: Determine system breaking point
- **Approach**: Gradually increase load until system fails
- **Load Pattern**: Start at normal load, increase by 25% every 10 minutes
- **Monitoring**: 
  - Response time degradation
  - Error rate increases
  - System resource exhaustion
  - Database connection limits

**Scenario 2: Resource Exhaustion Testing**
- **Objective**: Test system behavior when resources are depleted
- **Focus Areas**:
  - Memory exhaustion scenarios
  - CPU saturation testing
  - Database connection pool exhaustion
  - Network bandwidth limitations

**Scenario 3: Recovery Testing**
- **Objective**: Validate system recovery after stress
- **Process**:
  1. Apply stress load until system degrades
  2. Reduce load to normal levels
  3. Monitor system recovery time
  4. Validate functionality restoration

**Success Criteria:**
- System fails gracefully without data corruption
- Clear error messages presented to users
- System recovers within acceptable timeframe
- No memory leaks or resource leaks detected

Include specific failure scenarios and recovery validation steps.
```

### Endurance Testing Scenarios
```text
Design endurance testing scenarios for [APPLICATION_NAME]:

**Long-Duration Stability Test**
- **Objective**: Validate system stability over extended periods
- **Duration**: 72 hours continuous execution
- **Load Profile**: Constant moderate load (60% of peak capacity)
- **Monitoring Focus**:
  - Memory usage trends and leak detection
  - Performance degradation over time
  - Database growth and cleanup
  - Log file growth and rotation

**Weekend Load Simulation**
- **Objective**: Test system during extended low-usage periods
- **Duration**: 48 hours with minimal load
- **Load Profile**: 5-10% of normal load
- **Validation Points**:
  - System maintenance task execution
  - Scheduled job completion
  - Background process efficiency
  - Resource cleanup effectiveness

**Seasonal Load Pattern Testing**
- **Objective**: Simulate realistic usage patterns over time
- **Duration**: 1 week with varying load patterns
- **Load Variation**: Daily peaks and valleys, weekend patterns
- **Business Scenarios**: 
  - Holiday shopping seasons
  - Back-to-school periods
  - End-of-month processing

**Success Criteria:**
- No performance degradation over test duration
- Memory usage remains stable (no leaks)
- System availability remains above SLA targets
- All scheduled processes complete successfully

Provide detailed monitoring plans and success validation methods.
```

## 🛠️ Performance Testing Tools

### Tool Selection Guide
```text
Recommend performance testing tools for [APPLICATION_TYPE]:

**Load Testing Tools:**
1. **k6** (Recommended for API testing)
   - Pros: Lightweight, developer-friendly, excellent CI/CD integration
   - Cons: Limited browser simulation capabilities
   - Best for: API performance testing, microservices testing

2. **Apache JMeter**
   - Pros: Comprehensive features, protocol support, GUI and CLI
   - Cons: Resource-intensive, Java-based overhead
   - Best for: Complex scenarios, protocol diversity

3. **Artillery**
   - Pros: Simple configuration, good for quick tests
   - Cons: Limited advanced features
   - Best for: Simple load testing, CI/CD integration

4. **Gatling**
   - Pros: High performance, detailed reporting, Scala-based
   - Cons: Steep learning curve, JVM requirements
   - Best for: High-load scenarios, detailed analysis

**Browser-Based Testing:**
1. **Playwright Performance Testing**
   - Real browser automation
   - JavaScript execution measurement
   - Resource loading analysis

2. **Puppeteer Performance Monitoring**
   - Chrome DevTools integration
   - Core Web Vitals measurement
   - Network throttling simulation

**Monitoring and APM Tools:**
1. **Grafana + Prometheus**
   - Real-time metrics visualization
   - Custom dashboard creation
   - Alert configuration

2. **New Relic / DataDog**
   - Application performance monitoring
   - Infrastructure monitoring
   - Business metrics tracking

Provide tool-specific configuration examples and best practices.
```

### k6 Testing Framework Setup
```text
Create k6 performance testing framework for [APPLICATION_NAME]:

**Framework Structure:**
```
performance-tests/
├── scenarios/
│   ├── load-test.js
│   ├── stress-test.js
│   ├── spike-test.js
│   └── endurance-test.js
├── modules/
│   ├── auth.js
│   ├── products.js
│   ├── cart.js
│   └── checkout.js
├── data/
│   ├── users.json
│   ├── products.json
│   └── test-data.csv
├── utils/
│   ├── config.js
│   ├── helpers.js
│   └── validation.js
└── reports/
    └── results/
```

**Sample k6 Test Script:**
```javascript
import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { Rate } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('errors');

// Test configuration
export const options = {
  stages: [
    { duration: '2m', target: 10 }, // Ramp up
    { duration: '5m', target: 100 }, // Stay at 100 users
    { duration: '2m', target: 0 }, // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests under 500ms
    errors: ['rate<0.01'], // Error rate under 1%
  },
};

export default function () {
  // Test scenarios implementation
  group('Browse Products', function () {
    const response = http.get('https://api.shopflow.com/products');
    check(response, {
      'status is 200': (r) => r.status === 200,
      'response time < 200ms': (r) => r.timings.duration < 200,
    });
    errorRate.add(response.status !== 200);
  });

  sleep(1);
}
```

**CI/CD Integration:**
```yaml
# GitHub Actions example
name: Performance Tests
on: [push, pull_request]
jobs:
  performance-test:
    runs-on: ubuntu-latest
    steps:
      - name: Run k6 load test
        run: k6 run --out json=results.json scenarios/load-test.js
      - name: Generate report
        run: k6-reporter results.json --output report.html
```

Provide complete framework setup with multiple test scenarios.
```

## 📈 Performance Metrics and Monitoring

### Key Performance Indicators
```text
Define performance KPIs for [APPLICATION_NAME]:

**Response Time Metrics:**
- Average Response Time: Mean time for request completion
- 90th Percentile Response Time: 90% of requests complete within this time
- 95th Percentile Response Time: 95% of requests complete within this time
- 99th Percentile Response Time: 99% of requests complete within this time
- Maximum Response Time: Slowest request in the test period

**Throughput Metrics:**
- Requests Per Second (RPS): Number of requests handled per second
- Transactions Per Second (TPS): Business transactions completed per second
- Pages Per Second: Web pages served per second
- Concurrent Users: Number of simultaneous active users

**Error and Reliability Metrics:**
- Error Rate: Percentage of failed requests
- Success Rate: Percentage of successful requests
- Availability: System uptime percentage
- Mean Time Between Failures (MTBF)
- Mean Time To Recovery (MTTR)

**Resource Utilization Metrics:**
- CPU Utilization: Processor usage percentage
- Memory Usage: RAM consumption and patterns
- Disk I/O: Read/write operations and latency
- Network Bandwidth: Data transfer rates
- Database Connections: Connection pool usage

**Business Metrics:**
- Cart Abandonment Rate: E-commerce specific metric
- Conversion Rate: Successful purchases vs. visitors
- Revenue Per User: Business value measurement
- Session Duration: User engagement time

**Monitoring Implementation:**
- Real-time dashboard creation
- Alert threshold configuration
- Historical trend analysis
- Automated report generation

Provide specific metric collection methods and alerting strategies.
```

### Performance Monitoring Setup
```text
Implement performance monitoring for [APPLICATION_NAME]:

**Monitoring Architecture:**
1. **Application Performance Monitoring (APM)**
   - Code-level performance insights
   - Database query analysis
   - Error tracking and debugging
   - User experience monitoring

2. **Infrastructure Monitoring**
   - Server resource utilization
   - Network performance metrics
   - Database performance monitoring
   - Container and orchestration metrics

3. **Real User Monitoring (RUM)**
   - Actual user experience measurement
   - Geographic performance variations
   - Device and browser performance
   - Core Web Vitals tracking

4. **Synthetic Monitoring**
   - Proactive performance testing
   - Critical journey monitoring
   - SLA compliance validation
   - Performance regression detection

**Tool Configuration:**
```yaml
# Grafana Dashboard Configuration
dashboard:
  title: "ShopFlow Performance Dashboard"
  panels:
    - title: "Response Time Trends"
      targets:
        - expr: "http_request_duration_seconds"
    - title: "Error Rate"
      targets:
        - expr: "rate(http_requests_total{status!~'2..'}[5m])"
    - title: "Throughput"
      targets:
        - expr: "rate(http_requests_total[5m])"
```

**Alert Configuration:**
- Response time > 5 seconds for 2 minutes
- Error rate > 5% for 3 minutes
- CPU utilization > 80% for 5 minutes
- Memory usage > 90% for 3 minutes
- Disk space < 10% available

Provide complete monitoring setup with dashboard templates.
```

## 🎯 Performance Test Execution

### Test Execution Plan
```text
Create performance test execution plan for [PROJECT_NAME]:

**Pre-Execution Checklist:**
- [ ] Test environment setup and validation
- [ ] Test data preparation and verification
- [ ] Monitoring tools configuration
- [ ] Baseline performance measurement
- [ ] Test script validation and dry run
- [ ] Team notification and coordination
- [ ] Rollback plan preparation

**Execution Schedule:**
1. **Week 1: Baseline and Load Testing**
   - Day 1-2: Environment setup and baseline
   - Day 3-5: Load testing execution
   - Weekend: Analysis and reporting

2. **Week 2: Stress and Spike Testing**
   - Day 1-2: Stress testing scenarios
   - Day 3-4: Spike testing scenarios
   - Day 5: Recovery and stability testing

3. **Week 3: Endurance and Scalability**
   - Day 1-3: Long-duration endurance tests
   - Day 4-5: Scalability testing
   - Weekend: Comprehensive analysis

**Test Execution Procedures:**
1. **Test Preparation**
   - Environment health check
   - Data reset and initialization
   - Monitoring system activation
   - Team communication setup

2. **Test Execution**
   - Gradual load ramp-up
   - Continuous monitoring
   - Real-time issue detection
   - Emergency stop procedures

3. **Post-Test Activities**
   - Data collection and backup
   - Initial analysis and assessment
   - Environment cleanup
   - Stakeholder notification

**Success Criteria Validation:**
- All performance targets met
- No critical issues identified
- System stability confirmed
- Recovery procedures validated

Include detailed execution scripts and monitoring procedures.
```

### Test Results Analysis
```text
Analyze performance test results for [TEST_SCENARIO]:

**Analysis Framework:**
1. **Statistical Analysis**
   - Response time distribution analysis
   - Percentile calculations and trends
   - Correlation analysis between metrics
   - Outlier identification and investigation

2. **Trend Analysis**
   - Performance degradation patterns
   - Resource utilization trends
   - Error rate progression
   - Throughput stability assessment

3. **Bottleneck Identification**
   - System component analysis
   - Database performance investigation
   - Network latency assessment
   - Application code profiling

4. **Root Cause Analysis**
   - Performance issue categorization
   - System behavior correlation
   - Resource constraint identification
   - Configuration impact assessment

**Reporting Structure:**
1. **Executive Summary**
   - Test objectives and outcomes
   - Key findings and recommendations
   - Business impact assessment
   - Go/no-go decision support

2. **Technical Analysis**
   - Detailed metric analysis
   - Performance bottleneck details
   - System behavior observations
   - Technical recommendations

3. **Test Evidence**
   - Test execution logs
   - Performance charts and graphs
   - Error analysis and screenshots
   - Raw data and calculations

**Recommendations Framework:**
- Performance optimization priorities
- Infrastructure scaling recommendations
- Code optimization suggestions
- Architecture improvement proposals
- Monitoring enhancement needs

Provide templates for analysis reports and recommendation formats.
```

## 📋 Performance Testing Checklist

### Pre-Testing Checklist
- [ ] Performance requirements clearly defined
- [ ] Test environment configured and validated
- [ ] Test data prepared and available
- [ ] Testing tools installed and configured
- [ ] Monitoring systems operational
- [ ] Baseline performance measurements taken
- [ ] Test scenarios designed and reviewed
- [ ] Team roles and responsibilities assigned
- [ ] Communication plan established

### During Testing Checklist
- [ ] Test execution monitored continuously
- [ ] Performance metrics collected in real-time
- [ ] Issues documented as they occur
- [ ] System health monitored throughout
- [ ] Emergency procedures ready if needed
- [ ] Test progress communicated to stakeholders
- [ ] Data backup performed regularly
- [ ] Test environment stability maintained

### Post-Testing Checklist
- [ ] All test data collected and secured
- [ ] Initial analysis completed
- [ ] Critical issues identified and communicated
- [ ] Test environment cleaned up
- [ ] Detailed analysis report prepared
- [ ] Recommendations documented
- [ ] Stakeholder presentation completed
- [ ] Lessons learned captured
- [ ] Next steps and follow-up actions defined

---

**Template Version:** 1.0  
**Last Updated:** September 30, 2025  
**Compatible with:** Web applications, APIs, microservices, e-commerce platforms