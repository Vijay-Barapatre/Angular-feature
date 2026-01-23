/**
 * ============================================================================
 * CSRF PROTECTION
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-csrf-protection',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>🎭 CSRF Protection</h1>
                <p class="subtitle">Cross-Site Request Forgery Prevention</p>
            </header>

            <section class="concept-section">
                <h2>What is CSRF?</h2>
                <div class="alert danger">
                    <strong>CSRF</strong> tricks authenticated users into performing unwanted actions
                    on a site where they're logged in (e.g., transferring money, changing password).
                </div>
            </section>

            <section class="attack-section">
                <h2>🔍 How CSRF Works</h2>
                <div class="flow-diagram">
                    <div class="step">
                        <span class="num">1</span>
                        <p>User logs into bank.com</p>
                    </div>
                    <div class="arrow">→</div>
                    <div class="step">
                        <span class="num">2</span>
                        <p>User visits evil.com</p>
                    </div>
                    <div class="arrow">→</div>
                    <div class="step">
                        <span class="num">3</span>
                        <p>evil.com submits form to bank.com</p>
                    </div>
                    <div class="arrow">→</div>
                    <div class="step danger">
                        <span class="num">4</span>
                        <p>Bank processes request (user's cookies sent!)</p>
                    </div>
                </div>
            </section>

            <section class="angular-section">
                <h2>💻 Angular XSRF Support</h2>
                <pre class="code"><code>// app.config.ts
import {{ '{' }} provideHttpClient, withXsrfConfiguration {{ '}' }} from '&#64;angular/common/http';

export const appConfig: ApplicationConfig = {{ '{' }}
    providers: [
        provideHttpClient(
            withXsrfConfiguration({{ '{' }}
                cookieName: 'XSRF-TOKEN',    // Cookie set by server
                headerName: 'X-XSRF-TOKEN'   // Header Angular sends
            {{ '}' }})
        )
    ]
{{ '}' }};

// Angular automatically:
// 1. Reads XSRF-TOKEN from cookies
// 2. Adds X-XSRF-TOKEN header to mutating requests (POST, PUT, DELETE)
// 3. Server validates the token</code></pre>
            </section>

            <section class="server-section">
                <h2>🖥️ Server-Side Setup</h2>
                <div class="code-tabs">
                    <pre class="code"><code>// Express.js example
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(csrf({{ '{' }} cookie: true {{ '}' }}));

// Send token to client
app.get('/api/csrf-token', (req, res) =&gt; {{ '{' }}
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.json({{ '{' }} token: 'sent in cookie' {{ '}' }});
{{ '}' }});

// .NET Core
services.AddAntiforgery(options =&gt; {{ '{' }}
    options.HeaderName = "X-XSRF-TOKEN";
    options.Cookie.Name = "XSRF-TOKEN";
{{ '}' }});</code></pre>
                </div>
            </section>

            <section class="cookie-section">
                <h2>🍪 Secure Cookie Settings</h2>
                <table>
                    <tr><th>Attribute</th><th>Value</th><th>Purpose</th></tr>
                    <tr><td>HttpOnly</td><td>true (for session)</td><td>Prevents JS access</td></tr>
                    <tr><td>Secure</td><td>true</td><td>HTTPS only</td></tr>
                    <tr><td>SameSite</td><td>Strict / Lax</td><td>Cross-origin protection</td></tr>
                    <tr><td>Path</td><td>/</td><td>Cookie scope</td></tr>
                </table>
            </section>

            <section class="samesite-section">
                <h2>🛡️ SameSite Cookie Attribute</h2>
                <pre class="code"><code>// Server sets cookie with SameSite
Set-Cookie: session=abc123; SameSite=Strict; Secure; HttpOnly

// SameSite options:
// Strict - Cookie only sent for same-site requests
// Lax    - Cookie sent for top-level navigation (default)
// None   - Cookie sent cross-site (requires Secure)</code></pre>
            </section>

            <section class="best-practices">
                <h2>💡 Best Practices</h2>
                <ul>
                    <li>✅ Use Angular's built-in XSRF support</li>
                    <li>✅ Set SameSite=Strict for session cookies</li>
                    <li>✅ Validate CSRF token on all state-changing requests</li>
                    <li>✅ Use HttpOnly for session cookies</li>
                    <li>✅ Regenerate token after login</li>
                    <li>⚠️ Don't rely only on Referer header</li>
                </ul>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: #10b981; }

        .code { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 10px; overflow-x: auto; font-size: 0.75rem; }

        section { margin-bottom: 2rem; }

        .alert { padding: 1rem; border-radius: 8px; }
        .alert.danger { background: #fee2e2; color: #dc2626; border-left: 4px solid #ef4444; }

        .flow-diagram { display: flex; align-items: center; justify-content: center; gap: 0.5rem; flex-wrap: wrap; padding: 1.5rem; background: var(--bg-secondary); border-radius: 12px; }
        .step { background: white; padding: 1rem; border-radius: 8px; text-align: center; min-width: 120px; }
        .step.danger { background: #fee2e2; border: 2px solid #ef4444; }
        .step .num { display: block; width: 24px; height: 24px; background: #10b981; color: white; border-radius: 50%; margin: 0 auto 0.5rem; line-height: 24px; font-size: 0.8rem; }
        .step.danger .num { background: #ef4444; }
        .step p { margin: 0; font-size: 0.8rem; }
        .arrow { font-size: 1.5rem; color: #10b981; }

        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
        th { background: var(--bg-secondary); }
        td:first-child { font-family: monospace; color: #10b981; }

        ul { padding-left: 1.5rem; }
        li { margin-bottom: 0.5rem; }
    `]
})
export class CsrfProtectionComponent { }
