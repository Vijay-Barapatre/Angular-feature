/**
 * ============================================================================
 * MSAL AUTHENTICATION OVERVIEW COMPONENT
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-msal-auth-overview',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
        <div class="container">
            <header class="header">
                <h1>🔐 MSAL Authentication</h1>
                <p class="subtitle">Microsoft Authentication Library for Angular</p>
            </header>

            <section class="intro-section">
                <div class="intro-card">
                    <h2>What is MSAL?</h2>
                    <p>
                        <strong>MSAL (Microsoft Authentication Library)</strong> enables Angular applications 
                        to authenticate users with Azure Active Directory, Microsoft accounts, and Azure AD B2C.
                    </p>
                </div>
            </section>

            <section class="flow-section">
                <h2>🔄 Authentication Flow</h2>
                <div class="flow-visual">
                    <div class="flow-step">
                        <span class="num">1</span>
                        <span class="icon">👤</span>
                        <h4>User Clicks Login</h4>
                    </div>
                    <div class="arrow">→</div>
                    <div class="flow-step">
                        <span class="num">2</span>
                        <span class="icon">🔑</span>
                        <h4>Azure AD Login</h4>
                    </div>
                    <div class="arrow">→</div>
                    <div class="flow-step">
                        <span class="num">3</span>
                        <span class="icon">🎫</span>
                        <h4>Token Returned</h4>
                    </div>
                    <div class="arrow">→</div>
                    <div class="flow-step">
                        <span class="num">4</span>
                        <span class="icon">✅</span>
                        <h4>Access Granted</h4>
                    </div>
                </div>
            </section>

            <section class="usecases-section">
                <h2>📖 Use Cases</h2>
                <div class="usecase-grid">
                    <a routerLink="use-case-1" class="usecase-card">
                        <span class="num">1</span>
                        <h3>MSAL Setup</h3>
                        <p>Configuration, app registration, provider setup</p>
                        <span class="tag">Configuration</span>
                    </a>
                    <a routerLink="use-case-2" class="usecase-card">
                        <span class="num">2</span>
                        <h3>Login Flows</h3>
                        <p>Popup vs Redirect login methods</p>
                        <span class="tag">loginPopup / loginRedirect</span>
                    </a>
                    <a routerLink="use-case-3" class="usecase-card">
                        <span class="num">3</span>
                        <h3>Auth Guard</h3>
                        <p>Protect routes with MsalGuard</p>
                        <span class="tag">canActivate</span>
                    </a>
                    <a routerLink="use-case-4" class="usecase-card">
                        <span class="num">4</span>
                        <h3>HTTP Interceptor</h3>
                        <p>Auto-attach tokens to API calls</p>
                        <span class="tag">MsalInterceptor</span>
                    </a>
                    <a routerLink="use-case-5" class="usecase-card">
                        <span class="num">5</span>
                        <h3>User Profile</h3>
                        <p>Get user info from Microsoft Graph</p>
                        <span class="tag">graph.microsoft.com</span>
                    </a>
                    <a routerLink="use-case-6" class="usecase-card">
                        <span class="num">6</span>
                        <h3>Token Management</h3>
                        <p>Acquire tokens, silent refresh, scopes</p>
                        <span class="tag">acquireTokenSilent</span>
                    </a>
                </div>
            </section>

            <section class="prereq-section">
                <h2>⚙️ Prerequisites</h2>
                <div class="prereq-grid">
                    <div class="prereq">
                        <h4>Azure AD App Registration</h4>
                        <ul>
                            <li>Client ID (Application ID)</li>
                            <li>Tenant ID</li>
                            <li>Redirect URI configured</li>
                        </ul>
                    </div>
                    <div class="prereq">
                        <h4>npm Packages</h4>
                        <pre class="code">npm install &#64;azure/msal-angular &#64;azure/msal-browser</pre>
                    </div>
                </div>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1100px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { font-size: 2.5rem; color: var(--primary-color, #0078d4); }

        .intro-card { background: linear-gradient(135deg, #0078d4 0%, #005a9e 100%); color: white; padding: 2rem; border-radius: 12px; }
        .intro-card h2 { margin-top: 0; }

        section { margin-bottom: 2.5rem; }

        .flow-visual { display: flex; align-items: center; justify-content: center; gap: 0.5rem; flex-wrap: wrap; margin-top: 1rem; }
        .flow-step { background: var(--bg-secondary, #f8f9fa); padding: 1rem; border-radius: 10px; text-align: center; min-width: 120px; position: relative; }
        .flow-step .num { position: absolute; top: -10px; left: -10px; width: 24px; height: 24px; background: #0078d4; color: white; border-radius: 50%; font-size: 0.75rem; display: flex; align-items: center; justify-content: center; }
        .flow-step .icon { font-size: 2rem; display: block; margin-bottom: 0.5rem; }
        .flow-step h4 { margin: 0; font-size: 0.85rem; }
        .arrow { font-size: 1.5rem; color: #0078d4; }

        .usecase-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        .usecase-card { display: block; background: var(--bg-secondary, #f8f9fa); padding: 1.5rem; border-radius: 10px; text-decoration: none; color: inherit; transition: all 0.2s; position: relative; border: 2px solid transparent; }
        .usecase-card:hover { border-color: #0078d4; transform: translateY(-2px); }
        .usecase-card .num { position: absolute; top: 10px; right: 10px; width: 24px; height: 24px; background: #0078d4; color: white; border-radius: 50%; font-size: 0.75rem; display: flex; align-items: center; justify-content: center; }
        .usecase-card h3 { margin: 0 0 0.5rem; color: #0078d4; }
        .usecase-card p { margin: 0 0 0.75rem; font-size: 0.85rem; color: var(--text-secondary); }
        .usecase-card .tag { background: rgba(0, 120, 212, 0.1); color: #0078d4; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.7rem; font-family: monospace; }

        .prereq-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .prereq { background: var(--bg-secondary); padding: 1.5rem; border-radius: 10px; }
        .prereq h4 { margin: 0 0 0.75rem; color: #0078d4; }
        .prereq ul { margin: 0; padding-left: 1.25rem; }
        .code { background: #1e1e2e; color: #a6e3a1; padding: 0.75rem; border-radius: 6px; font-size: 0.8rem; margin-top: 0.5rem; overflow-x: auto; }
    `]
})
export class MsalAuthOverviewComponent { }
