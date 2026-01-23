/**
 * SIGNALS VS OBSERVABLES
 * 
 * Demonstrates when to use each and conversion patterns:
 * - toSignal() - Convert Observable to Signal
 * - toObservable() - Convert Signal to Observable
 * - Comparison and best practices
 */

import { Component, signal, computed, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { interval, Subject, takeUntil, map } from 'rxjs';

@Component({
    selector: 'app-use-case-6-demo',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
        <div class="demo-container">
            <header class="demo-header">
                <a routerLink="/signals" class="back-link">← Back to Overview</a>
                <h1>⚖️ Signals vs Observables</h1>
                <p>When to use each and how to convert between them</p>
            </header>

            <section class="demo-section">
                <h2>🔄 Interactive Demo: Conversion</h2>
                
                <div class="demo-grid">
                    <div class="demo-card">
                        <h3>📡 Observable → Signal</h3>
                        <p>Timer from interval() Observable:</p>
                        <div class="value-display">
                            {{ timerSignal() }}
                        </div>
                        <code>toSignal(interval(1000))</code>
                    </div>

                    <div class="demo-card">
                        <h3>🚦 Signal → Observable</h3>
                        <p>Counter signal converted:</p>
                        <div class="counter-controls">
                            <button (click)="decrement()">-</button>
                            <span class="value-display">{{ counter() }}</span>
                            <button (click)="increment()">+</button>
                        </div>
                        <p class="obs-log">Observable log: {{ counterLog() }}</p>
                        <code>toObservable(counter)</code>
                    </div>
                </div>
            </section>

            <section class="comparison-section">
                <h2>📊 Comparison Table</h2>
                
                <table class="comparison-table">
                    <thead>
                        <tr>
                            <th>Aspect</th>
                            <th>Signals 🚦</th>
                            <th>Observables 📡</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Syntax</td>
                            <td>Simple: signal(), ()</td>
                            <td>Complex: subscribe, pipe</td>
                        </tr>
                        <tr>
                            <td>Current Value</td>
                            <td>Always available: signal()</td>
                            <td>Must subscribe or async pipe</td>
                        </tr>
                        <tr>
                            <td>Memory Leaks</td>
                            <td>Auto-cleanup</td>
                            <td>Must unsubscribe</td>
                        </tr>
                        <tr>
                            <td>Operators</td>
                            <td>computed(), effect()</td>
                            <td>Rich RxJS operators</td>
                        </tr>
                        <tr>
                            <td>Best For</td>
                            <td>UI state, component state</td>
                            <td>HTTP, events, streams</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section class="code-section">
                <h2>💻 Conversion Patterns</h2>
                
                <div class="code-block">
                    <div class="code-header">Observable to Signal</div>
                    <pre><code>import &#123; toSignal &#125; from '&#64;angular/core/rxjs-interop';

// In component
data$ = this.http.get('/api/users');
users = toSignal(this.data$, &#123; initialValue: [] &#125;);

// In template - no async pipe needed!
&#64;for (user of users(); track user.id) &#123;...&#125;</code></pre>
                </div>

                <div class="code-block">
                    <div class="code-header">Signal to Observable</div>
                    <pre><code>import &#123; toObservable &#125; from '&#64;angular/core/rxjs-interop';

searchTerm = signal('');
searchTerm$ = toObservable(this.searchTerm);

// Now use RxJS operators
results$ = this.searchTerm$.pipe(
    debounceTime(300),
    switchMap(term => this.search(term))
);</code></pre>
                </div>
            </section>

            <section class="key-points">
                <h2>🎯 When to Use What</h2>
                <ul>
                    <li><strong>Use Signals</strong> for component state, UI reactivity, simple derived values</li>
                    <li><strong>Use Observables</strong> for HTTP calls, complex async streams, event handling</li>
                    <li><strong>toSignal()</strong> when you want to consume Observable in template easily</li>
                    <li><strong>toObservable()</strong> when you need RxJS operators on signal</li>
                    <li>Both can coexist - choose based on the use case!</li>
                </ul>
            </section>
        </div>
    `,
    styles: [`
        .demo-container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 2rem;
        }
        .demo-header { margin-bottom: 2rem; }
        .back-link { color: var(--primary-light); text-decoration: none; }
        h1 {
            background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        h2, h3 { color: var(--primary-light); margin-bottom: 1rem; }
        .demo-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
        }
        .demo-card {
            background: var(--bg-card);
            padding: 1.5rem;
            border-radius: 12px;
            border: 1px solid rgba(102, 126, 234, 0.2);
        }
        .value-display {
            font-size: 3rem;
            font-weight: 700;
            color: var(--primary-color);
            text-align: center;
            margin: 1rem 0;
        }
        .counter-controls {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
        }
        .counter-controls button {
            width: 40px;
            height: 40px;
            font-size: 1.5rem;
            border: none;
            border-radius: 8px;
            background: var(--primary-color);
            color: white;
            cursor: pointer;
        }
        .obs-log {
            margin-top: 1rem;
            padding: 0.5rem;
            background: rgba(102, 126, 234, 0.1);
            border-radius: 6px;
            font-size: 0.85rem;
        }
        .demo-card code {
            display: block;
            margin-top: 1rem;
            padding: 0.5rem;
            background: #1e293b;
            border-radius: 6px;
            color: #94a3b8;
            font-size: 0.85rem;
        }
        .comparison-table {
            width: 100%;
            border-collapse: collapse;
            margin: 1rem 0;
        }
        .comparison-table th, .comparison-table td {
            padding: 1rem;
            text-align: left;
            border-bottom: 1px solid rgba(102, 126, 234, 0.2);
        }
        .comparison-table th {
            background: var(--bg-card);
            color: var(--primary-light);
        }
        .comparison-table td { color: var(--text-secondary); }
        .code-section, .key-points, .comparison-section { margin-top: 2rem; }
        .code-block {
            background: #1e293b;
            border-radius: 8px;
            overflow: hidden;
            margin-bottom: 1rem;
        }
        .code-header {
            background: rgba(102, 126, 234, 0.2);
            padding: 0.5rem 1rem;
            color: var(--primary-light);
            font-weight: 600;
        }
        .code-block pre { padding: 1rem; margin: 0; }
        .code-block code { 
            color: #94a3b8; 
            font-family: 'Fira Code', monospace;
            background: none;
            padding: 0;
            display: inline;
        }
        .key-points ul { list-style: none; padding: 0; }
        .key-points li {
            padding: 0.5rem 0;
            padding-left: 1.5rem;
            position: relative;
            color: var(--text-secondary);
        }
        .key-points li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: var(--accent-color);
        }
    `]
})
export class UseCase6DemoComponent implements OnDestroy {
    private destroy$ = new Subject<void>();

    // 📡 Observable → Signal
    timerSignal = toSignal(
        interval(1000).pipe(map(n => n + 1)),
        { initialValue: 0 }
    );

    // 🚦 Signal → Observable demo
    counter = signal(0);
    counterLog = signal<string>('');

    constructor() {
        // Convert signal to observable and subscribe
        toObservable(this.counter).pipe(
            takeUntil(this.destroy$)
        ).subscribe(value => {
            this.counterLog.set(`Last emitted: ${value}`);
        });
    }

    increment(): void {
        this.counter.update(c => c + 1);
    }

    decrement(): void {
        this.counter.update(c => c - 1);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}

