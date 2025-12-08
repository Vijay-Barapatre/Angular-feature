/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 1: TIMER WITH CLEANUP
 * ============================================================================
 */

import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, interval, takeUntil } from 'rxjs';

@Component({
    selector: 'app-scenario-1-timer',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 1: Timer with Cleanup</h2>
                <p>Proper subscription management to prevent memory leaks.</p>
            </div>

            <div class="content">
                <div class="timers">
                    <div class="timer-box">
                        <h4>Timer 1 (interval)</h4>
                        <div class="value">{{ timer1() }}</div>
                    </div>
                    <div class="timer-box">
                        <h4>Timer 2 (fast)</h4>
                        <div class="value">{{ timer2() }}</div>
                    </div>
                </div>

                <div class="controls">
                    <button (click)="reset()">Reset Timers</button>
                </div>

                <div class="code-preview">
                    <h4>Cleanup Pattern (takeUntil)</h4>
                    <pre><code>private destroy$ = new Subject&lt;void&gt;();

ngOnInit() {{ '{' }}
  interval(1000).pipe(
    takeUntil(this.destroy$)
  ).subscribe(n =&gt; this.timer.set(n));
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
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; color: #1e1e2e; }
        .instructions h2 { margin: 0 0 0.5rem; color: #ef4444; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; color: #1e1e2e; }
        .timers { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
        .timer-box { padding: 1.5rem; background: #f8fafc; border-radius: 8px; text-align: center; }
        .timer-box h4 { margin: 0 0 0.5rem; }
        .timer-box .value { font-size: 3rem; font-weight: bold; color: #06b6d4; }
        .controls { margin-bottom: 1rem; }
        .controls button { padding: 0.75rem 1.5rem; background: #06b6d4; color: white; border: none; border-radius: 6px; cursor: pointer; }
        .code-preview { padding: 1rem; background: #1e1e2e; border-radius: 8px; }
        .code-preview h4 { color: white; margin: 0 0 0.75rem; }
        .code-preview pre { margin: 0; }
        .code-preview code { color: #a6e3a1; font-size: 0.85rem; }
    `]
})
export class Scenario1TimerComponent implements OnInit, OnDestroy {
    timer1 = signal(0);
    timer2 = signal(0);

    private destroy$ = new Subject<void>();

    ngOnInit(): void {
        // Timer 1: Every second
        interval(1000).pipe(
            takeUntil(this.destroy$)
        ).subscribe(n => this.timer1.set(n + 1));

        // Timer 2: Every 100ms
        interval(100).pipe(
            takeUntil(this.destroy$)
        ).subscribe(n => this.timer2.set(n + 1));
    }

    reset(): void {
        this.timer1.set(0);
        this.timer2.set(0);
    }

    ngOnDestroy(): void {
        console.log('🧹 Cleaning up subscriptions...');
        this.destroy$.next();
        this.destroy$.complete();
    }
}
