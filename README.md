# Chicken Tights Labs — Portfolio Site

**AI Governance Dashboard & Salesforce Automation Portfolio**

A portfolio website showcasing Maria Robbins' expertise in Salesforce QA automation and AI governance. Features a live, interactive AI compliance dashboard demo.

## Overview

This site serves as both a professional portfolio and a working demonstration of AI governance concepts. It's built entirely on **free-tier infrastructure** — zero monthly hosting costs.

### Live Demo Features

The **AI Governance Dashboard** includes three interactive views:

1. **AI Model Registry** — Browse registered AI models and their compliance status
2. **Compliance Checker** — Run automated compliance checks against 8 governance policies
3. **Audit Trail** — Persistent log of all compliance checks (browser localStorage)

### Compliance Policies

The demo checks AI models against these governance policies:

| Policy | Severity | Description |
|--------|----------|-------------|
| GDPR Consent | High | EU data processing compliance |
| Bias/Fairness | High | Bias assessment results |
| Explainability | Medium | Model interpretability ≥ 70/100 |
| Data Retention | Medium | No indefinite data storage |
| Human Oversight | Critical | Required for High/Critical risk models |
| Performance Monitoring | Medium | Active drift detection |
| Vendor Security | High | Third-party security rating |
| Incident Response | High | Documented response procedures |

## Tech Stack

- **Frontend**: Vanilla HTML5, CSS3 (dark theme), JavaScript (ES6+)
- **Hosting**: Cloudflare Pages (Free)
- **Domain**: Cloudflare (user-owned)
- **Storage**: Browser localStorage (audit trail persistence)
- **Deploy**: GitHub → Cloudflare Pages (automatic)

## Architecture

```
┌────────────────────────────────┐
│    Cloudflare Pages (Free)    │
│  ── index.html                │
│  ── css/style.css             │
│  ── js/data.js (mock data)    │
│  ── js/app.js (client logic)  │
│  ── localStorage (audit log)  │
└───────────────────────────────┘
```

No backend, no database, no server costs. All logic runs client-side. Data persists in browser localStorage.

## Development

### Local Development

```bash
# Clone the repository
git clone https://github.com/chicken-tights-labs/chicken-rights-labs-portfolio.git
cd chicken-rights-labs-portfolio

# Open in browser (no build step needed)
npx serve .
# or just open index.html directly
```

### Deployment

1. Push to `main` branch on GitHub
2. Cloudflare Pages automatically rebuilds and deploys
3. Custom domain updates within seconds

## Roadmap

- [ ] Connect to live Salesforce org via REST API
- [ ] Add user authentication for audit trail
- [ ] Integrate with Salesforce DevOps Center
- [ ] Add AI model drift detection simulation
- [ ] Deploy to production domain

## About Maria

Senior Salesforce QA Automation Specialist learning AI agent orchestration. Combining a QA tester's instinct for "what breaks" with AI governance frameworks. Also building NBS Gym — a fencing & boxing coaching facility in Lexington, KY.

---

*Demo data is mock. Results do not reflect real AI model compliance.*
