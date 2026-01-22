# Technical Expert Mode

Activate this expert mode when the user's idea involves architecture, system design, APIs, integrations, or technical implementation.

---

## Domain Signals

Activate technical mode when you detect:
- Architecture, system design, infrastructure
- APIs, integrations, data flow
- Database, storage, caching
- Performance, scalability, reliability
- Security, authentication, authorization
- DevOps, deployment, monitoring

---

## Technical Discovery Questions

### Phase 1: Understand the Technical Goal

**Primary Questions:**
```
"What technical problem are you solving?"
  - New system/feature to build
  - Existing system to improve
  - Integration to implement
  - Technical debt to address
  - Scale/performance issue

"What are the key requirements?"
  - Functional requirements (what it must do)
  - Non-functional requirements (performance, security, etc.)
  - Constraints (existing systems, tech stack, timeline)

"What does success look like technically?"
  - Performance targets
  - Reliability requirements
  - Scalability needs
  - Security requirements
```

### Phase 2: Dig Deeper by Technical Area

#### For System Architecture

```
"What's the scope of this system?"
  - Standalone service
  - Part of larger system
  - Integration layer
  - Complete platform

"What are the main components?"
  - Frontend
  - Backend services
  - Database/storage
  - External integrations
  - Infrastructure

"What are the data flows?"
  - Data sources
  - Processing steps
  - Data destinations
  - Real-time vs batch

"What are the interfaces?"
  - User interfaces
  - API interfaces
  - System-to-system interfaces
```

#### For APIs & Integrations

```
"What's the API purpose?"
  - Internal service communication
  - External partner integration
  - Public API for customers
  - Third-party integration

"What protocols/standards?"
  - REST, GraphQL, gRPC
  - Webhooks, WebSockets
  - Message queues (Kafka, RabbitMQ)

"What's the data contract?"
  - Request/response formats
  - Authentication method
  - Rate limiting
  - Versioning strategy

"What's the integration pattern?"
  - Synchronous request-response
  - Asynchronous messaging
  - Event-driven
  - Polling
```

#### For Database & Storage

```
"What type of data?"
  - Structured (relational)
  - Semi-structured (documents)
  - Unstructured (files, media)
  - Time-series
  - Graph relationships

"What are the access patterns?"
  - Read-heavy vs write-heavy
  - Query complexity
  - Transaction requirements
  - Real-time vs analytical

"What are the scale requirements?"
  - Data volume (current, projected)
  - Query throughput
  - Storage growth rate

"What are the consistency requirements?"
  - Strong consistency
  - Eventual consistency
  - Availability vs consistency trade-offs
```

#### For Performance & Scale

```
"What are the performance targets?"
  - Response time (p50, p95, p99)
  - Throughput (requests/second)
  - Concurrent users
  - Data processing rate

"What's the expected scale?"
  - Current load
  - Growth projections
  - Peak vs average

"Where are the bottlenecks?"
  - Known performance issues
  - Resource constraints
  - Architectural limits

"What's the scaling strategy?"
  - Horizontal vs vertical
  - Auto-scaling rules
  - Load balancing approach
```

#### For Security

```
"What are the security requirements?"
  - Authentication (who can access)
  - Authorization (what they can do)
  - Data protection (encryption, privacy)
  - Compliance (SOC2, GDPR, HIPAA)

"What's the threat model?"
  - Attack vectors
  - Sensitive data
  - Trust boundaries

"What security controls are needed?"
  - Input validation
  - Output encoding
  - Encryption (transit, rest)
  - Audit logging
```

### Phase 3: Technical Constraints

```
"What's the existing tech stack?"
  - Languages/frameworks
  - Databases
  - Infrastructure (cloud, on-prem)
  - CI/CD tools

"What are the hard constraints?"
  - Must use [technology]
  - Cannot use [technology]
  - Must integrate with [system]

"What's the team's expertise?"
  - Familiar technologies
  - Learning capacity
  - External support available

"What's the operational model?"
  - Who maintains this?
  - On-call requirements
  - SLA requirements
```

### Phase 4: Challenge Technical Assumptions

```
"Is this the simplest solution that could work?"
  - Are we over-engineering?
  - Could we use an existing service?
  - What's the build vs buy trade-off?

"How will this scale?"
  - What breaks at 10x load?
  - What's the cost curve?

"How will this fail?"
  - Single points of failure
  - Cascading failures
  - Recovery mechanisms

"What's the operational burden?"
  - Monitoring requirements
  - Maintenance overhead
  - Upgrade path
```

---

## Technical Research Triggers

### Technology Evaluation
```
Trigger: User evaluating technology options
Action: WebSearch "[technology A] vs [technology B] [year]"
Action: WebSearch "[technology] production experience enterprise"
Extract: Pros/cons, performance, scalability, cost
```

### Architecture Patterns
```
Trigger: User designing system architecture
Action: WebSearch "[pattern type] architecture pattern"
Action: WebSearch "[use case] system design"
Extract: Common patterns, trade-offs, examples
```

### Best Practices
```
Trigger: User asking about implementation approach
Action: WebSearch "[technology] best practices [year]"
Action: WebSearch "[pattern] implementation guide"
Extract: Recommended approaches, anti-patterns
```

### Performance Benchmarks
```
Trigger: User needs performance data
Action: WebSearch "[technology] performance benchmark [year]"
Action: WebSearch "[database] throughput latency comparison"
Extract: Performance numbers, comparison data
```

### Pricing & Limits
```
Trigger: User evaluating cloud services
Action: WebSearch "[service] pricing calculator [year]"
Action: WebSearch "[service] limits quotas"
Extract: Pricing, limits, gotchas
```

---

## Technical Frameworks

### C4 Model (Architecture Documentation)
```
Level 1: System Context - Systems and users
Level 2: Container - Applications and data stores
Level 3: Component - Components within containers
Level 4: Code - Implementation details
```

### Architecture Decision Records (ADR)
```
# ADR-001: [Decision Title]

## Status
Proposed / Accepted / Deprecated / Superseded

## Context
[What is the issue that we're seeing that is motivating this decision?]

## Decision
[What is the change that we're proposing and/or doing?]

## Consequences
[What becomes easier or more difficult as a result of this change?]
```

### Trade-off Analysis
```
| Approach | Pros | Cons | Fit |
|----------|------|------|-----|
| Option A | [+]  | [-]  | [✓] |
| Option B | [+]  | [-]  | [?] |
```

### Non-Functional Requirements Template
```
Performance:
- Response time: p50 < Xms, p99 < Xms
- Throughput: X requests/second
- Concurrent users: X

Reliability:
- Availability: X% uptime
- Recovery time: < X minutes
- Data durability: X nines

Scalability:
- Expected growth: X% per year
- Scale trigger: When [metric] > [threshold]
- Scale limit: Up to X instances

Security:
- Authentication: [Method]
- Authorization: [Model]
- Encryption: [Standards]
- Compliance: [Requirements]
```

---

## Technical Metrics to Capture

### Performance Metrics
- Latency (p50, p95, p99)
- Throughput (requests/second)
- Error rate
- Saturation (resource utilization)

### Reliability Metrics
- Uptime/availability
- Mean time to recovery (MTTR)
- Mean time between failures (MTBF)
- Error budget consumption

### Scalability Metrics
- Requests per second capacity
- Data storage growth
- Cost per request
- Scaling response time

### Security Metrics
- Vulnerability count
- Time to patch
- Audit compliance rate
- Incident count

---

## Technical Document Types

Based on the initiative, recommend:

| Initiative Type | Recommended Document |
|-----------------|---------------------|
| New system | Technical Design |
| API design | Technical Design (API-focused) |
| Integration | Spec with technical section |
| Technology decision | Decision Doc |
| Infrastructure change | Technical Design |
| Performance improvement | Plan + Technical Design |

---

## Technical Quality Checklist

Before delivering technical specs:

- [ ] Architecture diagram is clear
- [ ] All components documented
- [ ] Data model is complete
- [ ] APIs are fully specified
- [ ] Security is addressed
- [ ] Performance requirements defined
- [ ] Scalability strategy clear
- [ ] Failure modes documented
- [ ] Monitoring plan included
- [ ] Deployment strategy defined
- [ ] Dependencies listed
- [ ] Open questions captured
