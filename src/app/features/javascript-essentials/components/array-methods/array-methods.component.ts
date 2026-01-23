import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-array-methods',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="demo-container">
            <h2>🔄 Array Methods</h2>
            <p class="subtitle">Functional array operations used everywhere in Angular</p>
            
            <!-- Demo 1: map -->
            <section class="demo-section">
                <h3>1️⃣ map() - Transform Each Element</h3>
                <div class="demo-grid">
                    <div class="code-side">
                        <pre><code>const numbers = [1, 2, 3, 4];
const doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8]

// Angular usage
const userNames = users.map(u => u.name);</code></pre>
                    </div>
                    <div class="result-side">
                        <p>Original: {{ numbers | json }}</p>
                        <p>Doubled: <strong>{{ doubledNumbers | json }}</strong></p>
                    </div>
                </div>
            </section>

            <!-- Demo 2: filter -->
            <section class="demo-section">
                <h3>2️⃣ filter() - Select Elements</h3>
                <div class="demo-grid">
                    <div class="code-side">
                        <pre><code>const numbers = [1, 2, 3, 4, 5, 6];
const evens = numbers.filter(n => n % 2 === 0);
// [2, 4, 6]

// Angular usage
const activeUsers = users.filter(u => u.active);</code></pre>
                    </div>
                    <div class="result-side">
                        <p>Original: {{ allNumbers | json }}</p>
                        <p>Evens: <strong>{{ evenNumbers | json }}</strong></p>
                    </div>
                </div>
            </section>

            <!-- Demo 3: reduce -->
            <section class="demo-section">
                <h3>3️⃣ reduce() - Aggregate Values</h3>
                <div class="demo-grid">
                    <div class="code-side">
                        <pre><code>const prices = [10, 20, 30];
const total = prices.reduce((sum, p) => sum + p, 0);
// 60

// NgRx selector pattern
const cartTotal = items.reduce(
    (sum, item) => sum + item.price * item.qty, 0
);</code></pre>
                    </div>
                    <div class="result-side">
                        <p>Prices: {{ prices | json }}</p>
                        <p>Total: <strong>{{ total }}</strong></p>
                    </div>
                </div>
            </section>

            <!-- Demo 4: find & some -->
            <section class="demo-section">
                <h3>4️⃣ find() & some() - Search</h3>
                <pre><code>const users = [&#123;id:1, name:'John'&#125;, &#123;id:2, name:'Jane'&#125;];

// find - returns first match
const user = users.find(u => u.id === 1);  // &#123;id:1, name:'John'&#125;

// findIndex - returns index
const index = users.findIndex(u => u.id === 1);  // 0

// some - check if any match exists
const hasAdmin = users.some(u => u.role === 'admin');  // false

// every - check if all match
const allActive = users.every(u => u.active);  // true/false</code></pre>
            </section>

            <!-- Chaining -->
            <section class="demo-section">
                <h3>5️⃣ Method Chaining (Common Pattern)</h3>
                <pre><code>// Real Angular example
const displayProducts = products
    .filter(p => p.inStock)           // Only in stock
    .filter(p => p.price < 100)       // Under $100
    .map(p => (&#123;                      // Transform shape
        id: p.id,
        name: p.name,
        displayPrice: '$' + p.price
    &#125;))
    .sort((a, b) => a.name.localeCompare(b.name));  // Sort A-Z</code></pre>
            </section>

            <!-- Angular Usage -->
            <section class="angular-section">
                <h3>🅰️ Used Everywhere in Angular</h3>
                <pre><code>// Template ngFor with transformed data
*ngFor="let user of users.filter(u => u.active)"

// RxJS operators (similar concept)
this.users$.pipe(
    map(users => users.filter(u => u.active)),
    map(users => users.map(u => u.name))
);

// NgRx selectors
export const selectActiveUsers = createSelector(
    selectUsers,
    users => users.filter(u => u.active)
);</code></pre>
            </section>
        </div>
    `,
    styles: [`
        .demo-container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        h2 { color: #f7df1e; }
        .subtitle { color: #94a3b8; margin-bottom: 2rem; }
        .demo-section { background: #1e293b; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; }
        h3 { margin: 0 0 1rem; color: #f5f5f5; }
        pre { background: #0d1117; padding: 1rem; border-radius: 8px; overflow-x: auto; margin: 0; }
        code { color: #a6e3a1; font-size: 0.85rem; }
        .demo-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .result-side { background: #0d1117; padding: 1rem; border-radius: 8px; }
        .result-side p { color: #94a3b8; margin: 0.5rem 0; }
        .result-side strong { color: #22c55e; }
        .angular-section { background: linear-gradient(135deg, rgba(221, 0, 49, 0.1), rgba(200, 0, 100, 0.1)); padding: 1.5rem; border-radius: 12px; border: 1px solid rgba(221, 0, 49, 0.3); }
        .angular-section h3 { color: #dd0031; }
    `]
})
export class ArrayMethodsComponent {
    numbers = [1, 2, 3, 4];
    doubledNumbers = this.numbers.map(n => n * 2);

    allNumbers = [1, 2, 3, 4, 5, 6];
    evenNumbers = this.allNumbers.filter(n => n % 2 === 0);

    prices = [10, 20, 30];
    total = this.prices.reduce((sum, p) => sum + p, 0);
}
