# Chicken Tights Labs — Portfolio Site

**AI Agent Governance Dashboard & Salesforce Automation Portfolio**

A portfolio website showcasing Maria Robbins' expertise in Salesforce QA automation and AI agent governance. Features a live, interactive AI Agent Governance Dashboard demo with agent registration, RACI assignment, and enterprise policy validation.

> **Note**: "Chicken Tights Labs" is a cheeky umbrella brand — my mom thought that's what was for dinner. 🐔

## Overview

This site serves as both a professional portfolio and a working demonstration of AI agent governance concepts. Built entirely on **free-tier infrastructure** — zero monthly hosting costs.

### Live Demo Features

The **AI Agent Governance Dashboard** includes five interactive views:

| Tab | Description |
|-----|-------------|
| **AI Agent Registry** | Browse all registered agents with ownership, risk, RACI status, and governance scores |
| **Ownership & Governance** | Ownership matrix (with RACI coverage) + interactive governance check |
| **Register New Agent** | Register a new AI agent — system auto-generates approval chains and RACI assignments |
| **Governance Policies** | Documentation of 9 governance policies with full details |
| **Audit Trail** | Persistent log of all actions (browser localStorage) |

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
| **RACI Assignment** | **Ownership** | Every agent must have Responsible, Accountable, Consulted, Informed roles defined |

The **RACI Assignment Policy** is the key insight: most enterprises don't define RACI for AI agents, creating a critical accountability gap. This dashboard flags missing or incomplete RACI assignments as governance violations.

### Sample Agents

The dashboard includes 8 mock AI agents plus the ability to register unlimited custom agents:

| Agent | Type | Owner | Risk | RACI | Governance Score |
|-------|------|-------|------|------|-----------------|
| Hermes-QA | Testing Agent | Maria Robbins | Medium | ✓ Defined | 100% |
| AutoDeploy Bot | CI/CD Agent | DevOps Team | High | ✓ Defined | 78% |
| ComplyBot | Governance Agent | Maria Robbins | Low | ✓ Defined | 100% |
| FairLearn | Bias Detection | Data Science Team | Medium | ✓ Defined | 89% |
| SalesforcePredict | Analytics | Sarah Chen | High | ✓ Defined | 100% |
| LeadScorer Pro | Lead Scoring | Marketing Team | Critical | ✗ Missing | 44% |
| AuditTrail AI | Audit Logging | Maria Robbins | Low | ✓ Defined | 89% |
| ContentBot | Content Agent | Marketing Team | Medium | ⚠ Incomplete | 78% |

### Register New Agent Workflow

When you register a new agent:

1. **Fill the form** — name, type, owner, department, risk level, purpose
2. **System auto-generates**:
   - Approval chain (Low → [owner]; Medium → [owner, IT Security]; High → [owner, IT Security, Legal])
   - Approval status (High/Critical → "Pending Legal Review", others → "Approved")
   - RACI assignment (Responsible = department team, Accountable = owner, Consulted/Informed based on risk)
   - Next review date (30 days for High/Critical, 90 days for Low/Medium)
   - Monitoring level ("Active" for all)
3. **Agent is saved** to browser localStorage and appears in the registry
4. **Audit trail entry** is logged automatically
5. **Governance check** can be run on the new agent

## Tech Stack

- **Frontend**: Vanilla HTML5, CSS3 (dark theme), JavaScript (ES6+)
- **Hosting**: Cloudflare Pages (Free) — ready to deploy
- **Domain**: Cloudflare (user-owned: chickentightslabs.com)
- **Storage**: Browser localStorage (agent registry, audit trail)
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
│  ── localStorage (audit trail + agents)  │
└─────────────────────────────────────────┘
```

All logic runs client-side. No API keys, no server, no database. Data persists in browser localStorage.

## Development

```bash
git clone https://github.com/chicken-tights-labs/chicken-tights-labs-portfolio.git
cd chicken-tights-labs-portfolio
npx serve .
```

## Deployment

1. Push to `main` branch on GitHub
2. Connect to Cloudflare Pages (one-time setup)
3. Automatic builds on every push

## Roadmap

- [x] Deploy to GitHub (live)
- [ ] Deploy to Cloudflare Pages with custom domain
- [ ] Add agent comparison and risk heat map views
- [ ] Add authentication for persistent audit trail
- [ ] Connect governance check to live Salesforce org (Phase 2)
- [ ] Build Boxing Fitness Gym Trainer/Member App

## Boxing Fitness Gym App (Phase 2)

A lightweight web app for trainers and members to manage:
- Trainer clock-in and member attendance tracking
- Class scheduling and bookings
- Member onboarding
- **Integrates with Salesforce CRM backend** — collects data via REST API without requiring per-user Salesforce licenses

This solves a real enterprise problem: how to extend Salesforce's value to end users without paying for full licenses per user.

## About Maria

Senior Salesforce QA Automation Specialist learning AI agent orchestration. Combining a QA tester's instinct for "what breaks" with AI governance frameworks focused on agent ownership and responsible parties. Also building NBS Gym — a fencing & boxing coaching facility in Lexington, KY.

---

*Demo data is mock. Governance scores do not reflect real agent assessments.*
