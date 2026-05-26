# Terms of Service

**Effective date:** 26 May 2026
**Version:** 1.0

These Terms of Service ("**Terms**") govern your access to and use of the OctiSight platform, including the application at `app.octisight.io`, the marketing website at `octisight.com`, the OctiSight CLI distributed via npm, and any related APIs, integrations, or documentation (collectively, the "**Service**").

By creating an account, accessing the Service, or agreeing to these Terms in any signup flow, you ("**Customer**", "**you**") enter into a binding agreement with OctiSight (defined below).

---

## 1. The OctiSight contracting entity

The OctiSight entity that contracts with you ("**OctiSight**", "**we**", "**us**") depends on the entity identified at signup or on your applicable order form:

- **OctiSight LTD**, a company incorporated in England & Wales (registered office: 71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom; for customers in the European Union, European Economic Area, United Kingdom, United States, and rest of the world unless otherwise agreed.
- **OctiSight SARL**, a company incorporated in Morocco (registered office: 78 BD La Résistance, Résidence El Marzouki, Casablanca 20250, Morocco; for customers in Africa and the MENA region, and where local invoicing is preferred.

Where these Terms refer to "OctiSight", they refer to the applicable contracting entity.

---

## 2. Eligibility and accounts

### 2.1 Age and capacity

The Service is intended for business use. You must be **at least 18 years old** and authorised to bind the organisation you represent. OctiSight does not knowingly collect personal data from minors.

### 2.2 Account registration

You must provide accurate registration information and keep it current. You are responsible for all activity that occurs under your account credentials, API keys, and scan tokens. Notify us promptly at `security@octisight.com` if you suspect unauthorised access.

### 2.3 Organisations and roles

OctiSight is organised around organisations ("**orgs**"). A user may belong to multiple orgs. Each org is isolated, and access within an org is governed by a five-role RBAC model (owner, admin, security lead, developer, viewer). The owner of an org is responsible for managing membership, billing, and configuration.

---

## 3. Free trial, paid plans, and enterprise agreements

### 3.1 Free trial

OctiSight offers a free trial of the Service. The trial duration and feature scope are described at signup. Trial accounts are provided on an "as-is" basis without any service level commitment and may be modified, suspended, or terminated by OctiSight at any time.

### 3.2 Paid plans

Paid use of the Service requires a separate written or electronic order form, statement of work, or sales agreement (an "**Order Form**") executed between you and OctiSight. The Order Form specifies the plan, fees, billing cadence (monthly or annual), term, included entitlements (orgs, seats, scans, AI credits, etc.), and any plan-specific terms.

### 3.3 Enterprise agreements

Enterprise customers may negotiate custom terms, including dedicated subprocessor restrictions, custom data-residency commitments, custom SLAs, and security riders. Where an executed Enterprise Agreement conflicts with these Terms, the Enterprise Agreement controls.

---

## 4. Billing, taxes, and payment

### 4.1 Payment processor

Payments for paid plans are processed by **Stripe Payments Europe Ltd.** (and its affiliates). Your payment details are submitted directly to Stripe; OctiSight does not store full card numbers.

### 4.2 Fees

Fees are set out in your Order Form. Unless otherwise specified:

- **Monthly plans** are billed monthly in advance.
- **Annual plans** are billed annually in advance.
- Fees are **exclusive of VAT, TVA, sales tax, and other applicable taxes**, which you are responsible for paying.

### 4.3 Late payment

If an invoice is not paid by its due date, we may suspend the Service after at least seven (7) days' written notice and may charge interest at the statutory rate in the contracting entity's jurisdiction.

### 4.4 Refunds

Refunds are governed by our **[Refund Policy](./refund-policy.md)**, which forms part of these Terms.

### 4.5 Renewal and cancellation

Paid subscriptions auto-renew for successive terms equal to the initial term unless cancelled before the renewal date through the in-app billing settings or by emailing `support@octisight.com`. You may cancel at any time; cancellation takes effect at the end of the then-current billing period.

---

## 5. Acceptable use

Your use of the Service is subject to the **[Acceptable Use Policy](./acceptable-use-policy.md)**, which forms part of these Terms. In particular, you must only scan assets that you own or have explicit written authorisation to scan. Misuse may result in immediate suspension or termination.

---

## 6. Customer data and privacy

### 6.1 Definitions

"**Customer Data**" means all data, content, code, configuration, scan results, SBOMs, and other information that you or your users submit to or generate within the Service. This includes vulnerability data correlated against your assets but excludes the underlying public vulnerability feed data, which OctiSight maintains.

### 6.2 Ownership

As between you and OctiSight, **you retain all rights, title, and interest in Customer Data**. You grant OctiSight a worldwide, non-exclusive, royalty-free licence to host, process, transmit, display, and otherwise use Customer Data solely as necessary to provide and improve the Service, to comply with law, and as permitted by these Terms.

### 6.3 Privacy

OctiSight processes personal data in accordance with our **[Privacy Policy](./privacy-policy.md)**. Where OctiSight processes personal data on your behalf, the **[Data Processing Agreement](./data-processing-agreement.md)** applies.

### 6.4 Aggregated and anonymised data

OctiSight may generate aggregated, de-identified statistics from Customer Data (e.g., "average MTTR across all orgs") for benchmarking, product improvement, and analytics. Such data does not identify you or any individual and is not Customer Data.

### 6.5 AI features

The Service uses third-party large language models ("**LLM Providers**") to power features such as level-aware vulnerability explanations, remediation guidance, lab setup generation, and executive narratives. By using these features, you agree that the relevant vulnerability metadata, asset context, and prompt content may be transmitted to LLM Providers for processing. OctiSight does not use Customer Data to train any third-party LLM.

A current list of LLM Providers is maintained in the **[Subprocessor List](./subprocessors.md)**.

---

## 7. Integrations and third-party services

The Service supports integrations with third-party services, including source-code providers (GitHub, GitLab, Bitbucket), messaging platforms (Slack, Microsoft Teams), email infrastructure (Mailgun), and others. When you enable an integration:

- you authorise OctiSight to access, on your behalf, the data and capabilities the integration requires;
- your use of the third-party service is governed by **that provider's own terms**, not these Terms;
- OctiSight is **not responsible** for third-party services, including availability, accuracy, or changes in their APIs;
- you may revoke OAuth authorisations at any time from the third-party provider; doing so may impair the Service.

---

## 8. OctiSight intellectual property

The Service, including its source code, design, documentation, brand, vulnerability correlation database, AI prompts, and all underlying technology, is owned by OctiSight and its licensors and is protected by intellectual property law. Except for the limited right to use the Service as set out in these Terms, **no rights are granted to you in the Service**.

You must not:

- copy, modify, reverse engineer, decompile, or attempt to derive the source code of the Service, except where such restriction is unenforceable under applicable law;
- resell, sublicense, or provide the Service as a managed service to third parties without our prior written agreement;
- remove or obscure any proprietary notices;
- use the Service to build a competing product.

### 8.1 Feedback

If you provide feedback, suggestions, or feature requests, you grant OctiSight a perpetual, irrevocable, royalty-free licence to use them without restriction or attribution.

---

## 9. Service availability

### 9.1 Free trial

The free trial is provided **without any service level commitment**. We may modify, suspend, or discontinue the trial at any time, with or without notice.

### 9.2 Paid plans

For paid plans, OctiSight commits to the uptime targets set out in the **[Service Level Agreement](./service-level-agreement.md)**, where applicable.

### 9.3 Scheduled maintenance

OctiSight may conduct planned maintenance. We aim to provide reasonable advance notice for any maintenance that is likely to cause material disruption, posted via the in-app banner, status page, or email.

### 9.4 Beta features

Features designated as "beta", "preview", "alpha", or "experimental" are provided **as-is**, may change or be discontinued, and are excluded from any SLA.

---

## 10. Security

OctiSight implements technical and organisational measures appropriate to the sensitivity of the data the Service handles. A summary is available in the **[Security Overview](./security-policy.md)**. You are responsible for the security of credentials within your control, including API keys, scan tokens, and integration secrets.

### 10.1 Reporting vulnerabilities

Security researchers and customers may report vulnerabilities in the Service under our **[Vulnerability Disclosure Policy](./vulnerability-disclosure-policy.md)**.

---

## 11. Confidentiality

Each party ("**Receiving Party**") agrees to treat as confidential any non-public business, technical, or financial information disclosed by the other party ("**Disclosing Party**") that is marked as confidential or that a reasonable person would understand to be confidential. The Receiving Party will use such information only to perform under these Terms and will protect it with no less care than it uses for its own confidential information of similar sensitivity, and in any event with reasonable care. This Section survives termination for three (3) years; trade secrets are protected for as long as they remain trade secrets under applicable law.

---

## 12. Warranties and disclaimers

### 12.1 Mutual warranties

Each party warrants that it has the legal power to enter into these Terms.

### 12.2 Service disclaimer

**The Service is provided "as is" and "as available".** To the maximum extent permitted by law, OctiSight disclaims all other warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, non-infringement, and warranties arising from course of dealing or trade usage.

OctiSight does not warrant that:

- the Service will detect every vulnerability in your assets;
- AI-generated outputs are accurate, complete, or free of error;
- vulnerability data ingested from third-party feeds (NVD, CISA KEV, EPSS, OSV, GHSA, MITRE, Red Hat, Microsoft) is complete, current, or correctly classified;
- the Service will be uninterrupted or error-free.

**The Service is a tool to assist your security programme. It is not a substitute for qualified security personnel, formal risk assessment, or independent verification.**

### 12.3 Consumer rights

Nothing in these Terms limits any non-excludable rights you may have under applicable consumer protection law.

---

## 13. Indemnification

### 13.1 By OctiSight

OctiSight will defend you against any third-party claim alleging that your authorised use of the Service infringes that third party's intellectual property rights and will pay any damages finally awarded, provided you promptly notify us of the claim, give us sole control of the defence, and reasonably co-operate.

If such a claim is made or reasonably appears likely, OctiSight may, at its option, (a) procure the right for you to continue using the Service, (b) modify the Service so it becomes non-infringing, or (c) terminate the affected portion of the Service and refund any pre-paid fees for the unused remainder of the term. **This is OctiSight's entire liability for IP infringement.**

### 13.2 By Customer

You will defend OctiSight against any third-party claim arising from (a) your use of the Service in breach of these Terms or the Acceptable Use Policy, (b) Customer Data, including any claim that Customer Data infringes a third party's rights, or (c) your scanning of assets you did not own or have authorisation to scan.

### 13.3 Exclusions

OctiSight's indemnity does not cover claims arising from (a) Customer Data, (b) use of the Service in combination with anything not provided by OctiSight, (c) modifications to the Service not made by OctiSight, or (d) use of the Service after notice of an alleged infringement.

---

## 14. Limitation of liability

### 14.1 Cap on liability

To the maximum extent permitted by law, **each party's total aggregate liability arising out of or relating to these Terms shall not exceed the greater of (a) the fees you paid to OctiSight in the twelve (12) months preceding the event giving rise to the liability, or (b) one hundred euros (€100)** (or local-currency equivalent).

### 14.2 Excluded damages

To the maximum extent permitted by law, **neither party shall be liable for any indirect, consequential, incidental, special, exemplary, or punitive damages, or for lost profits, lost revenue, lost data, loss of goodwill, or business interruption**, even if advised of the possibility of such damages.

### 14.3 Excluded from caps

The caps and exclusions above do not apply to (a) Customer's payment obligations, (b) either party's indemnification obligations, (c) breach of confidentiality, (d) Customer's breach of Sections 5 (Acceptable Use) or 8 (Intellectual Property), or (e) liability that cannot be excluded under applicable law (including liability for fraud, death, or personal injury caused by negligence).

---

## 15. Suspension

OctiSight may suspend your access to all or part of the Service, with or without notice, if:

- you fail to pay an undisputed invoice when due (after a 7-day cure period);
- your use violates the **Acceptable Use Policy** or threatens the security, availability, or integrity of the Service;
- we are required to do so by law, court order, or regulator;
- continued provision would expose OctiSight to material legal or security risk.

We will restore access promptly once the cause for suspension is resolved.

---

## 16. Term and termination

### 16.1 Term

These Terms begin when you first accept them and continue until terminated as set out in this Section.

### 16.2 Termination for convenience

You may terminate your account at any time from the in-app settings or by emailing `support@octisight.com`. OctiSight may terminate a free trial at any time. OctiSight may terminate paid plans for convenience on thirty (30) days' written notice.

### 16.3 Termination for cause

Either party may terminate immediately on written notice if the other party (a) materially breaches these Terms and fails to cure within thirty (30) days of written notice (or seven (7) days for payment breaches), or (b) becomes insolvent, enters administration, or is the subject of a bankruptcy or analogous proceeding.

### 16.4 Effect of termination

On termination:

- your right to access the Service ends;
- accrued payment obligations survive;
- Customer Data is **retained for thirty (30) days** after termination to allow export and recovery, then **permanently deleted** from active systems. Backups containing Customer Data are deleted in accordance with our backup-rotation cycle (see the [Security Overview](./security-policy.md)).

You may request earlier deletion by emailing `privacy@octisight.com`. Sections that by their nature should survive termination (IP, confidentiality, indemnities, limitation of liability, dispute resolution, accrued payment) survive.

---

## 17. Compliance with law and export control

You will use the Service in compliance with all applicable laws, including data protection law, export control law, and sanctions law. You represent that you are not located in, under the control of, or a national of any country subject to comprehensive trade sanctions, and that you are not on any restricted-party list.

---

## 18. Modifications to these Terms

OctiSight may update these Terms from time to time. **Material changes** will be communicated at least thirty (30) days in advance via email to your account address or in-app notification. Continued use after the effective date of an updated version constitutes acceptance. If you do not agree, you may terminate the Service as set out in Section 16.

Non-material changes (clarifications, formatting, contact details) take effect on publication.

---

## 19. Governing law and dispute resolution

### 19.1 Customers contracting with OctiSight LTD

These Terms, and any dispute or claim arising out of or in connection with them, are governed by the **laws of England and Wales**, without regard to conflict-of-laws principles. The courts of **England and Wales** have exclusive jurisdiction, except that either party may seek injunctive relief in any competent court.

### 19.2 Customers contracting with OctiSight SARL

These Terms, and any dispute or claim arising out of or in connection with them, are governed by the **laws of the Kingdom of Morocco**. The courts of **Casablanca, Morocco** have exclusive jurisdiction, except that either party may seek injunctive relief in any competent court.

### 19.3 Mandatory consumer protections

Nothing in this Section deprives any party that is a consumer of mandatory protections available under the law of its country of habitual residence.

---

## 20. General

### 20.1 Entire agreement

These Terms, together with the Privacy Policy, DPA, Acceptable Use Policy, Refund Policy, Subprocessor List, any applicable Order Form, and other policies referenced herein, constitute the entire agreement between the parties and supersede all prior agreements on the subject.

### 20.2 Order of precedence

If there is a conflict, the order of precedence is: (1) executed Enterprise Agreement or Order Form, (2) Data Processing Agreement, (3) these Terms, (4) Acceptable Use Policy and other policies, (5) the Privacy Policy.

### 20.3 No waiver

Failure to enforce any right is not a waiver. A waiver is effective only if in writing and signed by the waiving party.

### 20.4 Severability

If any provision is held unenforceable, it will be modified to the minimum extent necessary, and the remaining provisions remain in effect.

### 20.5 Assignment

You may not assign these Terms without our prior written consent. We may assign these Terms to an affiliate or to a successor in connection with a merger, acquisition, or sale of assets, on written notice.

### 20.6 Force majeure

Neither party is liable for failure to perform due to causes beyond its reasonable control, including acts of God, war, terrorism, riots, embargoes, natural disasters, internet outages, third-party infrastructure failure, or governmental action.

### 20.7 Independent contractors

The parties are independent contractors. Nothing in these Terms creates a partnership, joint venture, agency, or employment relationship.

### 20.8 Notices

Notices to OctiSight must be sent to `legal@octisight.com`. Notices to you will be sent to the email address on your account.

### 20.9 Third-party beneficiaries

These Terms confer no rights on any third party, except that OctiSight's affiliates may enforce provisions intended for their benefit. The Contracts (Rights of Third Parties) Act 1999 is otherwise excluded.

---

## 21. Contact

- **General / legal:** `legal@octisight.com`
- **Sales (paid plans):** `sales@octisight.com`
- **Support:** `support@octisight.com`
- **Privacy / data requests:** `privacy@octisight.com`
- **Security disclosures:** `security@octisight.com`
