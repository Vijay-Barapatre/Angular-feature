/**
 * ============================================================================
 * 🟦 BASIC EXERCISE 2: COMMON OPERATORS
 * ============================================================================
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { of, from } from 'rxjs';
import { map, filter, tap, take, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-exercise-2-operators',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 2: Common Operators</h2>
                <p>Learn essential RxJS operators for data transformation.</p>
            </div>

            <div class="demo">
                <div class="operators-grid">
                    <div class="operator-card">
                        <h4>map()</h4>
                        <p>Transform each value</p>
                        <button (click)="demoMap()">Run</button>
                        <div class="result">{{ mapResult() }}</div>
                    </div>

                    <div class="operator-card">
                        <h4>filter()</h4>
                        <p>Filter values</p>
                        <button (click)="demoFilter()">Run</button>
                        <div class="result">{{ filterResult() }}</div>
                    </div>

                    <div class="operator-card">
                        <h4>tap()</h4>
                        <p>Side effects (logging)</p>
                        <button (click)="demoTap()">Run (check console)</button>
                        <div class="result">{{ tapResult() }}</div>
                    </div>

                    <div class="operator-card">
                        <h4>take()</h4>
                        <p>Limit emissions</p>
                        <button (click)="demoTake()">Run</button>
                        <div class="result">{{ takeResult() }}</div>
                    </div>
                </div>

                <hr>

                <h3>🔌 Pipe Chaining</h3>
                <div class="chain-demo">
                    <button (click)="demoChain()">Run Chained Operators</button>
                    <div class="chain-result">
                        <span>Input: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]</span>
                        <span>→ filter(x > 3)</span>
                        <span>→ map(x * 2)</span>
                        <span>→ take(3)</span>
                        <span>= {{ chainResult() }}</span>
                    </div>
                </div>

                <hr>

                <h3>⌨️ Debounce Demo</h3>
                <input 
                    placeholder="Type to see debounce..." 
                    (input)="onInput($event)">
                <div class="debounce-result">
                    <span>Debounced value: {{ debouncedValue() }}</span>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 700px; }
        .instructions { background: #fffbeb; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; }
        .demo { background: white; padding: 1.5rem; border-radius: 8px; }
        .operators-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 1rem; }
        .operator-card { padding: 1rem; background: #f8fafc; border-radius: 8px; }
        .operator-card h4 { margin: 0; color: #f59e0b; }
        .operator-card p { margin: 0.5rem 0; font-size: 0.85rem; color: #6b7280; }
        .operator-card button { width: 100%; padding: 0.5rem; background: #f59e0b; color: white; border: none; border-radius: 4px; cursor: pointer; margin-bottom: 0.5rem; }
        .result { padding: 0.5rem; background: #1e1e2e; color: #a6e3a1; border-radius: 4px; font-family: monospace; font-size: 0.85rem; min-height: 24px; }
        hr { margin: 1.5rem 0; border: none; border-top: 1px solid #e5e7eb; }
        .chain-demo button { padding: 0.75rem 1.5rem; background: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer; margin-bottom: 1rem; }
        .chain-result { display: flex; flex-wrap: wrap; gap: 0.5rem; padding: 1rem; background: #1e1e2e; border-radius: 8px; color: #a6e3a1; font-family: monospace; font-size: 0.85rem; }
        input { width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 6px; margin-bottom: 0.5rem; }
        .debounce-result { padding: 0.75rem; background: #f8fafc; border-radius: 6px; }
    `]
})
export class Exercise2OperatorsComponent {
    private inputSubject = new Subject<string>();

    mapResult = signal('');
    filterResult = signal('');
    tapResult = signal('');
    takeResult = signal('');
    chainResult = signal('');
    debouncedValue = signal('');

    constructor() {
        this.inputSubject.pipe(
            debounceTime(500),
            distinctUntilChanged()
        ).subscribe(value => {
            this.debouncedValue.set(value);
        });
    }

    demoMap(): void {
        const values: number[] = [];
        from([1, 2, 3]).pipe(
            map(x => x * 10)
        ).subscribe({
            next: val => values.push(val),
            complete: () => this.mapResult.set(values.join(', '))
        });
    }

    demoFilter(): void {
        const values: number[] = [];
        from([1, 2, 3, 4, 5, 6]).pipe(
            filter(x => x % 2 === 0)
        ).subscribe({
            next: val => values.push(val),
            complete: () => this.filterResult.set(`Even: ${values.join(', ')}`)
        });
    }

    demoTap(): void {
        from(['a', 'b', 'c']).pipe(
            tap(val => console.log('Processing:', val)),
            map(val => val.toUpperCase())
        ).subscribe({
            complete: () => this.tapResult.set('Check console!')
        });
    }

    demoTake(): void {
        const values: number[] = [];
        from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).pipe(
            take(3)
        ).subscribe({
            next: val => values.push(val),
            complete: () => this.takeResult.set(`First 3: ${values.join(', ')}`)
        });
    }

    demoChain(): void {
        const values: number[] = [];
        from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).pipe(
            filter(x => x > 3),
            map(x => x * 2),
            take(3)
        ).subscribe({
            next: val => values.push(val),
            complete: () => this.chainResult.set(`[${values.join(', ')}]`)
        });
    }

    onInput(event: Event): void {
        const value = (event.target as HTMLInputElement).value;
        this.inputSubject.next(value);
    }
}
