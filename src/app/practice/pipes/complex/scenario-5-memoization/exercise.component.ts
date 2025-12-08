/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 5: MEMOIZATION
 * ============================================================================
 */

import { Component, Pipe, PipeTransform, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Pipe({ name: 'fibonacci', standalone: true })
export class FibonacciPipe implements PipeTransform {
    private cache = new Map<number, number>();

    transform(n: number): number {
        return this.fibonacci(n);
    }

    private fibonacci(n: number): number {
        if (n <= 1) return n;
        if (this.cache.has(n)) return this.cache.get(n)!;

        const result = this.fibonacci(n - 1) + this.fibonacci(n - 2);
        this.cache.set(n, result);
        return result;
    }
}

@Component({
    selector: 'app-scenario-5-memoization',
    standalone: true,
    imports: [CommonModule, FibonacciPipe],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 5: Memoization Pipe</h2>
                <p>Cache expensive calculations for performance.</p>
            </div>

            <div class="content">
                <div class="controls">
                    <label>Fibonacci Number: {{ fibNumber() }}</label>
                    <input type="range" min="1" max="40" [value]="fibNumber()"
                        (input)="fibNumber.set(+$any($event.target).value)">
                </div>

                <div class="result-box">
                    <div class="fib-result">
                        <span class="label">F({{ fibNumber() }}) =</span>
                        <span class="value">{{ fibNumber() | fibonacci }}</span>
                    </div>
                </div>

                <div class="history">
                    <h4>Fibonacci Sequence:</h4>
                    <div class="sequence">
                        @for (n of sequenceNumbers; track n) {
                            <span class="fib-item" [class.active]="n === fibNumber()">
                                F({{ n }})={{ n | fibonacci }}
                            </span>
                        }
                    </div>
                </div>

                <div class="info-box">
                    <h4>Memoization Benefits:</h4>
                    <ul>
                        <li>Caches computed results</li>
                        <li>Avoids redundant calculations</li>
                        <li>Improves performance for expensive operations</li>
                    </ul>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; color: #1e1e2e; border-left: 4px solid #ef4444; }
        .instructions h2 { margin: 0 0 0.5rem; color: #ef4444; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; }
        .controls { margin-bottom: 1rem; }
        .controls label { display: block; margin-bottom: 0.5rem; font-weight: 500; }
        .controls input { width: 100%; }
        .result-box { padding: 1.5rem; background: #f8fafc; border-radius: 8px; margin-bottom: 1rem; text-align: center; }
        .fib-result { margin-bottom: 1rem; }
        .fib-result .label { font-size: 1.25rem; }
        .fib-result .value { font-size: 2rem; font-weight: bold; color: #10b981; margin-left: 0.5rem; }
        .history h4 { margin: 0 0 0.75rem; }
        .sequence { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
        .fib-item { padding: 0.25rem 0.5rem; background: #f8fafc; border-radius: 4px; font-size: 0.85rem; font-family: monospace; }
        .fib-item.active { background: #10b981; color: white; }
        .info-box { padding: 1rem; background: #eff6ff; border-radius: 8px; }
        .info-box h4 { margin: 0 0 0.5rem; }
        .info-box ul { margin: 0; padding-left: 1.25rem; }
    `]
})
export class Scenario5MemoizationComponent {
    fibNumber = signal(10);
    sequenceNumbers = [1, 2, 3, 5, 8, 10, 15, 20, 25, 30];
}
