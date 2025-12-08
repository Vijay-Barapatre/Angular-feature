/**
 * ============================================================================
 * USE CASE 4: ASYNC TESTING COMPONENT
 * ============================================================================
 * 
 * Demonstrates various async patterns that need special testing:
 * - Promises
 * - setTimeout/setInterval
 * - Observables with delay
 * - debounceTime
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, of, delay, timer, debounceTime, Subject } from 'rxjs';

@Component({
    selector: 'app-async-testing',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>⏱️ Async Testing</h1>
                <p class="subtitle">fakeAsync, tick & whenStable</p>
            </header>

            <section class="demo-section">
                <h2>Async Operations</h2>
                
                <div class="demo-grid">
                    <div class="demo-card">
                        <h3>Promise</h3>
                        <p data-testid="promise-result">{{ promiseResult() }}</p>
                        <button (click)="fetchWithPromise()" data-testid="promise-btn">
                            Fetch (Promise)
                        </button>
                    </div>

                    <div class="demo-card">
                        <h3>setTimeout</h3>
                        <p data-testid="timeout-result">{{ timeoutResult() }}</p>
                        <button (click)="delayedAction()" data-testid="timeout-btn">
                            Delay 1s
                        </button>
                    </div>

                    <div class="demo-card">
                        <h3>Observable</h3>
                        <p data-testid="observable-result">{{ observableResult() }}</p>
                        <button (click)="fetchWithObservable()" data-testid="observable-btn">
                            Fetch (Observable)
                        </button>
                    </div>

                    <div class="demo-card">
                        <h3>Debounce Search</h3>
                        <input 
                            type="text" 
                            [value]="searchInput()"
                            (input)="onSearchInput($event)"
                            placeholder="Type to search..."
                            data-testid="search-input"
                        />
                        <p data-testid="search-result">{{ searchResult() }}</p>
                    </div>
                </div>
            </section>

            <section class="code-section">
                <h2>📝 Async Testing Patterns</h2>
                
                <div class="concept-grid">
                    <div class="concept-card">
                        <h3>⏩ fakeAsync + tick</h3>
                        <pre><code>it('should handle timeout', fakeAsync(() => {{ '{' }}
  component.delayedAction();
  tick(1000);  // Fast-forward 1 second
  expect(component.result()).toBe('Done');
{{ '}' }}));</code></pre>
                    </div>

                    <div class="concept-card">
                        <h3>🔄 flush()</h3>
                        <pre><code>it('should flush all timers', fakeAsync(() => {{ '{' }}
  component.startMultipleTimers();
  flush();  // Complete ALL pending timers
  expect(component.allDone()).toBeTrue();
{{ '}' }}));</code></pre>
                    </div>

                    <div class="concept-card">
                        <h3>⏳ async + whenStable</h3>
                        <pre><code>it('should wait for async', async () => {{ '{' }}
  component.fetchData();
  await fixture.whenStable();
  expect(component.data()).toBeTruthy();
{{ '}' }});</code></pre>
                    </div>

                    <div class="concept-card">
                        <h3>✅ done() callback</h3>
                        <pre><code>it('should emit value', (done) => {{ '{' }}
  service.getData().subscribe(val => {{ '{' }}
    expect(val).toBe('data');
    done();  // Signal test completion
  {{ '}' }});
{{ '}' }});</code></pre>
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
            margin-bottom: 2rem;
        }

        .demo-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
        }

        .demo-card {
            background: white;
            padding: 1.5rem;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .demo-card h3 { margin-top: 0; color: var(--primary-color, #667eea); }
        .demo-card p { 
            min-height: 24px; 
            color: var(--text-secondary, #666);
            margin-bottom: 1rem;
        }
        .demo-card button {
            padding: 0.5rem 1rem;
            background: var(--primary-color, #667eea);
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
        }
        .demo-card input {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #ddd;
            border-radius: 6px;
            margin-bottom: 0.5rem;
        }

        .concept-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1rem;
        }
        .concept-card {
            background: var(--bg-secondary, #f8f9fa);
            padding: 1.5rem;
            border-radius: 10px;
            border-left: 4px solid #8b5cf6;
        }
        .concept-card h3 { margin-top: 0; }
        .concept-card pre {
            background: #1e1e2e;
            color: #a6e3a1;
            padding: 1rem;
            border-radius: 6px;
            overflow-x: auto;
            font-size: 0.75rem;
        }
    `]
})
export class AsyncTestingComponent {
    // Signals for reactive state
    promiseResult = signal('--');
    timeoutResult = signal('--');
    observableResult = signal('--');
    searchInput = signal('');
    searchResult = signal('--');

    // Subject for debounced search
    private searchSubject = new Subject<string>();

    constructor() {
        // Set up debounced search
        this.searchSubject.pipe(
            debounceTime(300)
        ).subscribe(term => {
            this.searchResult.set(term ? `Searching for: ${term}` : '--');
        });
    }

    /**
     * Simulates async fetch with Promise
     */
    fetchWithPromise(): void {
        this.promiseResult.set('Loading...');

        new Promise<string>(resolve => {
            setTimeout(() => resolve('Promise resolved!'), 500);
        }).then(result => {
            this.promiseResult.set(result);
        });
    }

    /**
     * Simulates delayed action with setTimeout
     */
    delayedAction(): void {
        this.timeoutResult.set('Waiting...');

        setTimeout(() => {
            this.timeoutResult.set('Timeout complete!');
        }, 1000);
    }

    /**
     * Simulates async fetch with Observable
     */
    fetchWithObservable(): void {
        this.observableResult.set('Loading...');

        this.getDataAsync().subscribe(data => {
            this.observableResult.set(data);
        });
    }

    /**
     * Helper method that returns delayed Observable
     */
    getDataAsync(): Observable<string> {
        return of('Observable emitted!').pipe(delay(800));
    }

    /**
     * Handles search input with debounce
     */
    onSearchInput(event: Event): void {
        const value = (event.target as HTMLInputElement).value;
        this.searchInput.set(value);
        this.searchSubject.next(value);
    }
}
