/**
 * ============================================================================
 * USE CASE 1: BASIC GET WITH OBSERVABLE (ENHANCED)
 * ============================================================================
 * 
 * 💡 REAL-WORLD SCENARIOS:
 * 1. Loading states and error states
 * 2. Pull-to-refresh pattern
 * 3. Conditional fetching
 * 4. Type-safe responses
 * 5. Response transformation
 */

import { Component, OnInit, OnDestroy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription, Observable, BehaviorSubject, map, tap, finalize, catchError, of } from 'rxjs';
import { ApiService, User } from '../../services/api.service';

// State interface for better state management
interface LoadState {
    loading: boolean;
    error: string | null;
    data: User[] | null;
    lastFetched: Date | null;
}

@Component({
    selector: 'app-basic-get',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="container">
            <h1>📥 Use Case 1: Basic GET with Observable</h1>
            <p class="description">
                Real-world patterns for fetching and displaying data.
            </p>

            <div class="demo-grid">
                <!-- SCENARIO 1: Complete State Management -->
                <section class="demo-section">
                    <h3>🎯 Scenario 1: Complete State Management</h3>
                    <p>Loading, error, empty, and data states.</p>
                    
                    <button (click)="fetchWithStateManagement()" [disabled]="state.loading" class="fetch-btn">
                        {{ state.loading ? '⏳ Loading...' : '🔄 Fetch Users' }}
                    </button>
                    
                    <!-- Loading State -->
                    @if (state.loading) {
                        <div class="state-box loading">
                            <div class="spinner"></div>
                            <span>Fetching users...</span>
                        </div>
                    }
                    
                    <!-- Error State -->
                    @if (state.error) {
                        <div class="state-box error">
                            <span>❌ {{ state.error }}</span>
                            <button (click)="fetchWithStateManagement()">Retry</button>
                        </div>
                    }
                    
                    <!-- Empty State -->
                    @if (!state.loading && !state.error && state.data?.length === 0) {
                        <div class="state-box empty">
                            <span>📭 No users found</span>
                        </div>
                    }
                    
                    <!-- Data State -->
                    @if (state.data && state.data.length > 0) {
                        <div class="user-list">
                            @for (user of state.data; track user.id) {
                                <div class="user-card">
                                    <span class="avatar">{{ user.avatar }}</span>
                                    <div class="info">
                                        <strong>{{ user.name }}</strong>
                                        <span class="email">{{ user.email }}</span>
                                    </div>
                                    <span class="badge" [class.active]="user.isActive">
                                        {{ user.isActive ? 'Active' : 'Inactive' }}
                                    </span>
                                </div>
                            }
                        </div>
                        @if (state.lastFetched) {
                            <div class="meta">Last fetched: {{ state.lastFetched | date:'medium' }}</div>
                        }
                    }
                </section>

                <!-- SCENARIO 2: Transformed Data -->
                <section class="demo-section">
                    <h3>🔄 Scenario 2: Data Transformation</h3>
                    <p>Transform API response before display.</p>
                    
                    <button (click)="fetchTransformed()" class="fetch-btn">
                        Fetch &#38; Transform
                    </button>
                    
                    @if (transformedUsers$ | async; as transformed) {
                        <div class="stats-grid">
                            <div class="stat-card">
                                <span class="stat-value">{{ transformed.total }}</span>
                                <span class="stat-label">Total Users</span>
                            </div>
                            <div class="stat-card active">
                                <span class="stat-value">{{ transformed.activeCount }}</span>
                                <span class="stat-label">Active</span>
                            </div>
                            <div class="stat-card inactive">
                                <span class="stat-value">{{ transformed.inactiveCount }}</span>
                                <span class="stat-label">Inactive</span>
                            </div>
                        </div>
                        <div class="user-names">
                            Names: {{ transformed.names.join(', ') }}
                        </div>
                    }
                </section>

                <!-- SCENARIO 3: Polling / Auto-refresh -->
                <section class="demo-section">
                    <h3>⏱️ Scenario 3: Auto-Refresh (Polling)</h3>
                    <p>Automatically refresh data every 10 seconds.</p>
                    
                    <div class="polling-controls">
                        <button (click)="togglePolling()" class="fetch-btn" [class.active]="isPolling">
                            {{ isPolling ? '⏹️ Stop Polling' : '▶️ Start Polling' }}
                        </button>
                        @if (isPolling) {
                            <span class="polling-indicator">🔄 Refreshing every 10s</span>
                        }
                    </div>
                    
                    @if (pollingData) {
                        <div class="polling-result">
                            <span>Users: {{ pollingData.length }}</span>
                            <span>Updated: {{ pollTime | date:'mediumTime' }}</span>
                        </div>
                    }
                </section>

                <!-- SCENARIO 4: Conditional Fetch -->
                <section class="demo-section">
                    <h3>🎛️ Scenario 4: Conditional Fetching</h3>
                    <p>Only fetch if certain conditions are met.</p>
                    
                    <div class="conditions">
                        <label>
                            <input type="checkbox" [(ngModel)]="shouldFetch">
                            Enable fetching
                        </label>
                        <label>
                            <input type="checkbox" [(ngModel)]="useCache">
                            Use cache
                        </label>
                    </div>
                    
                    <button (click)="fetchConditional()" class="fetch-btn">
                        Conditional Fetch
                    </button>
                    
                    @if (conditionalResult) {
                        <div class="result">{{ conditionalResult }}</div>
                    }
                </section>
            </div>

            <div class="code-patterns">
                <h3>💻 Key Patterns</h3>
                <div class="pattern-grid">
                    <div class="pattern">
                        <h4>State Management</h4>
                        <pre>
state = {{ '{' }} loading: false, error: null, data: null {{ '}' }};

fetch() {{ '{' }}
    this.state.loading = true;
    this.api.get().pipe(
        finalize(() => this.state.loading = false),
        catchError(err => {{ '{' }}
            this.state.error = err.message;
            return of(null);
        {{ '}' }})
    ).subscribe(data => this.state.data = data);
{{ '}' }}
                        </pre>
                    </div>
                    <div class="pattern">
                        <h4>Transformation</h4>
                        <pre>
users$ = this.api.getUsers().pipe(
    map(users => ({{ '{' }}
        total: users.length,
        active: users.filter(u => u.isActive),
        names: users.map(u => u.name)
    {{ '}' }}))
);
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
        h1 { color: #1a1a2e; margin-bottom: 0.5rem; }
        .description { color: #666; margin-bottom: 2rem; }

        .demo-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(450px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
        .demo-section { background: #f8f9fa; padding: 1.5rem; border-radius: 12px; }
        .demo-section h3 { margin-top: 0; color: #667eea; }

        .fetch-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white; padding: 0.75rem 1.5rem; border: none;
            border-radius: 8px; cursor: pointer; font-size: 1rem;
            transition: transform 0.2s;
        }
        .fetch-btn:hover { transform: scale(1.02); }
        .fetch-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .fetch-btn.active { background: #ef4444; }

        .state-box { padding: 1rem; border-radius: 8px; margin-top: 1rem; display: flex; align-items: center; gap: 1rem; }
        .state-box.loading { background: #e0f2fe; color: #0369a1; }
        .state-box.error { background: #fee2e2; color: #b91c1c; }
        .state-box.empty { background: #f3f4f6; color: #6b7280; }

        .spinner { width: 20px; height: 20px; border: 3px solid currentColor; border-top-color: transparent; border-radius: 50%; animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        .user-list { margin-top: 1rem; }
        .user-card {
            display: flex; align-items: center; gap: 1rem;
            background: white; padding: 1rem; border-radius: 8px;
            margin-bottom: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .user-card .avatar { font-size: 2rem; }
        .user-card .info { flex: 1; }
        .user-card .info strong { display: block; }
        .user-card .email { color: #666; font-size: 0.85rem; }
        .badge { padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; background: #fee2e2; color: #b91c1c; }
        .badge.active { background: #dcfce7; color: #166534; }
        .meta { margin-top: 0.5rem; color: #888; font-size: 0.8rem; }

        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1rem; }
        .stat-card { background: white; padding: 1rem; border-radius: 8px; text-align: center; }
        .stat-card.active { border-left: 4px solid #4ade80; }
        .stat-card.inactive { border-left: 4px solid #ef4444; }
        .stat-value { display: block; font-size: 2rem; font-weight: bold; color: #1a1a2e; }
        .stat-label { color: #666; font-size: 0.85rem; }
        .user-names { margin-top: 1rem; background: white; padding: 1rem; border-radius: 8px; font-size: 0.9rem; }

        .polling-controls { display: flex; align-items: center; gap: 1rem; }
        .polling-indicator { color: #4ade80; font-weight: 500; }
        .polling-result { margin-top: 1rem; background: white; padding: 1rem; border-radius: 8px; display: flex; justify-content: space-between; }

        .conditions { margin-bottom: 1rem; }
        .conditions label { display: block; margin-bottom: 0.5rem; }
        .result { margin-top: 1rem; background: #dcfce7; padding: 1rem; border-radius: 8px; color: #166534; }

        .code-patterns { background: #1a1a2e; padding: 1.5rem; border-radius: 12px; }
        .code-patterns h3 { color: white; margin-top: 0; }
        .pattern-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 1rem; }
        .pattern { background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 8px; }
        .pattern h4 { color: #4ade80; margin-top: 0; }
        .pattern pre { color: #e0e0e0; margin: 0; font-size: 0.8rem; overflow-x: auto; }
    `]
})
export class BasicGetComponent implements OnInit, OnDestroy {
    private apiService = inject(ApiService);

    // Scenario 1: Complete State Management
    state: LoadState = {
        loading: false,
        error: null,
        data: null,
        lastFetched: null
    };

    // Scenario 2: Transformed Data
    transformedUsers$!: Observable<{
        total: number;
        activeCount: number;
        inactiveCount: number;
        names: string[];
    }>;

    // Scenario 3: Polling
    isPolling = false;
    pollingData: User[] | null = null;
    pollTime: Date | null = null;
    private pollingInterval: any;

    // Scenario 4: Conditional
    shouldFetch = true;
    useCache = false;
    conditionalResult = '';

    private subscription: Subscription | null = null;

    ngOnInit(): void { }

    /**
     * SCENARIO 1: Complete State Management
     * Handles loading, error, and success states properly.
     */
    fetchWithStateManagement(): void {
        this.state = { loading: true, error: null, data: null, lastFetched: null };

        this.apiService.getUsers().pipe(
            tap(() => console.log('🔄 Fetching users...')),
            finalize(() => {
                this.state.loading = false;
                console.log('✅ Fetch complete');
            }),
            catchError(err => {
                this.state.error = err.message || 'Failed to fetch users';
                return of(null);
            })
        ).subscribe(users => {
            if (users) {
                this.state.data = users;
                this.state.lastFetched = new Date();
            }
        });
    }

    /**
     * SCENARIO 2: Data Transformation
     * Transform API response using map operator.
     */
    fetchTransformed(): void {
        this.transformedUsers$ = this.apiService.getUsers().pipe(
            map(users => ({
                total: users.length,
                activeCount: users.filter(u => u.isActive).length,
                inactiveCount: users.filter(u => !u.isActive).length,
                names: users.map(u => u.name)
            }))
        );
    }

    /**
     * SCENARIO 3: Polling / Auto-refresh
     * Automatically fetch data at regular intervals.
     */
    togglePolling(): void {
        if (this.isPolling) {
            clearInterval(this.pollingInterval);
            this.isPolling = false;
        } else {
            this.isPolling = true;
            this.poll(); // Initial fetch
            this.pollingInterval = setInterval(() => this.poll(), 10000);
        }
    }

    private poll(): void {
        this.apiService.getUsers().subscribe(users => {
            this.pollingData = users;
            this.pollTime = new Date();
        });
    }

    /**
     * SCENARIO 4: Conditional Fetching
     * Only fetch if conditions are met.
     */
    fetchConditional(): void {
        if (!this.shouldFetch) {
            this.conditionalResult = '⚠️ Fetching is disabled';
            return;
        }

        const source$ = this.useCache
            ? this.apiService.getUsersCached()
            : this.apiService.getUsers();

        source$.subscribe(users => {
            this.conditionalResult = `✅ Fetched ${users.length} users (${this.useCache ? 'from cache' : 'fresh'})`;
        });
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
        if (this.pollingInterval) {
            clearInterval(this.pollingInterval);
        }
    }
}
