/**
 * ============================================================================
 * WHEN CONDITION
 * ============================================================================
 * 
 * Demonstrates @defer with when expression for conditional loading
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-conditional-content',
    standalone: true,
    template: `
        <div class="content">
            <h3>🎉 Condition Met!</h3>
            <p>This content loaded because the condition is true</p>
        </div>
    `,
    styles: [`
        .content {
            background: linear-gradient(135deg, #10b981, #14b8a6);
            color: white;
            padding: 2rem;
            border-radius: 12px;
            text-align: center;
        }
    `]
})
export class ConditionalContent { }

@Component({
    selector: 'app-when-condition',
    standalone: true,
    imports: [CommonModule, ConditionalContent],
    template: `
        <div class="container">
            <header class="header">
                <h1>🔀 When Condition</h1>
                <p class="subtitle">Conditional defer with when expression</p>
            </header>

            <section class="demo-section">
                <h2>Demo: Toggle to Load</h2>
                
                <div class="toggle-area">
                    <label class="toggle">
                        <input type="checkbox" [checked]="showContent()" (change)="toggleContent()">
                        <span class="slider"></span>
                    </label>
                    <span>{{ showContent() ? 'Content Enabled' : 'Content Disabled' }}</span>
                </div>

                <div class="content-area">
                    @defer (when showContent()) {
                        <app-conditional-content />
                    } @placeholder {
                        <div class="placeholder">
                            📦 Toggle the switch to load content
                        </div>
                    }
                </div>
            </section>

            <section class="code-section">
                <h2>📝 Syntax</h2>
                <pre><code>// With signal or property
&#64;defer (when isLoggedIn()) {{ '{' }}
  &lt;user-dashboard /&gt;
{{ '}' }}

// Combined with trigger
&#64;defer (on viewport; when hasPermission) {{ '{' }}
  &lt;admin-panel /&gt;
{{ '}' }}

// With prefetch
&#64;defer (when showDetails; prefetch on idle) {{ '{' }}
  &lt;details-view /&gt;
{{ '}' }}</code></pre>
            </section>

            <section class="use-cases-section">
                <h2>🎯 Real Use Cases</h2>
                <div class="use-case-grid">
                    <div class="use-case-card">
                        <span class="icon">👤</span>
                        <h3>User Authentication</h3>
                        <code>when isLoggedIn()</code>
                    </div>
                    <div class="use-case-card">
                        <span class="icon">🔐</span>
                        <h3>Permission Check</h3>
                        <code>when hasAdminRole</code>
                    </div>
                    <div class="use-case-card">
                        <span class="icon">🌙</span>
                        <h3>Feature Flags</h3>
                        <code>when featureEnabled('darkMode')</code>
                    </div>
                    <div class="use-case-card">
                        <span class="icon">📱</span>
                        <h3>Device Detection</h3>
                        <code>when isMobile()</code>
                    </div>
                </div>
            </section>

            <section class="comparison-section">
                <h2>when vs *ngIf</h2>
                <table>
                    <tr><th></th><th>&#64;defer when</th><th>*ngIf</th></tr>
                    <tr>
                        <td>Code Loading</td>
                        <td>✅ Lazy (separate chunk)</td>
                        <td>❌ Always in bundle</td>
                    </tr>
                    <tr>
                        <td>Condition Change</td>
                        <td>Loads once, stays</td>
                        <td>Destroys/recreates</td>
                    </tr>
                    <tr>
                        <td>Use Case</td>
                        <td>Heavy, one-time load</td>
                        <td>Light, toggle frequently</td>
                    </tr>
                </table>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: var(--primary-color, #667eea); }

        .demo-section {
            background: var(--bg-secondary, #f8f9fa);
            padding: 2rem;
            border-radius: 12px;
            margin-bottom: 2rem;
        }

        .toggle-area {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        .toggle {
            position: relative;
            width: 50px;
            height: 26px;
        }
        .toggle input { opacity: 0; width: 0; height: 0; }
        .slider {
            position: absolute;
            cursor: pointer;
            inset: 0;
            background: #ccc;
            border-radius: 26px;
            transition: 0.3s;
        }
        .slider:before {
            content: "";
            position: absolute;
            height: 20px;
            width: 20px;
            left: 3px;
            bottom: 3px;
            background: white;
            border-radius: 50%;
            transition: 0.3s;
        }
        .toggle input:checked + .slider { background: #10b981; }
        .toggle input:checked + .slider:before { transform: translateX(24px); }

        .content-area { min-height: 100px; }
        .placeholder {
            background: #f3f4f6;
            padding: 2rem;
            border-radius: 8px;
            text-align: center;
            border: 2px dashed #d1d5db;
        }

        .code-section pre {
            background: #1e1e2e;
            color: #a6e3a1;
            padding: 1.5rem;
            border-radius: 8px;
            overflow-x: auto;
        }

        .use-case-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1rem;
            margin-top: 1rem;
        }
        .use-case-card {
            background: var(--bg-secondary, #f8f9fa);
            padding: 1rem;
            border-radius: 10px;
            text-align: center;
        }
        .use-case-card .icon { font-size: 2rem; display: block; margin-bottom: 0.5rem; }
        .use-case-card h3 { margin: 0 0 0.5rem 0; font-size: 0.85rem; }
        .use-case-card code { font-size: 0.7rem; background: #e5e7eb; padding: 0.2rem 0.4rem; border-radius: 4px; }

        .comparison-section table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
        .comparison-section th, .comparison-section td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
        .comparison-section th { background: var(--bg-secondary, #f8f9fa); }
    `]
})
export class WhenConditionComponent {
    showContent = signal(false);

    toggleContent(): void {
        this.showContent.update(v => !v);
    }
}
