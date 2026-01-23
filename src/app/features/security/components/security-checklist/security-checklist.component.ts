/**
 * ============================================================================
 * SECURITY CHECKLIST
 * ============================================================================
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ChecklistItem {
    id: string;
    category: string;
    title: string;
    description: string;
    priority: 'critical' | 'high' | 'medium';
    checked: boolean;
}

@Component({
    selector: 'app-security-checklist',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>📋 Security Checklist</h1>
                <p class="subtitle">Angular Security Best Practices & OWASP Top 10</p>
            </header>

            <section class="stats-section">
                <div class="stats">
                    <div class="stat">
                        <span class="num">{{ completedCount() }}</span>
                        <span class="label">Completed</span>
                    </div>
                    <div class="stat">
                        <span class="num">{{ checklist.length - completedCount() }}</span>
                        <span class="label">Remaining</span>
                    </div>
                    <div class="stat">
                        <span class="num">{{ progressPercent() }}%</span>
                        <span class="label">Progress</span>
                    </div>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" [style.width.%]="progressPercent()"></div>
                </div>
            </section>

            <section class="checklist-section">
                @for (category of categories; track category) {
                    <div class="category">
                        <h3>{{ category }}</h3>
                        <div class="items">
                            @for (item of getItemsByCategory(category); track item.id) {
                                <div class="checklist-item" [class.checked]="item.checked">
                                    <input type="checkbox" [(ngModel)]="item.checked" [id]="item.id">
                                    <label [for]="item.id">
                                        <span class="priority" [class]="item.priority">{{ item.priority }}</span>
                                        <span class="title">{{ item.title }}</span>
                                        <span class="desc">{{ item.description }}</span>
                                    </label>
                                </div>
                            }
                        </div>
                    </div>
                }
            </section>

            <section class="owasp-section">
                <h2>🔟 OWASP Top 10 (2021)</h2>
                <table>
                    <tr><th>#</th><th>Vulnerability</th><th>Angular Mitigation</th></tr>
                    <tr><td>1</td><td>Broken Access Control</td><td>Route Guards, Server-side auth</td></tr>
                    <tr><td>2</td><td>Cryptographic Failures</td><td>HTTPS, Secure storage</td></tr>
                    <tr><td>3</td><td>Injection</td><td>Parameterized queries, Sanitization</td></tr>
                    <tr><td>4</td><td>Insecure Design</td><td>Threat modeling, Security reviews</td></tr>
                    <tr><td>5</td><td>Security Misconfiguration</td><td>CSP, Secure headers</td></tr>
                    <tr><td>6</td><td>Vulnerable Components</td><td>npm audit, Dependabot</td></tr>
                    <tr><td>7</td><td>Auth Failures</td><td>Secure token handling, MFA</td></tr>
                    <tr><td>8</td><td>Integrity Failures</td><td>SRI, Signed packages</td></tr>
                    <tr><td>9</td><td>Logging Failures</td><td>Error logging, Monitoring</td></tr>
                    <tr><td>10</td><td>SSRF</td><td>URL validation, Allowlists</td></tr>
                </table>
            </section>

            <section class="resources-section">
                <h2>📚 Resources</h2>
                <ul>
                    <li>Angular Security Guide: angular.io/guide/security</li>
                    <li>OWASP Top 10: owasp.org/Top10</li>
                    <li>OWASP Cheat Sheets: cheatsheetseries.owasp.org</li>
                    <li>npm audit: Run regularly to find vulnerabilities</li>
                </ul>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: #10b981; }

        section { margin-bottom: 2rem; }

        .stats { display: flex; gap: 2rem; justify-content: center; margin-bottom: 1rem; }
        .stat { text-align: center; }
        .stat .num { display: block; font-size: 2rem; font-weight: bold; color: #10b981; }
        .stat .label { font-size: 0.85rem; color: var(--text-secondary); }
        .progress-bar { height: 8px; background: #e5e7eb; border-radius: 4px; overflow: hidden; }
        .progress-fill { height: 100%; background: linear-gradient(90deg, #10b981, #059669); transition: width 0.3s; }

        .category { margin-bottom: 1.5rem; }
        .category h3 { margin: 0 0 0.75rem; color: #10b981; font-size: 1rem; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem; }

        .items { display: flex; flex-direction: column; gap: 0.5rem; }
        .checklist-item { display: flex; align-items: flex-start; gap: 0.75rem; padding: 0.75rem; background: var(--bg-secondary); border-radius: 8px; transition: all 0.2s; }
        .checklist-item.checked { background: #dcfce7; }
        .checklist-item input { margin-top: 4px; }
        .checklist-item label { flex: 1; cursor: pointer; }
        .priority { display: inline-block; padding: 0.15rem 0.4rem; border-radius: 4px; font-size: 0.65rem; font-weight: bold; margin-right: 0.5rem; text-transform: uppercase; }
        .priority.critical { background: #fee2e2; color: #dc2626; }
        .priority.high { background: #fef3c7; color: #b45309; }
        .priority.medium { background: #e0f2fe; color: #0369a1; }
        .title { font-weight: 500; }
        .desc { display: block; font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.25rem; }

        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
        th { background: var(--bg-secondary); }
        td:first-child { font-weight: bold; color: #10b981; width: 40px; }

        ul { padding-left: 1.5rem; }
        li { margin-bottom: 0.5rem; }
    `]
})
export class SecurityChecklistComponent {
    checklist: ChecklistItem[] = [
        // XSS
        { id: 'xss-1', category: 'XSS Prevention', title: 'Avoid innerHTML with user input', description: 'Use Angular binding instead', priority: 'critical', checked: false },
        { id: 'xss-2', category: 'XSS Prevention', title: 'Never bypass DomSanitizer for user content', description: 'bypassSecurityTrust* should only be used for trusted content', priority: 'critical', checked: false },
        { id: 'xss-3', category: 'XSS Prevention', title: 'Implement CSP headers', description: 'Configure Content-Security-Policy on server', priority: 'high', checked: false },

        // Authentication
        { id: 'auth-1', category: 'Authentication', title: 'Store tokens securely', description: 'Use HttpOnly cookies or memory, avoid localStorage', priority: 'critical', checked: false },
        { id: 'auth-2', category: 'Authentication', title: 'Short access token lifetime', description: 'Use 5-15 minute expiry with refresh tokens', priority: 'high', checked: false },
        { id: 'auth-3', category: 'Authentication', title: 'Implement token refresh', description: 'Silently refresh before expiry', priority: 'high', checked: false },

        // CSRF
        { id: 'csrf-1', category: 'CSRF Protection', title: 'Enable XSRF support', description: 'Configure withXsrfConfiguration in HttpClient', priority: 'high', checked: false },
        { id: 'csrf-2', category: 'CSRF Protection', title: 'SameSite cookie attribute', description: 'Set SameSite=Strict for session cookies', priority: 'high', checked: false },

        // General
        { id: 'gen-1', category: 'General', title: 'Use HTTPS everywhere', description: 'Redirect HTTP to HTTPS', priority: 'critical', checked: false },
        { id: 'gen-2', category: 'General', title: 'Run npm audit regularly', description: 'Check for vulnerable dependencies', priority: 'high', checked: false },
        { id: 'gen-3', category: 'General', title: 'Validate on server', description: 'Never trust client-side validation alone', priority: 'critical', checked: false },
        { id: 'gen-4', category: 'General', title: 'Use AOT compilation', description: 'Prevents template injection', priority: 'medium', checked: false }
    ];

    categories = ['XSS Prevention', 'Authentication', 'CSRF Protection', 'General'];

    getItemsByCategory(category: string): ChecklistItem[] {
        return this.checklist.filter(item => item.category === category);
    }

    completedCount(): number {
        return this.checklist.filter(item => item.checked).length;
    }

    progressPercent(): number {
        return Math.round((this.completedCount() / this.checklist.length) * 100);
    }
}
