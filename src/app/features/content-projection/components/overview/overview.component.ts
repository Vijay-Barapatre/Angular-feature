/**
 * ============================================================================
 * CONTENT PROJECTION OVERVIEW
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-content-projection-overview',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
        <div class="container">
            <header class="header">
                <h1>📦 Content Projection</h1>
                <p class="subtitle">ng-content, Multi-slot & Template Outlets</p>
            </header>

            <section class="intro-section">
                <div class="intro-card">
                    <h2>What is Content Projection?</h2>
                    <p>
                        <strong>Content Projection</strong> allows you to insert (or "project") 
                        content from a parent component into designated slots in a child component's template.
                    </p>
                </div>
            </section>

            <section class="visual-section">
                <h2>🔄 How It Works</h2>
                <div class="visual">
                    <div class="parent-box">
                        <h4>Parent Component</h4>
                        <pre>&lt;app-card&gt;
  &lt;h3&gt;Title&lt;/h3&gt;
  &lt;p&gt;Content&lt;/p&gt;
&lt;/app-card&gt;</pre>
                    </div>
                    <div class="arrow">→</div>
                    <div class="child-box">
                        <h4>Child Template (card)</h4>
                        <pre>&lt;div class="card"&gt;
  &lt;ng-content&gt;&lt;/ng-content&gt;
&lt;/div&gt;</pre>
                    </div>
                    <div class="arrow">→</div>
                    <div class="result-box">
                        <h4>Rendered Result</h4>
                        <pre>&lt;div class="card"&gt;
  &lt;h3&gt;Title&lt;/h3&gt;
  &lt;p&gt;Content&lt;/p&gt;
&lt;/div&gt;</pre>
                    </div>
                </div>
            </section>

            <section class="usecases-section">
                <h2>📖 Use Cases</h2>
                <div class="usecase-grid">
                    <a routerLink="use-case-1" class="usecase-card">
                        <span class="num">1</span>
                        <h3>Basic ng-content</h3>
                        <p>Single slot content projection</p>
                        <span class="tag">ng-content</span>
                    </a>
                    <a routerLink="use-case-2" class="usecase-card">
                        <span class="num">2</span>
                        <h3>Multi-Slot Projection</h3>
                        <p>Named slots with select attribute</p>
                        <span class="tag">select="..."</span>
                    </a>
                    <a routerLink="use-case-3" class="usecase-card">
                        <span class="num">3</span>
                        <h3>ngTemplateOutlet</h3>
                        <p>Dynamic template rendering</p>
                        <span class="tag">ng-template</span>
                    </a>
                    <a routerLink="use-case-4" class="usecase-card">
                        <span class="num">4</span>
                        <h3>Conditional Projection</h3>
                        <p>Show/hide projected content</p>
                        <span class="tag">&#64;ContentChild</span>
                    </a>
                    <a routerLink="use-case-5" class="usecase-card">
                        <span class="num">5</span>
                        <h3>Real-World Patterns</h3>
                        <p>Card, Modal, Tabs components</p>
                        <span class="tag">Enterprise</span>
                    </a>
                </div>
            </section>

            <section class="comparison-section">
                <h2>📊 Projection Types</h2>
                <table>
                    <tr><th>Type</th><th>Use Case</th><th>Syntax</th></tr>
                    <tr><td>Single Slot</td><td>Simple wrapper</td><td>&lt;ng-content&gt;</td></tr>
                    <tr><td>Multi-Slot</td><td>Header/Body/Footer</td><td>&lt;ng-content select="..."&gt;</td></tr>
                    <tr><td>Template Outlet</td><td>Dynamic templates</td><td>*ngTemplateOutlet</td></tr>
                </table>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1100px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { font-size: 2.5rem; color: var(--primary-color, #8b5cf6); }

        .intro-card { background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); color: white; padding: 2rem; border-radius: 12px; }

        section { margin-bottom: 2.5rem; }

        .visual { display: flex; align-items: center; justify-content: center; gap: 1rem; flex-wrap: wrap; }
        .parent-box, .child-box, .result-box { background: var(--bg-secondary, #f8f9fa); padding: 1rem; border-radius: 8px; min-width: 180px; }
        .parent-box h4, .child-box h4, .result-box h4 { margin: 0 0 0.5rem; font-size: 0.85rem; color: #8b5cf6; }
        .parent-box pre, .child-box pre, .result-box pre { margin: 0; font-size: 0.7rem; white-space: pre-wrap; }
        .arrow { font-size: 1.5rem; color: #8b5cf6; }

        .usecase-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }
        .usecase-card { display: block; background: var(--bg-secondary, #f8f9fa); padding: 1.5rem; border-radius: 10px; text-decoration: none; color: inherit; transition: all 0.2s; position: relative; border: 2px solid transparent; }
        .usecase-card:hover { border-color: #8b5cf6; transform: translateY(-2px); }
        .usecase-card .num { position: absolute; top: 10px; right: 10px; width: 24px; height: 24px; background: #8b5cf6; color: white; border-radius: 50%; font-size: 0.75rem; display: flex; align-items: center; justify-content: center; }
        .usecase-card h3 { margin: 0 0 0.5rem; color: #8b5cf6; }
        .usecase-card p { margin: 0 0 0.75rem; font-size: 0.85rem; color: var(--text-secondary); }
        .tag { background: rgba(139, 92, 246, 0.1); color: #8b5cf6; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.7rem; font-family: monospace; }

        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
        th { background: var(--bg-secondary); }
    `]
})
export class ContentProjectionOverviewComponent { }
