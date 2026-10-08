/* ============================================================
   Chicken Tights Labs — AI Agent Governance Dashboard
   Mock data: AI agents (with RACI), governance policies, audit records
   ============================================================ */

/* ---- Department options for the registration form ---- */
const departments = [
    'Quality Engineering',
    'IT',
    'Sales',
    'Marketing',
    'Analytics',
    'Operations',
    'Legal',
    'HR'
];

/* ---- Risk level options ---- */
const riskLevels = ['Low', 'Medium', 'High', 'Critical'];

/* ---- AI Agents Registry (8 agents with RACI assignments) ---- */
const aiAgents = [
    {
        id: 'hermes-qa',
        name: 'Hermes-QA',
        type: 'Automated Testing Agent',
        owner: 'Maria Robbins',
        department: 'Quality Engineering',
        riskLevel: 'Medium',
        status: 'Active',
        lastModified: '2026-10-05',
        purpose: 'Automated regression testing for Salesforce deployments',
        approvalStatus: 'Approved',
        approvalChain: ['Maria Robbins', 'IT Security'],
        monitoring: 'Active',
        nextReview: '2026-12-01',
        lastReviewedBy: 'IT Security',
        incidentResponse: 'Documented',
        raci: {
            r: 'QA Engineers',
            a: 'Maria Robbins',
            c: ['IT Security'],
            i: ['DevOps Team']
        }
    },
    {
        id: 'autodeploy-bot',
        name: 'AutoDeploy Bot',
        type: 'CI/CD Deployment Agent',
        owner: 'DevOps Team',
        department: 'IT',
        riskLevel: 'High',
        status: 'Active',
        lastModified: '2026-09-28',
        purpose: 'Automated metadata deployments to Salesforce production',
        approvalStatus: 'Pending Legal Review',
        approvalChain: ['DevOps Team', 'IT Security', 'Legal'],
        monitoring: 'Active',
        nextReview: '2026-10-15',
        lastReviewedBy: 'IT Security',
        incidentResponse: 'Documented',
        raci: {
            r: 'DevOps Engineers',
            a: 'DevOps Team Lead',
            c: ['IT Security', 'Legal'],
            i: ['All Developers']
        }
    },
    {
        id: 'complybot',
        name: 'ComplyBot',
        type: 'Governance Automation Agent',
        owner: 'Maria Robbins',
        department: 'Quality Engineering',
        riskLevel: 'Low',
        status: 'Active',
        lastModified: '2026-10-03',
        purpose: 'Automated governance policy validation and reporting',
        approvalStatus: 'Approved',
        approvalChain: ['Maria Robbins'],
        monitoring: 'Active',
        nextReview: '2026-11-15',
        lastReviewedBy: 'Maria Robbins',
        incidentResponse: 'Documented',
        raci: {
            r: 'Governance Team',
            a: 'Maria Robbins',
            c: ['IT Security'],
            i: ['All Departments']
        }
    },
    {
        id: 'fairlearn',
        name: 'FairLearn',
        type: 'Bias Detection Agent',
        owner: 'Data Science Team',
        department: 'Analytics',
        riskLevel: 'Medium',
        status: 'Active',
        lastModified: '2026-09-20',
        purpose: 'Real-time bias detection across AI model outputs',
        approvalStatus: 'Approved',
        approvalChain: ['Data Science Team', 'IT Security'],
        monitoring: 'Active',
        nextReview: '2026-09-20',
        lastReviewedBy: 'Maria Robbins',
        incidentResponse: 'Documented',
        raci: {
            r: 'Data Scientists',
            a: 'Data Science Lead',
            c: ['IT Security'],
            i: ['Product Managers']
        }
    },
    {
        id: 'salesforce-predict',
        name: 'SalesforcePredict',
        type: 'Predictive Analytics Agent',
        owner: 'Sarah Chen',
        department: 'Sales',
        riskLevel: 'High',
        status: 'Active',
        lastModified: '2026-10-01',
        purpose: 'Lead scoring and opportunity prioritization',
        approvalStatus: 'Approved',
        approvalChain: ['Sarah Chen', 'IT Security', 'Legal'],
        monitoring: 'Active',
        nextReview: '2026-10-10',
        lastReviewedBy: 'Legal',
        incidentResponse: 'Documented',
        raci: {
            r: 'Sales Operations',
            a: 'Sarah Chen',
            c: ['IT Security', 'Legal'],
            i: ['Sales Leadership']
        }
    },
    {
        id: 'leadscorer-pro',
        name: 'LeadScorer Pro',
        type: 'Third-Party Lead Scoring Agent',
        owner: 'Marketing Team',
        department: 'Marketing',
        riskLevel: 'Critical',
        status: 'Active',
        lastModified: '2026-08-15',
        purpose: 'Customer lead qualification and scoring (ThirdLight AI vendor)',
        approvalStatus: 'Not Approved',
        approvalChain: ['Marketing Team', 'IT Security', 'Legal'],
        monitoring: 'Passive',
        nextReview: '2026-09-30',
        lastReviewedBy: 'IT Security',
        incidentResponse: 'Not Documented',
        raci: {
            r: 'Marketing Analysts',
            a: 'Marketing Team',
            c: ['IT Security'],
            i: []  // Missing Informed — governance gap
        }
    },
    {
        id: 'audittrail-ai',
        name: 'AuditTrail AI',
        type: 'Audit Logging Agent',
        owner: 'Maria Robbins',
        department: 'Quality Engineering',
        riskLevel: 'Low',
        status: 'Active',
        lastModified: '2026-10-02',
        purpose: 'Automated audit logging for all AI agent activities',
        approvalStatus: 'Approved',
        approvalChain: ['Maria Robbins'],
        monitoring: 'Active',
        nextReview: '2026-10-15',
        lastReviewedBy: 'Maria Robbins',
        incidentResponse: 'Documented',
        raci: {
            r: 'Security Team',
            a: 'Maria Robbins',
            c: ['IT Security'],
            i: ['All Departments']
        }
    },
    {
        id: 'contentbot',
        name: 'ContentBot',
        type: 'Marketing Content Agent',
        owner: 'Marketing Team',
        department: 'Marketing',
        riskLevel: 'Medium',
        status: 'Inactive',
        lastModified: '2026-09-18',
        purpose: 'Automated marketing content generation and scheduling',
        approvalStatus: 'Approved',
        approvalChain: ['Marketing Team', 'IT Security'],
        monitoring: 'Passive',
        nextReview: '2026-10-20',
        lastReviewedBy: 'IT Security',
        incidentResponse: 'Documented',
        raci: {
            r: '',  // Missing Responsible — governance gap
            a: 'Marketing Team',
            c: [],
            i: ['Marketing Leadership']
        }
    }
];

/* ---- Governance Policies (9 policies including RACI) ---- */
const governancePolicies = [
    {
        id: 'ownership',
        name: 'Agent Ownership Policy',
        category: 'Ownership',
        description: 'Every AI agent must have a designated human owner responsible for its behavior, maintenance, ongoing monitoring, and governance. The owner receives escalation alerts and is the primary point of accountability.',
        requirement: 'All agents must have an assigned owner from a verified business unit.',
        check: (agent) => !!agent.owner && agent.owner !== '',
        detail: (agent) => agent.owner
            ? `Owner: ${agent.owner} (${agent.department})`
            : 'No owner assigned — agent has no accountability'
    },
    {
        id: 'raci',
        name: 'RACI Assignment Policy',
        category: 'Ownership',
        description: 'Every AI agent must have a defined RACI matrix: Responsible (who operates the agent), Accountable (who is ultimately answerable), Consulted (who must be consulted before changes), and Informed (who receives notifications). This ensures clear accountability and communication for all agent lifecycle events.',
        requirement: 'All four RACI roles must be populated for every agent.',
        check: (agent) => {
            if (!agent.raci) return false;
            return !!(agent.raci.r && agent.raci.a &&
                Array.isArray(agent.raci.c) && agent.raci.c.length > 0 &&
                Array.isArray(agent.raci.i) && agent.raci.i.length > 0);
        },
        detail: (agent) => {
            if (!agent.raci) return 'No RACI assignment — clear accountability gap';
            const missing = [];
            if (!agent.raci.r) missing.push('Responsible');
            if (!agent.raci.a) missing.push('Accountable');
            if (!agent.raci.c || !agent.raci.c.length) missing.push('Consulted');
            if (!agent.raci.i || !agent.raci.i.length) missing.push('Informed');
            if (missing.length === 0) {
                return `RACI defined: R=${agent.raci.r}, A=${agent.raci.a}, C=[${agent.raci.c.join(', ')}], I=[${agent.raci.i.join(', ')}]`;
            }
            return `RACI incomplete — missing: ${missing.join(', ')}`;
        }
    },
    {
        id: 'approval',
        name: 'Approval Workflow Policy',
        category: 'Approval',
        description: 'High and Critical risk agents require formal approval from IT Security and Legal before production deployment. This prevents unauthorized high-risk AI from operating without oversight.',
        requirement: 'High/Critical risk agents must have full approval chain completed.',
        check: (agent) => {
            if (agent.riskLevel === 'High' || agent.riskLevel === 'Critical') {
                return agent.approvalStatus === 'Approved';
            }
            return true;
        },
        detail: (agent) => {
            if (agent.riskLevel === 'High' || agent.riskLevel === 'Critical') {
                return agent.approvalStatus === 'Approved'
                    ? `Full approval chain completed: ${agent.approvalChain.join(' → ')}`
                    : `Approval status: ${agent.approvalStatus} — ${agent.riskLevel} risk requires full approval from: ${agent.approvalChain.join(' → ')}`;
            }
            return 'Low/Medium risk — owner approval sufficient';
        }
    },
    {
        id: 'review',
        name: 'Regular Review Policy',
        category: 'Review',
        description: 'All agents must undergo governance reviews. Low/Medium risk agents are reviewed quarterly. High/Critical risk agents are reviewed monthly. Overdue reviews trigger escalation alerts.',
        requirement: 'Review date must not be overdue.',
        check: (agent) => {
            if (!agent.nextReview) return false;
            const today = new Date();
            const reviewDate = new Date(agent.nextReview);
            return reviewDate >= today;
        },
        detail: (agent) => {
            if (!agent.nextReview) return 'No review date set — escalation triggered';
            const today = new Date();
            const reviewDate = new Date(agent.nextReview);
            if (reviewDate >= today) {
                return `Next review: ${agent.nextReview} — current (reviewed by: ${agent.lastReviewedBy})`;
            }
            const daysOverdue = Math.floor((today - reviewDate) / (1000 * 60 * 60 * 24));
            return `Next review: ${agent.nextReview} — OVERDUE by ${daysOverdue} days (last reviewed by: ${agent.lastReviewedBy})`;
        }
    },
    {
        id: 'monitoring',
        name: 'Performance Monitoring Policy',
        category: 'Monitoring',
        description: 'Active monitoring is required for all High and Critical risk agents. Monitors drift detection, output quality, and anomaly alerts. Passive monitoring is insufficient for production use.',
        requirement: 'High/Critical risk agents must have Active monitoring.',
        check: (agent) => {
            if (agent.riskLevel === 'High' || agent.riskLevel === 'Critical') {
                return agent.monitoring === 'Active';
            }
            return true;
        },
        detail: (agent) => {
            if (agent.riskLevel === 'High' || agent.riskLevel === 'Critical') {
                return agent.monitoring === 'Active'
                    ? 'Active monitoring — drift detection and anomaly alerting enabled'
                    : `Monitoring: ${agent.monitoring} — insufficient for ${agent.riskLevel} risk. Requires Active monitoring`;
            }
            return `Monitoring status: ${agent.monitoring}`;
        }
    },
    {
        id: 'incident',
        name: 'Incident Response Policy',
        category: 'Response',
        description: 'Documented incident response procedures are required for all agents. Critical risk agents must have tested response plans with clear escalation paths.',
        requirement: 'All agents must have documented incident response procedures.',
        check: (agent) => agent.incidentResponse === 'Documented',
        detail: (agent) => agent.incidentResponse === 'Documented'
            ? 'Incident response plan documented and tested'
            : `Incident response: ${agent.incidentResponse} — documentation required`
    },
    {
        id: 'change-mgmt',
        name: 'Change Management Policy',
        category: 'Governance',
        description: 'All agent modifications must be logged with timestamps, author attribution, and business justification. Unauthorized changes trigger automatic quarantine.',
        requirement: 'All changes must be logged and tracked.',
        check: (agent) => !!agent.lastModified,
        detail: (agent) => agent.lastModified
            ? `Last modified: ${agent.lastModified} — change logged and tracked`
            : 'No modification history available — immediate review required'
    },
    {
        id: 'data-access',
        name: 'Data Access Policy',
        category: 'Security',
        description: 'Agents must operate on least-privilege principles. Access to PII or sensitive data requires additional documentation and review by IT Security.',
        requirement: 'No excessive permissions. PII access requires documentation.',
        check: () => true,
        detail: () => 'Least-privilege access confirmed — no excessive permissions detected'
    },
    {
        id: 'audit-trail',
        name: 'Audit Trail Policy',
        category: 'Audit',
        description: 'All agent actions must be logged with timestamps, user context, and decision rationale. Logs must be retained for minimum 90 days and be searchable.',
        requirement: 'Full action logging enabled for all production agents.',
        detail: (agent) => agent.monitoring === 'Active'
            ? 'Full audit trail enabled — all actions logged with timestamp and context'
            : `Logging status: ${agent.monitoring} — limited audit trail, remediation needed`
    }
];

/* ---- Seed Audit Trail Records ---- */
const seedAuditRecords = [
    {
        id: 9906,
        timestamp: '2026-10-06T14:20:00Z',
        action: 'Governance Check',
        agent: 'Hermes-QA',
        owner: 'Maria Robbins',
        reviewer: 'Anonymous Visitor',
        status: 'Compliant',
        details: '9/9 policies passed, score: 100%'
    },
    {
        id: 9905,
        timestamp: '2026-10-06T10:30:00Z',
        action: 'Agent Registered',
        agent: 'Hermes-QA',
        owner: 'Maria Robbins',
        reviewer: 'IT Security',
        status: 'Approved',
        details: 'New agent registered and approved for production use'
    },
    {
        id: 9904,
        timestamp: '2026-10-05T15:45:00Z',
        action: 'Policy Approved',
        agent: 'SalesforcePredict',
        owner: 'Sarah Chen',
        reviewer: 'Legal Team',
        status: 'Approved',
        details: 'Full approval chain completed'
    },
    {
        id: 9903,
        timestamp: '2026-10-04T09:20:00Z',
        action: 'Governance Check',
        agent: 'LeadScorer Pro',
        owner: 'Marketing Team',
        reviewer: 'Anonymous Visitor',
        status: 'Non-Compliant',
        details: '5/9 policies failed, score: 44%'
    },
    {
        id: 9902,
        timestamp: '2026-10-03T11:15:00Z',
        action: 'Owner Changed',
        agent: 'ComplyBot',
        owner: 'Maria Robbins',
        reviewer: 'IT Manager',
        status: 'Updated',
        details: 'Ownership transferred from IT to Quality Engineering'
    },
    {
        id: 9901,
        timestamp: '2026-10-02T14:30:00Z',
        action: 'Review Completed',
        agent: 'FairLearn',
        owner: 'Data Science Team',
        reviewer: 'Maria Robbins',
        status: 'Overdue',
        details: 'Review overdue by 18 days — remediation assigned'
    }
];
