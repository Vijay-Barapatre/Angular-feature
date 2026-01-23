import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-async-await',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="demo-container">
            <h2>⏳ Async/Await & Promises</h2>
            <p class="subtitle">5 Different Ways to Handle Asynchronous Operations</p>
            
            <!-- Way 1: Callbacks (Old Way) -->
            <section class="demo-section old">
                <h3>1️⃣ Callbacks (Legacy - Avoid)</h3>
                <pre><code>// ❌ Callback Hell
fetchUser(userId, (user) => &#123;
    fetchOrders(user.id, (orders) => &#123;
        fetchItems(orders[0].id, (items) => &#123;
            console.log(items);  // Deep nesting!
        &#125;);
    &#125;);
&#125;);</code></pre>
            </section>

            <!-- Way 2: Promise with .then() -->
            <section class="demo-section">
                <h3>2️⃣ Promise with .then() Chaining</h3>
                <pre><code>// Creating a Promise
const fetchData = () => new Promise((resolve, reject) => &#123;
    setTimeout(() => &#123;
        const success = true;
        if (success) &#123;
            resolve(&#123; data: 'Loaded!' &#125;);
        &#125; else &#123;
            reject(new Error('Failed'));
        &#125;
    &#125;, 1000);
&#125;);

// Using Promise chain
fetchData()
    .then(result => &#123;
        console.log(result.data);
        return anotherAsyncCall();
    &#125;)
    .then(data => processData(data))
    .catch(err => console.error(err))
    .finally(() => console.log('Done'));</code></pre>
            </section>

            <!-- Way 3: Async/Await -->
            <section class="demo-section recommended">
                <h3>3️⃣ Async/Await (Recommended ✅)</h3>
                <pre><code>// Clean, readable syntax
async function loadUserData() &#123;
    try &#123;
        const user = await fetchUser(userId);
        const orders = await fetchOrders(user.id);
        const items = await fetchItems(orders[0].id);
        
        return &#123; user, orders, items &#125;;
    &#125; catch (error) &#123;
        console.error('Failed:', error);
        throw error;
    &#125; finally &#123;
        setLoading(false);
    &#125;
&#125;

// Arrow function version
const getUserData = async (id: string) => &#123;
    const user = await userService.getById(id);
    return user;
&#125;;</code></pre>
                <div class="demo-area">
                    <button class="btn" (click)="simulateAsyncAwait()" [disabled]="loading()">
                        {{ loading() ? 'Loading...' : 'Try Async/Await' }}
                    </button>
                    <p *ngIf="result()">{{ result() }}</p>
                </div>
            </section>

            <!-- Way 4: Parallel Execution -->
            <section class="demo-section">
                <h3>4️⃣ Parallel Execution with Promise.all()</h3>
                <pre><code>// ❌ Sequential (SLOW) - 3 seconds total
const users = await fetchUsers();     // 1s
const products = await fetchProducts(); // 1s  
const orders = await fetchOrders();    // 1s

// ✅ Parallel (FAST) - 1 second total
const [users, products, orders] = await Promise.all([
    fetchUsers(),
    fetchProducts(),
    fetchOrders()
]);

// Promise.allSettled - doesn't fail if one rejects
const results = await Promise.allSettled([
    fetchCriticalData(),
    fetchOptionalData()  // Won't break if this fails
]);

// Promise.race - first one wins
const fastest = await Promise.race([
    fetchFromServer1(),
    fetchFromServer2()
]);</code></pre>
            </section>

            <!-- Way 5: Error Handling Patterns -->
            <section class="demo-section">
                <h3>5️⃣ Error Handling Patterns</h3>
                <pre><code>// Pattern 1: Try/Catch
async function withTryCatch() &#123;
    try &#123;
        const data = await riskyOperation();
        return &#123; success: true, data &#125;;
    &#125; catch (error) &#123;
        return &#123; success: false, error &#125;;
    &#125;
&#125;

// Pattern 2: Wrapper function (Go-style)
async function safeAsync&lt;T&gt;(
    promise: Promise&lt;T&gt;
): Promise&lt;[T | null, Error | null]&gt; &#123;
    try &#123;
        const data = await promise;
        return [data, null];
    &#125; catch (error) &#123;
        return [null, error as Error];
    &#125;
&#125;

// Usage
const [user, error] = await safeAsync(fetchUser(id));
if (error) &#123;
    console.error('Failed to fetch user');
&#125;</code></pre>
            </section>

            <!-- Angular Examples -->
            <section class="angular-section">
                <h3>🅰️ Async Patterns in Angular</h3>
                <pre><code>// Method 1: Using firstValueFrom (Promise from Observable)
async loadData(): Promise&lt;void&gt; &#123;
    const users = await firstValueFrom(this.http.get&lt;User[]&gt;('/api/users'));
    this.users = users;
&#125;

// Method 2: Observable with async pipe (Preferred)
// Component: users$ = this.http.get&lt;User[]&gt;('/api/users');
// Template: *ngFor="let user of users$ | async"

// Method 3: Route Resolver
resolve(): Observable&lt;User&gt; | Promise&lt;User&gt; &#123;
    return firstValueFrom(this.userService.getUser());
&#125;

// Method 4: ngOnInit with async
async ngOnInit(): Promise&lt;void&gt; &#123;
    this.user = await this.loadUser();
&#125;

// Compare: Observable vs Promise
// Observable: Can emit multiple values, cancelable
// Promise: Single value, not cancelable</code></pre>
            </section>
        </div>
    `,
    styles: [`
        .demo-container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        h2 { color: #f7df1e; }
        .subtitle { color: #94a3b8; margin-bottom: 2rem; }
        .demo-section { background: #1e293b; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; }
        .demo-section.old { border-left: 4px solid #ef4444; }
        .demo-section.recommended { border-left: 4px solid #22c55e; }
        h3 { margin: 0 0 1rem; color: #f5f5f5; }
        pre { background: #0d1117; padding: 1rem; border-radius: 8px; overflow-x: auto; margin: 0; }
        code { color: #a6e3a1; font-size: 0.85rem; }
        .demo-area { background: #0d1117; padding: 1rem; border-radius: 8px; margin-top: 1rem; }
        .btn { background: #f7df1e; color: #000; border: none; padding: 0.75rem 1.5rem; border-radius: 6px; cursor: pointer; font-weight: 600; }
        .btn:hover:not(:disabled) { background: #e5cd1b; }
        .btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .demo-area p { color: #22c55e; margin-top: 1rem; font-weight: 500; }
        .angular-section { background: linear-gradient(135deg, rgba(221, 0, 49, 0.1), rgba(200, 0, 100, 0.1)); padding: 1.5rem; border-radius: 12px; border: 1px solid rgba(221, 0, 49, 0.3); }
        .angular-section h3 { color: #dd0031; }
    `]
})
export class AsyncAwaitComponent {
    loading = signal(false);
    result = signal('');

    async simulateAsyncAwait() {
        this.loading.set(true);
        this.result.set('');

        try {
            // Simulate API call with async/await
            await new Promise(resolve => setTimeout(resolve, 1500));
            this.result.set('✅ Data fetched successfully using async/await!');
        } catch (error) {
            this.result.set('❌ Error occurred');
        } finally {
            this.loading.set(false);
        }
    }
}
