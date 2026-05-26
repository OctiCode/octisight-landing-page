# Subprocessor List

**Effective date:** 26 May 2026
**Version:** 1.0

This page lists the third-party subprocessors OctiSight engages to provide the Service. It is referenced by, and forms part of, our [Data Processing Agreement](./data-processing-agreement.md).

We notify customers of new or replacement subprocessors at least **thirty (30) days** in advance, by email and by updating this page. To subscribe to changes, email `privacy@octisight.com`.

---

## How to read this list

- **Purpose** what the subprocessor does for OctiSight.
- **Personal data processed** the categories of personal data the subprocessor may have access to.
- **Hosting region** primary region. Some subprocessors operate global infrastructure.
- **Transfer mechanism** applicable safeguard for transfers outside the UK / EEA / Morocco (SCCs, UK Addendum, EU-U.S. Data Privacy Framework, etc.).

---

## Infrastructure subprocessors

| Subprocessor                                         | Purpose                                                                            | Personal data processed                                            | Hosting region                            | Transfer mechanism                     |
|------------------------------------------------------|------------------------------------------------------------------------------------|--------------------------------------------------------------------|-------------------------------------------|----------------------------------------|
| **Hetzner Online GmbH**                              | Primary application and database hosting (VPSes, private network, block storage)   | All Customer Data hosted in the Service                            | Germany (Falkenstein / Nuremberg)         | Within EEA, no transfer                |
| **Oracle Cloud Infrastructure** (Oracle Corporation) | Optional regional hosting                                                          | All Customer Data for customers whose org is hosted in this region | United Kingdom; Morocco (where available) | UK Addendum where transferred from EEA |
| **Google LLC, Firebase Storage**                     | Storage of static, non-sensitive assets (e.g., uploaded org logos used in reports) | Limited, uploaded image files; no Customer-Data scan results       | EU (multi-region)                         | SCCs; EU-U.S. Data Privacy Framework   |

---

## Application service subprocessors

| Subprocessor                    | Purpose                                       | Personal data processed                                                                                     | Hosting region         | Transfer mechanism                   |
|---------------------------------|-----------------------------------------------|-------------------------------------------------------------------------------------------------------------|------------------------|--------------------------------------|
| **Mailgun Technologies, Inc.**  | Transactional and notification email delivery | Recipient email address, name, content of notifications                                                     | EU region (Frankfurt)  | SCCs; EU-U.S. Data Privacy Framework |
| **Stripe Payments Europe Ltd.** | Payment processing for paid plans             | Billing contact name, billing address, payment instrument metadata (card data submitted directly to Stripe) | Ireland; United States | SCCs; EU-U.S. Data Privacy Framework |

---

## AI / LLM subprocessors

OctiSight uses third-party LLM providers to power AI features (level-aware explanations, remediation guidance, lab setup generation, executive narratives, chatbot). LLM Providers receive **only the prompt content necessary** for the requested feature typically vulnerability metadata and limited asset context. AI responses are cached server-side for 24 hours.

OctiSight contractually requires its LLM Providers **not to use Customer Data for training**.

---

## Customer-initiated integrations

The following are integrations that **you choose to connect** from within OctiSight. We share data with them only when, and to the extent that, you configure the integration. They are listed here for transparency.

| Integration                                   | Triggered by                         | Data flow                                                                                    |
|-----------------------------------------------|--------------------------------------|----------------------------------------------------------------------------------------------|
| **GitHub** (GitHub, Inc.)                     | You connect an org or repo via OAuth | OctiSight reads repository metadata, commits, files, and dependency manifests on your behalf |
| **GitLab** (GitLab, Inc.)                     | You connect via OAuth                | As above                                                                                     |
| **Bitbucket / Atlassian** (Atlassian Pty Ltd) | You connect via OAuth                | As above                                                                                     |
| **Slack** (Slack Technologies, LLC)           | You configure an incoming webhook    | OctiSight posts notifications to the Slack channel you specify                               |
| **Microsoft Teams** (Microsoft Corporation)   | You configure an incoming webhook    | OctiSight posts notifications to the Teams channel you specify                               |
| **Custom webhooks**                           | You configure a webhook URL          | OctiSight POSTs HMAC-signed payloads to the URL you specify                                  |

Once data leaves OctiSight to a destination you have configured, **that provider's privacy practices apply**, not OctiSight's.

---

## Where personal data is not transferred

OctiSight does **not** share Customer Personal Data with:

- advertising networks;
- data brokers;
- analytics providers (except for marketing-site GA, which does not process Customer Data, see the [Cookie Policy](./cookie-policy.md));
- any party not listed in this document.

---

## Version history

| Date       | Change                           |
|------------|----------------------------------|
| 2026-05-26 | Initial publication, version 1.0 |
