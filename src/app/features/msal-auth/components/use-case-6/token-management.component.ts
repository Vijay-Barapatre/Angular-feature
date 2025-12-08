/**
 * ============================================================================
 * USE CASE 6: TOKEN MANAGEMENT
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-token-management',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>🎫 Token Management</h1>
                <p class="subtitle">Acquire, Refresh & Manage Tokens</p>
            </header>

            <section class="types-section">
                <h2>📋 Token Types</h2>
                <div class="token-grid">
                    <div class="token-card">
                        <h3>🎫 Access Token</h3>
                        <p>Used to call APIs</p>
                        <ul>
                            <li>Short-lived (1 hour)</li>
                            <li>Contains scopes</li>
                            <li>Sent in Authorization header</li>
                        </ul>
                    </div>
                    <div class="token-card">
                        <h3>🆔 ID Token</h3>
                        <p>Contains user info</p>
                        <ul>
                            <li>JWT format</li>
                            <li>Has user claims</li>
                            <li>Used for authentication</li>
                        </ul>
                    </div>
                    <div class="token-card">
                        <h3>🔄 Refresh Token</h3>
                        <p>Gets new access tokens</p>
                        <ul>
                            <li>Longer-lived</li>
                            <li>Stored securely</li>
                            <li>Used automatically</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section class="acquire-section">
                <h2>🔑 Acquiring Tokens</h2>
                <pre class="code"><code>// token.service.ts
import {{ '{' }} Injectable, inject {{ '}' }} from '&#64;angular/core';
import {{ '{' }} MsalService {{ '}' }} from '&#64;azure/msal-angular';
import {{ '{' }} AuthenticationResult {{ '}' }} from '&#64;azure/msal-browser';
import {{ '{' }} Observable, from {{ '}' }} from 'rxjs';

&#64;Injectable({{ '{' }} providedIn: 'root' {{ '}' }})
export class TokenService {{ '{' }}
    private msalService = inject(MsalService);

    // 🔇 Silent token acquisition (preferred)
    acquireTokenSilent(scopes: string[]): Observable&lt;AuthenticationResult&gt; {{ '{' }}
        const account = this.msalService.instance.getAllAccounts()[0];
        
        return from(this.msalService.instance.acquireTokenSilent({{ '{' }}
            account,
            scopes
        {{ '}' }}));
    {{ '}' }}

    // 🪟 Popup if silent fails
    acquireTokenPopup(scopes: string[]): Observable&lt;AuthenticationResult&gt; {{ '{' }}
        return this.msalService.acquireTokenPopup({{ '{' }}
            scopes
        {{ '}' }});
    {{ '}' }}

    // ↪️ Redirect if silent fails
    acquireTokenRedirect(scopes: string[]): void {{ '{' }}
        this.msalService.acquireTokenRedirect({{ '{' }}
            scopes
        {{ '}' }});
    {{ '}' }}
{{ '}' }}</code></pre>
            </section>

            <section class="fallback-section">
                <h2>🔄 Silent with Fallback Pattern</h2>
                <pre class="code"><code>// Recommended pattern: try silent first, fallback to popup
getAccessToken(scopes: string[]): Observable&lt;string&gt; {{ '{' }}
    const account = this.msalService.instance.getAllAccounts()[0];
    
    return from(
        this.msalService.instance.acquireTokenSilent({{ '{' }}
            account,
            scopes
        {{ '}' }}).catch(error => {{ '{' }}
            // Silent failed, try popup
            console.warn('Silent token failed, using popup');
            return this.msalService.instance.acquireTokenPopup({{ '{' }} scopes {{ '}' }});
        {{ '}' }})
    ).pipe(
        map(result => result.accessToken)
    );
{{ '}' }}</code></pre>
            </section>

            <section class="decode-section">
                <h2>🔍 Decoding Tokens</h2>
                <pre class="code"><code>// Decode ID token to get user claims
decodeToken(token: string): any {{ '{' }}
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
{{ '}' }}

// Example usage
const idToken = result.idToken;
const claims = this.decodeToken(idToken);
console.log('User:', claims.name);
console.log('Email:', claims.preferred_username);
console.log('Expires:', new Date(claims.exp * 1000));</code></pre>
            </section>

            <section class="claims-section">
                <h2>📋 Common Claims</h2>
                <table>
                    <tr><th>Claim</th><th>Description</th></tr>
                    <tr><td>sub</td><td>Subject (unique user ID)</td></tr>
                    <tr><td>name</td><td>Display name</td></tr>
                    <tr><td>preferred_username</td><td>Email/UPN</td></tr>
                    <tr><td>oid</td><td>Object ID in Azure AD</td></tr>
                    <tr><td>tid</td><td>Tenant ID</td></tr>
                    <tr><td>exp</td><td>Expiration timestamp</td></tr>
                    <tr><td>iat</td><td>Issued at timestamp</td></tr>
                </table>
            </section>

            <section class="tips-section">
                <h2>💡 Best Practices</h2>
                <ul>
                    <li>Always try <code>acquireTokenSilent</code> first</li>
                    <li>Fall back to popup/redirect only when silent fails</li>
                    <li>Request only the scopes you need</li>
                    <li>Let MSAL handle token caching and refresh</li>
                    <li>Don't decode tokens on the frontend - use them as-is</li>
                </ul>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: #0078d4; }

        .code { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 10px; overflow-x: auto; font-size: 0.75rem; margin: 0.5rem 0; }

        section { margin-bottom: 2rem; }

        .token-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        .token-card { background: var(--bg-secondary, #f8f9fa); padding: 1.25rem; border-radius: 10px; }
        .token-card h3 { margin: 0 0 0.5rem; color: #0078d4; font-size: 1rem; }
        .token-card p { margin: 0 0 0.75rem; font-size: 0.85rem; color: var(--text-secondary); }
        .token-card ul { margin: 0; padding-left: 1.25rem; font-size: 0.8rem; }
        .token-card li { margin-bottom: 0.25rem; }

        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
        th { background: var(--bg-secondary); }
        td:first-child { font-family: monospace; color: #0078d4; }

        code { background: rgba(0,0,0,0.1); padding: 0.1rem 0.3rem; border-radius: 3px; }
        ul { padding-left: 1.5rem; }
        li { margin-bottom: 0.5rem; }
    `]
})
export class TokenManagementComponent { }
