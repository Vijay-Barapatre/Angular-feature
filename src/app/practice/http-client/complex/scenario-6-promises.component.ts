/**
 * ============================================================================
 * COMPLEX SCENARIO 6: PROMISE PATTERNS (Promise.all, allSettled, race)
 * ============================================================================
 * 
 * 🎯 OBJECTIVE:
 * Master different Promise patterns for various real-world scenarios.
 * 
 * 📋 SCENARIOS:
 * 1. Promise.all() - Load dashboard (all must succeed)
 * 2. Promise.allSettled() - Batch operations (partial success OK)
 * 3. Promise.race() - Timeout pattern
 * 4. Promise.any() - Multiple sources, first success wins
 * 
 * 💡 KEY INSIGHT:
 * In Angular, convert Observable → Promise using lastValueFrom()
 */

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, of, delay, throwError } from 'rxjs';

interface BatchResult {
    id: number;
    status: 'success' | 'failed';
    message: string;
}

@Component({
    selector: 'app-scenario-6-promises',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="exercise-container">
            <div class="exercise-header">
                <h2>📝 Scenario 6: Promise Patterns</h2>
                <span class="difficulty complex">Complex</span>
            </div>

            <div class="instructions">
                <h3>📋 Overview</h3>
                <p>Practice different Promise patterns for real-world scenarios.</p>
            </div>

            <!-- Scenario 1: Promise.all -->
            <section class="scenario">
                <h3>1️⃣ Promise.all() - Dashboard Loading</h3>
                <p>All requests must succeed. If any fails, everything fails.</p>
                <div class="controls">
                    <button (click)="demoPromiseAll(false)" [disabled]="loading1" class="btn success">
                        {{ loading1 ? '⏳...' : '✅ All Succeed' }}
                    </button>
                    <button (click)="demoPromiseAll(true)" [disabled]="loading1" class="btn danger">
                        {{ loading1 ? '⏳...' : '❌ One Fails' }}
                    </button>
                </div>
                @if (result1) {
                    <div class="result" [class.success]="result1.success" [class.error]="!result1.success">
                        <strong>{{ result1.success ? '✅ Success' : '❌ Failed' }}</strong>
                        <p>{{ result1.message }}</p>
                        <code>Time: {{ result1.time }}ms</code>
                    </div>
                }
                <div class="code-hint">
                    <pre><code>const [users, products, orders] = await Promise.all([
    lastValueFrom(this.http.get('/api/users')),
    lastValueFrom(this.http.get('/api/products')),
    lastValueFrom(this.http.get('/api/orders'))
]);</code></pre>
                </div>
            </section>

            <!-- Scenario 2: Promise.allSettled -->
            <section class="scenario">
                <h3>2️⃣ Promise.allSettled() - Batch Operations</h3>
                <p>Get results for ALL operations, even if some fail.</p>
                <button (click)="demoPromiseAllSettled()" [disabled]="loading2" class="btn primary">
                    {{ loading2 ? '⏳ Processing...' : '🔄 Process Batch (3 items, 1 will fail)' }}
                </button>
                @if (batchResults.length > 0) {
                    <div class="batch-results">
                        @for (result of batchResults; track result.id) {
                            <div class="batch-item" [class.success]="result.status === 'success'" [class.failed]="result.status === 'failed'">
                                <span class="icon">{{ result.status === 'success' ? '✅' : '❌' }}</span>
                                <span>Item {{ result.id }}</span>
                                <span class="message">{{ result.message }}</span>
                            </div>
                        }
                    </div>
                }
                <div class="code-hint">
                    <pre><code>const results = await Promise.allSettled([
    processItem(1),
    processItem(2),  // This will fail
    processItem(3)
]);

results.forEach(result => {{ '{' }}
    if (result.status === 'fulfilled') {{ '{' }}
        console.log('Success:', result.value);
    {{ '}' }} else {{ '{' }}
        console.log('Failed:', result.reason);
    {{ '}' }}
{{ '}' }});</code></pre>
                </div>
            </section>

            <!-- Scenario 3: Promise.race -->
            <section class="scenario">
                <h3>3️⃣ Promise.race() - Timeout Pattern</h3>
                <p>Race between API call and timeout. First to complete wins!</p>
                <div class="controls">
                    <label>
                        Timeout (ms):
                        <input type="number" [(ngModel)]="timeoutMs" min="100" max="2000" step="100" class="timeout-input">
                    </label>
                    <button (click)="demoPromiseRace()" [disabled]="loading3" class="btn primary">
                        {{ loading3 ? '⏳ Racing...' : '🏁 Race: API (1000ms) vs Timeout' }}
                    </button>
                </div>
                @if (result3) {
                    <div class="result" [class.success]="result3.winner === 'api'" [class.error]="result3.winner === 'timeout'">
                        <strong>🏆 Winner: {{ result3.winner === 'api' ? 'API Response' : 'Timeout' }}</strong>
                        <p>{{ result3.message }}</p>
                    </div>
                }
                <div class="code-hint">
                    <pre><code>const result = await Promise.race([
    fetchData(),                                    // API call
    new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), 5000)
    )
]);</code></pre>
                </div>
            </section>

            <!-- Scenario 4: Sequential with async/await -->
            <section class="scenario">
                <h3>4️⃣ Sequential Promises - Checkout Flow</h3>
                <p>Each step depends on the previous. Order matters!</p>
                <button (click)="demoSequentialFlow()" [disabled]="loading4" class="btn primary">
                    {{ loading4 ? '⏳ Processing...' : '🛒 Start Checkout Flow' }}
                </button>
                <div class="flow-steps">
                    @for (step of checkoutSteps; track step.name) {
                        <div class="flow-step" [class]="step.status">
                            <span class="step-icon">
                                {{ step.status === 'pending' ? '⏸️' : step.status === 'running' ? '⏳' : step.status === 'success' ? '✅' : '❌' }}
                            </span>
                            <span>{{ step.name }}</span>
                            @if (step.message) {
                                <small>{{ step.message }}</small>
                            }
                        </div>
                    }
                </div>
                <div class="code-hint">
                    <pre><code>async checkout() {{ '{' }}
    const cart = await validateCart();       // Step 1
    const inventory = await checkStock(cart); // Step 2 (needs cart)
    const payment = await chargeCard();       // Step 3
    const order = await createOrder(payment); // Step 4 (needs payment)
    await sendConfirmation(order);            // Step 5 (needs order)
{{ '}' }}</code></pre>
                </div>
            </section>

            <!-- Quick Reference -->
            <section class="reference">
                <h3>📚 When to Use Each Pattern</h3>
                <div class="reference-grid">
                    <div class="ref-card">
                        <code>Promise.all()</code>
                        <p>Need ALL results, fail-fast</p>
                        <span class="example">Dashboard, Init</span>
                    </div>
                    <div class="ref-card">
                        <code>Promise.allSettled()</code>
                        <p>Need all results, even failures</p>
                        <span class="example">Batch ops, Analytics</span>
                    </div>
                    <div class="ref-card">
                        <code>Promise.race()</code>
                        <p>First to complete wins</p>
                        <span class="example">Timeouts, Fastest CDN</span>
                    </div>
                    <div class="ref-card">
                        <code>Sequential await</code>
                        <p>Steps depend on each other</p>
                        <span class="example">Checkout, Wizard</span>
                    </div>
                </div>
            </section>
        </div>
    `,
    styles: [`
        .exercise-container { padding: 1.5rem; max-width: 1000px; margin: 0 auto; }
        .exercise-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
        .exercise-header h2 { margin: 0; color: var(--text-primary, #f1f5f9); }
        .difficulty { padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; }
        .difficulty.complex { background: #f59e0b; color: white; }

        .instructions { background: var(--bg-secondary, #1e293b); padding: 1rem; border-radius: 8px; margin-bottom: 1rem; }
        .instructions h3 { margin: 0 0 0.5rem 0; color: var(--text-primary, #f1f5f9); }
        .instructions p { color: var(--text-secondary, #cbd5e1); margin: 0; }

        .scenario { background: var(--bg-secondary, #1e293b); padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem; border-left: 4px solid #667eea; }
        .scenario h3 { margin: 0 0 0.5rem 0; color: var(--text-primary, #f1f5f9); }
        .scenario > p { color: var(--text-secondary, #cbd5e1); margin-bottom: 1rem; }

        .controls { display: flex; gap: 1rem; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; }
        .controls label { color: var(--text-primary, #f1f5f9); display: flex; align-items: center; gap: 0.5rem; }
        .timeout-input { width: 80px; padding: 0.5rem; border-radius: 4px; background: var(--bg-card, #334155); color: var(--text-primary, #f1f5f9); border: 1px solid #667eea; }

        .btn { padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer; font-size: 0.9rem; }
        .btn.primary { background: linear-gradient(135deg, #667eea, #764ba2); color: white; }
        .btn.success { background: #10b981; color: white; }
        .btn.danger { background: #ef4444; color: white; }
        .btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .result { padding: 1rem; border-radius: 6px; margin: 1rem 0; }
        .result.success { background: rgba(16, 185, 129, 0.2); border: 1px solid #10b981; }
        .result.error { background: rgba(239, 68, 68, 0.2); border: 1px solid #ef4444; }
        .result strong { color: var(--text-primary, #f1f5f9); }
        .result p { color: var(--text-secondary, #cbd5e1); margin: 0.5rem 0; }
        .result code { color: var(--text-muted, #94a3b8); font-size: 0.8rem; }

        .batch-results { margin: 1rem 0; }
        .batch-item { display: flex; align-items: center; gap: 1rem; padding: 0.75rem; background: var(--bg-card, #334155); border-radius: 6px; margin-bottom: 0.5rem; }
        .batch-item.success { border-left: 4px solid #10b981; }
        .batch-item.failed { border-left: 4px solid #ef4444; }
        .batch-item span { color: var(--text-secondary, #cbd5e1); }
        .batch-item .message { flex: 1; text-align: right; color: var(--text-muted, #94a3b8); font-size: 0.85rem; }

        .flow-steps { margin: 1rem 0; display: flex; flex-direction: column; gap: 0.5rem; }
        .flow-step { display: flex; align-items: center; gap: 1rem; padding: 0.75rem; background: var(--bg-card, #334155); border-radius: 6px; }
        .flow-step.running { background: rgba(102, 126, 234, 0.2); border: 1px solid #667eea; }
        .flow-step.success { border-left: 4px solid #10b981; }
        .flow-step.error { border-left: 4px solid #ef4444; }
        .flow-step span { color: var(--text-primary, #f1f5f9); }
        .flow-step small { margin-left: auto; color: var(--text-muted, #94a3b8); }

        .code-hint { margin-top: 1rem; }
        .code-hint pre { background: #0f172a; color: #4ade80; padding: 1rem; border-radius: 6px; overflow-x: auto; font-size: 0.75rem; margin: 0; }

        .reference { background: var(--bg-secondary, #1e293b); padding: 1.5rem; border-radius: 8px; }
        .reference h3 { margin: 0 0 1rem 0; color: var(--text-primary, #f1f5f9); }
        .reference-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        .ref-card { background: var(--bg-card, #334155); padding: 1rem; border-radius: 8px; text-align: center; }
        .ref-card code { color: #667eea; font-size: 0.85rem; }
        .ref-card p { color: var(--text-secondary, #cbd5e1); margin: 0.5rem 0; font-size: 0.8rem; }
        .ref-card .example { color: var(--text-muted, #94a3b8); font-size: 0.7rem; }

        @media (max-width: 768px) {
            .reference-grid { grid-template-columns: repeat(2, 1fr); }
        }
    `]
})
export class Scenario6PromisesComponent {
    // State for each scenario
    loading1 = false;
    loading2 = false;
    loading3 = false;
    loading4 = false;

    result1: { success: boolean; message: string; time: number } | null = null;
    batchResults: BatchResult[] = [];
    result3: { winner: string; message: string } | null = null;

    timeoutMs = 500;

    checkoutSteps = [
        { name: '1. Validate Cart', status: 'pending', message: '' },
        { name: '2. Check Inventory', status: 'pending', message: '' },
        { name: '3. Process Payment', status: 'pending', message: '' },
        { name: '4. Create Order', status: 'pending', message: '' },
        { name: '5. Send Confirmation', status: 'pending', message: '' }
    ];

    // =========================================================================
    // SCENARIO 1: Promise.all() - All must succeed
    // =========================================================================
    async demoPromiseAll(shouldFail: boolean): Promise<void> {
        this.loading1 = true;
        this.result1 = null;
        const startTime = Date.now();

        try {
            // Create promise array - all start executing immediately
            const promises = [
                this.simulateApi('Users', 300, false),
                this.simulateApi('Products', 500, false),
                this.simulateApi('Orders', 400, shouldFail)  // May fail
            ];

            // Promise.all waits for ALL, fails fast on any rejection
            const results = await Promise.all(promises);

            this.result1 = {
                success: true,
                message: `Loaded ${results.length} resources successfully`,
                time: Date.now() - startTime
            };
        } catch (error: any) {
            this.result1 = {
                success: false,
                message: `Failed: ${error.message} (other requests abandoned)`,
                time: Date.now() - startTime
            };
        } finally {
            this.loading1 = false;
        }
    }

    // =========================================================================
    // SCENARIO 2: Promise.allSettled() - Get all results
    // =========================================================================
    async demoPromiseAllSettled(): Promise<void> {
        this.loading2 = true;
        this.batchResults = [];

        const promises = [
            this.simulateApi('Item 1', 300, false),
            this.simulateApi('Item 2', 200, true),   // This one fails!
            this.simulateApi('Item 3', 400, false)
        ];

        // allSettled waits for ALL and never rejects
        const results = await Promise.allSettled(promises);

        this.batchResults = results.map((result, index) => ({
            id: index + 1,
            status: result.status === 'fulfilled' ? 'success' : 'failed',
            message: result.status === 'fulfilled'
                ? `Completed in ${result.value}ms`
                : `Error: ${(result.reason as Error).message}`
        }));

        this.loading2 = false;
    }

    // =========================================================================
    // SCENARIO 3: Promise.race() - First to complete wins
    // =========================================================================
    async demoPromiseRace(): Promise<void> {
        this.loading3 = true;
        this.result3 = null;

        const apiCall = this.simulateApi('API Response', 1000, false);
        const timeout = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), this.timeoutMs)
        );

        try {
            await Promise.race([apiCall, timeout]);
            this.result3 = {
                winner: 'api',
                message: `API responded in time (before ${this.timeoutMs}ms timeout)`
            };
        } catch (error: any) {
            this.result3 = {
                winner: 'timeout',
                message: `Timeout won! API took too long (>${this.timeoutMs}ms)`
            };
        } finally {
            this.loading3 = false;
        }
    }

    // =========================================================================
    // SCENARIO 4: Sequential Flow
    // =========================================================================
    async demoSequentialFlow(): Promise<void> {
        this.loading4 = true;
        this.resetCheckoutSteps();

        try {
            await this.runStep(0, 'Cart validated', 500);
            await this.runStep(1, 'Stock reserved', 600);
            await this.runStep(2, 'Payment processed', 800);
            await this.runStep(3, 'Order #' + Math.floor(Math.random() * 10000), 400);
            await this.runStep(4, 'Email sent', 300);
        } catch (error: any) {
            // Handle error - step already marked as failed
        } finally {
            this.loading4 = false;
        }
    }

    // Helper methods
    private simulateApi(name: string, delayMs: number, shouldFail: boolean): Promise<number> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (shouldFail) {
                    reject(new Error(`${name} failed`));
                } else {
                    resolve(delayMs);
                }
            }, delayMs);
        });
    }

    private resetCheckoutSteps(): void {
        this.checkoutSteps = this.checkoutSteps.map(step => ({
            ...step,
            status: 'pending',
            message: ''
        }));
    }

    private async runStep(index: number, message: string, delayMs: number): Promise<void> {
        this.checkoutSteps[index].status = 'running';
        this.checkoutSteps[index].message = 'Processing...';

        await new Promise(resolve => setTimeout(resolve, delayMs));

        this.checkoutSteps[index].status = 'success';
        this.checkoutSteps[index].message = message;
    }
}
