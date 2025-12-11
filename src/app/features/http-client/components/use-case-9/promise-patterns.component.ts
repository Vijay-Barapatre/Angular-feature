/**
 * ============================================================================
 * USE CASE 9: ADVANCED PROMISE PATTERNS
 * ============================================================================
 * 
 * 💡 WHAT THIS COVERS:
 * 1. Old Promise Pattern (.then/.catch/.finally) - Legacy approach
 * 2. Promise.all() - Parallel calls, fail-fast
 * 3. Promise.allSettled() - Parallel calls, wait for all results
 * 4. Promise.race() - First response wins
 * 5. Real-world scenarios: Checkout flow, API fallback
 * 
 * ⚠️ IMPORTANT:
 * - Angular's HttpClient returns Observables by default
 * - Use lastValueFrom() to convert Observable → Promise
 * - toPromise() is DEPRECATED since RxJS 7
 */

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, timer, of, throwError } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';

interface ApiResult {
    source: string;
    data: any;
    time: number;
}

interface CheckoutStep {
    step: string;
    status: 'pending' | 'running' | 'success' | 'error';
    message?: string;
}

@Component({
    selector: 'app-promise-patterns',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
        <div class="container">
            <header class="header">
                <a routerLink="/http-client" class="back-link">← Back to HttpClient</a>
                <h1>🤝 Use Case 9: Advanced Promise Patterns</h1>
                <p class="subtitle">From old patterns to modern async/await</p>
            </header>

            <!-- Section 1: Old vs New Pattern -->
            <section class="demo-section">
                <h2>1️⃣ Old vs New Promise Patterns</h2>
                <div class="pattern-comparison">
                    <div class="pattern-card old">
                        <h3>❌ Old Pattern (Legacy)</h3>
                        <pre><code>// .then().catch().finally() chain
fetchData()
    .then(data => process(data))
    .then(result => display(result))
    .catch(err => handleError(err))
    .finally(() => cleanup());</code></pre>
                        <button (click)="demoOldPattern()" [disabled]="oldPatternLoading" class="btn">
                            {{ oldPatternLoading ? '⏳ Loading...' : '▶️ Run Old Pattern' }}
                        </button>
                    </div>
                    <div class="pattern-card new">
                        <h3>✅ New Pattern (Modern)</h3>
                        <pre><code>// async/await with try/catch/finally
async loadData() {{ '{' }}
    try {{ '{' }}
        const data = await fetchData();
        const result = await process(data);
        display(result);
    {{ '}' }} catch (err) {{ '{' }}
        handleError(err);
    {{ '}' }} finally {{ '{' }}
        cleanup();
    {{ '}' }}
{{ '}' }}</code></pre>
                        <button (click)="demoNewPattern()" [disabled]="newPatternLoading" class="btn">
                            {{ newPatternLoading ? '⏳ Loading...' : '▶️ Run New Pattern' }}
                        </button>
                    </div>
                </div>
                @if (patternResult) {
                    <div class="result-panel" [class.success]="patternResult.success">
                        <strong>{{ patternResult.pattern }}</strong>: {{ patternResult.message }}
                        <code>Time: {{ patternResult.time }}ms</code>
                    </div>
                }
            </section>

            <!-- Section 2: Promise.all -->
            <section class="demo-section">
                <h2>2️⃣ Promise.all() - Parallel Calls (Fail-Fast)</h2>
                <p class="desc">
                    Runs all promises in parallel. If <strong>ANY fails</strong>, the entire operation fails immediately.
                </p>
                <div class="code-block">
                    <pre><code>// All succeed → returns array of results
const [users, products, orders] = await Promise.all([
    fetchUsers(),
    fetchProducts(),
    fetchOrders()
]);

// If ANY fails → entire Promise.all rejects
// ❌ One failure = all fail</code></pre>
                </div>
                <div class="demo-controls">
                    <button (click)="demoPromiseAll(false)" [disabled]="promiseAllLoading" class="btn success">
                        {{ promiseAllLoading ? '⏳ Loading...' : '✅ All Succeed' }}
                    </button>
                    <button (click)="demoPromiseAll(true)" [disabled]="promiseAllLoading" class="btn danger">
                        {{ promiseAllLoading ? '⏳ Loading...' : '❌ One Fails' }}
                    </button>
                </div>
                @if (promiseAllResult) {
                    <div class="result-panel" [class.success]="promiseAllResult.success" [class.error]="!promiseAllResult.success">
                        <h4>{{ promiseAllResult.success ? '✅ All Succeeded!' : '❌ Failed Fast!' }}</h4>
                        <p>{{ promiseAllResult.message }}</p>
                        @if (promiseAllResult.results) {
                            <ul>
                                @for (r of promiseAllResult.results; track r.source) {
                                    <li>{{ r.source }}: {{ r.time }}ms</li>
                                }
                            </ul>
                        }
                    </div>
                }
            </section>

            <!-- Section 3: Promise.allSettled -->
            <section class="demo-section">
                <h2>3️⃣ Promise.allSettled() - Wait for All Results</h2>
                <p class="desc">
                    Waits for <strong>ALL promises</strong> to complete, whether they succeed or fail.
                    Never rejects early - always returns all results.
                </p>
                <div class="code-block">
                    <pre><code>const results = await Promise.allSettled([
    fetchFromAPI1(),  // might fail
    fetchFromAPI2(),  // might succeed
    fetchFromAPI3()   // might timeout
]);

// results = [
//   {{ '{' }} status: 'fulfilled', value: data1 {{ '}' }},
//   {{ '{' }} status: 'rejected', reason: Error {{ '}' }},
//   {{ '{' }} status: 'fulfilled', value: data3 {{ '}' }}
// ]</code></pre>
                </div>
                <button (click)="demoPromiseAllSettled()" [disabled]="allSettledLoading" class="btn primary">
                    {{ allSettledLoading ? '⏳ Loading...' : '🔄 Run Mixed (2 succeed, 1 fails)' }}
                </button>
                @if (allSettledResults.length > 0) {
                    <div class="settled-results">
                        @for (result of allSettledResults; track $index) {
                            <div class="settled-item" [class.fulfilled]="result.status === 'fulfilled'" [class.rejected]="result.status === 'rejected'">
                                <span class="status-icon">{{ result.status === 'fulfilled' ? '✅' : '❌' }}</span>
                                <span class="source">{{ result.source }}</span>
                                <span class="detail">{{ result.status === 'fulfilled' ? result.value : result.reason }}</span>
                            </div>
                        }
                    </div>
                }
            </section>

            <!-- Section 4: Promise.race -->
            <section class="demo-section">
                <h2>4️⃣ Promise.race() - First Response Wins</h2>
                <p class="desc">
                    Returns the result of whichever promise completes <strong>first</strong>.
                    Great for timeouts or fastest-server selection.
                </p>
                <div class="code-block">
                    <pre><code>// Timeout pattern
const result = await Promise.race([
    fetchData(),                    // Actual API call
    timeout(5000)                   // Timeout after 5s
]);

// API Fallback pattern  
const data = await Promise.race([
    fetchFromPrimaryServer(),       // 100ms
    fetchFromBackupServer()         // 50ms → WINS!
]);</code></pre>
                </div>
                <button (click)="demoPromiseRace()" [disabled]="raceLoading" class="btn primary">
                    {{ raceLoading ? '⏳ Racing...' : '🏁 Race: Fast(200ms) vs Slow(800ms)' }}
                </button>
                @if (raceResult) {
                    <div class="result-panel success">
                        <h4>🏆 Winner: {{ raceResult.winner }}</h4>
                        <p>Completed in {{ raceResult.time }}ms ({{ raceResult.message }})</p>
                    </div>
                }
            </section>

            <!-- Section 5: Real-World Checkout Flow -->
            <section class="demo-section checkout-section">
                <h2>5️⃣ Real-World: Checkout Flow (Chained Promises)</h2>
                <p class="desc">
                    Sequential promises where each step depends on the previous.
                    Common in e-commerce checkout flows.
                </p>
                <div class="checkout-flow">
                    @for (step of checkoutSteps; track step.step) {
                        <div class="checkout-step" [class]="step.status">
                            <div class="step-indicator">
                                @switch (step.status) {
                                    @case ('pending') { <span>⏸️</span> }
                                    @case ('running') { <span class="spinner">⏳</span> }
                                    @case ('success') { <span>✅</span> }
                                    @case ('error') { <span>❌</span> }
                                }
                            </div>
                            <div class="step-content">
                                <strong>{{ step.step }}</strong>
                                @if (step.message) {
                                    <small>{{ step.message }}</small>
                                }
                            </div>
                        </div>
                    }
                </div>
                <button (click)="startCheckoutFlow()" [disabled]="checkoutLoading" class="btn checkout-btn">
                    {{ checkoutLoading ? '⏳ Processing...' : '🛒 Start Checkout Flow' }}
                </button>
            </section>

            <!-- Summary Reference -->
            <section class="reference-section">
                <h2>📚 Quick Reference</h2>
                <div class="reference-grid">
                    <div class="ref-card">
                        <code>Promise.all()</code>
                        <p>Parallel, fail-fast</p>
                        <span class="use-case">Dashboard loading</span>
                    </div>
                    <div class="ref-card">
                        <code>Promise.allSettled()</code>
                        <p>Parallel, all results</p>
                        <span class="use-case">Batch operations</span>
                    </div>
                    <div class="ref-card">
                        <code>Promise.race()</code>
                        <p>First wins</p>
                        <span class="use-case">Timeouts, fallbacks</span>
                    </div>
                    <div class="ref-card">
                        <code>Promise.any()</code>
                        <p>First success wins</p>
                        <span class="use-case">Multiple sources</span>
                    </div>
                </div>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { margin-bottom: 2rem; }
        .back-link { color: #667eea; text-decoration: none; }
        h1 { margin: 0.5rem 0; color: var(--text-primary, #f1f5f9); }
        h2 { color: var(--text-primary, #f1f5f9); margin-top: 0; }
        .subtitle { color: var(--text-muted, #94a3b8); }

        .demo-section {
            background: var(--bg-secondary, #1e293b);
            padding: 1.5rem;
            border-radius: 12px;
            margin-bottom: 1.5rem;
            border: 1px solid rgba(102, 126, 234, 0.2);
        }

        .desc { color: var(--text-secondary, #cbd5e1); margin-bottom: 1rem; }

        .pattern-comparison { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .pattern-card { background: var(--bg-card, #334155); padding: 1rem; border-radius: 8px; }
        .pattern-card h3 { margin: 0 0 1rem 0; font-size: 1rem; color: var(--text-primary, #f1f5f9); }
        .pattern-card.old { border-left: 4px solid #ef4444; }
        .pattern-card.new { border-left: 4px solid #10b981; }

        pre, .code-block pre {
            background: #0f172a;
            color: #4ade80;
            padding: 1rem;
            border-radius: 8px;
            overflow-x: auto;
            font-size: 0.8rem;
            margin: 0 0 1rem 0;
        }

        .btn {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: all 0.2s;
        }
        .btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .btn.primary { background: linear-gradient(135deg, #667eea, #764ba2); color: white; }
        .btn.success { background: #10b981; color: white; }
        .btn.danger { background: #ef4444; color: white; margin-left: 0.5rem; }

        .demo-controls { display: flex; gap: 0.5rem; margin-bottom: 1rem; }

        .result-panel {
            margin-top: 1rem;
            padding: 1rem;
            border-radius: 8px;
            background: var(--bg-card, #334155);
            color: var(--text-primary, #f1f5f9);
        }
        .result-panel.success { background: rgba(16, 185, 129, 0.2); border: 1px solid #10b981; }
        .result-panel.error { background: rgba(239, 68, 68, 0.2); border: 1px solid #ef4444; }
        .result-panel code { display: block; margin-top: 0.5rem; color: var(--text-muted, #94a3b8); }
        .result-panel ul { margin: 0.5rem 0 0 1.5rem; }

        .settled-results { margin-top: 1rem; }
        .settled-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 0.75rem;
            background: var(--bg-card, #334155);
            border-radius: 6px;
            margin-bottom: 0.5rem;
        }
        .settled-item.fulfilled { border-left: 4px solid #10b981; }
        .settled-item.rejected { border-left: 4px solid #ef4444; }
        .settled-item .source { color: var(--text-primary, #f1f5f9); font-weight: 500; }
        .settled-item .detail { color: var(--text-muted, #94a3b8); font-size: 0.85rem; }

        .checkout-flow { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem; }
        .checkout-step {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            background: var(--bg-card, #334155);
            border-radius: 8px;
            transition: all 0.3s;
        }
        .checkout-step.running { background: rgba(102, 126, 234, 0.2); border: 1px solid #667eea; }
        .checkout-step.success { background: rgba(16, 185, 129, 0.15); }
        .checkout-step.error { background: rgba(239, 68, 68, 0.15); }
        .step-indicator { font-size: 1.5rem; }
        .step-content { display: flex; flex-direction: column; }
        .step-content strong { color: var(--text-primary, #f1f5f9); }
        .step-content small { color: var(--text-muted, #94a3b8); }
        .spinner { animation: spin 1s linear infinite; display: inline-block; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .checkout-btn { width: 100%; }

        .reference-section { background: var(--bg-secondary, #1e293b); padding: 1.5rem; border-radius: 12px; }
        .reference-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        .ref-card {
            background: var(--bg-card, #334155);
            padding: 1rem;
            border-radius: 8px;
            text-align: center;
        }
        .ref-card code { color: #667eea; font-size: 0.9rem; }
        .ref-card p { color: var(--text-secondary, #cbd5e1); margin: 0.5rem 0; font-size: 0.85rem; }
        .ref-card .use-case { color: var(--text-muted, #94a3b8); font-size: 0.75rem; }

        @media (max-width: 768px) {
            .pattern-comparison { grid-template-columns: 1fr; }
            .reference-grid { grid-template-columns: repeat(2, 1fr); }
        }
    `]
})
export class PromisePatternsComponent {
    private http = inject(HttpClient);

    // Old vs New pattern
    oldPatternLoading = false;
    newPatternLoading = false;
    patternResult: { pattern: string; success: boolean; message: string; time: number } | null = null;

    // Promise.all
    promiseAllLoading = false;
    promiseAllResult: { success: boolean; message: string; results?: ApiResult[] } | null = null;

    // Promise.allSettled
    allSettledLoading = false;
    allSettledResults: { status: string; source: string; value?: string; reason?: string }[] = [];

    // Promise.race
    raceLoading = false;
    raceResult: { winner: string; time: number; message: string } | null = null;

    // Checkout flow
    checkoutLoading = false;
    checkoutSteps: CheckoutStep[] = [
        { step: '1. Validate Cart', status: 'pending' },
        { step: '2. Check Inventory', status: 'pending' },
        { step: '3. Process Payment', status: 'pending' },
        { step: '4. Create Order', status: 'pending' },
        { step: '5. Send Confirmation', status: 'pending' }
    ];

    // =========================================================================
    // USE CASE 1: OLD PATTERN - .then().catch().finally()
    // =========================================================================
    /**
     * 🔴 OLD PROMISE PATTERN (Legacy - Pre ES2017)
     * 
     * WHAT IT IS:
     * The original way to handle promises using callback chains.
     * Each .then() returns a new Promise, allowing chaining.
     * 
     * HOW IT WORKS:
     * - .then(successCallback) → Called when Promise resolves
     * - .catch(errorCallback) → Called when any Promise in chain rejects
     * - .finally(cleanupCallback) → Always called, regardless of success/failure
     * 
     * PROBLEMS WITH THIS PATTERN:
     * 1. "Callback Hell" - nested chains become hard to read
     * 2. Error handling is tricky - .catch() catches ALL errors above it
     * 3. Returning values between .then() is confusing
     * 4. Debugging is harder - stack traces are less clear
     * 
     * WHEN YOU MIGHT STILL SEE IT:
     * - Legacy codebases
     * - Library code that doesn't use async/await
     * - When you need to attach handlers to an existing Promise
     */
    demoOldPattern(): void {
        this.oldPatternLoading = true;
        this.patternResult = null;
        const startTime = Date.now();

        // 🔴 OLD WAY: Callback chains - notice how each .then() depends on the previous
        // This is called "Promise chaining"
        this.simulateApiCall('User Data', 500)
            // First .then() - receives result from simulateApiCall
            .then(userData => {
                console.log('[Old Pattern] Step 1: Got user data');
                // IMPORTANT: We RETURN the next Promise to continue the chain
                // If we don't return, the next .then() gets undefined
                return this.simulateApiCall('Order Data', 300);
            })
            // Second .then() - receives result from the RETURNED Promise above
            .then(orderData => {
                console.log('[Old Pattern] Step 2: Got order data');
                return this.simulateApiCall('Final Result', 200);
            })
            // Third .then() - receives final result
            .then(finalResult => {
                console.log('[Old Pattern] Step 3: Complete!');
                this.patternResult = {
                    pattern: 'Old Pattern (.then chain)',
                    success: true,
                    message: 'All 3 steps completed successfully',
                    time: Date.now() - startTime
                };
            })
            // .catch() handles ANY error from ANY .then() above
            // This is both a feature and a problem - you don't know WHERE it failed
            .catch(error => {
                this.patternResult = {
                    pattern: 'Old Pattern',
                    success: false,
                    message: `Error: ${error}`,
                    time: Date.now() - startTime
                };
            })
            // .finally() ALWAYS runs - perfect for cleanup (hiding spinners, etc.)
            // It doesn't receive any value and doesn't change the chain's result
            .finally(() => {
                this.oldPatternLoading = false;
                console.log('[Old Pattern] Cleanup in finally()');
            });
    }

    // =========================================================================
    // USE CASE 2: NEW PATTERN - async/await with try/catch/finally
    // =========================================================================
    /**
     * 🟢 NEW PROMISE PATTERN (Modern - ES2017+)
     * 
     * WHAT IT IS:
     * Syntactic sugar over Promises that makes async code look synchronous.
     * Uses `async` keyword on function and `await` keyword for Promises.
     * 
     * HOW IT WORKS:
     * - `async` function always returns a Promise
     * - `await` pauses execution until Promise resolves
     * - `try/catch/finally` works exactly like synchronous code
     * 
     * ADVANTAGES:
     * 1. Reads like synchronous code - much easier to understand
     * 2. Error handling is clearer - you know exactly which line failed
     * 3. Variables are in scope - no need to pass through chains
     * 4. Debugging is easier - stack traces are meaningful
     * 5. Conditional logic is natural (if/else works normally)
     * 
     * GOTCHAS:
     * - Can only use `await` inside `async` functions
     * - `await` makes code sequential - use Promise.all() for parallel
     * - Forgetting `await` is a common bug (returns Promise instead of value)
     */
    async demoNewPattern(): Promise<void> {
        this.newPatternLoading = true;
        this.patternResult = null;
        const startTime = Date.now();

        try {
            // 🟢 NEW WAY: Clean sequential code that reads top-to-bottom
            // Each await PAUSES here until the Promise resolves

            // Step 1: await pauses until simulateApiCall resolves
            const userData = await this.simulateApiCall('User Data', 500);
            console.log('[New Pattern] Step 1: Got user data');
            // userData is now available as a regular variable!

            // Step 2: This won't run until Step 1 completes
            const orderData = await this.simulateApiCall('Order Data', 300);
            console.log('[New Pattern] Step 2: Got order data');
            // Both userData AND orderData are in scope here

            // Step 3: Final call
            const finalResult = await this.simulateApiCall('Final Result', 200);
            console.log('[New Pattern] Step 3: Complete!');

            this.patternResult = {
                pattern: 'New Pattern (async/await)',
                success: true,
                message: 'All 3 steps completed successfully',
                time: Date.now() - startTime
            };
        } catch (error) {
            // catch block catches any rejected Promise from the try block
            // The error contains the actual error from whichever line failed
            this.patternResult = {
                pattern: 'New Pattern',
                success: false,
                message: `Error: ${error}`,
                time: Date.now() - startTime
            };
        } finally {
            // finally block ALWAYS runs - same as .finally() in old pattern
            // Perfect for cleanup: hiding loaders, closing connections, etc.
            this.newPatternLoading = false;
            console.log('[New Pattern] Cleanup in finally block');
        }
    }

    // =========================================================================
    // USE CASE 3: PROMISE.ALL - Parallel with fail-fast
    // =========================================================================
    /**
     * 🚀 Promise.all() - PARALLEL EXECUTION WITH FAIL-FAST
     * 
     * WHAT IT IS:
     * Runs multiple Promises IN PARALLEL and waits for ALL to complete.
     * Returns an array of results in the same order as input Promises.
     * 
     * HOW IT WORKS:
     * - All Promises start executing IMMEDIATELY (not sequentially!)
     * - Waits until ALL Promises resolve
     * - Returns array of results in ORDER (not completion order)
     * - If ANY Promise rejects → entire Promise.all rejects IMMEDIATELY
     * 
     * PERFORMANCE BENEFIT:
     * Sequential: API1(300ms) → API2(500ms) → API3(400ms) = 1200ms total
     * Parallel:   [API1, API2, API3] = ~500ms total (slowest one)
     * 
     * USE CASES:
     * - Dashboard loading (need ALL data before rendering)
     * - Form validation (all fields must pass)
     * - Initializing app (load config, user, permissions together)
     * 
     * WHEN NOT TO USE:
     * - When partial results are acceptable → use Promise.allSettled()
     * - When you need first result → use Promise.race()
     * - When calls depend on each other → use sequential await
     */
    async demoPromiseAll(shouldFail: boolean): Promise<void> {
        this.promiseAllLoading = true;
        this.promiseAllResult = null;
        const startTime = Date.now();

        try {
            // Create array of Promises - they start executing NOW!
            // Not when we call Promise.all(), but when we create them
            const promises = [
                this.simulateApiCallWithResult('Users API', 300),     // 300ms
                this.simulateApiCallWithResult('Products API', 500),  // 500ms (slowest)
                shouldFail
                    ? this.simulateApiError('Orders API (FAILS)', 200)  // Fails at 200ms!
                    : this.simulateApiCallWithResult('Orders API', 400) // 400ms
            ];

            // Promise.all waits for ALL to complete
            // Results array is in SAME ORDER as input, not completion order
            // If shouldFail=true, this rejects after ~200ms (when Orders fails)
            // Even though other requests might still be running!
            const results = await Promise.all(promises);

            // This only runs if ALL succeeded
            // results = [UsersResult, ProductsResult, OrdersResult]
            this.promiseAllResult = {
                success: true,
                message: `All ${results.length} APIs responded successfully!`,
                results: results as ApiResult[]
            };
        } catch (error: any) {
            // FAIL-FAST: We get here as soon as ANY Promise rejects
            // The other Promises might still be running (but we ignore them)
            // Note: Those Promises are NOT cancelled - they just complete in background
            this.promiseAllResult = {
                success: false,
                message: `Failed at ${Date.now() - startTime}ms - ${error.message}. Other requests were abandoned.`
            };
        } finally {
            this.promiseAllLoading = false;
        }
    }

    // =========================================================================
    // USE CASE 4: PROMISE.ALLSETTLED - Wait for all, get individual results
    // =========================================================================
    /**
     * 📊 Promise.allSettled() - PARALLEL EXECUTION, NO FAIL-FAST
     * 
     * WHAT IT IS:
     * Runs multiple Promises in parallel and waits for ALL to complete,
     * regardless of whether they succeed or fail.
     * 
     * HOW IT WORKS:
     * - All Promises start executing in parallel
     * - NEVER rejects - always resolves with array of results
     * - Each result has: { status: 'fulfilled' | 'rejected', value/reason }
     * - Results are in same order as input Promises
     * 
     * RESULT FORMAT:
     * [
     *   { status: 'fulfilled', value: actualData },
     *   { status: 'rejected', reason: Error },
     *   { status: 'fulfilled', value: actualData }
     * ]
     * 
     * USE CASES:
     * - Batch operations where partial success is OK
     * - Logging/analytics (want all results for reporting)
     * - Multiple API sources where some failures are acceptable
     * - "Best effort" data fetching
     * 
     * DIFFERENCE FROM Promise.all():
     * - Promise.all() → fails fast on first rejection
     * - Promise.allSettled() → waits for ALL, reports individual status
     */
    async demoPromiseAllSettled(): Promise<void> {
        this.allSettledLoading = true;
        this.allSettledResults = [];

        const promises = [
            this.simulateApiCallWithResult('Primary Server', 300),   // Will succeed
            this.simulateApiError('Backup Server (Down)', 200),      // Will FAIL
            this.simulateApiCallWithResult('CDN Server', 400)        // Will succeed
        ];

        // Promise.allSettled NEVER rejects!
        // It waits for ALL Promises and returns status of each
        // Even though Backup Server fails, we still get Primary and CDN results
        const results = await Promise.allSettled(promises);

        // Process each result individually
        // We can check status and handle fulfilled/rejected differently
        this.allSettledResults = results.map((result, index) => {
            const sources = ['Primary Server', 'Backup Server', 'CDN Server'];

            if (result.status === 'fulfilled') {
                // Promise resolved successfully
                // result.value contains the resolved value
                return {
                    status: 'fulfilled',
                    source: sources[index],
                    value: `Response received in ${(result.value as ApiResult).time}ms`
                };
            } else {
                // Promise was rejected
                // result.reason contains the rejection reason (usually Error)
                return {
                    status: 'rejected',
                    source: sources[index],
                    reason: result.reason?.message || 'Unknown error'
                };
            }
        });

        this.allSettledLoading = false;
    }

    // =========================================================================
    // USE CASE 5: PROMISE.RACE - First to complete wins
    // =========================================================================
    /**
     * 🏁 Promise.race() - FIRST RESPONSE WINS
     * 
     * WHAT IT IS:
     * Runs multiple Promises in parallel and returns the result
     * of whichever Promise completes FIRST (success OR failure).
     * 
     * HOW IT WORKS:
     * - All Promises start executing in parallel
     * - Returns as soon as ANY Promise settles (resolves or rejects)
     * - Other Promises keep running but their results are ignored
     * - If first to complete rejects → Promise.race rejects
     * 
     * COMMON USE CASES:
     * 
     * 1. TIMEOUT PATTERN:
     *    Promise.race([
     *        fetchData(),                              // Actual work
     *        new Promise((_, reject) => 
     *            setTimeout(() => reject('Timeout'), 5000))  // Timeout
     *    ]);
     * 
     * 2. FASTEST SERVER:
     *    Promise.race([
     *        fetchFromCDN1(),   // Race to see
     *        fetchFromCDN2(),   // which CDN
     *        fetchFromCDN3()    // is fastest
     *    ]);
     * 
     * 3. CONNECTION QUALITY TEST:
     *    Check which region responds fastest
     * 
     * GOTCHA:
     * If first Promise to complete REJECTS, Promise.race rejects!
     * Use Promise.any() if you want first SUCCESS to win.
     */
    async demoPromiseRace(): Promise<void> {
        this.raceLoading = true;
        this.raceResult = null;
        const startTime = Date.now();

        // Two servers with different response times
        const promises = [
            this.simulateApiCallWithResult('Fast Server', 200),   // 200ms - WINS!
            this.simulateApiCallWithResult('Slow Server', 800)    // 800ms - Ignored
        ];

        // Promise.race returns as soon as FIRST Promise completes
        // Fast Server wins at ~200ms
        // Slow Server keeps running but we ignore its result
        const winner = await Promise.race(promises) as ApiResult;

        this.raceResult = {
            winner: winner.source,
            time: Date.now() - startTime,
            message: 'Other request was abandoned'
        };

        this.raceLoading = false;
    }

    // =========================================================================
    // USE CASE 6: REAL-WORLD CHECKOUT FLOW (Chained/Sequential Promises)
    // =========================================================================
    /**
     * 🛒 REAL-WORLD: CHECKOUT FLOW (Sequential Promises)
     * 
     * WHAT THIS DEMONSTRATES:
     * A real e-commerce checkout flow where each step MUST complete
     * before the next can start (sequential/dependent operations).
     * 
     * WHY SEQUENTIAL?
     * - Step 2 needs Step 1's result (can't check inventory without cart)
     * - Step 3 needs Step 2's result (can't charge if items not available)
     * - Each step is a transaction boundary (can rollback cleanly)
     * 
     * FLOW:
     * 1. Validate Cart → ensures items exist and prices are current
     * 2. Check Inventory → reserve items before payment
     * 3. Process Payment → charge customer's card
     * 4. Create Order → record the order in database
     * 5. Send Confirmation → email receipt to customer
     * 
     * ERROR HANDLING:
     * - If ANY step fails, we stop immediately
     * - Previous successful steps may need rollback (not shown here)
     * - User sees exactly which step failed
     * 
     * COMPARISON TO Promise.all():
     * - Promise.all() → parallel, independent operations
     * - Sequential await → dependent, ordered operations
     * Choose based on whether steps depend on each other!
     */
    async startCheckoutFlow(): Promise<void> {
        this.checkoutLoading = true;
        this.resetCheckoutSteps();

        try {
            // Each step WAITS for previous to complete before starting
            // This is intentional - we NEED each step's result before proceeding

            // Step 1: Validate Cart - ensure items exist and prices are correct
            await this.runCheckoutStep(0, 'Validating cart items...', 500);

            // Step 2: Check Inventory - can only do this AFTER we know what's in cart
            await this.runCheckoutStep(1, 'Checking stock availability...', 800);

            // Step 3: Process Payment - only charge if items are available
            await this.runCheckoutStep(2, 'Processing payment...', 1200);

            // Step 4: Create Order - only after payment succeeds
            await this.runCheckoutStep(3, 'Creating order #' + Math.floor(Math.random() * 10000), 600);

            // Step 5: Send Confirmation - only after order is created
            await this.runCheckoutStep(4, 'Email sent to customer', 400);

            // If we get here, ALL steps succeeded!

        } catch (error: any) {
            // If ANY step fails, we end up here
            // The try block stops execution at the failed step
            const runningStep = this.checkoutSteps.find(s => s.status === 'running');
            if (runningStep) {
                runningStep.status = 'error';
                runningStep.message = error.message;
            }
            // In real app: would trigger rollback of previous steps
        } finally {
            this.checkoutLoading = false;
        }
    }

    // =========================================================================
    // HELPER METHODS
    // =========================================================================

    /**
     * Simulates an API call that resolves after a delay.
     * Used to demonstrate Promise behavior without actual network calls.
     */
    private simulateApiCall(name: string, delayMs: number): Promise<string> {
        return new Promise((resolve) => {
            setTimeout(() => resolve(`${name} loaded`), delayMs);
        });
    }

    /**
     * Simulates an API call that returns a structured result.
     * Tracks timing to demonstrate parallel vs sequential performance.
     */
    private simulateApiCallWithResult(source: string, delayMs: number): Promise<ApiResult> {
        return new Promise((resolve) => {
            const startTime = Date.now();
            setTimeout(() => {
                resolve({
                    source,
                    data: { items: Math.floor(Math.random() * 100) },
                    time: Date.now() - startTime
                });
            }, delayMs);
        });
    }

    /**
     * Simulates an API call that fails.
     * Used to demonstrate error handling in Promise.all vs Promise.allSettled.
     */
    private simulateApiError(source: string, delayMs: number): Promise<never> {
        return new Promise((_, reject) => {
            setTimeout(() => {
                reject(new Error(`${source} failed`));
            }, delayMs);
        });
    }

    /**
     * Resets all checkout steps to pending state.
     */
    private resetCheckoutSteps(): void {
        this.checkoutSteps = this.checkoutSteps.map(step => ({
            ...step,
            status: 'pending',
            message: undefined
        }));
    }

    /**
     * Runs a single checkout step with visual feedback.
     * Simulates processing time and updates UI state.
     */
    private async runCheckoutStep(index: number, message: string, delayMs: number): Promise<void> {
        this.checkoutSteps[index].status = 'running';
        this.checkoutSteps[index].message = 'Processing...';

        await new Promise(resolve => setTimeout(resolve, delayMs));

        this.checkoutSteps[index].status = 'success';
        this.checkoutSteps[index].message = message;
    }
}
