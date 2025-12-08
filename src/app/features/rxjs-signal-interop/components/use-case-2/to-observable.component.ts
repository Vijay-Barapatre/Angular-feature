/**
 * ============================================================================
 * USE CASE 2: toObservable() - SIGNAL TO OBSERVABLE
 * ============================================================================
 */

import { Component, signal, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
    selector: 'app-to-observable',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>🔄 toObservable()</h1>
                <p class="subtitle">Signal → Observable</p>
            </header>

            <section class="concept-section">
                <h2>What is toObservable()?</h2>
                <p>
                    Converts a Signal into an Observable. Use this when you need RxJS operators 
                    like <code>debounceTime</code>, <code>switchMap</code>, etc.
                </p>
            </section>

            <section class="demo-section">
                <h2>Live Demo: Debounced Search</h2>
                <div class="demo-card">
                    <input 
                        type="text" 
                        [value]="searchTerm()" 
                        (input)="searchTerm.set($any($event.target).value)"
                        placeholder="Type to search (debounced)..." 
                    />
                    <p class="result">Debounced value: <strong>{{ debouncedValue }}</strong></p>
                    <p class="info">Type and wait 300ms to see the debounced result</p>
                </div>
            </section>

            <section class="code-section">
                <h2>📝 Implementation</h2>
                <pre class="code"><code>// Signal for search input
searchTerm = signal('');

// Convert to Observable for RxJS operators
searchTerm$ = toObservable(this.searchTerm);

constructor() {{ '{' }}
  this.searchTerm$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(term => this.searchApi(term)),
    takeUntilDestroyed()
  ).subscribe(results => this.results.set(results));
{{ '}' }}</code></pre>
            </section>

            <section class="usecases-section">
                <h2>🎯 When to Use toObservable()</h2>
                <div class="usecase-grid">
                    <div class="usecase">
                        <h4>⏱️ Debounce/Throttle</h4>
                        <code>debounceTime(300)</code>
                    </div>
                    <div class="usecase">
                        <h4>🔄 SwitchMap</h4>
                        <code>switchMap(val => api.call(val))</code>
                    </div>
                    <div class="usecase">
                        <h4>🔗 CombineLatest</h4>
                        <code>combineLatest([signal1$, signal2$])</code>
                    </div>
                    <div class="usecase">
                        <h4>📊 Buffer</h4>
                        <code>bufferTime(1000)</code>
                    </div>
                </div>
            </section>

            <section class="comparison">
                <h2>toSignal vs toObservable</h2>
                <table>
                    <tr><th></th><th>toSignal()</th><th>toObservable()</th></tr>
                    <tr><td>Direction</td><td>Observable → Signal</td><td>Signal → Observable</td></tr>
                    <tr><td>Use Case</td><td>Display in template</td><td>Apply RxJS operators</td></tr>
                    <tr><td>When</td><td>End of stream</td><td>Middle of stream</td></tr>
                </table>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: var(--primary-color, #667eea); }

        .demo-card { background: var(--bg-secondary, #f8f9fa); padding: 2rem; border-radius: 12px; }
        .demo-card input {
            width: 100%; padding: 1rem; font-size: 1rem;
            border: 2px solid #e5e7eb; border-radius: 8px;
        }
        .demo-card input:focus { outline: none; border-color: var(--primary-color); }
        .demo-card .result { font-size: 1.25rem; margin: 1rem 0 0.5rem; }
        .demo-card .info { font-size: 0.85rem; color: var(--text-secondary); margin: 0; }

        .code { background: #1e1e2e; color: #a6e3a1; padding: 1.5rem; border-radius: 10px; overflow-x: auto; }

        .usecase-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-top: 1rem; }
        .usecase { background: var(--bg-secondary); padding: 1rem; border-radius: 8px; text-align: center; }
        .usecase h4 { margin: 0 0 0.5rem; font-size: 0.9rem; }
        .usecase code { font-size: 0.75rem; background: #1e1e2e; color: #a6e3a1; padding: 0.25rem 0.5rem; border-radius: 4px; }

        table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
        th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
        th { background: var(--bg-secondary); }
    `]
})
export class ToObservableComponent {
    private destroyRef = inject(DestroyRef);

    searchTerm = signal('');
    debouncedValue = '';

    // Convert signal to observable for RxJS operators
    searchTerm$ = toObservable(this.searchTerm);

    constructor() {
        this.searchTerm$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            takeUntilDestroyed(this.destroyRef)
        ).subscribe(value => {
            this.debouncedValue = value;
        });
    }
}
