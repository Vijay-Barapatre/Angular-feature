/**
 * ============================================================================
 * BASIC NG-CONTENT
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Simple Card Component with single slot projection
@Component({
    selector: 'app-simple-card',
    standalone: true,
    template: `
        <div class="card">
            <ng-content></ng-content>
        </div>
    `,
    styles: [`
        .card { background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    `]
})
export class SimpleCardComponent { }

// Alert Box Component this is not used any where
@Component({
    selector: 'app-alert-box',
    standalone: true,
    template: `
        <div class="alert" [class]="type">
            <span class="icon">{{ icon }}</span>
            <ng-content></ng-content>
        </div>
    `,
    styles: [`
        .alert { display: flex; align-items: flex-start; gap: 0.75rem; padding: 1rem; border-radius: 8px; }
        .alert.info { background: #e0f2fe; color: #0369a1; }
        .alert.warning { background: #fef3c7; color: #b45309; }
        .alert.success { background: #dcfce7; color: #15803d; }
        .alert.error { background: #fee2e2; color: #dc2626; }
        .icon { font-size: 1.25rem; }
    `]
})
export class AlertBoxComponent {
    type: 'info' | 'warning' | 'success' | 'error' = 'info';

    get icon(): string {
        const icons = { info: 'ℹ️', warning: '⚠️', success: '✅', error: '❌' };
        return icons[this.type];
    }
}

@Component({
    selector: 'app-basic-projection',
    standalone: true,
    imports: [CommonModule, SimpleCardComponent, AlertBoxComponent],
    template: `
        <div class="container">
            <header class="header">
                <h1>📦 Basic ng-content</h1>
                <p class="subtitle">Single Slot Content Projection</p>
            </header>

            <section class="concept-section">
                <h2>The Concept</h2>
                <p>
                    <code>&lt;ng-content&gt;</code> acts as a placeholder that tells Angular:
                    "Insert whatever content the parent provides here."
                </p>
            </section>

            <section class="syntax-section">
                <h2>📝 Syntax</h2>
                <div class="code-split">
                    <div class="code-block">
                        <h4>Child Component (card.component.ts)</h4>
                        <pre class="code"><code>&#64;Component({{ '{' }}
    selector: 'app-card',
    template: &#96;
        &lt;div class="card"&gt;
            &lt;ng-content&gt;&lt;/ng-content&gt;
        &lt;/div&gt;
    &#96;
{{ '}' }})</code></pre>
                    </div>
                    <div class="code-block">
                        <h4>Parent Usage</h4>
                        <pre class="code"><code>&lt;app-card&gt;
    &lt;h3&gt;My Title&lt;/h3&gt;
    &lt;p&gt;Any content here is projected!&lt;/p&gt;
    &lt;button&gt;Action&lt;/button&gt;
&lt;/app-card&gt;</code></pre>
                    </div>
                </div>
            </section>

            <section class="demo-section">
                <h2>🎯 Live Demo</h2>
                <div class="demo-grid">


                    <app-simple-card>
                        <h3>Welcome!</h3>
                        <p>This content is projected into the card component.</p>
                        <button>Learn More</button>
                    </app-simple-card>

                    <app-simple-card>
                        <img src="https://picsum.photos/200/100" alt="Demo" style="border-radius: 8px; width: 100%;">
                        <p>Images work too!</p>
                    </app-simple-card>

                    <app-simple-card>
                        <ul>
                            <li>Lists</li>
                            <li>Tables</li>
                            <li>Any HTML!</li>
                        </ul>
                    </app-simple-card>


                </div>
            </section>

            <section class="key-points">
                <h2>💡 Key Points</h2>
                <ul>
                    <li><code>&lt;ng-content&gt;</code> is replaced with projected content</li>
                    <li>Projected content keeps its parent's context (data binding)</li>
                    <li>If no content is provided, ng-content renders nothing</li>
                    <li>Styles from child component DON'T affect projected content</li>
                </ul>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: #8b5cf6; }

        .code { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 10px; overflow-x: auto; font-size: 0.8rem; }

        section { margin-bottom: 2rem; }

        .code-split { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .code-block h4 { margin: 0 0 0.5rem; font-size: 0.85rem; color: #8b5cf6; }

        .demo-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }

        code { background: rgba(0,0,0,0.1); padding: 0.1rem 0.3rem; border-radius: 3px; }
        ul { padding-left: 1.5rem; }
        li { margin-bottom: 0.5rem; }
    `]
})
export class BasicProjectionComponent { }
