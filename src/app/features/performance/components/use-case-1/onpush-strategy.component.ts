/**
 * ============================================================================
 * USE CASE 1: ONPUSH CHANGE DETECTION
 * ============================================================================
 */

import { Component, ChangeDetectionStrategy, signal, Input, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-onpush-strategy',
    standalone: true,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="container">
            <header class="header">
                <h1>🔄 OnPush Change Detection</h1>
                <p class="subtitle">Reduce CD cycles dramatically</p>
            </header>

            <section class="concept-section">
                <h2>How Change Detection Works</h2>
                <div class="comparison">
                    <div class="default">
                        <h3>Default Strategy</h3>
                        <p>Checks ALL components on every event</p>
                        <div class="visual">
                            <div class="node checked">App</div>
                            <div class="children">
                                <div class="node checked">Header</div>
                                <div class="node checked">Content</div>
                                <div class="node checked">Footer</div>
                            </div>
                        </div>
                    </div>
                    <div class="onpush">
                        <h3>OnPush Strategy</h3>
                        <p>Only checks when inputs change or events fire</p>
                        <div class="visual">
                            <div class="node">App</div>
                            <div class="children">
                                <div class="node">Header</div>
                                <div class="node checked">Content ✓</div>
                                <div class="node">Footer</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="demo-section">
                <h2>Live Demo</h2>
                <p class="info">This component uses OnPush. Counter: {{ counter() }}</p>
                <div class="buttons">
                    <button (click)="incrementWithSignal()">Increment (Signal)</button>
                    <button (click)="incrementWithMarkForCheck()">Increment (markForCheck)</button>
                </div>
            </section>

            <section class="triggers-section">
                <h2>🎯 What Triggers OnPush CD?</h2>
                <div class="trigger-grid">
                    <div class="trigger">
                        <span class="icon">1️⃣</span>
                        <h4>&#64;Input() Change</h4>
                        <p>New object reference passed from parent</p>
                    </div>
                    <div class="trigger">
                        <span class="icon">2️⃣</span>
                        <h4>Event Handler</h4>
                        <p>Click, input, etc. from within component</p>
                    </div>
                    <div class="trigger">
                        <span class="icon">3️⃣</span>
                        <h4>Async Pipe</h4>
                        <p>Observable emits new value</p>
                    </div>
                    <div class="trigger">
                        <span class="icon">4️⃣</span>
                        <h4>markForCheck()</h4>
                        <p>Manual trigger via ChangeDetectorRef</p>
                    </div>
                    <div class="trigger">
                        <span class="icon">5️⃣</span>
                        <h4>Signals</h4>
                        <p>Signal value changes</p>
                    </div>
                </div>
            </section>

            <section class="code-section">
                <h2>📝 Implementation</h2>
                <pre class="code"><code>&#64;Component({{ '{' }}
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`...\`
{{ '}' }})
export class MyComponent {{ '{' }}
  // Use Signals (recommended)
  data = signal([]);
  
  // Or use Observables with async pipe
  data$ = this.service.getData();
  
  // Or use immutable updates
  updateData(newItem: Item) {{ '{' }}
    this.items = [...this.items, newItem];  // New reference!
  {{ '}' }}
{{ '}' }}</code></pre>
            </section>

            <section class="best-practices">
                <h2>✅ Best Practices</h2>
                <ul>
                    <li><strong>Use Signals</strong> - They trigger CD automatically</li>
                    <li><strong>Immutable updates</strong> - Always create new references</li>
                    <li><strong>Async pipe</strong> - Handles subscription and CD</li>
                    <li><strong>Avoid</strong> mutating objects/arrays directly</li>
                </ul>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: var(--primary-color, #667eea); }

        .comparison { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 1rem; }
        .default, .onpush { background: var(--bg-secondary, #f8f9fa); padding: 1.5rem; border-radius: 10px; }
        .default h3 { color: #ef4444; }
        .onpush h3 { color: #10b981; }
        .visual { margin-top: 1rem; }
        .node { padding: 0.5rem 1rem; margin: 0.25rem; border-radius: 6px; background: #e5e7eb; text-align: center; }
        .node.checked { background: #fef3c7; border: 2px solid #f59e0b; }
        .children { display: flex; justify-content: center; gap: 0.5rem; margin-top: 0.5rem; }

        .demo-section { background: linear-gradient(135deg, #667eea20, #764ba220); padding: 2rem; border-radius: 12px; margin: 2rem 0; text-align: center; }
        .buttons { display: flex; justify-content: center; gap: 1rem; margin-top: 1rem; }
        .buttons button { padding: 0.75rem 1.5rem; border: none; border-radius: 8px; background: #667eea; color: white; cursor: pointer; }

        .trigger-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem; margin-top: 1rem; }
        .trigger { background: var(--bg-secondary, #f8f9fa); padding: 1rem; border-radius: 8px; text-align: center; }
        .trigger .icon { font-size: 1.5rem; }
        .trigger h4 { margin: 0.5rem 0 0.25rem; font-size: 0.85rem; }
        .trigger p { margin: 0; font-size: 0.75rem; color: var(--text-secondary); }

        .code { background: #1e1e2e; color: #a6e3a1; padding: 1.5rem; border-radius: 10px; overflow-x: auto; }

        .best-practices { background: linear-gradient(135deg, #10b98120, #14b8a620); padding: 2rem; border-radius: 12px; }
        .best-practices ul { padding-left: 1.5rem; }
        .best-practices li { margin-bottom: 0.5rem; }
    `]
})
export class OnPushStrategyComponent {
    private cdr = inject(ChangeDetectorRef);
    counter = signal(0);

    incrementWithSignal() {
        this.counter.update(v => v + 1);
    }

    incrementWithMarkForCheck() {
        // Manual trigger for non-signal state
        this.cdr.markForCheck();
    }
}
