# Service Level Agreement (SLA)

**Effective date:** 26 May 2026
**Version:** 1.0

This Service Level Agreement ("**SLA**") sets out the availability commitment that OctiSight makes for paid plans of the Service. It forms part of the [Terms of Service](./terms-of-service.md).

**The free trial is provided without any service level commitment.** This SLA applies only to paid plans, and only where the applicable Order Form does not specify different SLA terms.

For Enterprise customers, the Order Form or master agreement may specify higher SLA tiers (for example, 99.95%, faster credit calculations, or escalation paths). Where it does, the Order Form controls.

---

## 1. Definitions

- "**Service**" means the OctiSight production application at `app.octisight.io` and its associated APIs, excluding the marketing site, documentation, and any Beta Services.
- "**Available**" means the Service responds to authenticated requests with non-5xx HTTP responses within reasonable latency.
- "**Downtime**" means any period during which the Service is not Available, **excluding Excused Downtime** (see Section 4).
- "**Monthly Uptime Percentage**" means: `(Total Minutes in Month − Downtime Minutes) ÷ Total Minutes in Month × 100`.
- "**Service Credit**" means a credit applied to a future invoice as the sole remedy for missing the Uptime Commitment.

---

## 2. Uptime commitment

OctiSight commits to a **Monthly Uptime Percentage of 99.5%** for paid plans, measured per calendar month.

Higher tiers may be available in your Order Form.

---

## 3. Service Credits

If the Service fails to meet the Uptime Commitment in a calendar month, you are entitled to a Service Credit calculated as follows:

| Monthly Uptime Percentage                  | Service Credit (% of monthly fee for affected service) |
|--------------------------------------------|--------------------------------------------------------|
| Less than **99.5%** and at least **99.0%** | **10%**                                                |
| Less than **99.0%** and at least **95.0%** | **25%**                                                |
| Less than **95.0%**                        | **50%**                                                |

### 3.1 Maximum credit

The total Service Credit for any single month will not exceed **50% of the monthly fee** paid for the affected service in the month in which the Downtime occurred.

### 3.2 Form of credit

Service Credits are applied as a credit against future invoices. They are **not refundable in cash** and have no monetary value outside the Service.

### 3.3 Sole remedy

Service Credits are your **sole and exclusive remedy** for any failure to meet the SLA, except where a non-excludable statutory remedy applies.

---

## 4. Excused Downtime

The following are excluded when calculating Downtime:

1. **Scheduled maintenance**, announced at least **48 hours in advance** via in-app banner, email, or status page;
2. **Emergency maintenance** required to address a vulnerability, threat, or imminent risk to the Service, customers, or third parties;
3. **Force majeure** events beyond OctiSight's reasonable control, including but not limited to natural disasters, war, terrorism, government action, civil unrest, large-scale internet outages, third-party network failures, and pandemics;
4. **Third-party failures**, including failures of upstream infrastructure providers (e.g., Hetzner, Oracle Cloud) that are not caused by OctiSight, and failures of customer-side connections;
5. **Customer fault**, including misuse, breach of the [Terms of Service](./terms-of-service.md) or [Acceptable Use Policy](./acceptable-use-policy.md), abuse of API rate limits, or configurations that materially impair the Service;
6. **Beta features**, alpha features, preview features, and any feature labelled experimental;
7. **Suspension** of your account in accordance with the Agreement;
8. **DDoS attacks or other malicious activity** directed at the Service.

---

## 5. How to claim a Service Credit

To claim a Service Credit, you must:

1. **Submit a written claim** to `support@octisight.com` within **thirty (30) days** of the end of the calendar month in which the Downtime occurred;
2. Include in the claim:
   - your account / organisation identifier;
   - the dates and times of the Downtime;
   - a brief description of the issue;
   - any logs, screenshots, or other supporting evidence.

We will respond within thirty (30) days, either applying the credit to your next invoice or explaining why the claim does not qualify. Claims submitted after thirty days will not be considered.

---

## 6. SLA reporting

OctiSight publishes incident notices and Service availability information on its status page. Customers may subscribe to status updates via the status page.

---

## 7. Changes to this SLA

OctiSight may update this SLA from time to time. **Material changes that reduce the Uptime Commitment** will be communicated at least sixty (60) days in advance, and you may terminate the affected service if you do not agree. Non-material changes take effect on publication.

---

## 8. Contact

- **SLA claims and questions:** `support@octisight.com`
- **Enterprise SLA discussions:** `sales@octisight.com`
