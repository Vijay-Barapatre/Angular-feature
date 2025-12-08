/**
 * ============================================================================
 * USE CASE 1: XSS PREVENTION
 * ============================================================================
 */

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-xss-prevention',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>💉 XSS Prevention</h1>
                <p class="subtitle">Cross-Site Scripting Protection</p>
            </header>

            <section class="concept-section">
                <h2>What is XSS?</h2>
                <div class="alert danger">
                    <strong>XSS</strong> allows attackers to inject malicious scripts into web pages
                    viewed by other users, stealing cookies, sessions, or sensitive data.
                </div>
            </section>

            <section class="auto-section">
                <h2>✅ Angular's Automatic Protection</h2>
                <p>Angular automatically sanitizes values in templates:</p>
                <pre class="code"><code>&lt;!-- Angular auto-escapes this --&gt;
&lt;div&gt;{{ '{{' }} userInput {{ '}}' }}&lt;/div&gt;

&lt;!-- If userInput = '&lt;script&gt;evil()&lt;/script&gt;' --&gt;
&lt;!-- Renders as: &amp;lt;script&amp;gt;evil()&amp;lt;/script&amp;gt; --&gt;</code></pre>
            </section>

            <section class="demo-section">
                <h2>🎯 Live Demo: Sanitization</h2>
                <div class="demo-box">
                    <div class="input-area">
                        <label>Enter HTML (try: &lt;script&gt;alert('xss')&lt;/script&gt;)</label>
                        <textarea [(ngModel)]="userInput" rows="3"></textarea>
                    </div>
                    
                    <div class="results">
                        <div class="result-card safe">
                            <h4>✅ Safe (Default)</h4>
                            <div class="output">{{ userInput }}</div>
                            <p class="hint">Scripts are escaped</p>
                        </div>
                        <div class="result-card unsafe">
                            <h4>⚠️ Bypassed (Dangerous)</h4>
                            <div class="output" [innerHTML]="trustedHtml"></div>
                            <p class="hint">Only use with trusted content!</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="sanitizer-section">
                <h2>💻 DomSanitizer API</h2>
                <pre class="code"><code>import {{ '{' }} DomSanitizer {{ '}' }} from '&#64;angular/platform-browser';

&#64;Component({{ '{' }} ... {{ '}' }})
export class MyComponent {{ '{' }}
    private sanitizer = inject(DomSanitizer);
    
    // ⚠️ DANGEROUS - Only use with TRUSTED content!
    trustedHtml = this.sanitizer.bypassSecurityTrustHtml(htmlContent);
    trustedUrl = this.sanitizer.bypassSecurityTrustUrl(url);
    trustedResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    trustedScript = this.sanitizer.bypassSecurityTrustScript(script);
    trustedStyle = this.sanitizer.bypassSecurityTrustStyle(style);
{{ '}' }}</code></pre>
            </section>

            <section class="contexts-section">
                <h2>📋 Security Contexts</h2>
                <table>
                    <tr><th>Context</th><th>Example</th><th>Sanitization</th></tr>
                    <tr><td>HTML</td><td>[innerHTML]="value"</td><td>Strips scripts, on* handlers</td></tr>
                    <tr><td>Style</td><td>[style]="value"</td><td>Removes url(), expression()</td></tr>
                    <tr><td>URL</td><td>[href]="value"</td><td>Blocks javascript:</td></tr>
                    <tr><td>Resource URL</td><td>[src]="iframeSrc"</td><td>Requires explicit trust</td></tr>
                </table>
            </section>

            <section class="best-practices">
                <h2>💡 Best Practices</h2>
                <ul>
                    <li>✅ Rely on Angular's default sanitization</li>
                    <li>✅ Avoid [innerHTML] when possible</li>
                    <li>⚠️ Never bypass security for user input</li>
                    <li>✅ Sanitize on server too (defense in depth)</li>
                    <li>✅ Use Content Security Policy headers</li>
                </ul>
            </section>

            <section class="vulnerable-section">
                <h2>🚨 Common Vulnerabilities</h2>
                <pre class="code danger"><code>&lt;!-- ❌ NEVER DO THIS --&gt;
&lt;div [innerHTML]="sanitizer.bypassSecurityTrustHtml(userInput)"&gt;&lt;/div&gt;

&lt;!-- ❌ Avoid eval and similar --&gt;
eval(userProvidedString);  // NEVER!

&lt;!-- ❌ Don't construct HTML strings --&gt;
element.innerHTML = '&lt;div&gt;' + userInput + '&lt;/div&gt;';</code></pre>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: #10b981; }

        .code { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 10px; overflow-x: auto; font-size: 0.75rem; }
        .code.danger { border: 2px solid #ef4444; }

        section { margin-bottom: 2rem; }

        .alert { padding: 1rem; border-radius: 8px; }
        .alert.danger { background: #fee2e2; color: #dc2626; border-left: 4px solid #ef4444; }

        .demo-box { background: var(--bg-secondary); padding: 1.5rem; border-radius: 12px; }
        .input-area { margin-bottom: 1rem; }
        .input-area label { display: block; margin-bottom: 0.5rem; font-weight: 500; }
        .input-area textarea { width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 6px; font-family: monospace; }
        
        .results { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .result-card { padding: 1rem; border-radius: 8px; }
        .result-card.safe { background: #dcfce7; }
        .result-card.unsafe { background: #fef3c7; }
        .result-card h4 { margin: 0 0 0.5rem; }
        .output { background: white; padding: 0.5rem; border-radius: 4px; min-height: 40px; font-family: monospace; font-size: 0.85rem; }
        .hint { margin: 0.5rem 0 0; font-size: 0.75rem; color: var(--text-secondary); }

        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
        th { background: var(--bg-secondary); }

        ul { padding-left: 1.5rem; }
        li { margin-bottom: 0.5rem; }
    `]
})
export class XssPreventionComponent {
    private sanitizer = inject(DomSanitizer);

    userInput = '<b>Bold</b> and <script>alert("XSS")</script>';

    get trustedHtml(): SafeHtml {
        // Remove script tags but allow other HTML
        const cleaned = this.userInput.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '[SCRIPT REMOVED]');
        return this.sanitizer.bypassSecurityTrustHtml(cleaned);
    }
}
