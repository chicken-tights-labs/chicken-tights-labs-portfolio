/* ============================================================
   Chicken Rights Labs — AI Governance Dashboard
   Mock data for the live demo
   ============================================================ */

const aiModels = [
    {
        id: 'hermes-qa',
        name: 'Hermes-QA',
        vendor: 'Chicken Rights Labs',
        useCase: 'Automated QA Testing Agent',
        riskLevel: 'Medium',
        owner: 'Maria Robbins',
        lastReviewed: '2026-10-08',
        gdprCompliant: true,
        explainabilityScore: 85,
        humanOversight: true,
        dataRetention: '90 days',
        vendorSecurity: 'A+',
        biasAssessment: 'Passed',
        performanceMonitoring: 'Active',
        incidentResponse: 'Documented'
    },
    {
        id: 'salesforcepredict',
        name: 'SalesforcePredict',
        vendor: 'Salesforce',
        useCase: 'Lead Scoring & Opportunity Prioritization',
        riskLevel: 'High',
        owner: 'Sarah Chen',
        lastReviewed: '2026-10-01',
        gdprCompliant: true,
        explainabilityScore: 72,
        humanOversight: true,
        dataRetention: '365 days',
        vendorSecurity: 'A',
        biasAssessment: 'Warning',
        performanceMonitoring: 'Active',
        incidentResponse: 'Documented'
    },
    {
        id: 'complybot',
        name: 'ComplyBot',
        vendor: 'Chicken Rights Labs',
        useCase: 'Automated Compliance Review',
        riskLevel: 'Low',
        owner: 'Maria Robbins',
        lastReviewed: '2026-10-05',
        gdprCompliant: true,
        explainabilityScore: 95,
        humanOversight: true,
        dataRetention: '30 days',
        vendorSecurity: 'A+',
        biasAssessment: 'Passed',
        performanceMonitoring: 'Active',
        incidentResponse: 'Documented'
    },
    {
        id: 'fairlearn',
        name: 'FairLearn',
        vendor: 'Open Source',
        useCase: 'Bias Detection & Mitigation',
        riskLevel: 'Medium',
        owner: 'Data Science Team',
        lastReviewed: '2026-09-20',
        gdprCompliant: true,
        explainabilityScore: 90,
        humanOversight: false,
        dataRetention: 'Variable',
        vendorSecurity: 'B',
        biasAssessment: 'Passed',
        performanceMonitoring: 'Active',
        incidentResponse: 'Documented'
    },
    {
        id: 'audittrailai',
        name: 'AuditTrailAI',
        vendor: 'Chicken Rights Labs',
        useCase: 'Automated Audit Logging',
        riskLevel: 'Low',
        owner: 'Maria Robbins',
        lastReviewed: '2026-10-03',
        gdprCompliant: false,
        explainabilityScore: 80,
        humanOversight: true,
        dataRetention: '180 days',
        vendorSecurity: 'A+',
        biasAssessment: 'Not Applicable',
        performanceMonitoring: 'Active',
        incidentResponse: 'Documented'
    },
    {
        id: 'leadscorer-pro',
        name: 'LeadScorer Pro',
        vendor: 'ThirdLight AI',
        useCase: 'Customer Lead Scoring',
        riskLevel: 'Critical',
        owner: 'Marketing Team',
        lastReviewed: '2026-08-15',
        gdprCompliant: false,
        explainabilityScore: 55,
        humanOversight: false,
        dataRetention: 'Indefinite',
        vendorSecurity: 'C',
        biasAssessment: 'Failed',
        performanceMonitoring: 'Inactive',
        incidentResponse: 'Not Documented'
    }
];

const compliancePolicies = [
    {
        id: 'gdpr',
        name: 'GDPR Data Processing Consent',
        description: 'Verifies explicit consent for EU data processing and confirms GDPR compliance documentation.',
        severity: 'High',
        check: (model) => model.gdprCompliant === true,
        detail: (model) => model.gdprCompliant
            ? 'GDPR-compliant data processing and consent verified'
            : 'GDPR consent not verified — EU data processing cannot be confirmed'
    },
    {
        id: 'bias',
        name: 'Bias/Fairness Assessment',
        description: 'Validates that the model has undergone bias testing and fairness auditing across demographic groups.',
        severity: 'High',
        check: (model) => model.biasAssessment === 'Passed' || model.biasAssessment === 'Not Applicable',
        detail: (model) => model.biasAssessment === 'Passed' || model.biasAssessment === 'Not Applicable'
            ? `Bias assessment result: ${model.biasAssessment}`
            : `Bias assessment failed: ${model.biasAssessment} — remedial action required`
    },
    {
        id: 'explainability',
        name: 'Explainability Documentation',
        description: 'Ensures model outputs can be explained to stakeholders. Minimum score: 70/100.',
        severity: 'Medium',
        check: (model) => model.explainabilityScore >= 70,
        detail: (model) => model.explainabilityScore >= 70
            ? `Explainability score: ${model.explainabilityScore}/100 — meets minimum threshold`
            : `Explainability score: ${model.explainabilityScore}/100 — below minimum (70)`
    },
    {
        id: 'retention',
        name: 'Data Retention Compliance',
        description: 'Confirms a defined data retention policy is in place — no indefinite storage.',
        severity: 'Medium',
        check: (model) => model.dataRetention && model.dataRetention !== 'Indefinite',
        detail: (model) => model.dataRetention && model.dataRetention !== 'Indefinite'
            ? `Data retention period: ${model.dataRetention}`
            : 'No defined data retention period — potential compliance violation'
    },
    {
        id: 'oversight',
        name: 'Human Oversight Protocol',
        description: 'Mandatory for High and Critical risk models. Requires documented human-in-the-loop processes.',
        severity: 'Critical',
        check: (model) => {
            if (model.riskLevel === 'High' || model.riskLevel === 'Critical') {
                return model.humanOversight === true;
            }
            return true; // Low/Medium risk models exempt
        },
        detail: (model) => {
            if (model.riskLevel === 'High' || model.riskLevel === 'Critical') {
                return model.humanOversight
                    ? 'Human oversight enabled for High/Critical risk model'
                    : 'CRITICAL FAILURE: No human oversight for High/Critical risk model';
            }
            return 'Human oversight not required for Low/Medium risk models';
        }
    },
    {
        id: 'monitoring',
        name: 'Model Performance Monitoring',
        description: 'Requires active monitoring for performance drift, accuracy degradation, and data quality.',
        severity: 'Medium',
        check: (model) => model.performanceMonitoring === 'Active',
        detail: (model) => model.performanceMonitoring === 'Active'
            ? 'Performance monitoring is active — drift detection enabled'
            : `Performance monitoring: ${model.performanceMonitoring} — remediation needed`
    },
    {
        id: 'security',
        name: 'Vendor Security Review',
        description: 'Validates third-party vendor security posture. Minimum rating: B.',
        severity: 'High',
        check: (model) => ['A+', 'A', 'B'].includes(model.vendorSecurity),
        detail: (model) => ['A+', 'A', 'B'].includes(model.vendorSecurity)
            ? `Vendor security rating: ${model.vendorSecurity}`
            : `Vendor security rating: ${model.vendorSecurity} — requires security review`
    },
    {
        id: 'incident',
        name: 'Incident Response Plan',
        description: 'Requires documented incident response procedures for High and Critical risk models.',
        severity: 'High',
        check: (model) => {
            if (model.riskLevel === 'High' || model.riskLevel === 'Critical') {
                return model.incidentResponse === 'Documented';
            }
            return model.incidentResponse === 'Documented' || model.incidentResponse === 'Not Documented';
        },
        detail: (model) => {
            if (model.riskLevel === 'High' || model.riskLevel === 'Critical') {
                return model.incidentResponse === 'Documented'
                    ? 'Incident response plan documented and tested'
                    : 'No documented incident response plan — required for High/Critical models';
            }
            return 'Incident response plan documented';
        }
    }
];

// Seed audit trail records (shown on initial load)
const seedAuditRecords = [
    {
        id: 9901,
        timestamp: '2026-10-07T14:32:15Z',
        modelName: 'Hermes-QA',
        policiesChecked: 8,
        passed: 8,
        failed: 0,
        score: 100,
        status: 'Compliant',
        reviewer: 'Maria R.'
    },
    {
        id: 9902,
        timestamp: '2026-10-06T09:15:42Z',
        modelName: 'SalesforcePredict',
        policiesChecked: 8,
        passed: 7,
        failed: 1,
        score: 88,
        status: 'At Risk',
        reviewer: 'Sarah C.'
    },
    {
        id: 9903,
        timestamp: '2026-10-05T16:48:03Z',
        modelName: 'ComplyBot',
        policiesChecked: 8,
        passed: 8,
        failed: 0,
        score: 100,
        status: 'Compliant',
        reviewer: 'Maria R.'
    },
    {
        id: 9904,
        timestamp: '2026-10-04T11:22:58Z',
        modelName: 'FairLearn',
        policiesChecked: 8,
        passed: 6,
        failed: 2,
        score: 75,
        status: 'Non-Compliant',
        reviewer: 'Data Science Team'
    }
];
