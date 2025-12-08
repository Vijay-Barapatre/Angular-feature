/**
 * ============================================================================
 * SECURITY FEATURES OVERVIEW
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-security-overview',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
        <div class="container">
            <header class="header">
                <h1>🔒 Security in Angular</h1>
                <p class="subtitle">XSS, CSRF, CSP & Authentication Patterns</p>
            </header>

            <section class="intro-section">
                <div class="intro-card">
                    <h2>Why Security Matters</h2>
                    <p>
                        Angular has built-in security features, but understanding them is crucial.
                        A single vulnerability can compromise user data, sessions, and trust.
                    </p>
                </div>
            </section>

            <section class="threats-section">
                <h2>⚠️ Common Web Threats</h2>
                <div class="threats-grid">
                    <div class="threat-card xss">
                        <span class="icon">💉</span>
                        <h3>XSS</h3>
                        <p>Cross-Site Scripting</p>
                        <span class="severity high">HIGH</span>
                    </div>
                    <div class="threat-card csrf">
                        <span class="icon">🎭</span>
                        <h3>CSRF</h3>
                        <p>Cross-Site Request Forgery</p>
                        <span class="severity high">HIGH</span>
                    </div>
                    <div class="threat-card injection">
                        <span class="icon">📝</span>
                        <h3>Injection</h3>
                        <p>SQL, NoSQL, Command</p>
                        <span class="severity critical">CRITICAL</span>
                    </div>
                    <div class="threat-card auth">
                        <span class="icon">🔓</span>
                        <h3>Broken Auth</h3>
                        <p>Session hijacking</p>
                        <span class="severity high">HIGH</span>
                    </div>
                </div>
            </section>

            <section class="usecases-section">
                <h2>📖 Use Cases</h2>
                <div class="usecase-grid">
                    <a routerLink="use-case-1" class="usecase-card">
                        <span class="num">1</span>
                        <h3>XSS Prevention</h3>
                        <p>DomSanitizer, auto-escaping, bypassSecurityTrust</p>
                        <span class="tag">Built-in</span>
                    </a>
                    <a routerLink="use-case-2" class="usecase-card">
                        <span class="num">2</span>
                        <h3>CSRF Protection</h3>
                        <p>Tokens, HttpOnly cookies, SameSite</p>
                        <span class="tag">Backend</span>
                    </a>
                    <a routerLink="use-case-3" class="usecase-card">
                        <span class="num">3</span>
                        <h3>Content Security Policy</h3>
                        <p>Headers, nonce, strict-dynamic</p>
                        <span class="tag">Server</span>
                    </a>
                    <a routerLink="use-case-4" class="usecase-card">
                        <span class="num">4</span>
                        <h3>Auth Security</h3>
                        <p>JWT handling, secure storage, token refresh</p>
                        <span class="tag">Pattern</span>
                    </a>
                    <a routerLink="use-case-5" class="usecase-card">
                        <span class="num">5</span>
                        <h3>Input Validation</h3>
                        <p>Client & server validation, sanitization</p>
                        <span class="tag">Forms</span>
                    </a>
                    <a routerLink="use-case-6" class="usecase-card">
                        <span class="num">6</span>
                        <h3>Security Checklist</h3>
                        <p>Best practices, OWASP Top 10, audit</p>
                        <span class="tag">Reference</span>
                    </a>
                </div>
            </section>

            <section class="angular-section">
                <h2>🛡️ Angular's Built-in Security</h2>
                <table>
                    <tr><th>Feature</th><th>Protection</th><th>Automatic?</th></tr>
                    <tr><td>Template Sanitization</td><td>XSS in templates</td><td>✅ Yes</td></tr>
                    <tr><td>DomSanitizer</td><td>XSS in dynamic content</td><td>⚠️ Manual</td></tr>
                    <tr><td>HttpClient</td><td>XSRF token support</td><td>✅ With config</td></tr>
                    <tr><td>AOT Compilation</td><td>Template injection</td><td>✅ Yes</td></tr>
                </table>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1100px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { font-size: 2.5rem; color: var(--primary-color, #10b981); }

        .intro-card { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; }

        section { margin-bottom: 2.5rem; }

        .threats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        .threat-card { background: var(--bg-secondary); padding: 1.25rem; border-radius: 10px; text-align: center; position: relative; }
        .threat-card .icon { font-size: 2rem; display: block; margin-bottom: 0.5rem; }
        .threat-card h3 { margin: 0 0 0.25rem; color: #ef4444; }
        .threat-card p { margin: 0; font-size: 0.75rem; color: var(--text-secondary); }
        .severity { position: absolute; top: 8px; right: 8px; padding: 0.15rem 0.4rem; border-radius: 4px; font-size: 0.6rem; font-weight: bold; }
        .severity.high { background: #fef3c7; color: #b45309; }
        .severity.critical { background: #fee2e2; color: #dc2626; }

        .usecase-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }
        .usecase-card { display: block; background: var(--bg-secondary); padding: 1.5rem; border-radius: 10px; text-decoration: none; color: inherit; transition: all 0.2s; position: relative; border: 2px solid transparent; }
        .usecase-card:hover { border-color: #10b981; transform: translateY(-2px); }
        .usecase-card .num { position: absolute; top: 10px; right: 10px; width: 24px; height: 24px; background: #10b981; color: white; border-radius: 50%; font-size: 0.75rem; display: flex; align-items: center; justify-content: center; }
        .usecase-card h3 { margin: 0 0 0.5rem; color: #10b981; }
        .usecase-card p { margin: 0 0 0.75rem; font-size: 0.85rem; color: var(--text-secondary); }
        .tag { background: rgba(16, 185, 129, 0.1); color: #10b981; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.7rem; }

        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
        th { background: var(--bg-secondary); }
    `]
})
export class SecurityOverviewComponent { }
