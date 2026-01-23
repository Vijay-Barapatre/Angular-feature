/**
 * ============================================================================
 * INPUT VALIDATION & SANITIZATION
 * ============================================================================
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-input-validation',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>📝 Input Validation</h1>
                <p class="subtitle">Client & Server-Side Validation</p>
            </header>

            <section class="concept-section">
                <h2>Defense in Depth</h2>
                <div class="layers">
                    <div class="layer l1">
                        <h4>1. Client Validation</h4>
                        <p>UX feedback, reduce server load</p>
                        <span class="tag">Not security!</span>
                    </div>
                    <div class="layer l2">
                        <h4>2. Server Validation</h4>
                        <p>Actual security boundary</p>
                        <span class="tag">Required</span>
                    </div>
                    <div class="layer l3">
                        <h4>3. Database Constraints</h4>
                        <p>Last line of defense</p>
                        <span class="tag">Critical</span>
                    </div>
                </div>
            </section>

            <section class="angular-section">
                <h2>💻 Angular Validators</h2>
                <pre class="code"><code>import &#123; Validators, AbstractControl &#125; from '&#64;angular/forms';

this.form = this.fb.group(&#123;
    email: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(255)
    ]],
    username: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z0-9_]+$/)  // Alphanumeric only
    ]],
    password: ['', [
        Validators.required,
        Validators.minLength(8),
        this.strongPasswordValidator
    ]]
&#125;);

// Custom validator
strongPasswordValidator(control: AbstractControl) &#123;
    const value = control.value;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecialChar = /[!&#64;#$%^&amp;*]/.test(value);
    
    const valid = hasUpperCase &amp;&amp; hasLowerCase &amp;&amp; hasNumeric &amp;&amp; hasSpecialChar;
    return valid ? null : &#123; weakPassword: true &#125;;
&#125;</code></pre>
            </section>

            <section class="demo-section">
                <h2>🎯 Live Demo</h2>
                <div class="demo-box">
                    <form [formGroup]="form" (ngSubmit)="onSubmit()">
                        <div class="field">
                            <label>Email</label>
                            <input formControlName="email" type="email">
                            @if (form.get('email')?.touched && form.get('email')?.invalid) {
                                <span class="error">Invalid email format</span>
                            }
                        </div>
                        <div class="field">
                            <label>Username (alphanumeric only)</label>
                            <input formControlName="username">
                            @if (form.get('username')?.touched && form.get('username')?.errors?.['pattern']) {
                                <span class="error">Only letters, numbers, underscore allowed</span>
                            }
                        </div>
                        <div class="field">
                            <label>Message (sanitized)</label>
                            <textarea formControlName="message"></textarea>
                            <span class="hint">HTML tags will be stripped</span>
                        </div>
                        <button type="submit" [disabled]="form.invalid">Submit</button>
                    </form>
                </div>
            </section>

            <section class="sanitize-section">
                <h2>💻 Server-Side Sanitization</h2>
                <pre class="code"><code>// Express.js example with express-validator
const &#123; body, validationResult &#125; = require('express-validator');
const sanitizeHtml = require('sanitize-html');

app.post('/api/message',
    body('email').isEmail().normalizeEmail(),
    body('username').isAlphanumeric().trim().escape(),
    body('message')
        .trim()
        .customSanitizer(value =&gt; sanitizeHtml(value, &#123;
            allowedTags: [],  // Strip all HTML
            allowedAttributes: &#123;&#125;
        &#125;)),
    (req, res) =&gt; &#123;
        const errors = validationResult(req);
        if (!errors.isEmpty()) &#123;
            return res.status(400).json(&#123; errors: errors.array() &#125;);
        &#125;
        // Process sanitized input
    &#125;
);</code></pre>
            </section>

            <section class="injection-section">
                <h2>🚨 Preventing Injection</h2>
                <table>
                    <tr><th>Attack</th><th>Prevention</th></tr>
                    <tr><td>SQL Injection</td><td>Parameterized queries, ORM</td></tr>
                    <tr><td>NoSQL Injection</td><td>Schema validation, sanitize operators</td></tr>
                    <tr><td>Command Injection</td><td>Never pass user input to shell</td></tr>
                    <tr><td>Path Traversal</td><td>Whitelist paths, validate file names</td></tr>
                </table>
            </section>

            <section class="best-practices">
                <h2>💡 Best Practices</h2>
                <ul>
                    <li>✅ Validate on client for UX</li>
                    <li>✅ Always validate/sanitize on server</li>
                    <li>✅ Use whitelist validation (allowed chars)</li>
                    <li>✅ Set max length limits</li>
                    <li>✅ Use parameterized queries</li>
                    <li>⚠️ Never trust client-side validation alone</li>
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

        .layers { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
        .layer { background: var(--bg-secondary); padding: 1.25rem; border-radius: 10px; text-align: center; min-width: 180px; position: relative; }
        .layer h4 { margin: 0 0 0.25rem; }
        .layer p { margin: 0; font-size: 0.8rem; color: var(--text-secondary); }
        .layer .tag { display: inline-block; margin-top: 0.5rem; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.7rem; }
        .l1 .tag { background: #fef3c7; color: #b45309; }
        .l2 .tag { background: #dcfce7; color: #16a34a; }
        .l3 .tag { background: #fee2e2; color: #dc2626; }

        .demo-box { background: var(--bg-secondary); padding: 1.5rem; border-radius: 12px; }
        .field { margin-bottom: 1rem; }
        .field label { display: block; margin-bottom: 0.25rem; font-weight: 500; }
        .field input, .field textarea { width: 100%; padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 4px; }
        .field textarea { min-height: 80px; }
        .error { color: #dc2626; font-size: 0.8rem; }
        .hint { color: var(--text-secondary); font-size: 0.75rem; }
        button { padding: 0.75rem 1.5rem; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer; }
        button:disabled { opacity: 0.5; cursor: not-allowed; }

        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
        th { background: var(--bg-secondary); }

        ul { padding-left: 1.5rem; }
        li { margin-bottom: 0.5rem; }
    `]
})
export class InputValidationComponent {
    form: FormGroup;

    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_]+$/)]],
            message: ['']
        });
    }

    onSubmit() {
        if (this.form.valid) {
            console.log('Form submitted:', this.form.value);
        }
    }
}
