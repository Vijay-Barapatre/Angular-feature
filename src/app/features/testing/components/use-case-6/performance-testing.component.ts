/**
 * ============================================================================
 * USE CASE 6: PERFORMANCE-AWARE TESTING
 * ============================================================================
 * 
 * Demonstrates testing strategies for performance-sensitive scenarios:
 * - Testing OnPush components
 * - Minimal TestBed configuration
 * - Controlling change detection manually
 */

import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-performance-testing',
    standalone: true,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="container">
            <header class="header">
                <h1>⚡ Performance-Aware Testing</h1>
                <p class="subtitle">OnPush, Minimal TestBed & CD Control</p>
            </header>

            <section class="demo-section">
                <h2>OnPush Counter</h2>
                <p class="note">This component uses OnPush strategy</p>
                
                <div class="counter-display">
                    <span class="count" data-testid="count">{{ count }}</span>
                </div>
                
                <div class="controls">
                    <button (click)="incrementWithoutCD()" data-testid="no-cd-btn" class="btn warning">
                        Increment (no CD)
                    </button>
                    <button (click)="incrementWithCD()" data-testid="with-cd-btn" class="btn success">
                        Increment (with CD)
                    </button>
                    <button (click)="incrementViaInput()" data-testid="input-btn" class="btn">
                        Via &#64;Input
                    </button>
                </div>
            </section>

            <section class="code-section">
                <h2>📝 Performance Testing Patterns</h2>
                
                <div class="concept-grid">
                    <div class="concept-card perf">
                        <h3>⚡ Minimal TestBed</h3>
                        <pre><code>// ✅ Only import what's needed
TestBed.configureTestingModule({{ '{' }}
  imports: [ComponentUnderTest]
{{ '}' }});

// ❌ Avoid importing entire modules
imports: [SharedModule, MaterialModule]</code></pre>
                    </div>

                    <div class="concept-card perf">
                        <h3>🔄 OnPush Testing</h3>
                        <pre><code>// OnPush needs explicit triggers:
// 1. Change the Input reference
component.data = {{ '{' }}...newData{{ '}' }};

// 2. Or mark for check
fixture.componentRef.injector
  .get(ChangeDetectorRef)
  .markForCheck();

fixture.detectChanges();</code></pre>
                    </div>

                    <div class="concept-card perf">
                        <h3>🎯 Selective Detection</h3>
                        <pre><code>// Only detect when needed
component.updateState();

// Skip detectChanges if testing logic only
expect(component.count).toBe(1);

// Only call when testing template
fixture.detectChanges();</code></pre>
                    </div>

                    <div class="concept-card perf">
                        <h3>📊 Test Speed Tips</h3>
                        <pre><code>// 1. Use beforeAll for shared setup
beforeAll(() => {{ '{' }}
  TestBed.configureTestingModule(...);
{{ '}' }});

// 2. Direct instantiation for services
const service = new MyService();

// 3. Avoid DOM queries when possible</code></pre>
                    </div>
                </div>
            </section>

            <section class="tips-section">
                <h2>🚀 Performance Checklist</h2>
                <ul>
                    <li><strong>Minimal imports</strong> - Only import the component under test</li>
                    <li><strong>Direct service testing</strong> - Skip TestBed for simple services</li>
                    <li><strong>Lazy detectChanges</strong> - Only call when testing the DOM</li>
                    <li><strong>Reuse configurations</strong> - Use beforeAll for shared setup</li>
                    <li><strong>Mock heavy dependencies</strong> - Don't load modules you're not testing</li>
                </ul>
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
        .note { color: #f59e0b; font-size: 0.9rem; }

        .counter-display { margin: 2rem 0; }
        .count { 
            font-size: 4rem; 
            font-weight: bold;
            color: var(--primary-color, #667eea);
        }

        .controls { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; }
        .btn {
            padding: 0.75rem 1rem;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 0.9rem;
            background: var(--primary-color, #667eea);
            color: white;
        }
        .btn.warning { background: #f59e0b; }
        .btn.success { background: #10b981; }

        .concept-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1rem;
        }
        .concept-card {
            background: var(--bg-secondary, #f8f9fa);
            padding: 1.5rem;
            border-radius: 10px;
        }
        .concept-card.perf { border-left: 4px solid #f59e0b; }
        .concept-card h3 { margin-top: 0; }
        .concept-card pre {
            background: #1e1e2e;
            color: #a6e3a1;
            padding: 1rem;
            border-radius: 6px;
            overflow-x: auto;
            font-size: 0.75rem;
        }

        .tips-section {
            background: linear-gradient(135deg, #f59e0b20, #eab30820);
            padding: 2rem;
            border-radius: 12px;
        }
        .tips-section h2 { margin-top: 0; }
        .tips-section li { margin-bottom: 0.5rem; }
    `]
})
export class PerformanceTestingComponent {
    private cdr = inject(ChangeDetectorRef);

    /**
     * Input-driven count (OnPush will detect this)
     */
    @Input() count = 0;

    /**
     * Increment without triggering change detection
     * This won't update the template with OnPush!
     */
    incrementWithoutCD(): void {
        this.count++;
        // Template won't update - OnPush ignores internal changes
    }

    /**
     * Increment with manual change detection trigger
     */
    incrementWithCD(): void {
        this.count++;
        this.cdr.markForCheck(); // Trigger CD manually
    }

    /**
     * Simulates increment via @Input change (parent would do this)
     */
    incrementViaInput(): void {
        // In real scenario, parent changes the input
        // For demo, we simulate with markForCheck
        this.count++;
        this.cdr.markForCheck();
    }
}
