/**
 * ============================================================================
 * RXJS-SIGNAL INTEROP - OVERVIEW
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-rxjs-signal-overview',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
        <div class="container">
            <header class="header">
                <h1>🔄 RxJS-Signal Interop</h1>
                <p class="subtitle">Bridge between Observables and Signals</p>
            </header>

            <section class="intro-card">
                <h2>Why Interop?</h2>
                <p>
                    Angular Signals are great for synchronous state, but RxJS excels at async streams.
                    The interop functions let you use <strong>both together</strong> seamlessly!
                </p>
                <div class="bridge-visual">
                    <div class="box rxjs">RxJS Observable</div>
                    <div class="arrows">
                        <span>toSignal() →</span>
                        <span>← toObservable()</span>
                    </div>
                    <div class="box signal">Angular Signal</div>
                </div>
            </section>

            <section class="functions-section">
                <h2>🔧 Core Functions</h2>
                <div class="function-grid">
                    <div class="function-card">
                        <h3>toSignal()</h3>
                        <code>import {{ '{' }} toSignal {{ '}' }} from '&#64;angular/core/rxjs-interop';</code>
                        <p>Convert Observable → Signal</p>
                        <span class="use">Use in templates without async pipe</span>
                    </div>
                    <div class="function-card">
                        <h3>toObservable()</h3>
                        <code>import {{ '{' }} toObservable {{ '}' }} from '&#64;angular/core/rxjs-interop';</code>
                        <p>Convert Signal → Observable</p>
                        <span class="use">Use with RxJS operators</span>
                    </div>
                    <div class="function-card">
                        <h3>takeUntilDestroyed()</h3>
                        <code>import {{ '{' }} takeUntilDestroyed {{ '}' }} from '&#64;angular/core/rxjs-interop';</code>
                        <p>Auto-unsubscribe on destroy</p>
                        <span class="use">Memory management</span>
                    </div>
                </div>
            </section>

            <section class="use-cases">
                <h2>📚 Use Cases</h2>
                <div class="use-case-grid">
                    @for (useCase of useCases; track useCase.id) {
                        <a [routerLink]="useCase.path" class="use-case-card">
                            <span class="number">{{ useCase.id }}</span>
                            <div class="content">
                                <h3>{{ useCase.icon }} {{ useCase.title }}</h3>
                                <p>{{ useCase.description }}</p>
                                <div class="tags">
                                    @for (tag of useCase.tags; track tag) {
                                        <span class="tag">{{ tag }}</span>
                                    }
                                </div>
                            </div>
                        </a>
                    }
                </div>
            </section>

            <section class="when-to-use">
                <h2>📊 When to Use What?</h2>
                <table>
                    <tr><th>Scenario</th><th>Use</th></tr>
                    <tr><td>HTTP response in template</td><td>toSignal(http.get(...))</td></tr>
                    <tr><td>Signal value needs RxJS operators</td><td>toObservable(signal)</td></tr>
                    <tr><td>Local component state</td><td>Signals directly</td></tr>
                    <tr><td>Complex async streams</td><td>RxJS + toSignal at end</td></tr>
                </table>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { font-size: 2.5rem; color: var(--primary-color, #667eea); }

        .intro-card {
            background: linear-gradient(135deg, #667eea20, #764ba220);
            padding: 2rem; border-radius: 12px; margin-bottom: 2rem;
        }
        .bridge-visual { display: flex; align-items: center; justify-content: center; gap: 2rem; margin-top: 1.5rem; flex-wrap: wrap; }
        .box { padding: 1rem 1.5rem; border-radius: 8px; font-weight: bold; }
        .box.rxjs { background: #ef4444; color: white; }
        .box.signal { background: #10b981; color: white; }
        .arrows { display: flex; flex-direction: column; gap: 0.25rem; font-size: 0.85rem; color: var(--primary-color); font-weight: bold; }

        .function-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        .function-card { background: var(--bg-secondary, #f8f9fa); padding: 1.25rem; border-radius: 10px; }
        .function-card h3 { margin: 0 0 0.5rem; color: var(--primary-color); }
        .function-card code { display: block; background: #1e1e2e; color: #a6e3a1; padding: 0.5rem; border-radius: 4px; font-size: 0.7rem; margin-bottom: 0.5rem; }
        .function-card p { margin: 0 0 0.5rem; font-size: 0.85rem; }
        .function-card .use { font-size: 0.75rem; color: var(--text-secondary); font-style: italic; }

        .use-case-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; }
        .use-case-card {
            display: flex; align-items: flex-start; gap: 1rem;
            background: var(--bg-secondary, #f8f9fa); padding: 1.25rem;
            border-radius: 10px; text-decoration: none; transition: all 0.2s;
            border: 1px solid transparent;
        }
        .use-case-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-color: var(--primary-color); }
        .use-case-card .number {
            background: linear-gradient(135deg, #667eea, #764ba2); color: white;
            width: 32px; height: 32px; border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            font-weight: bold; flex-shrink: 0;
        }
        .use-case-card h3 { margin: 0 0 0.25rem; color: var(--text-primary); font-size: 1rem; }
        .use-case-card p { margin: 0 0 0.5rem; color: var(--text-secondary); font-size: 0.85rem; }
        .tags { display: flex; gap: 0.25rem; flex-wrap: wrap; }
        .tag { background: #e0e7ff; color: #667eea; padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 0.7rem; }

        .when-to-use table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
        .when-to-use th, .when-to-use td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
        .when-to-use th { background: var(--bg-secondary); }
    `]
})
export class RxjsSignalOverviewComponent {
    useCases = [
        { id: 1, path: 'to-signal', icon: '📡', title: 'toSignal()', description: 'Convert Observable to Signal', tags: ['toSignal', 'initialValue', 'requireSync'] },
        { id: 2, path: 'to-observable', icon: '🔄', title: 'toObservable()', description: 'Convert Signal to Observable', tags: ['toObservable', 'RxJS operators'] },
        { id: 3, path: 'effect-signals', icon: '⚡', title: 'effect()', description: 'React to signal changes', tags: ['effect', 'side effects', 'logging'] },
        { id: 4, path: 'computed-async', icon: '🧮', title: 'Computed + Async', description: 'Combine computed signals with async', tags: ['computed', 'derive', 'combine'] },
        { id: 5, path: 'real-world-patterns', icon: '🌍', title: 'Real-world Patterns', description: 'HTTP, forms, state management', tags: ['HTTP', 'forms', 'state'] }
    ];
}
