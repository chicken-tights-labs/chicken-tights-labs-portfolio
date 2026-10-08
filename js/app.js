/* ============================================================
   Chicken Tights Labs — AI Agent Governance Dashboard
   Application Logic: tabs, governance checks, audit trail
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

/* ---- App Module ---- */
const App = {

    auditRecords: [],
    auditKey: 'agentGovernanceAuditTrail',

    init() {
        this.renderAgentTable();
        this.renderOwnershipMatrix();
        this.renderPolicyDocs();
        this.loadAuditTrail();
        this.populateAgentSelect();
        this.bindEvents();
    },

    /* ---- Event Binding ---- */
    bindEvents() {
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.dataset.tab;
                this.switchTab(tabId, btn);
            });
        });

        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Governance check
        const runCheckBtn = document.getElementById('run-governance-check');
        if (runCheckBtn) {
            runCheckBtn.addEventListener('click', () => this.runGovernanceCheck());
        }

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            });
        });
    },

    /* ---- Tab Switching ---- */
    switchTab(tabId, clickedBtn) {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        clickedBtn.classList.add('active');
        document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
        document.getElementById(`${tabId}-tab`)?.classList.add('active');
    },

    toggleMobileMenu() {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        }
    },

    /* ---- Agent Registry Table ---- */
    renderAgentTable() {
        const table = this.createTable(
            ['Agent', 'Type', 'Owner', 'Dept', 'Risk', 'Status', 'Approval', 'Next Review', 'Gov. Score'],
            aiAgents.map(a => [
                `<strong>${a.name}</strong>`,
                a.type,
                a.owner,
                a.department,
                `<span class="risk-badge ${a.riskLevel.toLowerCase()}">${a.riskLevel}</span>`,
                `<span class="status-${a.status.toLowerCase()}">${a.status}</span>`,
                `<span class="status-${this.getApprovalStatusClass(a.approvalStatus)}">${a.approvalStatus}</span>`,
                a.nextReview,
                `<span class="status-${this.getAgentGovStatus(a).toLowerCase()}">${this.getAgentGovScore(a)}%</span>`
            ])
        );
        document.getElementById('agents-table').appendChild(table);
    },

    getAgentGovScore(agent) {
        const checks = governancePolicies.map(p => p.check(agent));
        const passed = checks.filter(Boolean).length;
        return Math.round((passed / checks.length) * 100);
    },

    getAgentGovStatus(agent) {
        const score = this.getAgentGovScore(agent);
        if (score === 100) return 'Compliant';
        if (score >= 75) return 'NeedsReview';
        return 'NonCompliant';
    },

    getApprovalStatusClass(status) {
        return status === 'Approved' ? 'compliant' :
               status.includes('Pending') ? 'at-risk' :
               'non-compliant';
    },

    /* ---- Ownership Matrix ---- */
    renderOwnershipMatrix() {
        const ownerMap = {};
        aiAgents.forEach(agent => {
            if (!ownerMap[agent.owner]) {
                ownerMap[agent.owner] = {
                    owner: agent.owner,
                    department: agent.department,
                    agents: [],
                    criticalCount: 0,
                    highCount: 0
                };
            }
            ownerMap[agent.owner].agents.push(agent.name);
            if (agent.riskLevel === 'Critical') ownerMap[agent.owner].criticalCount++;
            if (agent.riskLevel === 'High') ownerMap[agent.owner].highCount++;
        });

        const owners = Object.values(ownerMap);
        const table = this.createTable(
            ['Owner', 'Department', 'Agents', 'Critical Risk', 'High Risk', 'Total Agents'],
            owners.map(o => [
                `<strong>${o.owner}</strong>`,
                o.department,
                o.agents.length,
                o.criticalCount > 0 ? `<span class="risk-badge critical">${o.criticalCount}</span>` : '0',
                o.highCount > 0 ? `<span class="risk-badge high">${o.highCount}</span>` : '0',
                o.agents.length
            ])
        );
        document.getElementById('ownership-matrix').appendChild(table);
    },

    /* ---- Policy Documentation ---- */
    renderPolicyDocs() {
        const container = document.getElementById('policies-list');
        container.innerHTML = governancePolicies.map((policy, index) => `
            <div class="policy-card" data-policy="${policy.id}">
                <div class="policy-header">
                    <span class="policy-number">${index + 1}</span>
                    <h4>${policy.name}</h4>
                    <span class="policy-category">${policy.category}</span>
                </div>
                <p class="policy-description">${policy.description}</p>
                <button class="policy-expand-btn" data-policy="${policy.id}">Read Full Documentation</button>
                <div id="policy-detail-${policy.id}" class="policy-detail hidden">
                    <p><strong>Requirement:</strong> ${policy.requirement}</p>
                    <p><strong>Implementation:</strong> Agents are automatically validated against this policy during governance checks. Failures trigger escalation to the agent owner and IT Security.</p>
                    <p><strong>Last Updated:</strong> October 2026</p>
                </div>
            </div>
        `).join('');

        // Bind expand buttons
        container.querySelectorAll('.policy-expand-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const policyId = btn.dataset.policy;
                const detail = document.getElementById(`policy-detail-${policyId}`);
                if (detail) {
                    detail.classList.toggle('hidden');
                    btn.textContent = detail.classList.contains('hidden')
                        ? 'Read Full Documentation'
                        : 'Hide Documentation';
                }
            });
        });
    },

    /* ---- Agent Select ---- */
    populateAgentSelect() {
        const select = document.getElementById('agent-select');
        select.innerHTML = aiAgents.map(a =>
            `<option value="${a.id}">${a.name} (${a.type})</option>`
        ).join('');
    },

    /* ---- Governance Check ---- */
    runGovernanceCheck() {
        const select = document.getElementById('agent-select');
        const agentId = select.value;
        const agent = aiAgents.find(a => a.id === agentId);
        if (!agent) return;

        const btn = document.getElementById('run-governance-check');
        btn.disabled = true;
        btn.textContent = 'Running Governance Check...';

        setTimeout(() => {
            const results = this.evaluateGovernance(agent);
            this.displayGovernanceResults(agent, results);

            const passedCount = results.checks.filter(c => c.passed).length;
            const score = Math.round((passedCount / results.total) * 100);
            const status = score === 100 ? 'Compliant' : score >= 75 ? 'NeedsReview' : 'Non-Compliant';

            this.logAuditRecord({
                action: 'Governance Check',
                agent: agent.name,
                owner: agent.owner,
                reviewer: 'Anonymous Visitor',
                status: status,
                details: `${passedCount}/${results.total} policies passed, score: ${score}%`
            });

            btn.disabled = false;
            btn.textContent = 'Run Governance Check';

            const auditTab = document.querySelector('.tab-btn[data-tab="audit"]');
            if (auditTab) this.switchTab('audit', auditTab);
        }, 800);
    },

    evaluateGovernance(agent) {
        const checks = governancePolicies.map(policy => {
            const passed = policy.check(agent);
            return {
                id: policy.id,
                name: policy.name,
                category: policy.category,
                passed: passed,
                detail: policy.detail(agent)
            };
        });

        const passedCount = checks.filter(c => c.passed).length;
        const score = Math.round((passedCount / checks.length) * 100);
        let overallStatus;
        if (score === 100) overallStatus = 'Compliant';
        else if (score >= 75) overallStatus = 'Needs Review';
        else overallStatus = 'Non-Compliant';

        return {
            checks: checks,
            total: checks.length,
            passed: passedCount,
            failed: checks.length - passedCount,
            score: score,
            status: overallStatus
        };
    },

    displayGovernanceResults(agent, results) {
        const container = document.getElementById('results-container');
        const statusClass = results.status === 'Compliant' ? 'status-compliant' :
                           results.status === 'Needs Review' ? 'status-at-risk' :
                           'status-non-compliant';
        const scoreColor = results.status === 'Compliant' ? '#22c55e' :
                          results.status === 'Needs Review' ? '#f59e0b' : '#ef4444';

        container.innerHTML = `
            <div class="score-card">
                <div class="score-header">
                    <h3>${agent.name} — Governance Assessment</h3>
                    <span class="score-badge ${statusClass}">${results.status}</span>
                </div>
                <div class="score-bar">
                    <div class="score-fill" style="width: ${results.score}%; background: ${scoreColor};"></div>
                </div>
                <p style="margin-bottom: 1.5rem; color: #a0a0b0;">
                    Governance Score: ${results.score}% — ${results.passed}/${results.total} policies passed
                </p>
                <div class="checks-list">
                    ${results.checks.map(check => `
                        <div class="check-item">
                            <div class="check-icon ${check.passed ? 'pass' : 'fail'}">
                                ${check.passed ? '✓' : '✗'}
                            </div>
                            <div class="check-detail">
                                <div class="check-label">${check.name} <span style="color: #606070; font-weight: normal;">(${check.category})</span></div>
                                <p style="color: #a0a0b0; margin-top: 0.2rem;">${check.detail}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    /* ---- Audit Trail ---- */
    loadAuditTrail() {
        const stored = localStorage.getItem(this.auditKey);
        if (stored) {
            this.auditRecords = JSON.parse(stored);
        } else {
            this.auditRecords = [...seedAuditRecords];
            localStorage.setItem(this.auditKey, JSON.stringify(this.auditRecords));
        }
        this.renderAuditTable();
    },

    renderAuditTable() {
        const records = this.auditRecords
            .slice()
            .reverse()
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        const container = document.getElementById('audit-table');
        if (records.length === 0) {
            container.innerHTML = '<p style="color: #a0a0b0; padding: 2rem;">No audit records yet. Run a governance check to create one.</p>';
            return;
        }

        const table = this.createTable(
            ['#', 'Timestamp', 'Action', 'Agent', 'Owner', 'Reviewer', 'Status'],
            records.map((record, index) => {
                const date = new Date(record.timestamp);
                const formattedDate = date.toLocaleString('en-US', {
                    year: 'numeric', month: 'short', day: 'numeric',
                    hour: '2-digit', minute: '2-digit'
                });
                return [
                    records.length - index,
                    formattedDate,
                    record.action,
                    `<strong>${record.agent}</strong>`,
                    record.owner,
                    record.reviewer,
                    `<span class="status-${this.getAuditStatusClass(record.status)}">${record.status}</span>`
                ];
            })
        );

        container.innerHTML = '';
        container.appendChild(table);
    },

    getAuditStatusClass(status) {
        return status === 'Approved' || status === 'Compliant' ? 'compliant' :
               status === 'Needs Review' || status === 'Updated' || status === 'Overdue' ? 'at-risk' :
               'non-compliant';
    },

    logAuditRecord(record) {
        const newRecord = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            ...record
        };
        if (!this.auditRecords) this.auditRecords = [];
        this.auditRecords.unshift(newRecord);
        localStorage.setItem(this.auditKey, JSON.stringify(this.auditRecords));
        this.renderAuditTable();
    },

    /* ---- Utility: Create Table ---- */
    createTable(headers, rows) {
        const table = document.createElement('table');
        table.className = 'data-table';
        table.innerHTML = `
            <thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
            <tbody>${rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody>
        `;
        return table;
    }
};
