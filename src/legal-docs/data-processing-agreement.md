# Data Processing Agreement (DPA)

**Effective date:** 26 May 2026
**Version:** 1.0

This Data Processing Agreement ("**DPA**") forms part of the [Terms of Service](./terms-of-service.md) (the "**Agreement**") between the OctiSight contracting entity ("**Processor**", "**OctiSight**") and the Customer ("**Controller**", "**you**") and governs OctiSight's processing of Personal Data on your behalf when you use the Service.

This DPA is intended to satisfy:

- **Article 28 of the EU General Data Protection Regulation (Regulation (EU) 2016/679, "GDPR")**;
- **Article 28 of the UK GDPR** and the Data Protection Act 2018;
- the **Service Provider** requirements of the California Consumer Privacy Act as amended by CPRA;
- **Law No. 09-08** of the Kingdom of Morocco on the protection of personal data.

In the event of any conflict between this DPA and the Agreement, this DPA controls with respect to processing of Personal Data.

---

## 1. Definitions

Capitalised terms not defined here have the meanings given in the Agreement or in GDPR / UK GDPR / CCPA, as applicable. In particular:

- "**Personal Data**" means any information relating to an identified or identifiable natural person, as defined in GDPR Article 4(1).
- "**Processing**" has the meaning given in GDPR Article 4(2).
- "**Subprocessor**" means any third party engaged by Processor to process Customer Personal Data on Processor's behalf.
- "**Customer Personal Data**" means Personal Data submitted to, or generated within, the Service by Customer or its users that is processed by OctiSight on Customer's behalf.
- "**Data Subject Request**" means a request by a Data Subject to exercise rights under applicable data protection law.

---

## 2. Roles of the parties

- **Customer is the Controller** of Customer Personal Data.
- **OctiSight is the Processor** of Customer Personal Data and processes it only on documented instructions from Customer.
- Customer is responsible for ensuring it has a lawful basis for processing and that its instructions are lawful.

For Personal Data that OctiSight processes for its own purposes (account administration, billing, security, etc.), OctiSight acts as **Controller** and the **[Privacy Policy](./privacy-policy.md)** applies not this DPA.

---

## 3. Subject matter, duration, nature, and purpose of processing

| Item                            | Description                                                                                                                                                                                                                                                                      |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Subject matter**              | Processing of Customer Personal Data as necessary to provide the OctiSight Service                                                                                                                                                                                               |
| **Duration**                    | The term of the Agreement, plus any retention period under Section 9                                                                                                                                                                                                             |
| **Nature and purpose**          | Vulnerability management, including ingestion of code and asset metadata, scanning, correlation against vulnerability feeds, AI-assisted analysis, triage workflows, dashboards, reporting, notifications, and integrations                                                      |
| **Type of Personal Data**       | Identifiers (name, email, user ID); professional information (role, team, organisation); technical data (IP, device, OAuth tokens); incidental Personal Data that may appear in code, commit metadata, SBOMs, or scan findings (e.g., committer names and emails in git history) |
| **Categories of Data Subjects** | Customer's users, employees, contractors, and any natural persons whose Personal Data may appear in Customer's assets, code, or scan inputs                                                                                                                                      |

---

## 4. Customer instructions and obligations

### 4.1 Documented instructions

OctiSight will process Customer Personal Data only on Customer's documented instructions. The Agreement, this DPA, and Customer's use of in-app configuration (settings, integrations, RBAC, retention policies, AI features, exports, etc.) constitute Customer's documented instructions.

OctiSight will notify Customer if, in its opinion, an instruction infringes GDPR, UK GDPR, or other applicable data protection law.

### 4.2 Customer's responsibilities

Customer warrants and undertakes that it:

1. has a lawful basis for processing Customer Personal Data and for transferring it to OctiSight;
2. has provided all required notices to and obtained all required consents from Data Subjects;
3. will not submit special category data (Article 9 GDPR) unless and to the extent the Service is configured to support it and additional safeguards are agreed in writing;
4. will only scan, ingest, or otherwise submit data relating to assets it owns or has authority to scan;
5. complies with the **[Acceptable Use Policy](./acceptable-use-policy.md)**.

---

## 5. Confidentiality

OctiSight will ensure that personnel authorised to process Customer Personal Data:

- are bound by written confidentiality obligations or are subject to an appropriate statutory duty of confidence;
- are granted access only on a need-to-know basis;
- receive appropriate data-protection and security training.

---

## 6. Security measures (Art. 32)

OctiSight implements appropriate technical and organisational measures to protect Customer Personal Data, including:

| Domain                       | Measure                                                                                                              |
|------------------------------|----------------------------------------------------------------------------------------------------------------------|
| **Encryption**               | TLS 1.2+ in transit; AES-256 at rest for databases, backups, and file storage                                        |
| **Access control**           | RBAC, mandatory MFA for privileged access, SSO for staff, least-privilege principles, periodic access review         |
| **Network**                  | Private network between application and database tiers; firewall, intrusion detection, anomaly alerts                |
| **Database**                 | PgBouncer in transaction mode; row-level org isolation enforced at the API layer                                     |
| **Logging & audit**          | Comprehensive audit log; tamper-evident retention                                                                    |
| **Backups**                  | Encrypted, regularly tested, rotated per the retention policy                                                        |
| **Resilience**               | Multi-AZ where supported by infrastructure provider; documented incident response                                    |
| **Vulnerability management** | Continuous scanning of the Service; external [Vulnerability Disclosure Policy](./vulnerability-disclosure-policy.md) |
| **Personnel**                | Background checks where lawful; confidentiality undertakings; security awareness training                            |
| **Vendor management**        | Documented review and contractual safeguards for all subprocessors                                                   |

A more detailed description is available in the **[Security Overview](./security-policy.md)**. OctiSight may update its measures from time to time provided that the level of security is not materially degraded.

---

## 7. Subprocessors

### 7.1 General authorisation

Customer grants OctiSight **general authorisation** to engage Subprocessors to process Customer Personal Data, subject to the conditions in this Section.

### 7.2 Current Subprocessors

The current list of Subprocessors is maintained at **[Subprocessors](./subprocessors.md)** and is incorporated into this DPA by reference.

### 7.3 Subprocessor obligations

Before engaging a new Subprocessor, OctiSight will:

1. conduct reasonable due diligence on the Subprocessor's ability to comply with applicable data protection law;
2. enter into a written contract imposing data-protection obligations no less protective than those in this DPA;
3. remain liable to Customer for the acts and omissions of the Subprocessor.

### 7.4 Notification and objection

OctiSight will notify Customer at least **thirty (30) days** before adding or replacing a Subprocessor, by email and via an updated Subprocessor List. Customer may subscribe to changes at `privacy@octisight.com`.

Customer may **object** in writing to the change within fifteen (15) days of notification, stating reasonable grounds related to data protection. If the parties cannot resolve the objection in good faith, Customer may terminate the affected portion of the Service and receive a pro-rata refund of pre-paid fees for the unused remainder of the current term as Customer's sole remedy.

---

## 8. International data transfers

Where Customer Personal Data is transferred outside the UK / EEA / Morocco to a country that has not been recognised as providing adequate protection, the parties rely on:

- the **EU Standard Contractual Clauses** (Commission Decision 2021/914), which are incorporated into this DPA by reference for transfers from the EEA. The parties agree:
  - **Module Two** (Controller-to-Processor) applies between Customer and OctiSight;
  - **Module Three** (Processor-to-Processor) applies where Customer is itself a processor of its own clients' data;
  - **Clause 7** (docking clause) is included;
  - **Clause 9(a) option 2** applies (general written authorisation for Subprocessors, with the notice period specified in Section 7.4);
  - **Clause 17 option 1** applies; the governing law is the law of **Ireland**;
  - **Clause 18(b)** specifies the courts of **Ireland**;
  - **Annex I** (parties, transfer description, supervisory authority) and **Annex II** (security measures) are populated by the Agreement, this DPA, and the Subprocessor List;
  - **Annex III** (Subprocessors) is the [Subprocessor List](./subprocessors.md).
- the **UK International Data Transfer Addendum** (issued by the ICO) for transfers from the UK, incorporated by reference. Tables 1–4 are populated by reference to this DPA and the Subprocessor List.
- additional supplementary measures where required by a Transfer Impact Assessment.

The parties will sign the SCCs and the UK Addendum on request.

---

## 9. Return and deletion of Customer Personal Data

### 9.1 During the term

Customer may export Customer Personal Data from the Service at any time using in-app export, API, or reports.

### 9.2 On termination

Within **thirty (30) days** of termination of the Agreement, OctiSight will, at Customer's choice:

- enable Customer to export Customer Personal Data through the Service; and
- delete Customer Personal Data from active production systems.

Customer Personal Data in **backups** will be deleted in line with the backup rotation cycle (currently 30 days) after which any residual copies are encrypted, isolated, and not used for processing.

OctiSight may retain Customer Personal Data to the extent required by applicable law, in which case OctiSight will continue to apply the protections of this DPA.

---

## 10. Assistance to Customer

### 10.1 Data Subject Requests

OctiSight will provide reasonable assistance to enable Customer to respond to Data Subject Requests, taking into account the nature of processing. Where a Data Subject contacts OctiSight directly, OctiSight will refer the request to Customer without undue delay unless legally prohibited.

### 10.2 DPIAs and consultations

OctiSight will provide reasonable assistance with:

- Data Protection Impact Assessments (Article 35 GDPR);
- prior consultations with supervisory authorities (Article 36 GDPR);
- Article 32, 33, and 34 obligations (security, breach notification);

taking into account the nature of processing and the information available to OctiSight.

### 10.3 Cost recovery

Assistance is provided without charge to the extent of OctiSight's normal cost of doing business. If a request requires materially greater effort, OctiSight may charge reasonable cost-recovery fees, agreed in advance.

---

## 11. Personal Data breach

OctiSight will notify Customer **without undue delay**, and in any event within **72 hours** of becoming aware, of any Personal Data breach affecting Customer Personal Data. The notification will include, to the extent known:

- the nature of the breach, including the categories and approximate number of Data Subjects and records affected;
- the likely consequences;
- the measures taken or proposed to address the breach and mitigate adverse effects;
- the name and contact of the OctiSight contact for further information.

OctiSight will update Customer as the investigation progresses. Customer remains responsible for notifying supervisory authorities and Data Subjects where required.

---

## 12. Audit rights

### 12.1 Information rights

OctiSight will make available to Customer all information reasonably necessary to demonstrate compliance with Article 28 GDPR, including:

- the SOC 2 report (when available) under NDA;
- this DPA, the Subprocessor List, and the Security Overview;
- responses to security questionnaires within a reasonable time frame.

### 12.2 Audits

Customer (or an independent auditor mandated by Customer and subject to confidentiality) may audit OctiSight's compliance with this DPA **once per calendar year**, on at least thirty (30) days' written notice, at Customer's expense, during business hours, and in a manner that does not unreasonably disrupt OctiSight's operations.

Additional audits may be conducted following a confirmed Personal Data breach affecting Customer Personal Data, or where required by a supervisory authority.

The auditor may not be a competitor of OctiSight. The scope and methodology must be agreed in writing in advance.

---

## 13. CCPA / CPRA service provider terms

Where Customer Personal Information includes personal information of California residents, OctiSight acts as a **Service Provider** under CCPA / CPRA and:

- will not sell or share personal information;
- will not retain, use, or disclose personal information for any purpose other than performing the services in the Agreement, or as otherwise permitted by CPRA Section 1798.140(ag);
- will not combine personal information received from Customer with personal information from other sources, except as permitted by CPRA;
- will comply with applicable obligations under CCPA / CPRA and provide the same level of privacy protection;
- will notify Customer if it determines it can no longer meet these obligations;
- grants Customer the right to take reasonable steps to stop and remediate unauthorised use of personal information.

---

## 14. Liability

The liability of each party under this DPA is subject to the limitations and exclusions of liability in the Agreement. Where the SCCs apply, the liability provisions of the SCCs apply as between the parties to those clauses.

---

## 15. Term and termination

This DPA enters into force on the effective date of the Agreement and terminates automatically when the Agreement terminates. Sections that by their nature should survive (audit obligations, breach notification, return/deletion, confidentiality) survive for as long as OctiSight processes any Customer Personal Data.

---

## 16. Governing law

This DPA is governed by the law specified in the Agreement, except that the SCCs are governed by the law specified in Section 8.

---

## 17. Order of precedence

In case of conflict:

1. the SCCs / UK Addendum (where applicable to a transfer);
2. this DPA;
3. the Agreement.

---

## 18. Contact

Privacy and DPA queries: `privacy@octisight.com`.
