/**
 * ============================================================================
 * USE CASE 6: MEMORY MANAGEMENT
 * ============================================================================
 */

import { Component, OnDestroy, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';

@Component({
    selector: 'app-memory-management',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>🧠 Memory Management</h1>
                <p class="subtitle">Prevent Leaks, Cleanup Properly</p>
            </header>

            <section class="leak-section">
                <h2>⚠️ Common Memory Leaks</h2>
                <div class="leak-grid">
                    <div class="leak">
                        <span class="icon">📡</span>
                        <h4>Unsubscribed Observables</h4>
                        <p>Keep running after component destroyed</p>
                    </div>
                    <div class="leak">
                        <span class="icon">📢</span>
                        <h4>Event Listeners</h4>
                        <p>Not removed on destroy</p>
                    </div>
                    <div class="leak">
                        <span class="icon">⏰</span>
                        <h4>setInterval/setTimeout</h4>
                        <p>Not cleared on destroy</p>
                    </div>
                    <div class="leak">
                        <span class="icon">🔗</span>
                        <h4>Closure References</h4>
                        <p>Large objects held in closures</p>
                    </div>
                </div>
            </section>

            <section class="solution-section">
                <h2>✅ Solutions</h2>
                
                <div class="solution">
                    <h3>1. takeUntilDestroyed() (Recommended)</h3>
                    <pre><code>&#64;Component({{ '{' }}...{{ '}' }})
export class MyComponent {{ '{' }}
  private destroyRef = inject(DestroyRef);
  
  ngOnInit() {{ '{' }}
    this.someObservable$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  {{ '}' }}
{{ '}' }}</code></pre>
                </div>

                <div class="solution">
                    <h3>2. async Pipe (Simplest)</h3>
                    <pre><code>&lt;div&gt;{{ '{{ data$ | async }}' }}&lt;/div&gt;

// Automatically subscribes and unsubscribes!</code></pre>
                </div>

                <div class="solution">
                    <h3>3. DestroyRef Callback</h3>
                    <pre><code>export class MyComponent {{ '{' }}
  private destroyRef = inject(DestroyRef);
  
  constructor() {{ '{' }}
    const intervalId = setInterval(() => {{ '{' }}...{{ '}' }}, 1000);
    
    this.destroyRef.onDestroy(() => {{ '{' }}
      clearInterval(intervalId);
    {{ '}' }});
  {{ '}' }}
{{ '}' }}</code></pre>
                </div>
            </section>

            <section class="pattern-comparison">
                <h2>📊 Cleanup Pattern Comparison</h2>
                <table>
                    <tr>
                        <th>Pattern</th>
                        <th>Boilerplate</th>
                        <th>Recommended</th>
                    </tr>
                    <tr>
                        <td>async pipe</td>
                        <td class="good">None</td>
                        <td class="good">✅ Best</td>
                    </tr>
                    <tr>
                        <td>takeUntilDestroyed</td>
                        <td class="medium">Low</td>
                        <td class="good">✅ Great</td>
                    </tr>
                    <tr>
                        <td>Subject + takeUntil</td>
                        <td class="bad">Medium</td>
                        <td>Legacy</td>
                    </tr>
                    <tr>
                        <td>Manual unsubscribe</td>
                        <td class="bad">High</td>
                        <td class="bad">❌ Avoid</td>
                    </tr>
                </table>
            </section>

            <section class="demo-section">
                <h2>Live Demo</h2>
                <p>Counter (auto-cleaned): {{ counter }}</p>
                <p class="note">When this component destroys, the interval stops automatically!</p>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: var(--primary-color, #667eea); }

        .leak-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        .leak { background: #fee2e2; padding: 1rem; border-radius: 8px; text-align: center; }
        .leak .icon { font-size: 2rem; }
        .leak h4 { margin: 0.5rem 0 0.25rem; font-size: 0.85rem; }
        .leak p { margin: 0; font-size: 0.75rem; color: #dc2626; }

        .solution { background: var(--bg-secondary); padding: 1.5rem; border-radius: 10px; margin: 1rem 0; }
        .solution h3 { margin: 0 0 1rem; color: var(--primary-color); font-size: 1rem; }
        .solution pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; margin: 0; font-size: 0.8rem; }

        table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
        th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
        th { background: var(--bg-secondary); }
        .good { color: #16a34a; }
        .medium { color: #d97706; }
        .bad { color: #dc2626; }

        .demo-section { background: linear-gradient(135deg, #667eea20, #764ba220); padding: 2rem; border-radius: 12px; text-align: center; }
        .note { background: #e0e7ff; padding: 0.5rem; border-radius: 6px; font-size: 0.85rem; }
    `]
})
export class MemoryManagementComponent {
    counter = 0;
    private destroyRef = inject(DestroyRef);

    constructor() {
        // This subscription auto-cleans up on component destroy!
        interval(1000).pipe(
            takeUntilDestroyed(this.destroyRef)
        ).subscribe(() => {
            this.counter++;
        });
    }
}
