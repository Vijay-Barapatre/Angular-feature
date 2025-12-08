/**
 * ============================================================================
 * 🟦 BASIC EXERCISE 4: SUBSCRIPTIONS & CLEANUP
 * ============================================================================
 */

import { Component, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription, Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';

@Component({
    selector: 'app-exercise-4-subscriptions',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 4: Subscriptions & Cleanup</h2>
                <p>Prevent memory leaks by properly managing subscriptions.</p>
                
                <h4>Cleanup Strategies:</h4>
                <ul>
                    <li>Manual unsubscribe()</li>
                    <li>takeUntil() with destroy subject</li>
                    <li>Using take() or first()</li>
                    <li>AsyncPipe (auto-manages)</li>
                </ul>
            </div>

            <div class="demo">
                <h3>📊 Active Subscriptions Demo</h3>
                
                <div class="counters">
                    <div class="counter-box">
                        <h4>Manual Unsubscribe</h4>
                        <div class="count">{{ manualCount() }}</div>
                        <div class="actions">
                            <button (click)="startManual()" [disabled]="manualActive()">Start</button>
                            <button (click)="stopManual()" [disabled]="!manualActive()" class="stop">Stop</button>
                        </div>
                    </div>

                    <div class="counter-box">
                        <h4>takeUntil Pattern</h4>
                        <div class="count">{{ takeUntilCount() }}</div>
                        <div class="actions">
                            <button (click)="startTakeUntil()" [disabled]="takeUntilActive()">Start</button>
                            <button (click)="stopTakeUntil()" [disabled]="!takeUntilActive()" class="stop">Stop</button>
                        </div>
                    </div>

                    <div class="counter-box">
                        <h4>take(10) - Auto Stop</h4>
                        <div class="count">{{ takeCount() }}</div>
                        <div class="actions">
                            <button (click)="startTake()" [disabled]="takeActive()">Start (stops at 10)</button>
                        </div>
                    </div>
                </div>

                <div class="stats">
                    <h4>🔢 Subscription Stats</h4>
                    <p>Active subscriptions: {{ activeCount() }}</p>
                    <p>Total created: {{ totalCreated() }}</p>
                    <p>Total cleaned up: {{ totalCleaned() }}</p>
                </div>

                <div class="code-example">
                    <h4>Recommended Pattern</h4>
                    <pre><code>private destroy$ = new Subject&lt;void&gt;();

ngOnInit() {{ '{' }}
  someObservable$.pipe(
    takeUntil(this.destroy$)
  ).subscribe(data =&gt; {{ '{' }}
    // handle data
  {{ '}' }});
{{ '}' }}

ngOnDestroy() {{ '{' }}
  this.destroy$.next();
  this.destroy$.complete();
{{ '}' }}</code></pre>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 700px; }
        .instructions { background: #fffbeb; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; color: #1e1e2e; }
        .demo { background: white; padding: 1.5rem; border-radius: 8px; }
        .counters { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.5rem; }
        .counter-box { padding: 1rem; background: #f8fafc; border-radius: 8px; text-align: center; }
        .counter-box h4 { margin: 0 0 0.5rem; font-size: 0.85rem; color: #6b7280; }
        .count { font-size: 3rem; font-weight: bold; color: #f59e0b; margin: 0.5rem 0; }
        .actions { display: flex; gap: 0.5rem; }
        .actions button { flex: 1; padding: 0.5rem; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.8rem; }
        .actions button.stop { background: #ef4444; }
        .actions button:disabled { opacity: 0.5; }
        .stats { padding: 1rem; background: #1e1e2e; border-radius: 8px; color: white; margin-bottom: 1.5rem; }
        .stats h4 { margin: 0 0 0.5rem; }
        .stats p { margin: 0.25rem 0; font-size: 0.9rem; }
        .code-example { padding: 1rem; background: #1e1e2e; border-radius: 8px; }
        .code-example h4 { color: white; margin: 0 0 0.5rem; font-size: 0.9rem; }
        .code-example pre { margin: 0; }
        .code-example code { color: #a6e3a1; font-size: 0.85rem; }
    `]
})
export class Exercise4SubscriptionsComponent implements OnDestroy {
    private destroy$ = new Subject<void>();
    private manualSub: Subscription | null = null;
    private takeUntilStop$ = new Subject<void>();

    manualCount = signal(0);
    manualActive = signal(false);

    takeUntilCount = signal(0);
    takeUntilActive = signal(false);

    takeCount = signal(0);
    takeActive = signal(false);

    activeCount = signal(0);
    totalCreated = signal(0);
    totalCleaned = signal(0);

    startManual(): void {
        this.manualActive.set(true);
        this.manualCount.set(0);
        this.totalCreated.update(n => n + 1);
        this.activeCount.update(n => n + 1);

        this.manualSub = interval(500).subscribe(() => {
            this.manualCount.update(n => n + 1);
        });
    }

    stopManual(): void {
        this.manualSub?.unsubscribe();
        this.manualSub = null;
        this.manualActive.set(false);
        this.activeCount.update(n => n - 1);
        this.totalCleaned.update(n => n + 1);
    }

    startTakeUntil(): void {
        this.takeUntilActive.set(true);
        this.takeUntilCount.set(0);
        this.takeUntilStop$ = new Subject<void>();
        this.totalCreated.update(n => n + 1);
        this.activeCount.update(n => n + 1);

        interval(500).pipe(
            takeUntil(this.takeUntilStop$)
        ).subscribe({
            next: () => this.takeUntilCount.update(n => n + 1),
            complete: () => {
                this.takeUntilActive.set(false);
                this.activeCount.update(n => n - 1);
                this.totalCleaned.update(n => n + 1);
            }
        });
    }

    stopTakeUntil(): void {
        this.takeUntilStop$.next();
        this.takeUntilStop$.complete();
    }

    startTake(): void {
        this.takeActive.set(true);
        this.takeCount.set(0);
        this.totalCreated.update(n => n + 1);
        this.activeCount.update(n => n + 1);

        interval(300).pipe(
            take(10)
        ).subscribe({
            next: (n) => this.takeCount.set(n + 1),
            complete: () => {
                this.takeActive.set(false);
                this.activeCount.update(n => n - 1);
                this.totalCleaned.update(n => n + 1);
            }
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
        this.stopManual();
        this.takeUntilStop$.next();
        this.takeUntilStop$.complete();
    }
}
