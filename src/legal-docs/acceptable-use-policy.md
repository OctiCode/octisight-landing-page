# Acceptable Use Policy

**Effective date:** 26 May 2026
**Version:** 1.0

This Acceptable Use Policy ("**AUP**") describes prohibited uses of the OctiSight platform, including the application at `app.octisight.io`, the marketing site at `octisight.com`, the OctiSight CLI, our APIs, and related services (collectively, the "**Service**").

The AUP forms part of the [Terms of Service](./terms-of-service.md). Violating the AUP may result in **immediate suspension or termination** of your account.

Because OctiSight is a security tool that scans code, dependencies, and software, the AUP is stricter. **Misuse of a security tool can cause real harm.** Read it.

---

## 1. The authorisation rule (the single most important rule)

> **You may only use OctiSight to scan, ingest, or analyse assets, code, dependencies, or software that you own or that you have explicit written authorisation to scan from the owner.**

This rule covers all forms of scanning offered by the Service:

- Dependency scanning of code repositories;
- SAST (static analysis) of code;
- SBOM ingestion of third-party software;
- Asset inventory of third-party applications and operating systems;
- Triggering scans via the CLI or API;
- Any future scan type.

If you do not own the asset, you must have a clear, written agreement (a contract, a statement of work, an explicit grant of authority from a senior representative, or equivalent) that authorises you to scan it. **You are responsible for documenting that authorisation** and producing it on request.

---

## 2. Prohibited uses

You must not use the Service to:

### 2.1 Unauthorised scanning and reconnaissance

- Scan or ingest assets, repositories, software, or networks belonging to a third party without explicit written authorisation.
- Use OctiSight as part of an unsolicited security assessment, penetration test, or "bug bounty hunt" against a party that has not authorised your activity.
- Conduct reconnaissance, scanning, or vulnerability research against the OctiSight Service itself outside the scope of our [Vulnerability Disclosure Policy](./vulnerability-disclosure-policy.md).

### 2.2 Offensive use of vulnerability data

- Use OctiSight's vulnerability data, AI-generated explanations, remediation guidance, lab setups, or demonstration scripts to **attack systems you do not own or are not authorised to test**.
- Develop, distribute, or sell exploit code or weaponised proof-of-concept material derived from the Service.
- Aggregate or republish OctiSight's correlated vulnerability database, AI outputs, or feed-derived intelligence as a competing product or commercial dataset.

### 2.3 Abuse of integrations and webhooks

- Configure webhooks, integrations, or notification channels you are not authorised to operate.
- Use OctiSight webhooks to send unsolicited or harassing content to third-party endpoints.
- Misuse OAuth grants for source-code providers to access repositories beyond the scope authorised by the resource owner.

### 2.4 Abuse of AI features

- Use AI-generated outputs to deceive, defraud, or impersonate.
- Submit prompts intended to extract proprietary OctiSight prompts, system instructions, or other users' data.
- Use AI features to generate content that violates applicable law (including export control law) or third-party rights.
- Treat AI outputs as a substitute for qualified human security review, particularly for high-impact systems.

### 2.5 Platform abuse

- Exceed the rate limits, scan limits, AI-credit limits, or fair-use limits of your plan, except as agreed in writing.
- Attempt to bypass authentication, RBAC, org isolation, scan-token branch bindings, or API key scopes.
- Reverse engineer, decompile, or otherwise attempt to derive source code, internal APIs, or AI prompts from the Service, except where such restriction is unenforceable under applicable law.
- Resell or sublicense the Service or provide it as a managed service to third parties without prior written agreement.

### 2.6 Illegal or harmful content and conduct

- Upload, store, or transmit content that is unlawful, infringing, defamatory, obscene, harassing, or threatening.
- Upload, store, or transmit malware, ransomware, exploit code, or any code designed to damage, interfere with, or surreptitiously intercept any system.
- Upload personal data of third parties without lawful basis.
- Use the Service in a way that violates export control law, sanctions law, or the rights (including IP rights) of any third party.

### 2.7 Disrupting the Service

- Interfere with or disrupt the integrity, performance, or availability of the Service, including through denial-of-service attacks, automated scraping in violation of our limits, or load testing without prior written authorisation.
- Probe, scan, or test the vulnerability of the Service except under our [Vulnerability Disclosure Policy](./vulnerability-disclosure-policy.md).

### 2.8 Account misuse

- Share account credentials, API keys, or scan tokens with anyone outside the org they are scoped to.
- Create multiple accounts to evade limits, suspensions, or terminations.
- Misrepresent your identity, role, or authority to scan an asset.

---

## 3. Reasonable use of dual-use features

Some OctiSight features are inherently dual-use: AI-generated lab setups, demonstration scripts, and remediation guidance are intended to help defenders **understand** vulnerabilities so they can fix them. They are not provided as attack tooling.

You agree to use these features only:

- against systems and code you own or are authorised to test;
- in isolated, non-production lab environments where applicable;
- with the goal of defence, learning, training, or remediation;
- in compliance with applicable law.

If you are unsure whether your intended use is acceptable, contact `legal@octisight.com` before proceeding.

---

## 4. Customer-controlled compliance

Your obligations under this AUP apply to **all users in your organisation**. Owners and admins are responsible for ensuring members understand and follow this AUP. This includes:

- ensuring that scan tokens are not exfiltrated from CI pipelines;
- limiting RBAC roles appropriately;
- managing API keys with care;
- training new members on what they may and may not scan.

---

## 5. Reporting abuse

If you become aware of a violation of this AUP, whether by another OctiSight customer, by someone using OctiSight to attack you, or by your own organisation, please report it:

- **Security or attack-related abuse:** `security@octisight.com`
- **Other AUP violations:** `legal@octisight.com`

Include as much detail as you can: the org, the timeframe, the affected asset, and any logs or links. We treat reports confidentially and may, but are not obligated to, share the outcome with the reporter.

---

## 6. Enforcement

OctiSight may, at its sole discretion and without prior notice where the conduct presents material risk to the Service, to other customers, or to third parties:

- request information about your use of the Service;
- restrict or suspend specific features (e.g., disable scan triggers, throttle API keys);
- suspend or terminate the offending user, org, or account;
- delete content that violates this AUP;
- preserve and disclose information to law enforcement where required by law or to protect rights, property, or safety;
- pursue any other remedy available at law or equity.

We will give notice and an opportunity to cure where the violation is minor and curable. We will not give notice where the violation is severe, ongoing, or likely to cause harm.

---

## 7. Reinstatement

If your account has been suspended for an AUP violation, you may request reinstatement by writing to `legal@octisight.com`. Reinstatement is at OctiSight's discretion and may be conditioned on (a) remediation steps, (b) written undertakings, and (c) additional contractual terms.

---

## 8. Updates

We may update this AUP from time to time. Material changes will be communicated at least thirty (30) days in advance through email or in-app notification. Continued use after the effective date constitutes acceptance.

---

## 9. Contact

- **AUP questions:** `legal@octisight.com`
- **Report abuse:** `security@octisight.com`
