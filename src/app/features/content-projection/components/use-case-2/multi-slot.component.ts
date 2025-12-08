/**
 * ============================================================================
 * USE CASE 2: MULTI-SLOT PROJECTION
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Multi-slot Card Component
@Component({
    selector: 'app-multi-slot-card',
    standalone: true,
    template: `
        <div class="card">
            <div class="card-header">
                <ng-content select="[card-header]"></ng-content>
            </div>
            <div class="card-body">
                <ng-content select="[card-body]"></ng-content>
            </div>
            <div class="card-footer">
                <ng-content select="[card-footer]"></ng-content>
            </div>
        </div>
    `,
    styles: [`
        .card { background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden; }
        .card-header { background: linear-gradient(135deg, #8b5cf6, #6366f1); color: white; padding: 1rem 1.5rem; }
        .card-body { padding: 1.5rem; }
        .card-footer { background: #f8f9fa; padding: 1rem 1.5rem; border-top: 1px solid #e5e7eb; }
    `]
})
export class MultiSlotCardComponent { }

// Panel Component with named slots
@Component({
    selector: 'app-panel',
    standalone: true,
    template: `
        <div class="panel">
            <div class="panel-title">
                <ng-content select=".panel-title"></ng-content>
            </div>
            <div class="panel-icon">
                <ng-content select=".panel-icon"></ng-content>
            </div>
            <div class="panel-content">
                <ng-content></ng-content>
            </div>
        </div>
    `,
    styles: [`
        .panel { background: white; border-radius: 8px; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); display: grid; grid-template-columns: 1fr auto; gap: 1rem; }
        .panel-title { font-weight: bold; color: #8b5cf6; }
        .panel-icon { font-size: 1.5rem; }
        .panel-content { grid-column: 1 / -1; color: var(--text-secondary); font-size: 0.9rem; }
    `]
})
export class PanelComponent { }

@Component({
    selector: 'app-multi-slot',
    standalone: true,
    imports: [CommonModule, MultiSlotCardComponent, PanelComponent],
    template: `
        <div class="container">
            <header class="header">
                <h1>🎯 Multi-Slot Projection</h1>
                <p class="subtitle">Named Slots with select Attribute</p>
            </header>

            <section class="concept-section">
                <h2>The Concept</h2>
                <p>
                    Use <code>select</code> attribute to target specific content for projection.
                    Content can be selected by element, class, or attribute.
                </p>
            </section>

            <section class="syntax-section">
                <h2>📝 Select Syntax</h2>
                <table>
                    <tr><th>Selector</th><th>Matches</th></tr>
                    <tr><td>select="header"</td><td>&lt;header&gt; elements</td></tr>
                    <tr><td>select=".title"</td><td>Elements with class="title"</td></tr>
                    <tr><td>select="[card-header]"</td><td>Elements with card-header attribute</td></tr>
                    <tr><td>(no select)</td><td>Remaining unmatched content</td></tr>
                </table>
            </section>

            <section class="code-section">
                <h2>💻 Implementation</h2>
                <pre class="code"><code>&#64;Component({{ '{' }}
    selector: 'app-card',
    template: &#96;
        &lt;div class="card"&gt;
            &lt;div class="header"&gt;
                &lt;ng-content select="[card-header]"&gt;&lt;/ng-content&gt;
            &lt;/div&gt;
            &lt;div class="body"&gt;
                &lt;ng-content select="[card-body]"&gt;&lt;/ng-content&gt;
            &lt;/div&gt;
            &lt;div class="footer"&gt;
                &lt;ng-content select="[card-footer]"&gt;&lt;/ng-content&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &#96;
{{ '}' }})</code></pre>
            </section>

            <section class="demo-section">
                <h2>🎯 Live Demo</h2>
                <div class="demo-grid">
                    <app-multi-slot-card>
                        <h3 card-header>🚀 Feature Card</h3>
                        <p card-body>
                            This content goes into the body slot.
                            Notice how header, body, and footer are separated!
                        </p>
                        <div card-footer>
                            <button>Action 1</button>
                            <button>Action 2</button>
                        </div>
                    </app-multi-slot-card>

                    <app-multi-slot-card>
                        <span card-header>📊 Dashboard</span>
                        <div card-body>
                            <ul>
                                <li>Users: 1,234</li>
                                <li>Revenue: $45,678</li>
                            </ul>
                        </div>
                        <a card-footer href="#">View Details →</a>
                    </app-multi-slot-card>
                </div>
            </section>

            <section class="panel-demo">
                <h2>🎨 Panel Example (Class Selectors)</h2>
                <app-panel>
                    <span class="panel-icon">📦</span>
                    <span class="panel-title">Content Projection</span>
                    Default content goes here when no selector matches.
                </app-panel>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: #8b5cf6; }

        .code { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 10px; overflow-x: auto; font-size: 0.8rem; }

        section { margin-bottom: 2rem; }

        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
        th { background: var(--bg-secondary); }
        td:first-child { font-family: monospace; color: #8b5cf6; }

        .demo-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .panel-demo { margin-top: 2rem; }

        code { background: rgba(0,0,0,0.1); padding: 0.1rem 0.3rem; border-radius: 3px; }
    `]
})
export class MultiSlotComponent { }
