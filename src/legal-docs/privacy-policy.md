# Privacy Policy

**Effective date:** 26 May 2026
**Version:** 1.0

This Privacy Policy explains how OctiSight collects, uses, shares, and protects personal data when you use the OctiSight platform at `app.octisight.io`, the marketing website at `octisight.com`, the OctiSight CLI, our APIs, and related services (collectively, the "**Service**").

We have written this policy to comply with:

- the **EU General Data Protection Regulation (GDPR)** (Regulation (EU) 2016/679);
- the **UK General Data Protection Regulation (UK GDPR)** and the Data Protection Act 2018;
- the **California Consumer Privacy Act (CCPA)** as amended by the California Privacy Rights Act (CPRA);
- Moroccan Law No. 09-08 on the protection of individuals with regard to the processing of personal data.

---

## 1. Who we are (the data controller)

### 1.1 Contracting entity

The OctiSight entity that acts as data controller depends on which entity contracts with you (see [Imprint](./imprint.md)):

- **OctiSight LTD** — England & Wales — registered office: 71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom.
- **OctiSight SARL** — Morocco — registered office: 78 BD La Résistance, Résidence El Marzouki, Casablanca 20250, Morocco.

Where these entities act jointly (e.g., shared engineering, shared infrastructure), they are joint controllers for those processing activities.

### 1.2 Controller vs. processor

OctiSight acts in **two distinct capacities**:

| Capacity | When | What it covers |
|---|---|---|
| **Data controller** | For data we collect directly about visitors, leads, account holders, and users (e.g., name, email, billing) | Our processing of your personal data is governed by this Privacy Policy |
| **Data processor** | When customers process personal data of *their own* end users through the Service (e.g., a user's email in a SAST finding's git blame) | Governed by the [Data Processing Agreement (DPA)](./data-processing-agreement.md), not this Privacy Policy |

### 1.3 Contact

- **Privacy queries:** `privacy@octisight.com`
- **General legal:** `legal@octisight.com`
- We have **not** appointed a Data Protection Officer (DPO). We will appoint one if required by Article 37 GDPR in the future.

---

## 2. The personal data we collect

### 2.1 Data you provide directly

| Category | Examples | Why we need it |
|---|---|---|
| Account data | Name, email address, hashed password, profile photo, technical-level preference, time zone | Create and manage your account |
| Organisation data | Org name, role, team membership | Operate the multi-tenant platform |
| Billing data | Billing contact, billing address, VAT number, tax ID. Card data is collected directly by Stripe and is not stored by OctiSight | Invoicing, tax compliance |
| Communication data | Content of support tickets, sales enquiries, email replies | Respond to you |
| Integration credentials | OAuth tokens, API keys, webhook secrets, scan tokens | Operate integrations you authorise |

### 2.2 Data we collect automatically

| Category | Examples | Why we need it |
|---|---|---|
| Device and connection data | IP address, browser type and version, OS, device identifiers, language | Security, fraud prevention, troubleshooting |
| Usage data | Pages viewed, features used, click events, request paths, response codes, timestamps | Improve the Service, debug, capacity planning |
| Audit and security logs | Login events, RBAC actions, API key usage, scan triggers, webhook deliveries | Security, audit (required by SOC 2), forensic investigation |
| Cookies and similar | See the [Cookie Policy](./cookie-policy.md) | Authentication, analytics |

### 2.3 Data collected through the Service (controller-mode use only)

When you use the Service, OctiSight processes data that may incidentally include personal data — for example, a git commit author email shown in a SAST finding, or the email address of a user assigned to a kanban card. **For this category, OctiSight acts as a processor** for the customer organisation, not a controller. See the DPA.

### 2.4 Data we do **not** collect

- We do **not** collect special category data (health, race, political opinions, religious beliefs, biometrics) intentionally. If you submit such data, you do so voluntarily and we recommend you do not.
- We do **not** sell personal data, and we do not "share" personal data for cross-context behavioural advertising as defined under CPRA.
- We do **not** use Customer Data to train any third-party large language model.

---

## 3. Why we process personal data (lawful bases)

For each processing activity, we rely on at least one of the following lawful bases under Article 6 GDPR (and equivalents under UK GDPR / Moroccan law):

| Purpose | Lawful basis |
|---|---|
| Providing the Service to you (account, scans, integrations, dashboards) | **Performance of a contract** (Art. 6(1)(b)) |
| Billing and tax compliance | **Legal obligation** (Art. 6(1)(c)) and **performance of a contract** |
| Security, fraud prevention, audit logging | **Legitimate interest** (Art. 6(1)(f)) — operating a secure platform |
| Service-improvement analytics | **Legitimate interest** and, where required, **consent** (Art. 6(1)(a)) |
| Marketing emails to existing customers (about similar services) | **Legitimate interest** with opt-out (soft opt-in under PECR for UK) |
| Marketing emails to prospects | **Consent** (Art. 6(1)(a)) |
| Compliance with legal requests | **Legal obligation** (Art. 6(1)(c)) |

You may object to processing based on legitimate interests at any time by contacting `privacy@octisight.com`. We will weigh your objection against our legitimate interests and respect it unless we can demonstrate compelling overriding grounds.

### 3.1 CCPA / CPRA: business purposes

For California residents, the "business purposes" for which we process personal information are: providing the Service, security and fraud prevention, customer support, billing, internal analytics and quality assurance, and complying with legal obligations.

---

## 4. Cookies and tracking

We use cookies and similar technologies on `octisight.com` and `app.octisight.io`. Categories:

- **Essential cookies** (session, authentication, CSRF protection) — no consent required;
- **Analytics cookies** (Google Analytics) — used to understand aggregate site usage. Set only after consent in EU/UK regions.

Full details, including a complete cookie table and instructions for managing your preferences, are in the **[Cookie Policy](./cookie-policy.md)**.

---

## 5. Who we share personal data with

We share personal data only with the categories of recipient below. A full, current list of subprocessors is published at **[Subprocessors](./subprocessors.md)**.

### 5.1 Subprocessors (service providers)

We engage third-party service providers to operate the Service. Each is bound by a written contract requiring confidentiality, data protection, and security measures consistent with GDPR Article 28. Categories include:

| Category | Provider | Region |
|---|---|---|
| Hosting infrastructure | Hetzner Cloud (DE), Oracle Cloud (UK / Morocco) | EU / UK / Morocco |
| File storage (static assets) | Firebase Storage (Google Cloud) | EU |
| Transactional email | Mailgun | EU/US (region depends on plan) |
| Payment processing | Stripe | Ireland / US |
| LLM providers (AI features) | See [Subprocessors](./subprocessors.md) | Varies |
| Source-code OAuth providers | GitHub, GitLab, Bitbucket | US |
| Webhook destinations | Slack, Microsoft Teams (only if you configure) | US |

### 5.2 Affiliates

OctiSight LTD and OctiSight SARL share data between themselves where necessary to operate the Service, under written intra-group agreements.

### 5.3 Professional advisors

Lawyers, accountants, auditors, and insurers, where necessary and under professional confidentiality obligations.

### 5.4 Authorities

Where required by law, court order, or to defend our legal rights. We will challenge requests we consider overbroad or improper.

### 5.5 Corporate transactions

In the event of a merger, acquisition, or sale of assets, personal data may be transferred to the successor, subject to this Privacy Policy continuing to apply.

### 5.6 We do not sell personal data

We do not sell personal data within the meaning of CCPA / CPRA, and we have not done so in the preceding twelve months. We do not share personal data for cross-context behavioural advertising.

---

## 6. International data transfers

OctiSight is established in the UK and Morocco. Some subprocessors are located outside the UK / EEA / Morocco (notably in the United States).

For transfers to countries that have not been recognised as providing adequate protection, we rely on appropriate safeguards under Article 46 GDPR / UK GDPR:

- **EU Standard Contractual Clauses (SCCs)** (2021/914) for transfers from the EEA;
- the **UK International Data Transfer Addendum** for transfers from the UK;
- the **EU-U.S. Data Privacy Framework** where the recipient is certified;
- additional supplementary measures where required by our Transfer Impact Assessment, including encryption in transit (TLS 1.2+), encryption at rest, and access controls.

You may request a copy of the relevant transfer mechanism by emailing `privacy@octisight.com`.

---

## 7. How long we keep personal data

We keep personal data only as long as needed for the purposes set out in this Policy and as required by law.

| Data category | Retention period |
|---|---|
| Account data | Duration of your account + 30 days after account closure |
| Customer Data (org-scoped) | Per the [Retention Policy](./terms-of-service.md#section-6) and your in-app configuration; default 30–365 days by data class; permanently deleted within 30 days of account closure unless legal hold applies |
| Billing and tax records | Up to **7 years** (UK statutory minimum: 6 years; we round up) |
| Audit logs | Default 365 days; configurable by org admin |
| Webhook delivery logs | Default 30 days; configurable |
| Scan artefacts | Default 90 days; configurable |
| Marketing prospect data | Until you opt out or 2 years of inactivity, whichever is sooner |
| Support tickets | 3 years from the date of the last reply |
| Backups | Rotated every 30 days |

After expiry, we delete or fully anonymise the data.

---

## 8. Your rights

Subject to applicable law, you have the following rights regarding your personal data. We respond to verified requests within **30 days** (extendable by 60 days for complex requests under GDPR, or per the applicable timeline under CCPA).

### 8.1 Rights under GDPR / UK GDPR

- **Right of access** — get a copy of the personal data we hold about you.
- **Right to rectification** — correct inaccurate or incomplete data.
- **Right to erasure** ("right to be forgotten") — request deletion, subject to exceptions (e.g., legal obligations to retain).
- **Right to restriction of processing** — temporarily limit how we use your data.
- **Right to data portability** — receive your data in a structured, commonly used, machine-readable format.
- **Right to object** — object to processing based on legitimate interests or for direct marketing (always honoured).
- **Right to withdraw consent** — for processing based on consent, without affecting prior lawful processing.
- **Right not to be subject to automated decision-making** — that has legal or similarly significant effects. OctiSight does **not** make solely automated decisions of this type.
- **Right to lodge a complaint** with a supervisory authority:
  - In the **UK**: the Information Commissioner's Office — `ico.org.uk`.
  - In the **EU**: your local Data Protection Authority. A full list is at `edpb.europa.eu/about-edpb/about-edpb/members_en`.
  - In **Morocco**: the CNDP (Commission Nationale de contrôle de la protection des Données à caractère Personnel) — `cndp.ma`.

### 8.2 Rights under CCPA / CPRA (California residents)

- **Right to know** the categories and specific pieces of personal information we have collected.
- **Right to delete** personal information.
- **Right to correct** inaccurate personal information.
- **Right to opt out of sale or sharing** — n/a; we do neither.
- **Right to limit use of sensitive personal information** — n/a; we do not collect such information.
- **Right to non-discrimination** for exercising any of these rights.

To submit a CCPA request, email `privacy@octisight.com` with the subject "CCPA Request". You may also designate an authorised agent. We will verify your identity before fulfilling.

### 8.3 How to exercise your rights

Email `privacy@octisight.com` from the email address associated with your account. For requests about Customer Data that belongs to a customer organisation (i.e., where OctiSight acts as processor), please contact the relevant org administrator; we will support customers in fulfilling those requests under our DPA.

---

## 9. How we protect personal data

We implement technical and organisational measures appropriate to the risk:

- **Encryption in transit:** TLS 1.2 or higher for all external traffic.
- **Encryption at rest:** AES-256 for databases, backups, and stored artefacts.
- **Access controls:** least-privilege RBAC, SSO for staff, mandatory MFA for privileged access.
- **Network isolation:** Hetzner private network between application and database tiers; PgBouncer in transaction mode.
- **Audit logging:** all administrative actions logged and retained.
- **Vendor due diligence:** documented review of subprocessors.
- **Vulnerability management:** continuous scanning of OctiSight itself, plus an external [Vulnerability Disclosure Policy](./vulnerability-disclosure-policy.md).
- **Personnel:** confidentiality obligations, security awareness training, background checks (where lawful).

More detail is published in the **[Security Overview](./security-policy.md)**.

No service can be 100% secure. If a personal data breach occurs that is likely to result in a risk to your rights and freedoms, we will notify our supervisory authority within **72 hours** (GDPR Art. 33) and affected individuals without undue delay where required (Art. 34).

---

## 10. Children

The Service is for business use. You must be at least **18** to use it. We do not knowingly collect personal data from anyone under 18. If you believe a minor has provided personal data to us, contact `privacy@octisight.com` and we will delete it.

---

## 11. Automated decision-making and profiling

OctiSight uses AI features (LLM-powered explanations, remediation guidance, risk scoring) to assist users. These features produce outputs that humans review and act on. We do **not** make solely automated decisions producing legal or similarly significant effects within the meaning of Article 22 GDPR.

The risk-scoring formula (`critical×10 + high×5 + medium×2 + low×1 + info×0.5 + KEV×10`) operates on assets and vulnerabilities, not on people.

---

## 12. Marketing

We may send marketing emails about OctiSight features and updates. You can opt out at any time by clicking "unsubscribe" in any marketing email or by emailing `privacy@octisight.com`. Transactional emails (security alerts, billing, account notices) are not opt-out.

For prospects who have not yet become customers, we send marketing only with consent (where required by law) and in compliance with PECR (UK), ePrivacy Directive (EU), and CAN-SPAM / CASL where applicable.

---

## 13. Third-party links

The Service may link to third-party websites. We are not responsible for the privacy practices of those sites. Review their policies before submitting personal data.

---

## 14. Changes to this Privacy Policy

We may update this Privacy Policy. For **material changes**, we will give at least 30 days' notice by email or in-app banner before the change takes effect. The "effective date" at the top of this Policy reflects the latest version. Prior versions are available on request.

---

## 15. How to contact us

| Topic | Contact |
|---|---|
| Privacy queries, rights requests | `privacy@octisight.com` |
| Legal / general | `legal@octisight.com` |
| Security disclosures | `security@octisight.com` |
| Support | `support@octisight.com` |

Postal:

> **OctiSight LTD**
> 71-75 Shelton Street, Covent Garden
> London, WC2H 9JQ, United Kingdom

> **OctiSight SARL**
> 78 BD La Résistance, Résidence El Marzouki
> Casablanca 20250, Morocco
