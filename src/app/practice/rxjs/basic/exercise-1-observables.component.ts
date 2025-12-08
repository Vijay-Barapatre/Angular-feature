/**
 * ============================================================================
 * 🟦 BASIC EXERCISE 1: OBSERVABLES FUNDAMENTALS
 * ============================================================================
 */

import { Component, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription, of, from, interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-exercise-1-observables',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 1: Observable Fundamentals</h2>
                <p>Understand how to create and subscribe to Observables.</p>
                
                <h4>Key Concepts:</h4>
                <ul>
                    <li>Creating Observables with of(), from(), interval()</li>
                    <li>Subscribing to receive values</li>
                    <li>Handling next, error, complete</li>
                </ul>
            </div>

            <div class="demo">
                <h3>🎯 Observable Creation Methods</h3>
                
                <div class="demo-grid">
                    <div class="demo-card">
                        <h4>of() - Emit values</h4>
                        <button (click)="demoOf()">Run of()</button>
                        @if (ofResult()) {
                            <div class="result">{{ ofResult() }}</div>
                        }
                    </div>

                    <div class="demo-card">
                        <h4>from() - From array</h4>
                        <button (click)="demoFrom()">Run from()</button>
                        @if (fromResult()) {
                            <div class="result">{{ fromResult() }}</div>
                        }
                    </div>

                    <div class="demo-card">
                        <h4>interval() - Timer</h4>
                        <button (click)="demoInterval()" [disabled]="intervalRunning()">
                            {{ intervalRunning() ? 'Running...' : 'Run interval()' }}
                        </button>
                        <div class="result counter">{{ intervalCount() }}</div>
                    </div>

                    <div class="demo-card">
                        <h4>Custom Observable</h4>
                        <button (click)="demoCustom()">Create Custom</button>
                        @if (customResult()) {
                            <div class="result">{{ customResult() }}</div>
                        }
                    </div>
                </div>

                <div class="code-example">
                    <h4>📝 Basic Observable Pattern</h4>
                    <pre><code>const obs$ = new Observable(subscriber => {{ '{' }}
  subscriber.next('Hello');
  subscriber.next('World');
  subscriber.complete();
{{ '}' }});

obs$.subscribe({{ '{' }}
  next: value => console.log(value),
  error: err => console.error(err),
  complete: () => console.log('Done!')
{{ '}' }});</code></pre>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 700px; }
        .instructions { background: #fffbeb; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; }
        .instructions h2 { margin: 0 0 0.5rem; color: #f59e0b; }
        .demo { background: white; padding: 1.5rem; border-radius: 8px; }
        .demo-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; }
        .demo-card { padding: 1rem; background: #f8fafc; border-radius: 8px; }
        .demo-card h4 { margin: 0 0 0.75rem; font-size: 0.9rem; color: #6b7280; }
        .demo-card button { width: 100%; padding: 0.5rem; background: #f59e0b; color: white; border: none; border-radius: 4px; cursor: pointer; }
        .demo-card button:disabled { opacity: 0.5; }
        .result { margin-top: 0.75rem; padding: 0.5rem; background: #1e1e2e; color: #a6e3a1; border-radius: 4px; font-family: monospace; font-size: 0.85rem; }
        .result.counter { font-size: 2rem; text-align: center; font-weight: bold; }
        .code-example { padding: 1rem; background: #1e1e2e; border-radius: 8px; }
        .code-example h4 { margin: 0 0 0.5rem; color: white; font-size: 0.9rem; }
        .code-example pre { margin: 0; }
        .code-example code { color: #a6e3a1; font-size: 0.85rem; }
    `]
})
export class Exercise1ObservablesComponent implements OnDestroy {
    private subscriptions: Subscription[] = [];

    ofResult = signal('');
    fromResult = signal('');
    intervalCount = signal(0);
    intervalRunning = signal(false);
    customResult = signal('');

    demoOf(): void {
        const values: string[] = [];
        of('Apple', 'Banana', 'Cherry').subscribe({
            next: val => values.push(val),
            complete: () => this.ofResult.set(values.join(' → '))
        });
    }

    demoFrom(): void {
        const values: number[] = [];
        from([1, 2, 3, 4, 5]).subscribe({
            next: val => values.push(val),
            complete: () => this.fromResult.set(`Sum: ${values.reduce((a, b) => a + b, 0)}`)
        });
    }

    demoInterval(): void {
        this.intervalRunning.set(true);
        this.intervalCount.set(0);

        const sub = interval(500).pipe(take(10)).subscribe({
            next: val => this.intervalCount.set(val + 1),
            complete: () => this.intervalRunning.set(false)
        });
        this.subscriptions.push(sub);
    }

    demoCustom(): void {
        const custom$ = new Observable<string>(subscriber => {
            subscriber.next('Starting...');
            setTimeout(() => subscriber.next('Processing...'), 500);
            setTimeout(() => {
                subscriber.next('Complete!');
                subscriber.complete();
            }, 1000);
        });

        const results: string[] = [];
        custom$.subscribe({
            next: val => {
                results.push(val);
                this.customResult.set(results.join(' → '));
            }
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}
