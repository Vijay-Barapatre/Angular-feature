/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 3: ERROR RECOVERY
 * ============================================================================
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { of, throwError, timer, Observable } from 'rxjs';
import { catchError, retry, retryWhen, delay, take, tap, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-scenario-3-errors',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 3: Error Recovery Patterns</h2>
                <p>Handle and recover from Observable errors gracefully.</p>
            </div>

            <div class="content">
                <div class="patterns">
                    <div class="pattern-card">
                        <h4>catchError - Fallback Value</h4>
                        <p>Replace error with default value</p>
                        <button (click)="demoCatchError()">Run</button>
                        <div class="result" [class.error]="catchResult().includes('Error')">
                            {{ catchResult() }}
                        </div>
                    </div>

                    <div class="pattern-card">
                        <h4>retry(n) - Retry N Times</h4>
                        <p>Automatically retry failed requests</p>
                        <button (click)="demoRetry()" [disabled]="retryLoading()">
                            {{ retryLoading() ? 'Retrying...' : 'Run (fails first 2 times)' }}
                        </button>
                        <div class="attempts">
                            @for (attempt of retryAttempts(); track attempt.num) {
                                <span [class.success]="attempt.success" [class.error]="!attempt.success">
                                    {{ attempt.num }}
                                </span>
                            }
                        </div>
                        <div class="result">{{ retryResult() }}</div>
                    </div>

                    <div class="pattern-card">
                        <h4>Exponential Backoff</h4>
                        <p>Increase delay between retries</p>
                        <button (click)="demoBackoff()" [disabled]="backoffLoading()">
                            {{ backoffLoading() ? backoffStatus() : 'Run' }}
                        </button>
                        <div class="timeline">
                            @for (event of backoffEvents(); track event.time) {
                                <div class="event">{{ event.message }}</div>
                            }
                        </div>
                    </div>
                </div>

                <div class="code-example">
                    <h4>Error Recovery Pattern</h4>
                    <pre><code>this.http.get(url).pipe(
  retry(3),
  catchError(error => {{ '{' }}
    console.error('Request failed:', error);
    return of({{ '{' }} data: [], fallback: true {{ '}' }});
  {{ '}' }})
).subscribe(result => {{ '{' }}
  if (result.fallback) {{ '{' }}
    // Show cached data or error message
  {{ '}' }}
{{ '}' }});</code></pre>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 700px; }
        .instructions { background: #fef2f2; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; color: #1e1e2e; border-left: 4px solid #f59e0b; }
        .content { background: white; padding: 1.5rem; border-radius: 8px; }
        .patterns { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem; }
        .pattern-card { padding: 1rem; background: #f8fafc; border-radius: 8px; }
        .pattern-card h4 { margin: 0; color: #f59e0b; }
        .pattern-card p { margin: 0.25rem 0 0.75rem; font-size: 0.85rem; color: #6b7280; }
        .pattern-card button { padding: 0.5rem 1rem; background: #f59e0b; color: white; border: none; border-radius: 4px; cursor: pointer; margin-bottom: 0.5rem; }
        .pattern-card button:disabled { opacity: 0.7; }
        .result { padding: 0.5rem; background: #1e1e2e; color: #a6e3a1; border-radius: 4px; font-family: monospace; font-size: 0.85rem; }
        .result.error { color: #f87171; }
        .attempts { display: flex; gap: 0.5rem; margin-bottom: 0.5rem; }
        .attempts span { width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 50%; background: #e5e7eb; font-weight: bold; }
        .attempts span.success { background: #10b981; color: white; }
        .attempts span.error { background: #ef4444; color: white; }
        .timeline { padding: 0.5rem; background: #1e1e2e; border-radius: 4px; max-height: 100px; overflow-y: auto; }
        .event { color: #a6e3a1; font-family: monospace; font-size: 0.75rem; padding: 0.125rem 0; }
        .code-example { padding: 1rem; background: #1e1e2e; border-radius: 8px; }
        .code-example h4 { color: white; margin: 0 0 0.5rem; font-size: 0.9rem; }
        .code-example pre { margin: 0; overflow-x: auto; }
        .code-example code { color: #a6e3a1; font-size: 0.85rem; }
    `]
})
export class Scenario3ErrorsComponent {
    catchResult = signal('Click to run');
    retryResult = signal('');
    retryLoading = signal(false);
    retryAttempts = signal<{ num: number; success: boolean }[]>([]);

    backoffLoading = signal(false);
    backoffStatus = signal('');
    backoffEvents = signal<{ time: string; message: string }[]>([]);

    demoCatchError(): void {
        // Simulate an error
        const failingRequest$ = Math.random() > 0.5
            ? of('Success! Data loaded.')
            : throwError(() => new Error('Network error'));

        failingRequest$.pipe(
            catchError(error => {
                return of(`Error caught: ${error.message}. Using fallback.`);
            })
        ).subscribe(result => {
            this.catchResult.set(result);
        });
    }

    demoRetry(): void {
        this.retryLoading.set(true);
        this.retryAttempts.set([]);
        this.retryResult.set('');

        let attemptCount = 0;
        const maxFailures = 2;

        const unreliableRequest$ = new Observable<string>(subscriber => {
            attemptCount++;
            this.retryAttempts.update(a => [...a, { num: attemptCount, success: false }]);

            if (attemptCount <= maxFailures) {
                setTimeout(() => subscriber.error(new Error(`Attempt ${attemptCount} failed`)), 300);
            } else {
                setTimeout(() => {
                    this.retryAttempts.update(a =>
                        a.map((item, i) => i === a.length - 1 ? { ...item, success: true } : item)
                    );
                    subscriber.next('Success on attempt ' + attemptCount);
                    subscriber.complete();
                }, 300);
            }
        });

        unreliableRequest$.pipe(
            retry(3)
        ).subscribe({
            next: (result) => {
                this.retryResult.set(result);
                this.retryLoading.set(false);
            },
            error: (err) => {
                this.retryResult.set('All retries failed: ' + err.message);
                this.retryLoading.set(false);
            }
        });
    }

    demoBackoff(): void {
        this.backoffLoading.set(true);
        this.backoffEvents.set([]);

        let attempt = 0;
        const addEvent = (msg: string) => {
            const time = new Date().toLocaleTimeString();
            this.backoffEvents.update(e => [...e, { time, message: `[${time}] ${msg}` }]);
        };

        const request$ = new Observable<string>(subscriber => {
            attempt++;
            addEvent(`Attempt ${attempt}...`);
            this.backoffStatus.set(`Attempt ${attempt}/4`);

            if (attempt < 4) {
                subscriber.error(new Error('Failed'));
            } else {
                subscriber.next('Success!');
                subscriber.complete();
            }
        });

        request$.pipe(
            retryWhen(errors =>
                errors.pipe(
                    tap(err => addEvent(`Error: ${err.message}`)),
                    switchMap((_, i) => {
                        const delayTime = Math.pow(2, i) * 500;
                        addEvent(`Waiting ${delayTime}ms before retry...`);
                        return timer(delayTime);
                    }),
                    take(3)
                )
            )
        ).subscribe({
            next: (result) => {
                addEvent(result);
                this.backoffLoading.set(false);
            },
            error: () => {
                addEvent('All retries exhausted');
                this.backoffLoading.set(false);
            }
        });
    }
}
