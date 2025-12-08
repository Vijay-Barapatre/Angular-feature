/**
 * ============================================================================
 * USE CASE 4: STANDALONE COMPONENTS DEEP DIVE
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-standalone-components',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>📦 Standalone Components</h1>
                <p class="subtitle">Self-contained, No NgModule Required</p>
            </header>

            <section class="syntax-section">
                <h2>Basic Syntax</h2>
                <pre class="code"><code>&#64;Component({{ '{' }}
  selector: 'app-my-component',
  standalone: true,  // ← This is the key!
  imports: [CommonModule, RouterLink, MyDirective],
  template: \`...\`
{{ '}' }})
export class MyComponent {{ '{' }} {{ '}' }}</code></pre>
            </section>

            <section class="imports-section">
                <h2>🔗 The imports Array</h2>
                <p>In standalone components, you import what you need directly:</p>
                <div class="import-grid">
                    <div class="import-item">
                        <code>CommonModule</code>
                        <span>*ngIf, *ngFor, pipes</span>
                    </div>
                    <div class="import-item">
                        <code>RouterLink</code>
                        <span>Navigation links</span>
                    </div>
                    <div class="import-item">
                        <code>ReactiveFormsModule</code>
                        <span>Reactive forms</span>
                    </div>
                    <div class="import-item">
                        <code>Other Components</code>
                        <span>Child components</span>
                    </div>
                </div>
            </section>

            <section class="comparison-section">
                <h2>NgModule vs Standalone</h2>
                <div class="comparison">
                    <div class="old">
                        <h4>❌ NgModule Way</h4>
                        <pre><code>// feature.module.ts
&#64;NgModule({{ '{' }}
  declarations: [A, B, C],
  imports: [CommonModule],
  exports: [A]
{{ '}' }})

// Component imports whole module
imports: [FeatureModule]</code></pre>
                    </div>
                    <div class="new">
                        <h4>✅ Standalone Way</h4>
                        <pre><code>// Just import what you need!
&#64;Component({{ '{' }}
  standalone: true,
  imports: [A, MyPipe],
  ...
{{ '}' }})

// Direct, explicit imports</code></pre>
                    </div>
                </div>
            </section>

            <section class="benefits-section">
                <h2>✨ Benefits</h2>
                <ul>
                    <li><strong>Self-contained</strong> - All dependencies in one place</li>
                    <li><strong>Better tree-shaking</strong> - Only used code is bundled</li>
                    <li><strong>Easier testing</strong> - No module configuration needed</li>
                    <li><strong>Clearer dependencies</strong> - Explicit imports</li>
                    <li><strong>Simpler mental model</strong> - Less indirection</li>
                </ul>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: var(--primary-color, #667eea); }

        .code, pre {
            background: #1e1e2e;
            color: #a6e3a1;
            padding: 1.5rem;
            border-radius: 10px;
            overflow-x: auto;
            font-size: 0.85rem;
        }

        .import-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-top: 1rem; }
        .import-item {
            background: var(--bg-secondary, #f8f9fa);
            padding: 1rem; border-radius: 8px;
            display: flex; flex-direction: column;
        }
        .import-item code { color: var(--primary-color); font-weight: bold; }
        .import-item span { font-size: 0.85rem; color: var(--text-secondary); }

        section { margin-bottom: 2rem; }

        .comparison { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .old, .new { border-radius: 10px; overflow: hidden; }
        .old h4, .new h4 { margin: 0; padding: 0.75rem; font-size: 0.9rem; }
        .old h4 { background: #fee2e2; color: #dc2626; }
        .new h4 { background: #dcfce7; color: #16a34a; }
        .old pre, .new pre { margin: 0; padding: 1rem; border-radius: 0; font-size: 0.75rem; }

        .benefits-section ul { padding-left: 1.5rem; }
        .benefits-section li { margin-bottom: 0.5rem; }
    `]
})
export class StandaloneComponentsComponent { }
