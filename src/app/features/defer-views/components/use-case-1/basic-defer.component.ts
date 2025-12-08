/**
 * ============================================================================
 * USE CASE 1: BASIC @defer
 * ============================================================================
 * 
 * Demonstrates the simplest use of @defer to lazy load a heavy component
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Simulates a heavy component that takes time to load
 */
@Component({
    selector: 'app-heavy-component',
    standalone: true,
    template: `
        <div class="heavy-content">
            <h3>🏋️ Heavy Component Loaded!</h3>
            <p>This component simulates a heavy, complex UI element.</p>
            <div class="stats">
                <div class="stat">
                    <span class="value">{{ randomValue }}</span>
                    <span class="label">Data Points</span>
                </div>
                <div class="stat">
                    <span class="value">{{ randomValue2 }}ms</span>
                    <span class="label">Render Time</span>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .heavy-content {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 2rem;
            border-radius: 12px;
            text-align: center;
        }
        .heavy-content h3 { margin: 0 0 0.5rem 0; }
        .stats { display: flex; justify-content: center; gap: 2rem; margin-top: 1rem; }
        .stat { display: flex; flex-direction: column; }
        .stat .value { font-size: 2rem; font-weight: bold; }
        .stat .label { font-size: 0.8rem; opacity: 0.8; }
    `]
})
export class HeavyComponent {
    randomValue = Math.floor(Math.random() * 1000);
    randomValue2 = Math.floor(Math.random() * 500) + 100;
}

@Component({
    selector: 'app-basic-defer',
    standalone: true,
    imports: [CommonModule, HeavyComponent],
    template: `
        <div class="container">
            <header class="header">
                <h1>📦 Basic &#64;defer</h1>
                <p class="subtitle">Lazy load heavy components</p>
            </header>

            <section class="demo-section">
                <h2>Demo: Deferred Heavy Component</h2>
                <p class="info">The component below is loaded lazily using &#64;defer</p>
                
                @defer {
                    <app-heavy-component />
                }
            </section>

            <section class="code-section">
                <h2>📝 Code Example</h2>
                <pre><code>&#64;defer {{ '{' }}
  &lt;app-heavy-component /&gt;
{{ '}' }}</code></pre>
            </section>

            <section class="explanation">
                <h2>How It Works</h2>
                <div class="step-list">
                    <div class="step">
                        <span class="num">1</span>
                        <div>
                            <strong>Initial Load</strong>
                            <p>Main bundle loads without heavy component code</p>
                        </div>
                    </div>
                    <div class="step">
                        <span class="num">2</span>
                        <div>
                            <strong>Browser Idle</strong>
                            <p>By default, &#64;defer loads when browser is idle</p>
                        </div>
                    </div>
                    <div class="step">
                        <span class="num">3</span>
                        <div>
                            <strong>Separate Chunk</strong>
                            <p>Heavy component loaded from separate JS chunk</p>
                        </div>
                    </div>
                    <div class="step">
                        <span class="num">4</span>
                        <div>
                            <strong>Render</strong>
                            <p>Component appears once loaded</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="benefits-card">
                <h2>✨ Benefits</h2>
                <ul>
                    <li>🚀 <strong>Faster initial load</strong> - less code in main bundle</li>
                    <li>📦 <strong>Automatic code splitting</strong> - Angular handles it</li>
                    <li>🎯 <strong>Zero configuration</strong> - just wrap with &#64;defer</li>
                </ul>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 900px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: var(--primary-color, #667eea); }
        .subtitle { color: var(--text-secondary, #666); }

        .demo-section {
            background: var(--bg-secondary, #f8f9fa);
            padding: 2rem;
            border-radius: 12px;
            margin-bottom: 2rem;
        }
        .demo-section h2 { margin-top: 0; }
        .info { color: var(--text-secondary, #666); margin-bottom: 1.5rem; }

        .code-section {
            margin-bottom: 2rem;
        }
        .code-section pre {
            background: #1e1e2e;
            color: #a6e3a1;
            padding: 1.5rem;
            border-radius: 8px;
            overflow-x: auto;
        }

        .explanation { margin-bottom: 2rem; }
        .step-list { display: flex; flex-direction: column; gap: 1rem; }
        .step {
            display: flex; gap: 1rem; align-items: flex-start;
            background: var(--bg-secondary, #f8f9fa);
            padding: 1rem; border-radius: 8px;
        }
        .step .num {
            background: var(--primary-color, #667eea); color: white;
            width: 28px; height: 28px; border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            font-weight: bold; flex-shrink: 0;
        }
        .step strong { display: block; margin-bottom: 0.25rem; }
        .step p { margin: 0; color: var(--text-secondary, #666); font-size: 0.9rem; }

        .benefits-card {
            background: linear-gradient(135deg, #10b98120, #14b8a620);
            padding: 2rem;
            border-radius: 12px;
        }
        .benefits-card h2 { margin-top: 0; }
        .benefits-card ul { padding-left: 0; list-style: none; }
        .benefits-card li { margin-bottom: 0.75rem; }
    `]
})
export class BasicDeferComponent { }
