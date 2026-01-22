# Technical Design Template: Architecture Document

Use this template when the user needs to document system architecture, technical design, or engineering specifications.

---

## Document Structure

```markdown
# Technical Design: [System/Feature Name]

**Author:** [Name]
**Date:** [YYYY-MM-DD]
**Version:** 1.0
**Status:** Draft / In Review / Approved
**Reviewers:** [Names]

---

## Overview

### Summary
[2-3 sentences describing what this system does and why]

### Goals
- [Technical goal 1]
- [Technical goal 2]
- [Technical goal 3]

### Non-Goals
- [What this design explicitly doesn't address]

---

## Background

### Context
[Why this system is needed, what problem it solves]

### Current State
[How things work today, existing systems involved]

### Requirements Reference
[Link to PRD or requirements document]

---

## System Architecture

### High-Level Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Client    │────▶│   API       │────▶│  Database   │
│   (Web/App) │     │   Gateway   │     │             │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │  Services   │
                    │  (A, B, C)  │
                    └─────────────┘
```

[Or include an actual architecture diagram]

### Components

#### Component 1: [Name]

**Purpose:** [What it does]
**Technology:** [Stack/framework]
**Responsibilities:**
- [Responsibility 1]
- [Responsibility 2]

**Interfaces:**
- Input: [What it receives]
- Output: [What it produces]

**Dependencies:**
- [Dependency 1]
- [Dependency 2]

---

#### Component 2: [Name]

[Same structure...]

---

### Data Flow

```
[Source] ──(1)──▶ [Process A] ──(2)──▶ [Process B] ──(3)──▶ [Destination]

(1) Raw data ingestion
(2) Transformation/validation
(3) Persisted/returned
```

**Step-by-Step Flow:**
1. [Step 1 description]
2. [Step 2 description]
3. [Step 3 description]

---

## Data Model

### Entity Relationship Diagram

```
┌──────────────┐       ┌──────────────┐
│    User      │       │    Order     │
├──────────────┤       ├──────────────┤
│ id (PK)      │──┐    │ id (PK)      │
│ email        │  │    │ user_id (FK) │◀─┘
│ name         │  │    │ total        │
│ created_at   │  │    │ status       │
└──────────────┘  │    │ created_at   │
                  │    └──────────────┘
                  │
                  │    ┌──────────────┐
                  │    │  OrderItem   │
                  │    ├──────────────┤
                  └───▶│ order_id(FK) │
                       │ product_id   │
                       │ quantity     │
                       └──────────────┘
```

### Table Definitions

#### Table: [table_name]

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | No | gen_random_uuid() | Primary key |
| [column] | [type] | [Yes/No] | [Default] | [Description] |
| created_at | TIMESTAMP | No | NOW() | Record creation time |
| updated_at | TIMESTAMP | No | NOW() | Last update time |

**Indexes:**
- `idx_[table]_[column]` — [Purpose]
- `idx_[table]_[columns]` — [Purpose]

**Constraints:**
- Primary Key: `id`
- Foreign Keys: [List]
- Unique: [Columns]
- Check: [Constraints]

---

## API Design

### Endpoints

#### [Method] /api/v1/[resource]

**Purpose:** [What this endpoint does]

**Authentication:** [Required/Optional] — [Type: JWT/API Key/etc.]

**Request:**
```http
[METHOD] /api/v1/[resource]
Content-Type: application/json
Authorization: Bearer {token}

{
  "field1": "string",
  "field2": 123,
  "nested": {
    "field3": true
  }
}
```

**Request Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| field1 | string | Yes | [Description] |
| field2 | integer | No | [Description], default: 0 |

**Response (200 OK):**
```json
{
  "id": "uuid",
  "field1": "string",
  "created_at": "2025-01-22T00:00:00Z"
}
```

**Response (400 Bad Request):**
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Field validation failed",
    "details": [
      {"field": "field1", "message": "Required field missing"}
    ]
  }
}
```

**Response (500 Internal Server Error):**
```json
{
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred"
  }
}
```

---

#### [Method] /api/v1/[resource]/{id}

[Same structure...]

---

### Error Codes

| Code | HTTP Status | Description | Recovery |
|------|-------------|-------------|----------|
| VALIDATION_ERROR | 400 | Request validation failed | Fix input and retry |
| NOT_FOUND | 404 | Resource not found | Verify ID exists |
| RATE_LIMITED | 429 | Too many requests | Wait and retry |
| INTERNAL_ERROR | 500 | Server error | Retry with backoff |

---

## Technical Decisions

### Decision 1: [Technology/Approach Choice]

**Context:** [What we needed to decide]

**Options Considered:**
1. [Option A] — [Brief description]
2. [Option B] — [Brief description]
3. [Option C] — [Brief description]

**Decision:** [Option chosen]

**Rationale:**
- [Reason 1]
- [Reason 2]

**Consequences:**
- Positive: [Benefits]
- Negative: [Trade-offs]

---

### Decision 2: [Another Decision]

[Same structure...]

---

## Security Considerations

### Authentication
[How users/systems authenticate]

### Authorization
[How permissions are managed]

| Action | Required Permission |
|--------|---------------------|
| [Action 1] | [Permission/Role] |
| [Action 2] | [Permission/Role] |

### Data Protection
- **In Transit:** [TLS version, certificate management]
- **At Rest:** [Encryption method, key management]

### Sensitive Data Handling
| Data Type | Classification | Handling |
|-----------|----------------|----------|
| [PII type] | Sensitive | [How stored/transmitted] |
| [Credentials] | Secret | [How protected] |

### Security Threats & Mitigations

| Threat | Risk Level | Mitigation |
|--------|------------|------------|
| [SQL Injection] | High | [Parameterized queries] |
| [XSS] | Medium | [Input sanitization, CSP] |
| [CSRF] | Medium | [CSRF tokens] |

---

## Performance Requirements

### Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| Response time (p50) | < 100ms | [Tool] |
| Response time (p99) | < 500ms | [Tool] |
| Throughput | 1000 req/s | [Tool] |
| Availability | 99.9% | [Tool] |
| Error rate | < 0.1% | [Tool] |

### Scalability

**Current Capacity:** [What we can handle now]

**Scaling Strategy:**
- Horizontal: [How we scale out]
- Vertical: [How we scale up]
- Auto-scaling: [Triggers and limits]

### Performance Optimizations

| Optimization | Implementation | Expected Impact |
|--------------|----------------|-----------------|
| Caching | [Redis/CDN/etc.] | [X% improvement] |
| Database indexing | [Index strategy] | [X% improvement] |
| Connection pooling | [Pool configuration] | [X% improvement] |

---

## Reliability & Resilience

### Failure Modes

| Failure | Detection | Recovery | RTO |
|---------|-----------|----------|-----|
| [Database down] | [Health check] | [Failover process] | [X min] |
| [Service crash] | [Monitoring] | [Auto-restart] | [X sec] |
| [Network partition] | [Timeout] | [Retry logic] | [X sec] |

### Redundancy
- [How critical components are redundant]
- [Failover mechanisms]

### Disaster Recovery
- **RPO (Recovery Point Objective):** [X hours]
- **RTO (Recovery Time Objective):** [X hours]
- **Backup Strategy:** [Frequency, retention, location]

---

## Monitoring & Observability

### Logging

| Log Type | Level | Retention | Storage |
|----------|-------|-----------|---------|
| Application | INFO | 30 days | [System] |
| Access | INFO | 90 days | [System] |
| Audit | INFO | 1 year | [System] |
| Error | ERROR | 90 days | [System] |

**Log Format:**
```json
{
  "timestamp": "ISO8601",
  "level": "INFO|WARN|ERROR",
  "service": "service-name",
  "trace_id": "uuid",
  "message": "string",
  "context": {}
}
```

### Metrics

| Metric | Type | Description | Alert Threshold |
|--------|------|-------------|-----------------|
| request_count | Counter | Total requests | N/A |
| request_latency | Histogram | Response times | p99 > 1s |
| error_rate | Gauge | Error percentage | > 1% |
| [custom_metric] | [Type] | [Description] | [Threshold] |

### Alerts

| Alert | Condition | Severity | Action |
|-------|-----------|----------|--------|
| High Error Rate | error_rate > 5% for 5m | Critical | Page on-call |
| High Latency | p99 > 2s for 10m | Warning | Notify team |
| [Alert] | [Condition] | [Severity] | [Action] |

### Dashboards
- [Link to operational dashboard]
- [Link to business metrics dashboard]

---

## Dependencies

### External Services

| Service | Purpose | SLA | Fallback |
|---------|---------|-----|----------|
| [Service 1] | [What it provides] | [SLA %] | [Degraded behavior] |
| [Service 2] | [What it provides] | [SLA %] | [Fallback] |

### Internal Services

| Service | Purpose | Owner | Communication |
|---------|---------|-------|---------------|
| [Service] | [What it provides] | [Team] | [Sync/Async] |

### Libraries & Frameworks

| Library | Version | Purpose | License |
|---------|---------|---------|---------|
| [Library] | [Version] | [Why used] | [License] |

---

## Testing Strategy

### Test Types

| Type | Coverage Target | Tools |
|------|-----------------|-------|
| Unit | 80% | [Framework] |
| Integration | Key paths | [Framework] |
| E2E | Critical flows | [Framework] |
| Load | Performance targets | [Tool] |
| Security | OWASP Top 10 | [Tool] |

### Test Environments

| Environment | Purpose | Data |
|-------------|---------|------|
| Local | Development | Mocked |
| Staging | Integration testing | Anonymized prod |
| Production | Live traffic | Real |

---

## Deployment

### Deployment Strategy
[Blue-green / Canary / Rolling / Feature flags]

### CI/CD Pipeline

```
[Commit] → [Build] → [Test] → [Security Scan] → [Deploy Staging] → [Deploy Prod]
```

### Rollback Procedure
1. [Step 1]
2. [Step 2]
3. [Step 3]

---

## Migration Plan (If Applicable)

### Data Migration

| Step | Description | Reversible | Risk |
|------|-------------|------------|------|
| 1 | [Migration step] | Yes/No | [Risk level] |

### Cutover Plan
1. [Step 1]
2. [Step 2]

### Rollback Plan
1. [Step 1]
2. [Step 2]

---

## Open Questions

| # | Question | Impact | Owner | Status |
|---|----------|--------|-------|--------|
| 1 | [Question] | [Impact] | [Who] | [Status] |

---

## Future Considerations

- [Potential future enhancement 1]
- [Technical debt to address]
- [Scalability improvements]

---

## Appendices

### Appendix A: Sequence Diagrams
[Detailed interaction flows]

### Appendix B: State Machines
[State transition diagrams]

### Appendix C: Capacity Planning
[Detailed sizing calculations]
```

---

## Quality Checklist

Before delivering:

- [ ] Architecture diagram is clear
- [ ] All components documented
- [ ] Data model is complete
- [ ] APIs are fully specified
- [ ] Security is addressed
- [ ] Performance requirements defined
- [ ] Monitoring plan included
- [ ] Dependencies listed
- [ ] Deployment strategy clear
- [ ] Open questions captured
