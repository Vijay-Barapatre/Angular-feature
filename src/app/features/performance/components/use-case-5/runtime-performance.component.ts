/**
 * ============================================================================
 * USE CASE 5: RUNTIME PERFORMANCE
 * ============================================================================
 */

import { Component, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';

// Pure Pipe Example
@Pipe({ name: 'expensive', standalone: true, pure: true })
export class ExpensivePipe implements PipeTransform {
    transform(value: number): string {
        // Simulates expensive calculation - only runs when input changes
        console.log('Pipe executed');
        return `Computed: ${value * 2}`;
    }
}

@Component({
    selector: 'app-runtime-performance',
    standalone: true,
    imports: [CommonModule, ExpensivePipe],
    template: `
        <div class="container">
            <header class="header">
                <h1>🚀 Runtime Performance</h1>
                <p class="subtitle">Pipes, Memoization & Virtual Scroll</p>
            </header>

            <section class="pipes-section">
                <h2>📝 Pure Pipes vs Methods</h2>
                <div class="comparison">
                    <div class="bad">
                        <h3>❌ Method in Template</h3>
                        <pre><code>&lt;p&gt;{{ '{{ calculate(value) }}' }}&lt;/p&gt;

// Called on EVERY change detection!
calculate(val: number) {{ '{' }}
  return val * 2;
{{ '}' }}</code></pre>
                        <p class="result">🔴 Runs 100s of times</p>
                    </div>
                    <div class="good">
                        <h3>✅ Pure Pipe</h3>
                        <pre><code>&lt;p&gt;{{ '{{ value | expensive }}' }}&lt;/p&gt;

// Only called when value changes!
&#64;Pipe({{ '{' }} pure: true {{ '}' }})
transform(val: number) {{ '{' }}...{{ '}' }}</code></pre>
                        <p class="result">🟢 Runs only when needed</p>
                    </div>
                </div>
            </section>

            <section class="demo-section">
                <h2>Live Demo: Pure Pipe</h2>
                <p>Input: {{ inputValue }} → {{ inputValue | expensive }}</p>
                <button (click)="inputValue = inputValue + 1">Increment</button>
                <button (click)="triggerCD()">Trigger CD (check console)</button>
            </section>

            <section class="memoization-section">
                <h2>🧠 Memoization</h2>
                <pre class="code"><code>// Cache expensive computations
const cache = new Map&lt;string, Result&gt;();

function expensiveCalc(input: string): Result {{ '{' }}
  if (cache.has(input)) return cache.get(input)!;
  
  const result = /* expensive work */;
  cache.set(input, result);
  return result;
{{ '}' }}</code></pre>
            </section>

            <section class="virtual-section">
                <h2>📜 Virtual Scrolling</h2>
                <p>Render only visible items for large lists</p>
                <pre class="code"><code>import {{ '{' }} ScrollingModule {{ '}' }} from '&#64;angular/cdk/scrolling';

&lt;cdk-virtual-scroll-viewport itemSize="50"&gt;
  &lt;div *cdkVirtualFor="let item of items"&gt;
    {{ '{{ item.name }}' }}
  &lt;/div&gt;
&lt;/cdk-virtual-scroll-viewport&gt;</code></pre>
                <p class="note">10,000 items? Only ~20 DOM nodes!</p>
            </section>

            <section class="tips-section">
                <h2>⚡ Quick Tips</h2>
                <ul>
                    <li>Use <code>pure: true</code> pipes (default)</li>
                    <li>Avoid methods in templates</li>
                    <li>Use CDK VirtualScroll for long lists</li>
                    <li>Debounce user input events</li>
                    <li>Use <code>requestAnimationFrame</code> for animations</li>
                </ul>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: var(--primary-color, #667eea); }

        .comparison { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .bad, .good { border-radius: 10px; overflow: hidden; }
        .bad h3, .good h3 { margin: 0; padding: 1rem; font-size: 0.9rem; }
        .bad h3 { background: #fee2e2; color: #dc2626; }
        .good h3 { background: #dcfce7; color: #16a34a; }
        .bad pre, .good pre { margin: 0; padding: 1rem; background: #1e1e2e; color: #a6e3a1; font-size: 0.75rem; }
        .result { margin: 0; padding: 0.75rem; text-align: center; background: var(--bg-secondary); }

        .demo-section { background: linear-gradient(135deg, #667eea20, #764ba220); padding: 2rem; border-radius: 12px; margin: 2rem 0; }
        .demo-section button { padding: 0.5rem 1rem; margin-right: 0.5rem; border: none; border-radius: 6px; background: #667eea; color: white; cursor: pointer; }

        .code { background: #1e1e2e; color: #a6e3a1; padding: 1.5rem; border-radius: 10px; overflow-x: auto; }
        .note { background: #fef3c7; padding: 0.75rem; border-radius: 6px; text-align: center; margin-top: 1rem; }

        .tips-section { background: linear-gradient(135deg, #10b98120, #14b8a620); padding: 2rem; border-radius: 12px; }
        .tips-section code { background: rgba(0,0,0,0.1); padding: 0.1rem 0.3rem; border-radius: 4px; }
    `]
})
export class RuntimePerformanceComponent {
    inputValue = 5;

    triggerCD() {
        // Just triggers change detection to show pipe doesn't re-run
    }
}
