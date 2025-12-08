/**
 * ============================================================================
 * USE CASE 2: SERVICE TESTING DEMO COMPONENT
 * ============================================================================
 */

import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { CounterService } from './counter.service';

@Component({
    selector: 'app-service-testing',
    standalone: true,
    imports: [CommonModule, AsyncPipe],
    template: `
        <div class="container">
            <header class="header">
                <h1>⚙️ Service Testing</h1>
                <p class="subtitle">Testing Isolated Services</p>
            </header>

            <section class="demo-section">
                <h2>Counter Service Demo</h2>
                
                <div class="state-display">
                    <div class="state-card">
                        <span class="label">Observable</span>
                        <span class="value">{{ counter.count$ | async }}</span>
                    </div>
                    <div class="state-card">
                        <span class="label">Signal</span>
                        <span class="value">{{ counter.countSignal() }}</span>
                    </div>
                    <div class="state-card">
                        <span class="label">Double (computed)</span>
                        <span class="value">{{ counter.doubleCount() }}</span>
                    </div>
                </div>

                <div class="controls">
                    <button class="btn" (click)="counter.decrement()">−</button>
                    <button class="btn primary" (click)="counter.increment()">+</button>
                    <button class="btn secondary" (click)="counter.reset()">Reset</button>
                </div>
            </section>

            <section class="code-section">
                <h2>📝 Service Testing Patterns</h2>
                
                <div class="concept-grid">
                    <div class="concept-card">
                        <h3>💉 Inject Service</h3>
                        <pre><code>service = TestBed.inject(CounterService);</code></pre>
                    </div>

                    <div class="concept-card">
                        <h3>🔄 Test Methods</h3>
                        <pre><code>service.increment();
expect(service.currentCount).toBe(1);</code></pre>
                    </div>

                    <div class="concept-card">
                        <h3>📡 Test Observables</h3>
                        <pre><code>service.count$.subscribe(val => {{ '{' }}
    expect(val).toBe(0);
    done();
{{ '}' }});</code></pre>
                    </div>

                    <div class="concept-card">
                        <h3>⚡ Test Signals</h3>
                        <pre><code>service.increment();
expect(service.countSignal()).toBe(1);</code></pre>
                    </div>
                </div>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: var(--primary-color, #667eea); }
        .subtitle { color: var(--text-secondary, #666); }

        .demo-section {
            background: var(--bg-secondary, #f8f9fa);
            padding: 2rem;
            border-radius: 12px;
            text-align: center;
            margin-bottom: 2rem;
        }

        .state-display {
            display: flex;
            justify-content: center;
            gap: 1.5rem;
            margin: 1.5rem 0;
        }

        .state-card {
            background: white;
            padding: 1.5rem 2rem;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .state-card .label {
            display: block;
            font-size: 0.85rem;
            color: var(--text-secondary, #666);
            margin-bottom: 0.5rem;
        }
        .state-card .value {
            display: block;
            font-size: 2rem;
            font-weight: bold;
            color: var(--primary-color, #667eea);
        }

        .controls { display: flex; justify-content: center; gap: 1rem; }
        .btn {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 8px;
            font-size: 1.25rem;
            cursor: pointer;
            transition: all 0.2s;
            background: #e5e7eb;
        }
        .btn.primary { background: #10b981; color: white; }
        .btn.secondary { background: #6b7280; color: white; }
        .btn:hover { transform: translateY(-2px); }

        .concept-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1rem;
        }
        .concept-card {
            background: var(--bg-secondary, #f8f9fa);
            padding: 1.5rem;
            border-radius: 10px;
            border-left: 4px solid var(--primary-color, #667eea);
        }
        .concept-card h3 { margin-top: 0; }
        .concept-card pre {
            background: #1e1e2e;
            color: #a6e3a1;
            padding: 1rem;
            border-radius: 6px;
            overflow-x: auto;
            font-size: 0.8rem;
        }
    `]
})
export class ServiceTestingComponent {
    counter = inject(CounterService);
}
