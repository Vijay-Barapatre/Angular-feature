/**
 * ============================================================================
 * USE CASE 3: effect() - REACT TO SIGNAL CHANGES
 * ============================================================================
 */

import { Component, signal, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-effect-signals',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>⚡ effect()</h1>
                <p class="subtitle">React to Signal Changes</p>
            </header>

            <section class="concept-section">
                <h2>What is effect()?</h2>
                <p>
                    An effect runs automatically whenever the signals it reads change.
                    Use for <strong>side effects</strong>: logging, localStorage, analytics, etc.
                </p>
            </section>

            <section class="demo-section">
                <h2>Live Demo</h2>
                
                <div class="demo-card">
                    <h3>Counter with Logging Effect</h3>
                    <div class="counter-display">{{ count() }}</div>
                    <div class="buttons">
                        <button (click)="decrement()">-</button>
                        <button (click)="increment()">+</button>
                    </div>
                    <p class="info">Check the log below - effect logs every change!</p>
                </div>

                <div class="log-box">
                    <h4>📋 Effect Log:</h4>
                    @for (log of logs(); track $index) {
                        <div class="log-entry">{{ log }}</div>
                    }
                </div>
            </section>

            <section class="code-section">
                <h2>📝 Implementation</h2>
                <pre class="code"><code>count = signal(0);
logs = signal&lt;string[]&gt;([]);

constructor() {{ '{' }}
  // Effect runs whenever count() changes
  effect(() => {{ '{' }}
    const value = this.count();
    this.logs.update(logs => [
      ...logs, 
      \`Count changed to: \${{ '{' }}value{{ '}' }}\`
    ]);
  {{ '}' }});
{{ '}' }}</code></pre>
            </section>

            <section class="usecases-section">
                <h2>🎯 Common Use Cases</h2>
                <div class="usecase-grid">
                    <div class="usecase">
                        <span class="icon">📝</span>
                        <h4>Logging</h4>
                        <p>Debug signal changes</p>
                    </div>
                    <div class="usecase">
                        <span class="icon">💾</span>
                        <h4>localStorage</h4>
                        <p>Persist state changes</p>
                    </div>
                    <div class="usecase">
                        <span class="icon">📊</span>
                        <h4>Analytics</h4>
                        <p>Track user actions</p>
                    </div>
                    <div class="usecase">
                        <span class="icon">🔗</span>
                        <h4>Sync External</h4>
                        <p>Update third-party libs</p>
                    </div>
                </div>
            </section>

            <section class="rules-section">
                <h2>⚠️ Important Rules</h2>
                <ul>
                    <li><strong>Don't modify signals</strong> inside effect by default (causes infinite loops)</li>
                    <li>Use <code>allowSignalWrites: true</code> if you must write</li>
                    <li>Effects run in injection context - call in constructor</li>
                    <li>For template updates, use <code>computed()</code> instead</li>
                </ul>
            </section>

            <section class="localstorage-example">
                <h2>💾 Example: Persist to localStorage</h2>
                <pre class="code"><code>theme = signal('light');

constructor() {{ '{' }}
  // Load from localStorage
  const saved = localStorage.getItem('theme');
  if (saved) this.theme.set(saved);
  
  // Save to localStorage on change
  effect(() => {{ '{' }}
    localStorage.setItem('theme', this.theme());
  {{ '}' }});
{{ '}' }}</code></pre>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: var(--primary-color, #667eea); }

        .demo-card { background: var(--bg-secondary, #f8f9fa); padding: 2rem; border-radius: 12px; text-align: center; }
        .counter-display { font-size: 4rem; font-weight: bold; color: var(--primary-color); }
        .buttons { display: flex; justify-content: center; gap: 1rem; margin: 1rem 0; }
        .buttons button { width: 50px; height: 50px; font-size: 1.5rem; border: none; border-radius: 8px; background: #667eea; color: white; cursor: pointer; }
        .info { color: var(--text-secondary); font-size: 0.85rem; }

        .log-box { background: #1e1e2e; padding: 1rem; border-radius: 8px; margin-top: 1rem; max-height: 150px; overflow-y: auto; }
        .log-box h4 { margin: 0 0 0.5rem; color: white; font-size: 0.85rem; }
        .log-entry { color: #a6e3a1; font-size: 0.8rem; padding: 0.25rem 0; font-family: monospace; }

        .code { background: #1e1e2e; color: #a6e3a1; padding: 1.5rem; border-radius: 10px; overflow-x: auto; }

        .usecase-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-top: 1rem; }
        .usecase { background: var(--bg-secondary); padding: 1rem; border-radius: 10px; text-align: center; }
        .usecase .icon { font-size: 2rem; display: block; margin-bottom: 0.5rem; }
        .usecase h4 { margin: 0 0 0.25rem; font-size: 0.9rem; }
        .usecase p { margin: 0; font-size: 0.75rem; color: var(--text-secondary); }

        .rules-section { background: linear-gradient(135deg, #f59e0b20, #eab30820); padding: 2rem; border-radius: 12px; margin: 2rem 0; }
        .rules-section ul { padding-left: 1.5rem; }
        .rules-section li { margin-bottom: 0.5rem; }
        .rules-section code { background: rgba(0,0,0,0.1); padding: 0.1rem 0.3rem; border-radius: 4px; }
    `]
})
export class EffectSignalsComponent {
    count = signal(0);
    logs = signal<string[]>([]);

    constructor() {
        // Effect runs whenever count() changes
        effect(() => {
            const value = this.count();
            this.logs.update(logs => [...logs, `Count changed to: ${value}`]);
        }, { allowSignalWrites: true });
    }

    increment() {
        this.count.update(v => v + 1);
    }

    decrement() {
        this.count.update(v => v - 1);
    }
}
