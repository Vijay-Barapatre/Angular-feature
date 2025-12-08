/**
 * ============================================================================
 * 🟦 BASIC EXERCISE 4: INPUT TRANSFORM
 * ============================================================================
 * 
 * 📋 OBJECTIVE:
 * Learn how to use transform functions with @Input decorator.
 * 
 * 📝 DESCRIPTION:
 * Create a component that transforms input values (uppercase, numbers, booleans).
 * 
 * ✅ EXPECTED BEHAVIOR:
 * 1. Transform string inputs to uppercase
 * 2. Transform string numbers to actual numbers
 * 3. Transform boolean string to actual boolean
 * 4. Show transformed values
 */

import { Component, Input, booleanAttribute, numberAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// ========================================
// CHILD COMPONENT (Complete the TODOs)
// ========================================

@Component({
    selector: 'app-display-card',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="display-card" [class.highlighted]="highlighted" [class.disabled]="disabled">
            <h3>{{ title }}</h3>
            <p class="count">Count: {{ count }}</p>
            <p class="status">
                Highlighted: {{ highlighted ? 'Yes' : 'No' }} |
                Disabled: {{ disabled ? 'Yes' : 'No' }}
            </p>
        </div>
    `,
    styles: [`
        .display-card { padding: 1.5rem; border-radius: 8px; background: #f8fafc; border: 2px solid #e5e7eb; }
        .display-card.highlighted { background: #fef3c7; border-color: #f59e0b; }
        .display-card.disabled { opacity: 0.5; }
        h3 { margin: 0 0 0.5rem; text-transform: uppercase; }
        .count { font-size: 1.5rem; margin: 0 0 0.5rem; }
        .status { margin: 0; font-size: 0.85rem; color: #6b7280; }
    `]
})
export class DisplayCardComponent {
    /**
     * TODO: Add @Input with transform for title
     * 
     * Use a transform function to convert title to uppercase
     * 
     * HINT: @Input({ transform: (value: string) => value.toUpperCase() })
     */
    // TODO: @Input({ transform: ... }) title = '';
    title = '';

    /**
     * TODO: Add @Input with numberAttribute transform
     * 
     * This allows passing count as string attribute: count="5"
     * and having it automatically converted to number
     * 
     * HINT: @Input({ transform: numberAttribute })
     */
    // TODO: @Input({ transform: numberAttribute }) count = 0;
    count = 0;

    /**
     * TODO: Add @Input with booleanAttribute transform
     * 
     * This allows using presence of attribute as true:
     * <app-display-card highlighted> = highlighted is true
     * <app-display-card [highlighted]="false"> = highlighted is false
     * 
     * HINT: @Input({ transform: booleanAttribute })
     */
    // TODO: @Input({ transform: booleanAttribute }) highlighted = false;
    highlighted = false;

    /**
     * TODO: Add @Input with booleanAttribute transform for disabled
     */
    // TODO: @Input({ transform: booleanAttribute }) disabled = false;
    disabled = false;
}

// ========================================
// PARENT COMPONENT (For testing)
// ========================================

@Component({
    selector: 'app-exercise-4-transform',
    standalone: true,
    imports: [CommonModule, FormsModule, DisplayCardComponent],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 4: Input Transform</h2>
                <p>Complete the DisplayCardComponent to transform input values.</p>
                
                <h4>Tasks:</h4>
                <ul>
                    <li>Transform title to uppercase</li>
                    <li>Use numberAttribute for count</li>
                    <li>Use booleanAttribute for highlighted and disabled</li>
                </ul>
                
                <div class="hint">
                    <strong>💡 Angular 16+ Transforms:</strong>
                    <ul>
                        <li><code>numberAttribute</code> - converts string to number</li>
                        <li><code>booleanAttribute</code> - presence = true</li>
                        <li>Custom function for custom transforms</li>
                    </ul>
                </div>
            </div>

            <div class="demo">
                <h3>🎮 Test Your Implementation</h3>
                
                <div class="controls">
                    <div class="control-group">
                        <label>Title (will be uppercased):</label>
                        <input [(ngModel)]="title" placeholder="enter title">
                    </div>
                    <div class="control-group">
                        <label>Count (string to number):</label>
                        <input [(ngModel)]="count" placeholder="enter number">
                    </div>
                    <div class="control-group">
                        <label>
                            <input type="checkbox" [(ngModel)]="highlighted">
                            Highlighted
                        </label>
                    </div>
                    <div class="control-group">
                        <label>
                            <input type="checkbox" [(ngModel)]="disabled">
                            Disabled
                        </label>
                    </div>
                </div>

                <div class="result">
                    <h4>Result:</h4>
                    <!-- TODO: Pass all inputs to DisplayCardComponent -->
                    <app-display-card></app-display-card>
                </div>

                <div class="code-preview">
                    <h4>Attribute Usage Example:</h4>
                    <pre><code>&lt;app-display-card
  title="hello world"     
  count="42"              
  highlighted             
&gt;&lt;/app-display-card&gt;</code></pre>
                    <p class="note">
                        With transforms: title becomes "HELLO WORLD",
                        count becomes number 42, highlighted becomes true
                    </p>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 700px; }
        .instructions { background: #f0fdf4; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; color: #1e1e2e; }
        .instructions h2 { margin: 0 0 0.5rem; color: #10b981; }
        .hint { margin-top: 1rem; padding: 0.75rem; background: #eff6ff; border-radius: 6px; font-size: 0.9rem; }
        .hint code { background: #1e1e2e; color: #a6e3a1; padding: 0.125rem 0.25rem; border-radius: 2px; }
        .demo { background: white; padding: 1.5rem; border-radius: 8px; }
        .controls { display: grid; gap: 0.75rem; margin-bottom: 1.5rem; }
        .control-group { display: flex; align-items: center; gap: 0.5rem; }
        .control-group label { min-width: 180px; }
        .control-group input[type="text"], .control-group input:not([type]) { flex: 1; padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 4px; }
        .result { margin-bottom: 1rem; }
        .result h4 { margin: 0 0 0.75rem; }
        .code-preview { padding: 1rem; background: #1e1e2e; border-radius: 8px; color: white; }
        .code-preview h4 { margin: 0 0 0.5rem; }
        .code-preview pre { margin: 0; }
        .code-preview code { color: #a6e3a1; font-size: 0.85rem; }
        .code-preview .note { margin: 0.75rem 0 0; font-size: 0.8rem; color: #9ca3af; }
    `]
})
export class Exercise4TransformComponent {
    title = 'hello world';
    count = '42';
    highlighted = true;
    disabled = false;
}
