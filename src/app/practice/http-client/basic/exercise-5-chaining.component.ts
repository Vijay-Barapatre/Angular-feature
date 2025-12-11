/**
 * ============================================================================
 * BASIC EXERCISE 5: API CHAINING (Sequential Requests)
 * ============================================================================
 * 
 * 🎯 OBJECTIVE:
 * Learn to chain API calls where the second call depends on the first.
 * 
 * 📋 TASK:
 * 1. Fetch a user by ID
 * 2. Use that user's data to fetch their orders
 * 3. Display both user info and orders
 * 
 * 💡 HINTS:
 * - Use concatMap or switchMap to chain observables
 * - The second call needs data from the first
 * - Handle the loading state properly
 */

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap, catchError, delay, map } from 'rxjs';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Order {
    id: number;
    userId: number;
    product: string;
    amount: number;
}

@Component({
    selector: 'app-exercise-5-chaining',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="exercise-container">
            <div class="exercise-header">
                <h2>📝 Exercise 5: API Chaining</h2>
                <span class="difficulty basic">Basic</span>
            </div>

            <div class="instructions">
                <h3>📋 Instructions</h3>
                <p>Implement API chaining where the second call depends on the first:</p>
                <ol>
                    <li>Click "Load User & Orders" to fetch user first, then their orders</li>
                    <li>Use <code>switchMap</code> or <code>concatMap</code> to chain the calls</li>
                    <li>Display loading state while fetching</li>
                </ol>
            </div>

            <div class="workspace">
                <div class="input-section">
                    <label>User ID:</label>
                    <select [(ngModel)]="selectedUserId" class="user-select">
                        <option [value]="1">User 1 (John)</option>
                        <option [value]="2">User 2 (Jane)</option>
                        <option [value]="3">User 3 (Bob)</option>
                    </select>
                    <button (click)="loadUserAndOrders()" [disabled]="loading" class="btn primary">
                        {{ loading ? '⏳ Loading...' : '🔗 Load User & Orders' }}
                    </button>
                </div>

                <div class="output-section">
                    <h4>📊 Results</h4>
                    @if (error) {
                        <div class="error-message">❌ {{ error }}</div>
                    }
                    
                    @if (user) {
                        <div class="user-card">
                            <h5>👤 User Info</h5>
                            <p><strong>Name:</strong> {{ user.name }}</p>
                            <p><strong>Email:</strong> {{ user.email }}</p>
                        </div>
                    }

                    @if (orders.length > 0) {
                        <div class="orders-card">
                            <h5>📦 Orders ({{ orders.length }})</h5>
                            @for (order of orders; track order.id) {
                                <div class="order-item">
                                    <span>{{ order.product }}</span>
                                    <span class="amount">\${{ order.amount }}</span>
                                </div>
                            }
                        </div>
                    }
                </div>

                <div class="chain-visualization">
                    <h4>🔗 Request Chain</h4>
                    <div class="chain-flow">
                        <div class="chain-step" [class.active]="chainStep >= 1" [class.complete]="chainStep > 1">
                            1️⃣ GET /users/:id
                        </div>
                        <span class="arrow">→</span>
                        <div class="chain-step" [class.active]="chainStep >= 2" [class.complete]="chainStep > 2">
                            2️⃣ GET /users/:id/orders
                        </div>
                        <span class="arrow">→</span>
                        <div class="chain-step" [class.complete]="chainStep >= 3">
                            3️⃣ Display Results
                        </div>
                    </div>
                </div>
            </div>

            <div class="code-section">
                <h4>💻 Your Code</h4>
                <pre><code>// TODO: Implement API chaining
// 
// STEP 1: Create method to fetch user
// fetchUser(id: number): Observable&lt;User&gt;
//
// STEP 2: Create method to fetch orders for user
// fetchOrders(userId: number): Observable&lt;Order[]&gt;
//
// STEP 3: Chain them using switchMap
// this.http.get&lt;User&gt;('/api/users/' + id).pipe(
//     switchMap(user =&gt; {{ '{' }}
//         this.user = user;
//         return this.http.get&lt;Order[]&gt;('/api/users/' + user.id + '/orders');
//     {{ '}' }})
// ).subscribe(orders =&gt; this.orders = orders);</code></pre>
            </div>

            <div class="solution-section">
                <button (click)="showSolution = !showSolution" class="btn secondary">
                    {{ showSolution ? '🙈 Hide Solution' : '👀 Show Solution' }}
                </button>
                @if (showSolution) {
                    <div class="solution">
                        <h4>✅ Solution</h4>
                        <pre><code>loadUserAndOrders(): void {{ '{' }}
    this.loading = true;
    this.chainStep = 1;

    // Step 1: Fetch user
    this.fetchUser(this.selectedUserId).pipe(
        // Step 2: Chain to fetch orders (switchMap)
        switchMap(user => {{ '{' }}
            this.user = user;
            this.chainStep = 2;
            return this.fetchOrders(user.id);
        {{ '}' }}),
        catchError(err => {{ '{' }}
            this.error = err.message;
            return of([]);
        {{ '}' }})
    ).subscribe(orders => {{ '{' }}
        this.orders = orders;
        this.chainStep = 3;
        this.loading = false;
    {{ '}' }});
{{ '}' }}

// Key insight: switchMap waits for first Observable,
// then uses its result to create the second Observable</code></pre>
                    </div>
                }
            </div>
        </div>
    `,
    styles: [`
        .exercise-container { padding: 1.5rem; max-width: 900px; margin: 0 auto; }
        .exercise-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
        .exercise-header h2 { margin: 0; color: var(--text-primary, #f1f5f9); }
        .difficulty { padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; }
        .difficulty.basic { background: #10b981; color: white; }

        .instructions { background: var(--bg-secondary, #1e293b); padding: 1rem; border-radius: 8px; margin-bottom: 1rem; }
        .instructions h3 { margin: 0 0 0.5rem 0; color: var(--text-primary, #f1f5f9); }
        .instructions p, .instructions li { color: var(--text-secondary, #cbd5e1); }

        .workspace { background: var(--bg-secondary, #1e293b); padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem; }
        .input-section { display: flex; gap: 1rem; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; }
        .input-section label { color: var(--text-primary, #f1f5f9); }
        .user-select { padding: 0.5rem; border-radius: 6px; background: var(--bg-card, #334155); color: var(--text-primary, #f1f5f9); border: 1px solid #667eea; }

        .btn { padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer; font-size: 0.9rem; }
        .btn.primary { background: linear-gradient(135deg, #667eea, #764ba2); color: white; }
        .btn.secondary { background: var(--bg-card, #334155); color: var(--text-primary, #f1f5f9); border: 1px solid #667eea; }
        .btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .output-section { margin-bottom: 1.5rem; }
        .output-section h4 { color: var(--text-primary, #f1f5f9); margin-bottom: 1rem; }
        .error-message { background: rgba(239, 68, 68, 0.2); color: #ef4444; padding: 1rem; border-radius: 6px; }

        .user-card, .orders-card { background: var(--bg-card, #334155); padding: 1rem; border-radius: 8px; margin-bottom: 1rem; }
        .user-card h5, .orders-card h5 { margin: 0 0 0.5rem 0; color: #667eea; }
        .user-card p { margin: 0.25rem 0; color: var(--text-secondary, #cbd5e1); }
        .order-item { display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid rgba(102, 126, 234, 0.2); color: var(--text-secondary, #cbd5e1); }
        .amount { color: #10b981; font-weight: bold; }

        .chain-visualization { background: var(--bg-card, #334155); padding: 1rem; border-radius: 8px; }
        .chain-visualization h4 { margin: 0 0 1rem 0; color: var(--text-primary, #f1f5f9); }
        .chain-flow { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
        .chain-step { padding: 0.5rem 1rem; background: var(--bg-secondary, #1e293b); border-radius: 6px; color: var(--text-muted, #94a3b8); }
        .chain-step.active { background: rgba(102, 126, 234, 0.3); color: #667eea; }
        .chain-step.complete { background: rgba(16, 185, 129, 0.2); color: #10b981; }
        .arrow { color: #667eea; font-weight: bold; }

        .code-section, .solution-section { background: var(--bg-secondary, #1e293b); padding: 1rem; border-radius: 8px; margin-bottom: 1rem; }
        .code-section h4, .solution-section h4 { margin: 0 0 1rem 0; color: var(--text-primary, #f1f5f9); }
        pre { background: #0f172a; color: #4ade80; padding: 1rem; border-radius: 6px; overflow-x: auto; font-size: 0.8rem; margin: 0; }
        
        .solution { margin-top: 1rem; }
    `]
})
export class Exercise5ChainingComponent {
    private http = inject(HttpClient);

    selectedUserId = 1;
    loading = false;
    chainStep = 0;
    user: User | null = null;
    orders: Order[] = [];
    error = '';
    showSolution = false;

    /**
     * 🔗 CHAINED API CALLS
     * 
     * This demonstrates how to chain API calls where the second
     * call depends on the result of the first.
     * 
     * Pattern: Observable A → switchMap → Observable B
     * 
     * switchMap vs concatMap:
     * - switchMap: Cancels previous inner Observable (good for search)
     * - concatMap: Waits for previous to complete (good for ordered operations)
     */
    loadUserAndOrders(): void {
        this.loading = true;
        this.error = '';
        this.user = null;
        this.orders = [];
        this.chainStep = 1;

        // STEP 1: Fetch user first
        this.fetchUser(this.selectedUserId).pipe(
            // STEP 2: Use switchMap to chain - it receives the user
            // and returns a new Observable (the orders request)
            switchMap(user => {
                this.user = user;  // Save the user
                this.chainStep = 2;
                // Return the orders Observable - switchMap subscribes to it
                return this.fetchOrders(user.id);
            }),
            // Handle any errors in the chain
            catchError(err => {
                this.error = 'Failed to load data: ' + err.message;
                return of([]);  // Return empty orders on error
            })
        ).subscribe({
            next: orders => {
                this.orders = orders;
                this.chainStep = 3;
            },
            complete: () => {
                this.loading = false;
            }
        });
    }

    // Simulated API call - in real app would call this.http.get()
    private fetchUser(id: number): Observable<User> {
        const users: User[] = [
            { id: 1, name: 'John Doe', email: 'john@example.com' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
            { id: 3, name: 'Bob Wilson', email: 'bob@example.com' }
        ];
        return of(users.find(u => u.id === id)!).pipe(delay(800));
    }

    // Simulated API call for orders
    private fetchOrders(userId: number): Observable<Order[]> {
        const allOrders: Order[] = [
            { id: 1, userId: 1, product: 'Laptop', amount: 1299 },
            { id: 2, userId: 1, product: 'Mouse', amount: 49 },
            { id: 3, userId: 2, product: 'Keyboard', amount: 149 },
            { id: 4, userId: 2, product: 'Monitor', amount: 399 },
            { id: 5, userId: 3, product: 'Headphones', amount: 199 }
        ];
        return of(allOrders.filter(o => o.userId === userId)).pipe(delay(600));
    }
}
