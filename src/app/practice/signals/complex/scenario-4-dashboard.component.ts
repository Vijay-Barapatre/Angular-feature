/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 4: REAL-TIME DASHBOARD
 * ============================================================================
 */

import { Component, signal, computed, effect, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Metric {
    name: string;
    value: number;
    unit: string;
    trend: 'up' | 'down' | 'stable';
}

@Component({
    selector: 'app-scenario-4-dashboard',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 4: Real-Time Dashboard</h2>
                <p>Live data updates with signals - auto-refresh every second.</p>
            </div>

            <div class="dashboard">
                <div class="controls">
                    <button (click)="toggleLive()">
                        {{ isLive() ? '⏸️ Pause' : '▶️ Resume' }}
                    </button>
                    <span class="status">{{ isLive() ? '🟢 Live' : '🔴 Paused' }}</span>
                </div>

                <div class="metrics-grid">
                    @for (metric of metrics(); track metric.name) {
                        <div class="metric-card">
                            <span class="metric-name">{{ metric.name }}</span>
                            <span class="metric-value">
                                {{ metric.value }}{{ metric.unit }}
                                <span class="trend" [class]="metric.trend">
                                    {{ getTrendIcon(metric.trend) }}
                                </span>
                            </span>
                        </div>
                    }
                </div>

                <div class="summary">
                    <div class="summary-item">
                        <span>Average CPU:</span>
                        <span>{{ avgCpu().toFixed(1) }}%</span>
                    </div>
                    <div class="summary-item">
                        <span>Total Memory Used:</span>
                        <span>{{ totalMemory().toFixed(1) }}GB</span>
                    </div>
                    <div class="summary-item">
                        <span>Health Status:</span>
                        <span [class]="healthStatus()">{{ healthStatus() | titlecase }}</span>
                    </div>
                </div>

                <div class="history">
                    <h4>📊 Recent Updates</h4>
                    <div class="history-items">
                        @for (entry of history(); track $index) {
                            <div class="history-item">{{ entry }}</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #8b5cf6; }
        .dashboard { background: white; padding: 1.5rem; border-radius: 12px; }
        .controls { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
        .controls button { padding: 0.5rem 1rem; border: none; border-radius: 6px; background: #8b5cf6; color: white; cursor: pointer; }
        .status { font-weight: 500; }
        .metrics-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.5rem; }
        .metric-card { padding: 1.5rem; background: #f8fafc; border-radius: 8px; text-align: center; }
        .metric-name { display: block; font-size: 0.9rem; color: #6b7280; margin-bottom: 0.5rem; }
        .metric-value { font-size: 1.75rem; font-weight: bold; }
        .trend { font-size: 1rem; margin-left: 0.25rem; }
        .trend.up { color: #10b981; }
        .trend.down { color: #ef4444; }
        .trend.stable { color: #6b7280; }
        .summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; padding: 1rem; background: #1e1e2e; border-radius: 8px; margin-bottom: 1.5rem; }
        .summary-item { text-align: center; color: white; }
        .summary-item span:first-child { display: block; font-size: 0.8rem; color: #9ca3af; }
        .summary-item span:last-child { font-size: 1.25rem; font-weight: bold; }
        .summary-item .good { color: #10b981; }
        .summary-item .warning { color: #f59e0b; }
        .summary-item .critical { color: #ef4444; }
        .history { padding: 1rem; background: #f8fafc; border-radius: 8px; }
        .history h4 { margin: 0 0 0.75rem; }
        .history-items { max-height: 100px; overflow-y: auto; }
        .history-item { padding: 0.25rem 0; font-size: 0.85rem; color: #6b7280; font-family: monospace; }
    `]
})
export class Scenario4DashboardComponent implements OnDestroy {
    private intervalId: any;

    isLive = signal(true);

    metrics = signal<Metric[]>([
        { name: 'CPU Usage', value: 45, unit: '%', trend: 'stable' },
        { name: 'Memory', value: 8.2, unit: 'GB', trend: 'up' },
        { name: 'Requests/s', value: 1250, unit: '', trend: 'up' },
        { name: 'Latency', value: 24, unit: 'ms', trend: 'down' },
        { name: 'Errors', value: 3, unit: '', trend: 'stable' },
        { name: 'Uptime', value: 99.9, unit: '%', trend: 'stable' }
    ]);

    history = signal<string[]>([]);

    /**
     * TODO: Create computed for average CPU
     */
    avgCpu = computed(() => {
        const cpu = this.metrics().find(m => m.name === 'CPU Usage');
        return cpu?.value || 0;
    });

    /**
     * TODO: Create computed for total memory
     */
    totalMemory = computed(() => {
        const mem = this.metrics().find(m => m.name === 'Memory');
        return mem?.value || 0;
    });

    /**
     * TODO: Create computed for health status
     */
    healthStatus = computed(() => {
        const cpu = this.avgCpu();
        const errors = this.metrics().find(m => m.name === 'Errors')?.value || 0;

        if (cpu > 80 || errors > 10) return 'critical';
        if (cpu > 60 || errors > 5) return 'warning';
        return 'good';
    });

    constructor() {
        this.startUpdates();
    }

    startUpdates(): void {
        this.intervalId = setInterval(() => {
            if (this.isLive()) {
                this.updateMetrics();
            }
        }, 1000);
    }

    updateMetrics(): void {
        this.metrics.update(metrics =>
            metrics.map(m => {
                const delta = (Math.random() - 0.5) * 10;
                let newValue = m.value + delta;

                // Keep values reasonable
                if (m.name === 'CPU Usage') newValue = Math.max(0, Math.min(100, newValue));
                if (m.name === 'Uptime') newValue = Math.max(99, Math.min(100, newValue));
                if (m.name === 'Errors') newValue = Math.max(0, Math.round(newValue));

                return {
                    ...m,
                    value: Number(newValue.toFixed(1)),
                    trend: delta > 2 ? 'up' : delta < -2 ? 'down' : 'stable'
                };
            })
        );

        const timestamp = new Date().toLocaleTimeString();
        this.history.update(h => [`[${timestamp}] Metrics updated`, ...h].slice(0, 10));
    }

    toggleLive(): void {
        this.isLive.update(v => !v);
    }

    getTrendIcon(trend: string): string {
        switch (trend) {
            case 'up': return '↑';
            case 'down': return '↓';
            default: return '→';
        }
    }

    ngOnDestroy(): void {
        clearInterval(this.intervalId);
    }
}
