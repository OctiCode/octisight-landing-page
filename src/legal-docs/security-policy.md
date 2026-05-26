# Security Overview

**Effective date:** 26 May 2026
**Version:** 1.0

OctiSight is a vulnerability management platform. Our customers trust us with sensitive code, dependency graphs, and security findings. This page describes the technical and organisational measures we apply to protect the Service and the data customers entrust to us.

For the legal terms governing our processing of personal data on customers' behalf, see the [Data Processing Agreement](./data-processing-agreement.md). For our processing of personal data as a controller, see the [Privacy Policy](./privacy-policy.md).

---

## 1. Compliance posture

| Framework | Status |
|---|---|
| **GDPR / UK GDPR** | In effect — see [Privacy Policy](./privacy-policy.md) and [DPA](./data-processing-agreement.md) |
| **SOC 2 Type II** | In progress — audit planned, report available under NDA when complete |
| **ISO 27001** | Planned |
| **Moroccan Law 09-08** | In effect |

OctiSight follows industry-standard practices aligned with NIST CSF, OWASP ASVS, and CIS Benchmarks for the infrastructure components we operate.

---

## 2. Infrastructure and hosting

### 2.1 Hosting providers

The OctiSight production environment runs on:

- **Hetzner Cloud** in Germany (Falkenstein and Nuremberg data centres) — primary EU-resident customers;
- **Oracle Cloud** in the UK and (where available) Morocco — optional regional hosting for customers who require it.

These providers operate certified data centres (ISO 27001, SOC 2, and equivalent attestations).

### 2.2 Network architecture

- Application servers and database servers communicate over a **private network** that is not exposed to the public internet.
- The database is **not reachable** from the public internet; all access goes through PgBouncer in transaction mode over the private network.
- Public-facing services sit behind a reverse proxy with TLS termination, rate limiting, and a Web Application Firewall.
- All external traffic uses **TLS 1.2 or higher** with modern cipher suites.

### 2.3 Tenant isolation

OctiSight is multi-tenant by design. Tenant isolation is enforced at multiple layers:

- **Database**: every row of every relevant table is keyed by `organization_id`. Queries always include the org filter.
- **API**: every endpoint validates the user's membership and RBAC role in the requested org before responding.
- **Audit log**: every action is recorded with the user, IP, org, and outcome.

We treat tenant isolation as a security boundary — bypassing it would be a critical-severity bug under our [Vulnerability Disclosure Policy](./vulnerability-disclosure-policy.md).

---

## 3. Data protection

### 3.1 Encryption

- **In transit:** TLS 1.2+ for all external connections; mTLS for selected internal services.
- **At rest:** AES-256 for primary databases, backups, and object storage.
- **Backups:** encrypted with separately managed keys.

### 3.2 Secrets management

- Application secrets are managed through environment-scoped secret stores; they are never committed to source control.
- Customer-supplied secrets (OAuth tokens, scan tokens, webhook signing secrets, API keys) are encrypted at rest with envelope encryption.
- API keys are displayed in **plaintext exactly once** on creation and stored as hashes thereafter.

### 3.3 Backups and recovery

- **Database backups:** taken on a regular schedule, encrypted, retained per the retention policy (rotated every 30 days), and tested.
- **Recovery objectives:** RTO and RPO targets are documented internally and reviewed periodically.

---

## 4. Access control and identity

### 4.1 Customer-side access

OctiSight provides a five-role RBAC model per organisation:

- **Owner** — full control, can transfer or delete the org;
- **Admin** — manage members, integrations, billing, policies;
- **Security lead** — manage scans, AI features, reports;
- **Developer** — work assigned projects, run scans, work the kanban board;
- **Viewer** — read-only.

Permissions are enforced at the API layer, not just the UI.

### 4.2 Customer authentication

- Email + password with bcrypt-class hashing and rate-limited login.
- Optional **two-factor authentication (2FA)** via TOTP.
- **SAML SSO** with Okta, Google Workspace, and Microsoft Entra ID is planned for the Business plan.

### 4.3 Internal staff access

- All OctiSight staff who can access production systems use **mandatory MFA**.
- Production access is granted on the principle of **least privilege** and is reviewed periodically.
- Access is logged centrally.
- Staff are bound by written confidentiality obligations and receive security training.

---

## 5. Software development lifecycle

- **Code review:** every change is reviewed by at least one other engineer before merge.
- **CI gates:** static analysis, dependency scanning, and tests run on every pull request.
- **Dependency management:** we use the same OctiSight dependency-scanning capability on our own code.
- **Branch protection:** production branches are protected; deploys are auditable.
- **Secrets scanning:** automated on every commit.

OctiSight scans its own platform for vulnerabilities. We follow the SLA we expect our customers to follow.

---

## 6. Vulnerability management

We treat security issues seriously, including those reported by external researchers.

- **External reporting:** see the [Vulnerability Disclosure Policy](./vulnerability-disclosure-policy.md). We provide a safe-harbour for good-faith research.
- **Internal SLA targets:**
  - **Critical (CVSS 9.0+, or actively exploited / KEV):** mitigation within 24 hours, fix within 7 days;
  - **High (CVSS 7.0–8.9):** fix within 14 days;
  - **Medium (CVSS 4.0–6.9):** fix within 30 days;
  - **Low (CVSS < 4.0):** fix within 90 days.

---

## 7. Logging, monitoring, and incident response

- **Audit logging:** all administrative actions (user, API key, system) are recorded with user, IP, action, resource, and outcome. Logs are tamper-evident and retained per the retention policy.
- **Application logging:** structured logs with PII minimisation.
- **Monitoring:** uptime, latency, error-rate alerting; anomaly detection on authentication and API usage.
- **Incident response:** documented runbooks, on-call rotation, and post-mortem process for material incidents.

In the event of a **Personal Data breach** affecting Customer Personal Data, we will notify affected customers within **72 hours** of becoming aware, in line with our DPA and GDPR Article 33.

---

## 8. Resilience and availability

- **Background jobs:** BullMQ-backed queues with retry and back-off semantics.
- **Database:** dedicated NVMe-backed VPS with predictable query latency; PgBouncer caps backend connections.
- **Capacity:** documented scale path including extracting the scanner to a dedicated VPS, upgrading the database tier, and (planned) adding a secondary region for US-customer latency.
- **Status page:** for paid customers, a public or in-app status page reports incidents and maintenance.

For uptime commitments on paid plans, see the [Service Level Agreement](./service-level-agreement.md).

---

## 9. Vendor and subprocessor management

- We perform due diligence on subprocessors before engagement.
- All subprocessors are bound by written contracts imposing GDPR-equivalent protection.
- The current list of subprocessors is published at **[Subprocessors](./subprocessors.md)**.
- We notify customers of new or replacement subprocessors at least 30 days in advance.

---

## 10. AI safety and data handling

OctiSight uses third-party LLM providers to power several features. We:

- send LLM Providers **only the prompt content necessary** for the requested feature;
- contractually require LLM Providers **not to use Customer Data for training**;
- cache AI outputs server-side for 24 hours, reducing repeat exposure;
- restrict the chatbot to a fixed set of allowed tool calls that respect the user's RBAC scope;
- avoid sending special category data to LLM Providers wherever possible.

---

## 11. Customer responsibilities

The shared-responsibility model: OctiSight secures the platform, **you** secure your use of it.

You are responsible for:

- managing access (RBAC roles, MFA, API key rotation, scan-token hygiene);
- configuring integrations and webhooks correctly;
- following the [Acceptable Use Policy](./acceptable-use-policy.md);
- maintaining authorisation to scan the assets you connect;
- training your team on safe handling of vulnerability findings.

---

## 12. Asking questions and security review

If you are evaluating OctiSight and need to complete a security questionnaire, request our SOC 2 report (when available, under NDA), or arrange a security review, contact:

- **Security and compliance queries:** `security@octisight.com`
- **Sales / commercial:** `sales@octisight.com`
