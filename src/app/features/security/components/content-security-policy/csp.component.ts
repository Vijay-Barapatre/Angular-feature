/**
 * ============================================================================
 * CONTENT SECURITY POLICY
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-csp',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>🛡️ Content Security Policy</h1>
                <p class="subtitle">HTTP Header-based XSS Mitigation</p>
            </header>

            <section class="concept-section">
                <h2>What is CSP?</h2>
                <p>
                    <strong>Content Security Policy</strong> is an HTTP header that tells browsers
                    which resources (scripts, styles, images) are allowed to load. It's a powerful
                    defense-in-depth mechanism against XSS attacks.
                </p>
            </section>

            <section class="header-section">
                <h2>💻 Basic CSP Header</h2>
                <pre class="code"><code>Content-Security-Policy: 
    default-src 'self';
    script-src 'self' https://trusted-cdn.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https:;
    connect-src 'self' https://api.example.com;
    font-src 'self' https://fonts.gstatic.com;
    frame-ancestors 'none';</code></pre>
            </section>

            <section class="directives-section">
                <h2>📋 CSP Directives</h2>
                <table>
                    <tr><th>Directive</th><th>Controls</th><th>Example</th></tr>
                    <tr><td>default-src</td><td>Fallback for other directives</td><td>'self'</td></tr>
                    <tr><td>script-src</td><td>JavaScript sources</td><td>'self' 'nonce-abc123'</td></tr>
                    <tr><td>style-src</td><td>CSS sources</td><td>'self' 'unsafe-inline'</td></tr>
                    <tr><td>img-src</td><td>Image sources</td><td>'self' data: https:</td></tr>
                    <tr><td>connect-src</td><td>Fetch, XHR, WebSocket</td><td>'self' https://api.com</td></tr>
                    <tr><td>font-src</td><td>Font sources</td><td>'self' https://fonts.com</td></tr>
                    <tr><td>frame-ancestors</td><td>Who can embed (anti-clickjacking)</td><td>'none'</td></tr>
                    <tr><td>report-uri</td><td>Violation reporting</td><td>/csp-report</td></tr>
                </table>
            </section>

            <section class="angular-section">
                <h2>🅰️ Angular-Specific CSP</h2>
                <pre class="code"><code>&lt;!-- Angular requires these for functionality --&gt;
Content-Security-Policy:
    script-src 'self' 'unsafe-eval';    &lt;!-- JIT requires this, not needed for AOT --&gt;
    style-src 'self' 'unsafe-inline';   &lt;!-- Component styles --&gt;

&lt;!-- For production (AOT), you can be stricter: --&gt;
script-src 'self';
style-src 'self' 'unsafe-inline';       &lt;!-- Still needed for component styles --&gt;

&lt;!-- Best: Use nonce for inline styles --&gt;
style-src 'self' 'nonce-RANDOM_VALUE';</code></pre>
            </section>

            <section class="nonce-section">
                <h2>🔑 Using Nonces</h2>
                <pre class="code"><code>&lt;!-- Server generates random nonce per request --&gt;
Content-Security-Policy: script-src 'self' 'nonce-abc123xyz'

&lt;!-- Only scripts with matching nonce execute --&gt;
&lt;script nonce="abc123xyz"&gt;
    // This runs
&lt;/script&gt;

&lt;script&gt;
    // This is blocked!
&lt;/script&gt;

&lt;!-- Injected script also blocked --&gt;
&lt;script&gt;malicious()&lt;/script&gt;</code></pre>
            </section>

            <section class="server-section">
                <h2>🖥️ Server Configuration</h2>
                <pre class="code"><code>// Express.js with helmet
const helmet = require('helmet');

app.use(helmet.contentSecurityPolicy({{ '{' }}
    directives: {{ '{' }}
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://trusted-cdn.com"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", "https://api.example.com"],
        frameAncestors: ["'none'"]
    {{ '}' }}
{{ '}' }}));

// Nginx
add_header Content-Security-Policy "default-src 'self'; script-src 'self'";

// Apache
Header set Content-Security-Policy "default-src 'self'";</code></pre>
            </section>

            <section class="report-section">
                <h2>📊 CSP Reporting</h2>
                <pre class="code"><code>// Report-Only mode (for testing)
Content-Security-Policy-Report-Only: 
    default-src 'self'; 
    report-uri /csp-report;

// Violation report endpoint
app.post('/csp-report', (req, res) =&gt; {{ '{' }}
    console.log('CSP Violation:', req.body);
    // Log to monitoring service
{{ '}' }});</code></pre>
            </section>

            <section class="best-practices">
                <h2>💡 Best Practices</h2>
                <ul>
                    <li>✅ Start with Report-Only mode</li>
                    <li>✅ Use 'self' as default-src</li>
                    <li>✅ Avoid 'unsafe-inline' and 'unsafe-eval' when possible</li>
                    <li>✅ Use nonces or hashes for inline scripts</li>
                    <li>✅ Set frame-ancestors to prevent clickjacking</li>
                    <li>✅ Monitor CSP violations in production</li>
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

        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
        th { background: var(--bg-secondary); }
        td:first-child { font-family: monospace; color: #10b981; }
        td:last-child { font-family: monospace; font-size: 0.8rem; }

        ul { padding-left: 1.5rem; }
        li { margin-bottom: 0.5rem; }
    `]
})
export class CspComponent { }
