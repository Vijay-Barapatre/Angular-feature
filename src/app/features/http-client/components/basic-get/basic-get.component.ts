/**
 * ============================================================================
 * BASIC GET WITH OBSERVABLE (ENHANCED)
 * ============================================================================
 * 
 * 🎯 WHAT THIS DEMONSTRATES:
 * This component shows the proper way to make HTTP GET requests in Angular
 * using HttpClient's Observable-based approach.
 * 
 * 💡 KEY CONCEPTS COVERED:
 * 
 * 1. STATE MANAGEMENT
 *    - Managing loading, error, empty, and data states
 *    - Using a state object to track all UI states
 *    - Properly resetting state before new requests
 * 
 * 2. RXJS OPERATORS FOR HTTP:
 *    - tap(): Side effects like logging (doesn't modify stream)
 *    - map(): Transform response data to different shape
 *    - finalize(): Always runs on complete OR error (like try/finally)
 *    - catchError(): Handle errors, return fallback value
 * 
 * 3. OBSERVABLE PATTERNS:
 *    - Manual subscription with subscribe()
 *    - Async pipe for automatic subscription management
 *    - Proper cleanup in ngOnDestroy()
 * 
 * 4. REAL-WORLD PATTERNS:
 *    - Loading indicators
 *    - Error handling with retry button
 *    - Empty state when no data
 *    - Polling/auto-refresh
 *    - Conditional fetching based on user settings
 *    - Data transformation before display
 * 
 * ⚠️ IMPORTANT NOTES:
 * - Observables are LAZY: They don't execute until subscribed
 * - Always unsubscribe to prevent memory leaks
 * - Use async pipe when possible (auto-unsubscribes)
 * - Handle ALL states: loading, error, empty, data
 * 
 * 🔗 RELATED PATTERNS:
 * - Error Handling & Retry
 * - Promise-based approach
 * - RxJS operators for API chaining
 */

import { Component, OnInit, OnDestroy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription, Observable, BehaviorSubject, map, tap, finalize, catchError, of } from 'rxjs';
import { ApiService, User } from '../../services/api.service';

/**
 * 📦 STATE INTERFACE
 * 
 * Using an interface to define the shape of our loading state
 * makes the code more maintainable and type-safe.
 * 
 * This pattern is useful when you have multiple related pieces
 * of state that change together.
 * 
 * Properties:
 * - loading: true while HTTP request is in progress
 * - error: error message if request failed, null otherwise
 * - data: array of users if successful, null if not yet fetched
 * - lastFetched: timestamp of last successful fetch
 */
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
            <h1>📥 Basic GET with Observable</h1>
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
    /**
     * 💉 DEPENDENCY INJECTION
     * 
     * Using Angular's inject() function to get the ApiService.
     * This is the modern approach (Angular 14+) instead of constructor injection.
     * 
     * Benefits of inject():
     * - Cleaner code, especially with multiple dependencies
     * - Works in standalone components
     * - Can be used outside constructor (in field initializers)
     */
    private apiService = inject(ApiService);

    // =========================================================================
    // SCENARIO 1: COMPLETE STATE MANAGEMENT
    // =========================================================================
    /**
     * 📦 STATE OBJECT PATTERN
     * 
     * Instead of separate boolean flags, we use a single state object.
     * This ensures related state updates happen together.
     * 
     * UI renders based on this state:
     * - loading: true  → Show spinner
     * - error: string  → Show error message
     * - data: null     → Show empty state  
     * - data: User[]   → Show user list
     */
    state: LoadState = {
        loading: false,
        error: null,
        data: null,
        lastFetched: null
    };

    // =========================================================================
    // SCENARIO 2: TRANSFORMED DATA PATTERN
    // =========================================================================
    /**
     * 🔄 OBSERVABLE WITH TRANSFORMATION
     * 
     * This Observable doesn't store raw users - it transforms them
     * into summary statistics using the map() operator.
     * 
     * The '!' (definite assignment) tells TypeScript this will be
     * assigned before use. We assign it in fetchTransformed().
     * 
     * Used with async pipe in template:
     * @if (transformedUsers$ | async; as transformed) { ... }
     */
    transformedUsers$!: Observable<{
        total: number;
        activeCount: number;
        inactiveCount: number;
        names: string[];
    }>;

    // =========================================================================
    // SCENARIO 3: POLLING / AUTO-REFRESH
    // =========================================================================
    /**
     * ⏱️ POLLING STATE
     * 
     * Polling is a technique to periodically fetch fresh data.
     * Useful for dashboards, notifications, live updates.
     * 
     * ⚠️ IMPORTANT: Always clear the interval on component destroy!
     * Otherwise, the polling continues even after navigating away.
     */
    isPolling = false;
    pollingData: User[] | null = null;
    pollTime: Date | null = null;
    private pollingInterval: any;  // setInterval reference for cleanup

    // =========================================================================
    // SCENARIO 4: CONDITIONAL FETCHING
    // =========================================================================
    /**
     * 🎛️ CONDITIONAL FETCH FLAGS
     * 
     * Real apps often need to fetch based on conditions:
     * - User preferences (should fetch?)
     * - Cache settings (use cached data?)
     * - Feature flags (is feature enabled?)
     */
    shouldFetch = true;
    useCache = false;
    conditionalResult = '';

    /**
     * 🔗 SUBSCRIPTION REFERENCE
     * 
     * When manually subscribing (not using async pipe),
     * we MUST store the subscription and unsubscribe on destroy.
     * 
     * Memory leak prevention!
     */
    private subscription: Subscription | null = null;

    ngOnInit(): void { }

    // =========================================================================
    // SCENARIO 1: COMPLETE STATE MANAGEMENT
    // =========================================================================
    /**
     * 📡 FETCH WITH FULL STATE MANAGEMENT
     * 
     * This method demonstrates the proper way to handle all UI states
     * when making an HTTP request.
     * 
     * FLOW:
     * 1. Reset state (clear previous data/errors, set loading=true)
     * 2. Make HTTP request
     * 3. Handle success → store data
     * 4. Handle error → store error message
     * 5. Always → set loading=false (via finalize)
     * 
     * KEY OPERATORS USED:
     * 
     * tap() - Side effects that don't modify the stream
     *   - Logging, analytics, debugging
     *   - Receives value, does something, passes value unchanged
     * 
     * finalize() - Runs on COMPLETE or ERROR (like try/finally)
     *   - Perfect for hiding loading spinners
     *   - Guaranteed to run regardless of outcome
     * 
     * catchError() - Handle errors gracefully
     *   - Receives error, MUST return new Observable
     *   - Using of(null) returns null instead of crashing
     */
    fetchWithStateManagement(): void {
        // Step 1: Reset all state - IMPORTANT!
        // If we don't reset, previous data might show during loading
        this.state = { loading: true, error: null, data: null, lastFetched: null };

        // Step 2: Make the HTTP request with operators
        this.apiService.getUsers().pipe(
            // tap: Log when request starts (doesn't modify stream)
            tap(() => console.log('🔄 Fetching users...')),

            // finalize: ALWAYS runs - perfect for hiding loaders
            // Runs on success (complete) OR error
            finalize(() => {
                this.state.loading = false;
                console.log('✅ Fetch complete');
            }),

            // catchError: Handle HTTP errors gracefully
            // MUST return an Observable (we return of(null))
            // Without this, errors crash the app
            catchError(err => {
                this.state.error = err.message || 'Failed to fetch users';
                return of(null);  // Return null to continue the stream
            })
        ).subscribe(users => {
            // Only update data if we got a valid response
            // (null means catchError was triggered)
            if (users) {
                this.state.data = users;
                this.state.lastFetched = new Date();
            }
        });
    }

    // =========================================================================
    // SCENARIO 2: DATA TRANSFORMATION
    // =========================================================================
    /**
     * 🔄 TRANSFORM API RESPONSE
     * 
     * Instead of storing raw data and computing stats in template,
     * we transform the data in the Observable stream.
     * 
     * Benefits:
     * - Cleaner template code
     * - Computation happens once, not on every re-render
     * - Easier to test (pure function)
     * 
     * The map() operator receives each emitted value and transforms it.
     * Original: User[] → Transformed: { total, activeCount, names }
     */
    fetchTransformed(): void {
        this.transformedUsers$ = this.apiService.getUsers().pipe(
            // map: Transform the stream's value
            // Input: User[] → Output: Summary object
            map(users => ({
                total: users.length,
                activeCount: users.filter(u => u.isActive).length,
                inactiveCount: users.filter(u => !u.isActive).length,
                names: users.map(u => u.name)
            }))
        );
        // Note: No subscribe() here!
        // We assign to Observable and use | async in template
        // async pipe handles subscription AND cleanup automatically
    }

    // =========================================================================
    // SCENARIO 3: POLLING / AUTO-REFRESH
    // =========================================================================
    /**
     * ⏱️ TOGGLE POLLING ON/OFF
     * 
     * Polling pattern: Fetch data at regular intervals.
     * 
     * FLOW:
     * 1. If already polling → Stop it (clear interval)
     * 2. If not polling → Start it (set interval)
     * 
     * ⚠️ WARNING: Using setInterval is the "old" way.
     * Better RxJS approach: interval(10000).pipe(switchMap(...))
     * See for RxJS-based polling.
     */
    togglePolling(): void {
        if (this.isPolling) {
            // Stop polling
            clearInterval(this.pollingInterval);
            this.isPolling = false;
        } else {
            // Start polling
            this.isPolling = true;
            this.poll(); // Fetch immediately (don't wait 10s for first)
            this.pollingInterval = setInterval(() => this.poll(), 10000);
        }
    }

    /**
     * 📡 SINGLE POLL REQUEST
     * 
     * Makes one HTTP request and updates the data.
     * Called by setInterval every 10 seconds.
     */
    private poll(): void {
        this.apiService.getUsers().subscribe(users => {
            this.pollingData = users;
            this.pollTime = new Date();
        });
    }

    // =========================================================================
    // SCENARIO 4: CONDITIONAL FETCHING
    // =========================================================================
    /**
     * 🎛️ CONDITIONAL FETCH BASED ON USER SETTINGS
     * 
     * Real apps often need to:
     * - Check permissions before fetching
     * - Use cached data when available
     * - Respect user preferences
     * 
     * This demonstrates branching logic before making requests.
     */
    fetchConditional(): void {
        // Guard clause: Check if fetching is allowed
        if (!this.shouldFetch) {
            this.conditionalResult = '⚠️ Fetching is disabled';
            return;  // Early return - no HTTP request
        }

        // Conditional source: Choose between cached or fresh data
        // Both methods return Observable<User[]>, so we can use them interchangeably
        const source$ = this.useCache
            ? this.apiService.getUsersCached()  // Uses shareReplay
            : this.apiService.getUsers();       // Fresh request

        source$.subscribe(users => {
            this.conditionalResult = `✅ Fetched ${users.length} users (${this.useCache ? 'from cache' : 'fresh'})`;
        });
    }

    // =========================================================================
    // CLEANUP - CRITICAL FOR MEMORY SAFETY
    // =========================================================================
    /**
     * 🧹 CLEANUP ON DESTROY
     * 
     * Angular calls ngOnDestroy when component is removed from DOM.
     * 
     * WE MUST:
     * 1. Unsubscribe from any manual subscriptions
     * 2. Clear any intervals/timeouts
     * 3. Cancel any pending requests
     * 
     * If we don't:
     * - Memory leaks (subscriptions keep component in memory)
     * - Stale updates (polling continues after navigation)
     * - Console errors (updating destroyed component)
     * 
     * BEST PRACTICE: Use async pipe when possible - it auto-unsubscribes!
     */
    ngOnDestroy(): void {
        // Clean up manual subscriptions
        this.subscription?.unsubscribe();

        // Clean up polling interval
        if (this.pollingInterval) {
            clearInterval(this.pollingInterval);
        }
    }
}

