/**
 * ============================================================================
 * 🟦 BASIC EXERCISE 1: SAFE HTML RENDERING
 * ============================================================================
 * 
 * 📋 OBJECTIVE:
 * Learn how to safely render HTML content using Angular's DomSanitizer.
 * Understand the difference between safe and unsafe HTML rendering.
 * 
 * 📝 DESCRIPTION:
 * You are building a blog post viewer that displays rich HTML content.
 * Some content comes from trusted CMS, some from user comments.
 * You must render trusted content while blocking malicious scripts.
 * 
 * ✅ EXPECTED BEHAVIOR:
 * 1. Trusted CMS content renders with HTML formatting (bold, italic, links)
 * 2. User comments have scripts stripped but safe HTML preserved
 * 3. A "danger mode" toggle shows what happens without sanitization
 * 4. Console logs when potentially dangerous content is detected
 * 
 * 🎯 WHAT YOU NEED TO IMPLEMENT:
 * - Complete the sanitizeHtml() method
 * - Complete the bypassForTrustedContent() method
 * - Implement the detectDangerousPatterns() method
 */

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'app-exercise-safe-html',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="exercise-container">
            <h2>🛡️ Exercise 1: Safe HTML Rendering</h2>
            
            <div class="input-section">
                <h3>Enter HTML Content:</h3>
                <textarea 
                    [(ngModel)]="rawHtml" 
                    rows="5" 
                    placeholder="Enter HTML content (try: <b>bold</b> or <script>alert('xss')</script>)">
                </textarea>
            </div>

            <div class="toggle-section">
                <label>
                    <input type="checkbox" [(ngModel)]="isTrustedSource">
                    Content is from trusted source (CMS)
                </label>
            </div>

            <div class="output-section">
                <div class="output-card">
                    <h4>📝 Raw Text (Always Safe)</h4>
                    <div class="output">{{ rawHtml }}</div>
                </div>

                <div class="output-card">
                    <h4>🛡️ Sanitized HTML</h4>
                    <div class="output" [innerHTML]="getSanitizedHtml()"></div>
                </div>

                <div class="output-card warning" *ngIf="isTrustedSource">
                    <h4>⚠️ Trusted Content (Bypassed)</h4>
                    <div class="output" [innerHTML]="getTrustedHtml()"></div>
                </div>
            </div>

            <div class="danger-log" *ngIf="dangerousPatterns.length > 0">
                <h4>🚨 Detected Dangerous Patterns:</h4>
                <ul>
                    <li *ngFor="let pattern of dangerousPatterns">{{ pattern }}</li>
                </ul>
            </div>
        </div>
    `,
    styles: [`
        .exercise-container { max-width: 800px; margin: 2rem auto; padding: 1.5rem; }
        h2 { color: #10b981; border-bottom: 2px solid #10b981; padding-bottom: 0.5rem; }
        
        .input-section textarea { width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 8px; font-family: monospace; }
        
        .toggle-section { margin: 1rem 0; padding: 1rem; background: #f0fdf4; border-radius: 8px; }
        .toggle-section label { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; }
        
        .output-section { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-top: 1rem; }
        .output-card { padding: 1rem; border-radius: 8px; background: #f8fafc; border: 1px solid #e2e8f0; }
        .output-card.warning { background: #fef3c7; border-color: #f59e0b; }
        .output-card h4 { margin: 0 0 0.5rem; font-size: 0.9rem; }
        .output { min-height: 60px; padding: 0.75rem; background: white; border-radius: 4px; font-size: 0.9rem; }
        
        .danger-log { margin-top: 1rem; padding: 1rem; background: #fee2e2; border-radius: 8px; border: 1px solid #ef4444; }
        .danger-log h4 { color: #dc2626; margin: 0 0 0.5rem; }
        .danger-log ul { margin: 0; padding-left: 1.5rem; }
    `]
})
export class ExerciseSafeHtmlComponent {
    private sanitizer = inject(DomSanitizer);

    rawHtml = '<b>Hello</b> <i>World</i> <a href="https://angular.io">Link</a>';
    isTrustedSource = false;
    dangerousPatterns: string[] = [];

    /**
     * TODO: Implement this method
     * 
     * This method should:
     * 1. Call detectDangerousPatterns() to check for XSS
     * 2. Return the raw HTML as SafeHtml using Angular's built-in sanitization
     * 
     * HINT: Angular automatically sanitizes when you bind to [innerHTML]
     * But you can also use sanitizer.sanitize() for manual control
     */
    getSanitizedHtml(): SafeHtml {
        // TODO: Write your logic here
        // Step 1: Detect dangerous patterns

        // Step 2: Return sanitized HTML
        // HINT: For auto-sanitization, just return the raw string
        // Angular will sanitize it when binding to [innerHTML]

        return ''; // Replace with your implementation
    }

    /**
     * TODO: Implement this method
     * 
     * This method should:
     * 1. ONLY be called for genuinely trusted content (CMS, admin-created)
     * 2. Use DomSanitizer.bypassSecurityTrustHtml()
     * 3. Log a warning to console when bypassing
     * 
     * WARNING: Never use this for user-provided content!
     */
    getTrustedHtml(): SafeHtml {
        // TODO: Write your logic here
        // Step 1: Log a warning that we're bypassing security

        // Step 2: Use sanitizer.bypassSecurityTrustHtml()

        return ''; // Replace with your implementation
    }

    /**
     * TODO: Implement this method
     * 
     * This method should detect dangerous patterns in HTML:
     * 1. <script> tags
     * 2. javascript: URLs
     * 3. on* event handlers (onclick, onerror, etc.)
     * 4. data: URLs in src attributes
     * 
     * Update this.dangerousPatterns array with found patterns
     */
    detectDangerousPatterns(): void {
        this.dangerousPatterns = [];

        // TODO: Write your logic here
        // HINT: Use regex patterns to detect:
        // - /<script/i
        // - /javascript:/i
        // - /on\w+=/i (for onclick, onerror, etc.)
        // - /data:/i

        // Example:
        // if (/<script/i.test(this.rawHtml)) {
        //     this.dangerousPatterns.push('Script tag detected');
        // }
    }
}
