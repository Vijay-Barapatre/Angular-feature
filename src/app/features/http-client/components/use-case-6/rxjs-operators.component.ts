/**
 * ============================================================================
 * USE CASE 6: RxJS OPERATORS FOR HTTP (ENHANCED)
 * ============================================================================
 * 
 * 🎯 WHAT THIS DEMONSTRATES:
 * Advanced RxJS patterns for real-world HTTP scenarios.
 * These patterns solve common problems that simple requests can't handle.
 * 
 * 💡 KEY OPERATORS EXPLAINED:
 * 
 * 1. TYPE-AHEAD SEARCH OPERATORS:
 *    
 *    debounceTime(300)
 *      - Waits 300ms after user stops typing
 *      - Prevents API call on every keystroke
 *      - "laptop" = 1 call instead of 6!
 *    
 *    distinctUntilChanged()
 *      - Only emits if value changed from previous
 *      - Prevents duplicate searches
 *    
 *    switchMap(term => search(term))
 *      - CANCELS previous request when new one starts
 *      - Perfect for search (only latest matters)
 *      - User types "lap" → request starts
 *      - User types "laptop" → "lap" request CANCELLED
 * 
 * 2. PARALLEL LOADING (forkJoin):
 *    
 *    forkJoin({ users, products, stats })
 *      - Runs all requests IN PARALLEL
 *      - Waits for ALL to complete
 *      - Returns object with all results
 *      - Fails if ANY request fails
 *    
 *    Sequential: 500ms + 500ms + 500ms = 1500ms
 *    Parallel:   500ms (all at once!) = 500ms
 * 
 * 3. SEQUENTIAL CHAINING (concatMap):
 *    
 *    concatMap(user => fetchOrders(user.id))
 *      - Runs requests IN ORDER
 *      - Waits for each to complete before next
 *      - Use when order matters
 *    
 * 4. OPERATOR COMPARISON:
 *    
 *    switchMap  - Cancel previous (search)
 *    concatMap  - Queue in order (form steps)
 *    mergeMap   - Run all parallel (no order)
 *    exhaustMap - Ignore while busy (prevent double-click)
 * 
 * ⚠️ COMMON MISTAKES:
 * - Using map instead of switchMap (map doesn't flatten!)
 * - Nested subscribes (use switchMap instead)
 * - Not debouncing search (too many API calls)
 * - Using mergeMap for search (doesn't cancel)
 */

import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, User, Product, Post, PaginatedResponse } from '../../services/api.service';
import { Subject, forkJoin, combineLatest, debounceTime, distinctUntilChanged, switchMap, catchError, of, Subscription, tap, concatMap, toArray, from, finalize, BehaviorSubject, merge, interval, takeUntil, map, scan } from 'rxjs';

interface DashboardData {
    users: User[];
    products: Product[];
    stats: {
        totalUsers: number;
        activeUsers: number;
        totalProducts: number;
        inStockProducts: number;
    };
}

@Component({
    selector: 'app-rxjs-operators',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="container">
            <h1>🔧 Use Case 6: Advanced RxJS Patterns</h1>
            <p class="description">
                Real-world RxJS patterns for HTTP operations.
            </p>

            <div class="demo-grid">
                <!-- Scenario 1: Type-ahead Search -->
                <section class="demo-section">
                    <h3>🔍 Scenario 1: Type-ahead Search</h3>
                    <p>Debounce + switchMap + distinctUntilChanged</p>
                    <input 
                        [(ngModel)]="searchQuery" 
                        (ngModelChange)="onSearchChange($event)"
                        placeholder="Type to search..."
                        class="search-input">
                    <div class="search-meta">
                        @if (searching) {
                            <span class="searching">⏳ Searching...</span>
                        }
                        @if (searchStats.cancelled > 0) {
                            <span class="cancelled">❌ {{ searchStats.cancelled }} requests cancelled</span>
                        }
                        <span class="count">📦 {{ searchStats.total }} total requests</span>
                    </div>
                    <div class="search-results">
                        @for (result of searchResults; track result.id) {
                            <div class="result-item">
                                <span class="avatar">{{ result.avatar || '📦' }}</span>
                                <span class="name">{{ result.name }}</span>
                            </div>
                        } @empty {
                            <div class="empty">Start typing to search...</div>
                        }
                    </div>
                </section>

                <!-- Scenario 2: Dashboard Loading -->
                <section class="demo-section">
                    <h3>📊 Scenario 2: Dashboard Loading (forkJoin)</h3>
                    <p>Load multiple resources in parallel:</p>
                    <button (click)="loadDashboard()" [disabled]="loadingDashboard" class="btn primary">
                        {{ loadingDashboard ? '⏳ Loading...' : '🔄 Load Dashboard' }}
                    </button>
                    @if (dashboardData) {
                        <div class="dashboard-grid">
                            <div class="stat-card">
                                <span class="stat-value">{{ dashboardData.stats.totalUsers }}</span>
                                <span class="stat-label">Total Users</span>
                            </div>
                            <div class="stat-card success">
                                <span class="stat-value">{{ dashboardData.stats.activeUsers }}</span>
                                <span class="stat-label">Active Users</span>
                            </div>
                            <div class="stat-card">
                                <span class="stat-value">{{ dashboardData.stats.totalProducts }}</span>
                                <span class="stat-label">Products</span>
                            </div>
                            <div class="stat-card warning">
                                <span class="stat-value">{{ dashboardData.stats.inStockProducts }}</span>
                                <span class="stat-label">In Stock</span>
                            </div>
                        </div>
                        <div class="load-time">⏱️ Loaded in {{ loadTime }}ms</div>
                    }
                </section>

                <!-- Scenario 3: Infinite Scroll Pagination -->
                <section class="demo-section">
                    <h3>📜 Scenario 3: Infinite Scroll</h3>
                    <p>Load more as you scroll:</p>
                    <div class="posts-container" (scroll)="onScroll($event)">
                        @for (post of posts; track post.id) {
                            <div class="post-card">
                                <strong>{{ post.title }}</strong>
                                <p>{{ post.body }}</p>
                                <span class="author">By {{ post.author }}</span>
                            </div>
                        }
                        @if (loadingPosts) {
                            <div class="loading-more">Loading more...</div>
                        }
                    </div>
                    <div class="pagination-info">
                        Page {{ currentPage }}/{{ totalPages }} ({{ posts.length }} posts loaded)
                    </div>
                </section>

                <!-- Scenario 4: Dependent Requests -->
                <section class="demo-section">
                    <h3>🔗 Scenario 4: Chained Requests</h3>
                    <p>Load user, then their orders:</p>
                    <button (click)="loadChained()" [disabled]="loadingChain" class="btn primary">
                        {{ loadingChain ? '⏳ Loading...' : '🔗 Load User → Products' }}
                    </button>
                    <div class="chain-log">
                        @for (step of chainSteps; track $index) {
                            <div class="chain-step" [class.complete]="step.complete">
                                <span class="step-icon">{{ step.complete ? '✅' : '⏳' }}</span>
                                <span class="step-text">{{ step.text }}</span>
                            </div>
                        }
                    </div>
                </section>
            </div>

            <div class="operator-reference">
                <h3>📚 Operator Quick Reference</h3>
                <div class="operator-grid">
                    <div class="operator-card">
                        <code>switchMap</code>
                        <p>Cancel previous, use latest</p>
                    </div>
                    <div class="operator-card">
                        <code>concatMap</code>
                        <p>Queue in order</p>
                    </div>
                    <div class="operator-card">
                        <code>mergeMap</code>
                        <p>All in parallel</p>
                    </div>
                    <div class="operator-card">
                        <code>exhaustMap</code>
                        <p>Ignore while busy</p>
                    </div>
                    <div class="operator-card">
                        <code>forkJoin</code>
                        <p>Wait for all</p>
                    </div>
                    <div class="operator-card">
                        <code>combineLatest</code>
                        <p>Latest from each</p>
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

        .btn { padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; }
        .btn.primary { background: #667eea; color: white; }
        .btn:disabled { opacity: 0.6; }

        .search-input { width: 100%; padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 1rem; }
        .search-meta { display: flex; gap: 1rem; margin-top: 0.5rem; font-size: 0.85rem; }
        .searching { color: #667eea; }
        .cancelled { color: #ef4444; }
        .count { color: #888; }
        .search-results { margin-top: 1rem; max-height: 200px; overflow-y: auto; }
        .result-item { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem; background: white; border-radius: 6px; margin-bottom: 0.25rem; }
        .result-item .avatar { font-size: 1.25rem; }
        .empty { color: #888; font-style: italic; }

        .dashboard-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-top: 1rem; }
        .stat-card { background: white; padding: 1rem; border-radius: 8px; text-align: center; }
        .stat-card.success { border-left: 4px solid #4ade80; }
        .stat-card.warning { border-left: 4px solid #fbbf24; }
        .stat-value { display: block; font-size: 1.5rem; font-weight: bold; color: #1a1a2e; }
        .stat-label { color: #666; font-size: 0.8rem; }
        .load-time { margin-top: 0.5rem; color: #4ade80; font-size: 0.85rem; }

        .posts-container { max-height: 300px; overflow-y: auto; margin-top: 1rem; }
        .post-card { background: white; padding: 1rem; border-radius: 8px; margin-bottom: 0.5rem; }
        .post-card strong { color: #1a1a2e; }
        .post-card p { color: #666; font-size: 0.9rem; margin: 0.5rem 0; }
        .post-card .author { color: #667eea; font-size: 0.8rem; }
        .loading-more { text-align: center; padding: 1rem; color: #667eea; }
        .pagination-info { margin-top: 0.5rem; color: #888; font-size: 0.85rem; }

        .chain-log { margin-top: 1rem; }
        .chain-step { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem; background: white; border-radius: 6px; margin-bottom: 0.25rem; opacity: 0.5; }
        .chain-step.complete { opacity: 1; }

        .operator-reference { background: #1a1a2e; padding: 1.5rem; border-radius: 12px; }
        .operator-reference h3 { color: white; margin-top: 0; }
        .operator-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; }
        .operator-card { background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 8px; text-align: center; }
        .operator-card code { color: #4ade80; font-size: 0.9rem; }
        .operator-card p { color: #888; font-size: 0.75rem; margin: 0.5rem 0 0 0; }
    `]
})
export class RxjsOperatorsComponent implements OnInit, OnDestroy {
    private apiService = inject(ApiService);
    private destroy$ = new Subject<void>();

    // Scenario 1: Search
    searchQuery = '';
    searchResults: any[] = [];
    searching = false;
    searchStats = { total: 0, cancelled: 0 };
    private searchSubject = new Subject<string>();

    // Scenario 2: Dashboard
    loadingDashboard = false;
    dashboardData: DashboardData | null = null;
    loadTime = 0;

    // Scenario 3: Pagination
    posts: Post[] = [];
    loadingPosts = false;
    currentPage = 1;
    totalPages = 10;

    // Scenario 4: Chained
    loadingChain = false;
    chainSteps: { text: string; complete: boolean }[] = [];

    // 🕒 LIFECYCLE HOOK: ngOnInit
    // WHY HERE?
    // 1. Setup RxJS Pipelines: We configure the search Subject with operators.
    // 2. Load Initial Data: Fetch the first page of posts for scroll demo.
    //    These need to happen once the component is ready to display.
    //
    // WHY NOT CONSTRUCTOR?
    // - RxJS setup in constructor is fine, but ngOnInit is more testable.
    // - Loading data in constructor can cause issues with SSR and testing.
    ngOnInit(): void {
        this.setupSearch();
        this.loadInitialPosts();
    }

    /**
     * SCENARIO 1: Type-ahead Search with switchMap
     */
    setupSearch(): void {
        this.searchSubject.pipe(
            tap(() => this.searchStats.total++),
            debounceTime(300),
            distinctUntilChanged(),
            tap(() => {
                this.searching = true;
                this.searchStats.cancelled++;
            }),
            switchMap(term => {
                if (!term.trim()) return of({ results: [] });
                return this.apiService.search(term).pipe(
                    catchError(() => of({ results: [] }))
                );
            }),
            takeUntil(this.destroy$)
        ).subscribe(response => {
            this.searchResults = response.results || [];
            this.searching = false;
        });
    }

    onSearchChange(value: string): void {
        this.searchSubject.next(value);
    }

    /**
     * SCENARIO 2: Dashboard with forkJoin
     */
    loadDashboard(): void {
        this.loadingDashboard = true;
        this.dashboardData = null;
        const startTime = Date.now();

        forkJoin({
            users: this.apiService.getUsers(),
            products: this.apiService.getProducts()
        }).pipe(
            map(({ users, products }) => ({
                users,
                products,
                stats: {
                    totalUsers: users.length,
                    activeUsers: users.filter(u => u.isActive).length,
                    totalProducts: products.length,
                    inStockProducts: products.filter(p => p.inStock).length
                }
            })),
            finalize(() => this.loadingDashboard = false)
        ).subscribe(data => {
            this.dashboardData = data;
            this.loadTime = Date.now() - startTime;
        });
    }

    /**
     * SCENARIO 3: Infinite Scroll Pagination
     */
    loadInitialPosts(): void {
        this.loadPosts(1);
    }

    loadPosts(page: number): void {
        if (this.loadingPosts || page > this.totalPages) return;

        this.loadingPosts = true;
        this.apiService.getPosts(page, 10).subscribe({
            next: (response) => {
                this.posts = [...this.posts, ...response.data];
                this.currentPage = response.pagination.page;
                this.totalPages = response.pagination.totalPages;
                this.loadingPosts = false;
            },
            error: () => this.loadingPosts = false
        });
    }

    onScroll(event: any): void {
        const element = event.target;
        const atBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 50;
        if (atBottom && !this.loadingPosts) {
            this.loadPosts(this.currentPage + 1);
        }
    }

    /**
     * SCENARIO 4: Chained Requests with concatMap
     */
    loadChained(): void {
        this.loadingChain = true;
        this.chainSteps = [
            { text: 'Loading user...', complete: false },
            { text: 'Loading user products...', complete: false },
            { text: 'Computing recommendations...', complete: false }
        ];

        this.apiService.getUser(1).pipe(
            tap(() => this.chainSteps[0].complete = true),
            concatMap(user => {
                return this.apiService.getProducts().pipe(
                    tap(() => this.chainSteps[1].complete = true),
                    map(products => ({ user, products }))
                );
            }),
            concatMap(data => {
                // Simulate recommendation compute
                return of({ ...data, recommendations: data.products.slice(0, 2) }).pipe(
                    tap(() => this.chainSteps[2].complete = true)
                );
            }),
            finalize(() => this.loadingChain = false)
        ).subscribe();
    }

    // 🕒 LIFECYCLE HOOK: ngOnDestroy
    // WHY HERE?
    // 1. Complete Subject: We emit to destroy$ to trigger takeUntil operators.
    //    This automatically unsubscribes all pipelines using takeUntil(this.destroy$).
    // 2. Complete Subject: After next(), we call complete() for proper cleanup.
    //
    // 🛡️ PATTERN: takeUntil + Subject
    // This is the cleanest RxJS cleanup pattern:
    // - Declare: private destroy$ = new Subject<void>();
    // - Use: .pipe(takeUntil(this.destroy$))
    // - Cleanup: this.destroy$.next(); this.destroy$.complete();
    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
