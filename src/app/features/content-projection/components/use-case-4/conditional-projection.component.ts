/**
 * ============================================================================
 * USE CASE 4: CONDITIONAL PROJECTION
 * ============================================================================
 */

import { Component, ContentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

// Expandable Panel with conditional content
@Component({
    selector: 'app-expandable-panel',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="panel" [class.expanded]="isExpanded">
            <div class="panel-header" (click)="toggle()">
                <ng-content select="[panel-title]"></ng-content>
                <span class="toggle-icon">{{ isExpanded ? '▼' : '▶' }}</span>
            </div>
            @if (isExpanded) {
                <div class="panel-body">
                    <ng-content select="[panel-content]"></ng-content>
                </div>
            }
        </div>
    `,
    styles: [`
        .panel { border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
        .panel-header { padding: 1rem; background: var(--bg-secondary); display: flex; justify-content: space-between; align-items: center; cursor: pointer; }
        .panel-header:hover { background: #e5e7eb; }
        .panel-body { padding: 1rem; }
        .toggle-icon { color: #8b5cf6; }
    `]
})
export class ExpandablePanelComponent {
    isExpanded = false;
    toggle() { this.isExpanded = !this.isExpanded; }
}

// Component that checks for content existence
@Component({
    selector: 'app-smart-container',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="smart-container">
            @if (hasHeader) {
                <div class="header-slot">
                    <ng-content select="[header]"></ng-content>
                </div>
            }
            
            <div class="content-slot">
                <ng-content></ng-content>
            </div>
            
            @if (footerTemplate) {
                <div class="footer-slot">
                    <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
                </div>
            } @else {
                <div class="default-footer">
                    Default Footer
                </div>
            }
        </div>
    `,
    styles: [`
        .smart-container { border: 2px solid #8b5cf6; border-radius: 12px; overflow: hidden; }
        .header-slot { background: #8b5cf6; color: white; padding: 1rem; font-weight: bold; }
        .content-slot { padding: 1.5rem; }
        .footer-slot, .default-footer { background: #f8f9fa; padding: 0.75rem; text-align: center; font-size: 0.85rem; }
        .default-footer { color: var(--text-secondary); }
    `]
})
export class SmartContainerComponent {
    hasHeader = true;
    @ContentChild('footerTemplate') footerTemplate?: TemplateRef<any>;
}

@Component({
    selector: 'app-conditional-projection',
    standalone: true,
    imports: [CommonModule, ExpandablePanelComponent, SmartContainerComponent],
    template: `
        <div class="container">
            <header class="header">
                <h1>🔀 Conditional Projection</h1>
                <p class="subtitle">Show/Hide Projected Content</p>
            </header>

            <section class="concept-section">
                <h2>The Concept</h2>
                <p>
                    Content projection can be controlled conditionally using 
                    <code>&#64;if</code>, <code>&#64;ContentChild</code>, and template checks.
                </p>
            </section>

            <section class="demo-section">
                <h2>🎯 Expandable Panel Demo</h2>
                <p class="hint">Click headers to expand/collapse</p>
                <div class="demo-grid">
                    <app-expandable-panel>
                        <span panel-title>📦 Section 1: Getting Started</span>
                        <div panel-content>
                            <p>This content only renders when the panel is expanded!</p>
                            <p>This improves performance for hidden content.</p>
                        </div>
                    </app-expandable-panel>

                    <app-expandable-panel>
                        <span panel-title>⚙️ Section 2: Configuration</span>
                        <div panel-content>
                            <ul>
                                <li>Setting 1: Enabled</li>
                                <li>Setting 2: Custom</li>
                                <li>Setting 3: Default</li>
                            </ul>
                        </div>
                    </app-expandable-panel>

                    <app-expandable-panel>
                        <span panel-title>🚀 Section 3: Advanced</span>
                        <div panel-content>
                            <p>Advanced configuration options and tips.</p>
                            <button>Configure</button>
                        </div>
                    </app-expandable-panel>
                </div>
            </section>

            <section class="smart-demo">
                <h2>🧠 Smart Container (Fallback Content)</h2>
                <div class="smart-grid">
                    <div>
                        <h4>With Custom Footer</h4>
                        <app-smart-container>
                            <h3 header>Custom Header</h3>
                            <p>Main content area</p>
                            <ng-template #footerTemplate>
                                <button>Custom Action</button>
                            </ng-template>
                        </app-smart-container>
                    </div>
                    <div>
                        <h4>Default Footer (No Template)</h4>
                        <app-smart-container>
                            <h3 header>Another Header</h3>
                            <p>This container uses default footer</p>
                        </app-smart-container>
                    </div>
                </div>
            </section>

            <section class="code-section">
                <h2>💻 Implementation Pattern</h2>
                <pre class="code"><code>&#64;Component({{ '{' }}
    template: &#96;
        &lt;div class="panel"&gt;
            &lt;div class="header" (click)="toggle()"&gt;
                &lt;ng-content select="[title]"&gt;&lt;/ng-content&gt;
            &lt;/div&gt;
            
            &#64;if (isExpanded) {{ '{' }}
                &lt;div class="body"&gt;
                    &lt;ng-content select="[content]"&gt;&lt;/ng-content&gt;
                &lt;/div&gt;
            {{ '}' }}
        &lt;/div&gt;
    &#96;
{{ '}' }})
export class ExpandablePanelComponent {{ '{' }}
    isExpanded = false;
    toggle() {{ '{' }} this.isExpanded = !this.isExpanded; {{ '}' }}
{{ '}' }}</code></pre>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: #8b5cf6; }

        .code { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 10px; overflow-x: auto; font-size: 0.8rem; }

        section { margin-bottom: 2rem; }

        .hint { color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1rem; }
        .demo-grid { display: flex; flex-direction: column; gap: 0.75rem; }
        .smart-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .smart-grid h4 { margin: 0 0 0.5rem; font-size: 0.85rem; color: var(--text-secondary); }

        code { background: rgba(0,0,0,0.1); padding: 0.1rem 0.3rem; border-radius: 3px; }
    `]
})
export class ConditionalProjectionComponent { }
