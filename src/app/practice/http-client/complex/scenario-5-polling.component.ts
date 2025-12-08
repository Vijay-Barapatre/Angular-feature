/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 5: POLLING & REAL-TIME DATA
 * ============================================================================
 */

import { Component, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';

@Component({
    selector: 'app-scenario-5-polling',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 5: Polling & Real-Time Updates</h2>
                <p>Fetch data periodically using RxJS interval.</p>
            </div>

            <div class="content">
                <div class="controls">
                    <button (click)="startPolling()" [disabled]="isPolling()">
                        ▶️ Start Polling
                    </button>
                    <button (click)="stopPolling()" [disabled]="!isPolling()" class="stop">
                        ⏹️ Stop Polling
                    </button>
                    <select [(value)]="pollInterval" (change)="restartPolling()">
                        <option value="1000">1 second</option>
                        <option value="2000">2 seconds</option>
                        <option value="5000">5 seconds</option>
                    </select>
                </div>

                <div class="status-bar">
                    <span class="status-indicator" [class.active]="isPolling()"></span>
                    <span>{{ isPolling() ? 'Polling active' : 'Polling stopped' }}</span>
                    <span class="poll-count">Polls: {{ pollCount() }}</span>
                </div>

                <div class="data-display">
                    <h4>📊 Live Data</h4>
                    <div class="data-grid">
                        @for (item of liveData(); track item.id) {
                            <div class="data-item" [class.updated]="item.justUpdated">
                                <span class="item-id">#{{ item.id }}</span>
                                <span class="item-value">{{ item.value }}</span>
                                <span class="item-time">{{ item.timestamp }}</span>
                            </div>
                        }
                    </div>
                </div>

                <div class="code-example">
                    <h4>Polling Pattern</h4>
                    <pre><code>// Poll every 5 seconds
interval(5000).pipe(
  switchMap(() => this.http.get(url)),
  takeUntilDestroyed()
).subscribe(data => {{ '{' }}
  // Handle fresh data
{{ '}' }});</code></pre>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 700px; }
        .instructions { background: #fef2f2; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; color: #1e1e2e; border-left: 4px solid #06b6d4; }
        .content { background: white; padding: 1.5rem; border-radius: 8px; }
        .controls { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
        .controls button, .controls select { padding: 0.5rem 1rem; border: none; border-radius: 4px; background: #06b6d4; color: white; cursor: pointer; }
        .controls button.stop { background: #ef4444; }
        .controls button:disabled { opacity: 0.5; }
        .controls select { background: white; color: #1e293b; border: 1px solid #e5e7eb; }
        .status-bar { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; background: #f8fafc; border-radius: 8px; margin-bottom: 1rem; }
        .status-indicator { width: 12px; height: 12px; border-radius: 50%; background: #ef4444; }
        .status-indicator.active { background: #10b981; animation: pulse 1s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .poll-count { margin-left: auto; font-weight: bold; color: #06b6d4; }
        .data-display { padding: 1rem; background: #1e1e2e; border-radius: 8px; margin-bottom: 1.5rem; }
        .data-display h4 { color: white; margin: 0 0 0.75rem; }
        .data-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; }
        .data-item { display: flex; gap: 1rem; padding: 0.5rem; background: #334155; border-radius: 4px; color: white; font-size: 0.85rem; transition: background 0.3s; }
        .data-item.updated { background: #06b6d4; }
        .item-id { color: #94a3b8; }
        .item-value { flex: 1; font-weight: bold; color: #a6e3a1; }
        .item-time { color: #94a3b8; font-size: 0.75rem; }
        .code-example { padding: 1rem; background: #1e1e2e; border-radius: 8px; }
        .code-example h4 { color: white; margin: 0 0 0.5rem; font-size: 0.9rem; }
        .code-example pre { margin: 0; }
        .code-example code { color: #a6e3a1; font-size: 0.85rem; }
    `]
})
export class Scenario5PollingComponent implements OnDestroy {
    private subscription: Subscription | null = null;

    pollInterval = '2000';
    isPolling = signal(false);
    pollCount = signal(0);
    liveData = signal<{ id: number; value: number; timestamp: string; justUpdated: boolean }[]>([
        { id: 1, value: 0, timestamp: '', justUpdated: false },
        { id: 2, value: 0, timestamp: '', justUpdated: false },
        { id: 3, value: 0, timestamp: '', justUpdated: false },
        { id: 4, value: 0, timestamp: '', justUpdated: false }
    ]);

    startPolling(): void {
        this.isPolling.set(true);
        this.subscription = interval(parseInt(this.pollInterval)).subscribe(() => {
            this.fetchData();
        });
    }

    stopPolling(): void {
        this.isPolling.set(false);
        this.subscription?.unsubscribe();
        this.subscription = null;
    }

    restartPolling(): void {
        if (this.isPolling()) {
            this.stopPolling();
            this.startPolling();
        }
    }

    private fetchData(): void {
        this.pollCount.update(n => n + 1);
        const timestamp = new Date().toLocaleTimeString();

        this.liveData.update(data =>
            data.map(item => ({
                ...item,
                value: Math.floor(Math.random() * 100),
                timestamp,
                justUpdated: true
            }))
        );

        // Reset highlight after animation
        setTimeout(() => {
            this.liveData.update(data =>
                data.map(item => ({ ...item, justUpdated: false }))
            );
        }, 300);
    }

    ngOnDestroy(): void {
        this.stopPolling();
    }
}
