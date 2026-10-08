# Chicken Tights Labs — Portfolio Site

**AI Agent Governance Dashboard & Salesforce Automation Portfolio**

A portfolio website showcasing Maria Robbins' expertise in Salesforce QA automation and AI agent governance. Features a live, interactive AI Agent Governance Dashboard demo.

> **Note**: "Chicken Tights Labs" is a cheeky umbrella brand — my mom thought that's what was for dinner. 🐔

## Overview

This site serves as both a professional portfolio and a working demonstration of AI agent governance concepts. It's built entirely on **free-tier infrastructure** — zero monthly hosting costs.

### Live Demo Features

The **AI Agent Governance Dashboard** includes four interactive views:

| Tab | Description |
|-----|-------------|
| **AI Agent Registry** | Browse all registered agents with ownership, risk, approval, and governance scores |
| **Ownership & Governance** | Ownership matrix + interactive governance check (validate any agent against policies) |
| **Governance Policies** | Documentation of 8 governance policies with full details |
| **Audit Trail** | Persistent log of all governance actions (browser localStorage) |

### Governance Policies

The demo validates AI agents against these enterprise governance policies:

| Policy | Category | Description |
|--------|----------|-------------|
| Agent Ownership | Ownership | Every agent must have a designated human owner |
| Approval Workflow | Approval | High/Critical risk agents need full approval chain |
| Regular Review | Review | All agents require periodic governance reviews |
| Performance Monitoring | Monitoring | Active monitoring for High/Critical risk agents |
| Incident Response | Response | Documented incident response procedures required |
| Change Management | Governance | All modifications must be logged and tracked |
| Data Access | Security | Least-privilege access principles |
| Audit Trail | Audit | Full action logging with timestamp and context |

### Sample Agents

The dashboard includes 8 mock AI agents with varying risk levels, owners, and governance states:

| Agent | Type | Owner | Risk | Governance Score |
|-------|------|-------|------|-----------------|
| Hermes-QA | Testing Agent | Maria Robbins | Medium | 100% |
| AutoDeploy Bot | CI/CD Agent | DevOps Team | High | 75% (approval pending) |
| ComplyBot | Governance Agent | Maria Robbins | Low | 88% |
| FairLearn | Bias Detection | Data Science Team | Medium | 88% (review overdue) |
| SalesforcePredict | Analytics | Sarah Chen | High | 100% |
| LeadScorer Pro | Lead Scoring | Marketing Team | Critical | 50% (non-compliant) |
| AuditTrail AI | Audit Logging | Maria Robbins | Low | 88% |
| ContentBot | Content Agent | Marketing Team | Medium | 75% (passive monitoring) |

## Tech Stack

- **Frontend**: Vanilla HTML5, CSS3 (dark theme), JavaScript (ES6+)
- **Hosting**: Cloudflare Pages (Free) — ready to deploy
- **Domain**: Cloudflare (user-owned: chickentightslabs.com)
- **Storage**: Browser localStorage (audit trail)
- **Deploy**: GitHub → Cloudflare Pages (automatic)
- **No backend, no database, no server costs**

## Architecture

```
┌─────────────────────────────────────────┐
│     Cloudflare Pages (Free)             │
│  ── index.html                          │
│  ── css/style.css (dark theme)          │
│  ── js/data.js (mock agent data)        │
│  ── js/app.js (client-side logic)       │
│  ── localStorage (audit trail)           │
└─────────────────────────────────────────┘
```

All logic runs client-side. No API keys, no server, no database. Data persists in browser localStorage.

## Development

```bash
git clone https://github.com/chicken-tights-labs/chicken-tights-labs-portfolio.git
cd chicken-tights-labs-portfolio
# No build step — just open index.html
npx serve .
```

## Deployment

1. Push to `main` branch on GitHub
2. Connect to Cloudflare Pages (one-time setup)
3. Automatic builds on every push

## Roadmap

- [ ] Deploy to Cloudflare Pages with custom domain
- [ ] Connect governance check to live Salesforce org (Phase 2)
- [ ] Build NBS Gym Trainer/Member App (lightweight Salesforce-CRM bridge)
- [ ] Add agent comparison and risk heat map views
- [ ] Add authentication for persistent audit trail

## NBS Gym Trainer/Member App (Phase 2)

A lightweight web app for trainers and members to manage:
- Class bookings and attendance
- Progress tracking
- Member onboarding
- **Integrates with Salesforce CRM backend** — collects data via REST API without requiring per-user Salesforce licenses

This solves a real enterprise problem: how to extend Salesforce's value to end users without paying for full licenses per user.

## About Maria

Senior Salesforce QA Automation Specialist learning AI agent orchestration. Combining a QA tester's instinct for "what breaks" with AI governance frameworks focused on agent ownership and responsible parties. Also building NBS Gym — a fencing & boxing coaching facility in Lexington, KY.

---

*Demo data is mock. Governance scores do not reflect real agent assessments.*
