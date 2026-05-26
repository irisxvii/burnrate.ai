## North Star Metric

The main goal of BurnRate.ai is not maximizing daily usage, but generating high-intent leads from companies actively evaluating AI spend.
Since this is a B2B tool around AI spend optimization, a “successful” user isn’t just someone who tries it, but someone who finishes an audit and sees enough value to leave their details.

So instead of tracking things like DAU, the focus is on:
- completed audits
- users who go through the full flow
- leads tied to meaningful savings opportunities

This means:
- user engagement matters
- but business value matters more

A qualified audit is basically:
- user completes the flow
- audit gets generated
- lead capture step is reached
- there’s actual optimization value in the result

---

## Input Metrics

### 1. Audit Completion Rate

Percentage of users who start the onboarding flow and reach the results page.
This helps check if the onboarding experience feels understandable.

---

### 2. Lead Capture Conversion Rate

Percentage of completed audits that are saved/shared through the lead capture flow.
This indicates if users perceive enough value in the generated report to exchange contact information.

---

### 3. Shareable Report Generation Rate

Percentage of audits that generate public report links.
This metric helps measure whether users find the audit valuable enough to share externally.

---

## What I’d Instrument First

The first analytics events I would track are:

- `audit_started`
- `audit_completed`
- `lead_submitted`
- `public_report_viewed`

---

## Pivot Trigger

If fewer than 10% of audits get saved or shared after real usage, something is probably off.

That would suggest users either:

- Do not trust the recommendations
- Do not perceive enough value in the output
- Do not feel the results are worth saving or sharing