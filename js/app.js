/* ============================================================
   Chicken Rights Labs — AI Governance Dashboard
   Application Logic
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

/* ---- App Module ---- */
const App = {

    init() {
        this.renderModelTable();
        this.populateModelSelect();
        this.loadAuditTrail();
        this.bindEvents();
    },

    /* ---- Event Binding ---- */
    bindEvents() {
        // Tab switching
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.dataset.tab;
                App.switchTab(tabId, btn);
            });
        });

        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                App.toggleMobileMenu();
            });
        }

        // Compliance check
        const runCheckBtn = document.getElementById('run-check-btn');
        if (runCheckBtn) {
            runCheckBtn.addEventListener('click', () => App.runComplianceCheck());
        }

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    },

    /* ---- Tab Switching ---- */
    switchTab(tabId, clickedBtn) {
        // Update active tab button
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        clickedBtn.classList.add('active');

        // Show correct pane
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('active');
        });
        document.getElementById(`${tabId}-tab`)?.classList.add('active');
    },

    toggleMobileMenu() {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        }
    },

    /* ---- Model Table ---- */
    renderModelTable() {
        const table = document.createElement('table');
        table.className = 'data-table';
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Model</th>
                    <th>Vendor</th>
                    <th>Use Case</th>
                    <th>Risk Level</th>
                    <th>Owner</th>
                    <th>Last Reviewed</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                ${aiModels.map(model => `
                    <tr>
                        <td><strong>${model.name}</strong></td>
                        <td>${model.vendor}</td>
                        <td>${model.useCase}</td>
                        <td><span class="risk-badge ${model.riskLevel.toLowerCase()}">${model.riskLevel}</span></td>
                        <td>${model.owner}</td>
                        <td>${model.lastReviewed}</td>
                        <td><span class="status-${this.getStatusClass(model)}">${this.getModelStatus(model)}</span></td>
                    </tr>
                `).join('')}
            </tbody>
        `;
        document.getElementById('models-table').appendChild(table);
    },

    getModelStatus(model) {
        const checks = compliancePolicies.map(policy => policy.check(model));
        const passed = checks.filter(Boolean).length;
        const score = Math.round((passed / checks.length) * 100);

        if (score === 100) return 'Compliant';
        if (score >= 75) return 'At Risk';
        return 'Non-Compliant';
    },

    getStatusClass(model) {
        const status = this.getModelStatus(model);
        return status === 'Compliant' ? 'compliant' :
               status === 'At Risk' ? 'at-risk' : 'non-compliant';
    },

    /* ---- Model Select ---- */
    populateModelSelect() {
        const select = document.getElementById('model-select');
        select.innerHTML = aiModels.map(model =>
            `<option value="${model.id}">${model.name} (${model.vendor})</option>`
        ).join('');
    },

    /* ---- Compliance Check ---- */
    runComplianceCheck() {
        const select = document.getElementById('model-select');
        const modelId = select.value;
        const model = aiModels.find(m => m.id === modelId);

        if (!model) return;

        // Disable button during check
        const btn = document.getElementById('run-check-btn');
        btn.disabled = true;
        btn.textContent = 'Running Compliance Check...';

        // Simulate processing time
        setTimeout(() => {
            const results = this.evaluateCompliance(model);
            this.displayResults(model, results);

            // Log to audit trail
            const passedCount = results.checks.filter(c => c.passed).length;
            const failedCount = results.total - passedCount;
            const score = Math.round((passedCount / results.total) * 100);
            const status = score === 100 ? 'Compliant' : score >= 75 ? 'At Risk' : 'Non-Compliant';

            this.logAuditRecord({
                modelName: model.name,
                policiesChecked: results.total,
                passed: passedCount,
                failed: failedCount,
                score: score,
                status: status,
                reviewer: 'Anonymous Visitor'
            });

            // Re-enable button
            btn.disabled = false;
            btn.textContent = 'Run Compliance Check';

            // Switch to audit tab
            const auditTab = document.querySelector('.tab-btn[data-tab="audit"]');
            if (auditTab) {
                this.switchTab('audit', auditTab);
            }
        }, 800);
    },

    evaluateCompliance(model) {
        const checks = compliancePolicies.map(policy => {
            const passed = policy.check(model);
            return {
                id: policy.id,
                name: policy.name,
                severity: policy.severity,
                passed: passed,
                detail: policy.detail(model)
            };
        });

        const passedCount = checks.filter(c => c.passed).length;
        const score = Math.round((passedCount / checks.length) * 100);
        let overallStatus;
        if (score === 100) overallStatus = 'Compliant';
        else if (score >= 75) overallStatus = 'At Risk';
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

    displayResults(model, results) {
        const container = document.getElementById('results-container');
        const statusClass = results.status === 'Compliant' ? 'status-compliant' :
                           results.status === 'At Risk' ? 'status-at-risk' :
                           'status-non-compliant';
        const scoreColor = results.status === 'Compliant' ? '#22c55e' :
                          results.status === 'At Risk' ? '#f59e0b' : '#ef4444';

        container.innerHTML = `
            <div class="results-container">
                <div class="score-card">
                    <div class="score-header">
                        <h3>${model.name} — Compliance Report</h3>
                        <span class="score-badge ${statusClass}">${results.status}</span>
                    </div>

                    <div class="score-bar">
                        <div class="score-fill" style="width: ${results.score}%; background: ${scoreColor};"></div>
                    </div>

                    <p style="margin-bottom: 1.5rem; color: #a0a0b0;">
                        Score: ${results.score}% — ${results.passed}/${results.total} policies passed
                    </p>

                    <div class="checks-list">
                        ${results.checks.map(check => `
                            <div class="check-item">
                                <div class="check-icon ${check.passed ? 'pass' : 'fail'}">
                                    ${check.passed ? '✓' : '✗'}
                                </div>
                                <div class="check-detail">
                                    <div class="check-label">${check.name} <span style="color: #606070; font-weight: normal;">(Severity: ${check.severity})</span></div>
                                    <p style="color: #a0a0b0; margin-top: 0.2rem;">${check.detail}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    },

    /* ---- Audit Trail ---- */
    loadAuditTrail() {
        const stored = localStorage.getItem('auditTrail');
        if (stored) {
            this.auditRecords = JSON.parse(stored);
        } else {
            this.auditRecords = [...seedAuditRecords];
            localStorage.setItem('auditTrail', JSON.stringify(this.auditRecords));
        }
        this.renderAuditTable();
    },

    renderAuditTable() {
        const container = document.getElementById('audit-table');
        const records = this.auditRecords
            .slice()
            .reverse()
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        if (records.length === 0) {
            container.innerHTML = '<p style="color: #a0a0b0; padding: 2rem;">No audit records yet. Run a compliance check to create one.</p>';
            return;
        }

        const table = document.createElement('table');
        table.className = 'data-table';
        table.innerHTML = `
            <thead>
                <tr>
                    <th>#</th>
                    <th>Timestamp</th>
                    <th>Model</th>
                    <th>Policies Checked</th>
                    <th>Passed</th>
                    <th>Failed</th>
                    <th>Score</th>
                    <th>Status</th>
                    <th>Reviewer</th>
                </tr>
            </thead>
            <tbody>
                ${records.map((record, index) => {
                    const date = new Date(record.timestamp);
                    const formattedDate = date.toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                    return `
                        <tr>
                            <td>${records.length - index}</td>
                            <td>${formattedDate}</td>
                            <td><strong>${record.modelName}</strong></td>
                            <td>${record.policiesChecked}</td>
                            <td class="status-compliant">${record.passed}</td>
                            <td class="status-non-compliant">${record.failed}</td>
                            <td>${record.score}%</td>
                            <td><span class="status-${this.getAuditStatusClass(record.status)}">${record.status}</span></td>
                            <td>${record.reviewer}</td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        `;
        container.innerHTML = '';
        container.appendChild(table);
    },

    getAuditStatusClass(status) {
        return status === 'Compliant' ? 'compliant' :
               status === 'At Risk' ? 'at-risk' :
               'non-compliant';
    },

    logAuditRecord(record) {
        const newRecord = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            ...record
        };

        if (!this.auditRecords) {
            this.auditRecords = [];
        }

        this.auditRecords.unshift(newRecord);
        localStorage.setItem('auditTrail', JSON.stringify(this.auditRecords));
        this.renderAuditTable();
    }
};
