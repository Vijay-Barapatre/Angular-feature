/**
 * ============================================================================
 * BASIC EXERCISE 6: PARALLEL REQUESTS (forkJoin)
 * ============================================================================
 * 
 * 🎯 OBJECTIVE:
 * Learn to make multiple API calls in parallel and wait for all to complete.
 * 
 * 📋 TASK:
 * 1. Make 3 API calls simultaneously (users, products, stats)
 * 2. Wait for ALL to complete using forkJoin
 * 3. Display combined results in a dashboard
 * 
 * 💡 HINTS:
 * - Use forkJoin to run requests in parallel
 * - All requests must succeed for forkJoin to emit
 * - Results come back in same order as input
 */

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin, catchError, delay, map } from 'rxjs';

interface DashboardData {
    users: { id: number; name: string }[];
    products: { id: number; name: string; price: number }[];
    stats: { totalSales: number; activeUsers: number; pendingOrders: number };
}

@Component({
    selector: 'app-exercise-6-parallel',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise-container">
            <div class="exercise-header">
                <h2>📝 Exercise 6: Parallel API Calls</h2>
                <span class="difficulty basic">Basic</span>
            </div>

            <div class="instructions">
                <h3>📋 Instructions</h3>
                <p>Load a dashboard by making 3 API calls in <strong>parallel</strong>:</p>
                <ol>
                    <li>Users API (800ms)</li>
                    <li>Products API (600ms)</li>
                    <li>Stats API (1000ms)</li>
                </ol>
                <p class="hint">
                    💡 <strong>Sequential:</strong> 800 + 600 + 1000 = 2400ms<br>
                    💡 <strong>Parallel:</strong> max(800, 600, 1000) = ~1000ms
                </p>
            </div>

            <div class="workspace">
                <div class="controls">
                    <button (click)="loadDashboardParallel()" [disabled]="loading" class="btn primary">
                        {{ loading ? '⏳ Loading...' : '🚀 Load Dashboard (Parallel)' }}
                    </button>
                    <button (click)="loadDashboardSequential()" [disabled]="loadingSeq" class="btn secondary">
                        {{ loadingSeq ? '⏳ Loading...' : '🐌 Load Dashboard (Sequential)' }}
                    </button>
                </div>

                <div class="timing-comparison">
                    @if (parallelTime > 0) {
                        <div class="timing parallel">
                            🚀 Parallel: <strong>{{ parallelTime }}ms</strong>
                        </div>
                    }
                    @if (sequentialTime > 0) {
                        <div class="timing sequential">
                            🐌 Sequential: <strong>{{ sequentialTime }}ms</strong>
                        </div>
                    }
                </div>

                <div class="progress-section">
                    <h4>📊 Loading Progress</h4>
                    <div class="progress-grid">
                        <div class="progress-item" [class.loading]="loadingUsers" [class.complete]="dashboard?.users">
                            <span class="icon">{{ loadingUsers ? '⏳' : (dashboard?.users ? '✅' : '⏸️') }}</span>
                            <span>Users API</span>
                            <span class="time">~800ms</span>
                        </div>
                        <div class="progress-item" [class.loading]="loadingProducts" [class.complete]="dashboard?.products">
                            <span class="icon">{{ loadingProducts ? '⏳' : (dashboard?.products ? '✅' : '⏸️') }}</span>
                            <span>Products API</span>
                            <span class="time">~600ms</span>
                        </div>
                        <div class="progress-item" [class.loading]="loadingStats" [class.complete]="dashboard?.stats">
                            <span class="icon">{{ loadingStats ? '⏳' : (dashboard?.stats ? '✅' : '⏸️') }}</span>
                            <span>Stats API</span>
                            <span class="time">~1000ms</span>
                        </div>
                    </div>
                </div>

                @if (dashboard) {
                    <div class="dashboard-grid">
                        <div class="dashboard-card users">
                            <h5>👥 Users ({{ dashboard.users.length }})</h5>
                            @for (user of dashboard.users; track user.id) {
                                <div class="item">{{ user.name }}</div>
                            }
                        </div>
                        <div class="dashboard-card products">
                            <h5>📦 Products ({{ dashboard.products.length }})</h5>
                            @for (product of dashboard.products; track product.id) {
                                <div class="item">{{ product.name }} - \${{ product.price }}</div>
                            }
                        </div>
                        <div class="dashboard-card stats">
                            <h5>📈 Statistics</h5>
                            <div class="stat-item">
                                <span>Total Sales</span>
                                <strong>\${{ dashboard.stats.totalSales }}</strong>
                            </div>
                            <div class="stat-item">
                                <span>Active Users</span>
                                <strong>{{ dashboard.stats.activeUsers }}</strong>
                            </div>
                            <div class="stat-item">
                                <span>Pending Orders</span>
                                <strong>{{ dashboard.stats.pendingOrders }}</strong>
                            </div>
                        </div>
                    </div>
                }
            </div>

            <div class="code-section">
                <h4>💻 Implementation Pattern</h4>
                <pre><code>// forkJoin - waits for ALL Observables to complete
forkJoin({{ '{' }}
    users: this.http.get&lt;User[]&gt;('/api/users'),
    products: this.http.get&lt;Product[]&gt;('/api/products'),
    stats: this.http.get&lt;Stats&gt;('/api/stats')
{{ '}' }}).subscribe(result => {{ '{' }}
    // result = {{ '{' }} users: [...], products: [...], stats: {{ '{' }}...{{ '}' }} {{ '}' }}
    this.dashboard = result;
{{ '}' }});

// ⚠️ IMPORTANT: If ANY request fails, forkJoin fails!
// Use catchError on individual requests if partial data is OK</code></pre>
            </div>

            <div class="solution-section">
                <button (click)="showSolution = !showSolution" class="btn secondary">
                    {{ showSolution ? '🙈 Hide Solution' : '👀 Show Solution' }}
                </button>
                @if (showSolution) {
                    <div class="solution">
                        <h4>✅ Solution</h4>
                        <pre><code>loadDashboardParallel(): void {{ '{' }}
    this.loading = true;
    const startTime = Date.now();

    // All three requests start IMMEDIATELY
    forkJoin({{ '{' }}
        users: this.fetchUsers(),
        products: this.fetchProducts(),
        stats: this.fetchStats()
    {{ '}' }}).subscribe({{ '{' }}
        next: result => {{ '{' }}
            this.dashboard = result;
            this.parallelTime = Date.now() - startTime;
        {{ '}' }},
        complete: () => this.loading = false
    {{ '}' }});
{{ '}' }}

// Key insight: forkJoin waits for ALL to complete,
// but they run in PARALLEL so total time = slowest request</code></pre>
                    </div>
                }
            </div>
        </div>
    `,
    styles: [`
        .exercise-container { padding: 1.5rem; max-width: 1000px; margin: 0 auto; }
        .exercise-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
        .exercise-header h2 { margin: 0; color: var(--text-primary, #f1f5f9); }
        .difficulty { padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; }
        .difficulty.basic { background: #10b981; color: white; }

        .instructions { background: var(--bg-secondary, #1e293b); padding: 1rem; border-radius: 8px; margin-bottom: 1rem; }
        .instructions h3 { margin: 0 0 0.5rem 0; color: var(--text-primary, #f1f5f9); }
        .instructions p, .instructions li { color: var(--text-secondary, #cbd5e1); }
        .hint { background: rgba(102, 126, 234, 0.1); padding: 0.75rem; border-radius: 6px; margin-top: 0.5rem; }

        .workspace { background: var(--bg-secondary, #1e293b); padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem; }

        .controls { display: flex; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap; }
        .btn { padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer; font-size: 0.9rem; }
        .btn.primary { background: linear-gradient(135deg, #667eea, #764ba2); color: white; }
        .btn.secondary { background: var(--bg-card, #334155); color: var(--text-primary, #f1f5f9); border: 1px solid #667eea; }
        .btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .timing-comparison { display: flex; gap: 1rem; margin-bottom: 1rem; }
        .timing { padding: 0.5rem 1rem; border-radius: 6px; }
        .timing.parallel { background: rgba(16, 185, 129, 0.2); color: #10b981; }
        .timing.sequential { background: rgba(239, 68, 68, 0.2); color: #ef4444; }

        .progress-section { margin-bottom: 1.5rem; }
        .progress-section h4 { margin: 0 0 1rem 0; color: var(--text-primary, #f1f5f9); }
        .progress-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        .progress-item { background: var(--bg-card, #334155); padding: 1rem; border-radius: 8px; text-align: center; color: var(--text-secondary, #cbd5e1); }
        .progress-item.loading { border: 2px solid #667eea; animation: pulse 1s infinite; }
        .progress-item.complete { border: 2px solid #10b981; }
        .progress-item .icon { display: block; font-size: 1.5rem; margin-bottom: 0.5rem; }
        .progress-item .time { display: block; font-size: 0.75rem; color: var(--text-muted, #94a3b8); margin-top: 0.5rem; }
        @keyframes pulse { 50% { opacity: 0.6; } }

        .dashboard-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        .dashboard-card { background: var(--bg-card, #334155); padding: 1rem; border-radius: 8px; }
        .dashboard-card h5 { margin: 0 0 1rem 0; color: #667eea; }
        .dashboard-card .item { padding: 0.25rem 0; color: var(--text-secondary, #cbd5e1); font-size: 0.85rem; }
        .stat-item { display: flex; justify-content: space-between; padding: 0.5rem 0; color: var(--text-secondary, #cbd5e1); }
        .stat-item strong { color: #10b981; }

        .code-section, .solution-section { background: var(--bg-secondary, #1e293b); padding: 1rem; border-radius: 8px; margin-bottom: 1rem; }
        .code-section h4, .solution-section h4 { margin: 0 0 1rem 0; color: var(--text-primary, #f1f5f9); }
        pre { background: #0f172a; color: #4ade80; padding: 1rem; border-radius: 6px; overflow-x: auto; font-size: 0.8rem; margin: 0; }
        .solution { margin-top: 1rem; }
    `]
})
export class Exercise6ParallelComponent {
    loading = false;
    loadingSeq = false;
    loadingUsers = false;
    loadingProducts = false;
    loadingStats = false;

    dashboard: DashboardData | null = null;
    parallelTime = 0;
    sequentialTime = 0;
    showSolution = false;

    /**
     * 🚀 PARALLEL LOADING with forkJoin
     * 
     * forkJoin runs all Observables simultaneously and waits
     * for ALL to complete before emitting a single result.
     * 
     * Total time = max(time of each request), not sum
     * 
     * Best for:
     * - Dashboard loading
     * - Initial app data
     * - Any scenario where you need ALL data before proceeding
     */
    loadDashboardParallel(): void {
        this.loading = true;
        this.loadingUsers = true;
        this.loadingProducts = true;
        this.loadingStats = true;
        this.dashboard = null;
        const startTime = Date.now();

        // forkJoin takes an object (or array) of Observables
        // Returns when ALL complete, with results in same shape
        forkJoin({
            users: this.fetchUsers(),
            products: this.fetchProducts(),
            stats: this.fetchStats()
        }).subscribe({
            next: result => {
                this.dashboard = result;
                this.parallelTime = Date.now() - startTime;
            },
            error: err => {
                console.error('Dashboard load failed:', err);
                // If ANY request fails, entire forkJoin fails
            },
            complete: () => {
                this.loading = false;
                this.loadingUsers = false;
                this.loadingProducts = false;
                this.loadingStats = false;
            }
        });
    }

    /**
     * 🐌 SEQUENTIAL LOADING (for comparison)
     * 
     * Making calls one after another - much slower!
     * Each request waits for the previous to complete.
     */
    async loadDashboardSequential(): Promise<void> {
        this.loadingSeq = true;
        this.dashboard = null;
        const startTime = Date.now();

        this.loadingUsers = true;
        const users = await this.fetchUsers().toPromise();
        this.loadingUsers = false;

        this.loadingProducts = true;
        const products = await this.fetchProducts().toPromise();
        this.loadingProducts = false;

        this.loadingStats = true;
        const stats = await this.fetchStats().toPromise();
        this.loadingStats = false;

        this.dashboard = { users: users!, products: products!, stats: stats! };
        this.sequentialTime = Date.now() - startTime;
        this.loadingSeq = false;
    }

    // Simulated API calls with deliberate delays
    private fetchUsers(): Observable<{ id: number; name: string }[]> {
        return of([
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Jane Smith' },
            { id: 3, name: 'Bob Wilson' }
        ]).pipe(delay(800));
    }

    private fetchProducts(): Observable<{ id: number; name: string; price: number }[]> {
        return of([
            { id: 1, name: 'Laptop', price: 1299 },
            { id: 2, name: 'Monitor', price: 399 },
            { id: 3, name: 'Keyboard', price: 149 }
        ]).pipe(delay(600));
    }

    private fetchStats(): Observable<{ totalSales: number; activeUsers: number; pendingOrders: number }> {
        return of({
            totalSales: 45678,
            activeUsers: 1234,
            pendingOrders: 56
        }).pipe(delay(1000));
    }
}
