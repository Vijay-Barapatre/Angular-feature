import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-spread-rest',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="demo-container">
            <h2>✨ Spread & Rest Operators</h2>
            <p class="subtitle">The ... operator for copying, merging, and collecting values</p>
            
            <!-- Demo 1: Spread with Arrays -->
            <section class="demo-section">
                <h3>1️⃣ Spread: Copying Arrays</h3>
                <div class="demo-area">
                    <div class="code-example">
                        <pre><code>const original = [1, 2, 3];
const copy = [...original];           // [1, 2, 3]
const merged = [...original, 4, 5];   // [1, 2, 3, 4, 5]
const combined = [...arr1, ...arr2];  // Merge two arrays</code></pre>
                    </div>
                    <div class="interactive">
                        <p><strong>Original:</strong> {{ originalArray() | json }}</p>
                        <p><strong>With spread:</strong> {{ spreadArray() | json }}</p>
                        <button class="btn" (click)="addToArray()">Add Item</button>
                    </div>
                </div>
            </section>

            <!-- Demo 2: Spread with Objects -->
            <section class="demo-section">
                <h3>2️⃣ Spread: Copying Objects (Critical for NgRx!)</h3>
                <div class="demo-area">
                    <div class="code-example">
                        <pre><code>const user = &#123; name: 'John', age: 30 &#125;;

// Shallow copy
const copy = &#123; ...user &#125;;

// Update immutably (NgRx pattern!)
const updated = &#123; ...user, age: 31 &#125;;

// Merge objects
const merged = &#123; ...user, ...extraData &#125;;</code></pre>
                    </div>
                    <div class="interactive">
                        <p><strong>Original User:</strong> {{ user() | json }}</p>
                        <p><strong>Updated (immutable):</strong> {{ updatedUser() | json }}</p>
                        <button class="btn" (click)="updateAge()">Increment Age</button>
                    </div>
                </div>
            </section>

            <!-- Demo 3: Rest Parameters -->
            <section class="demo-section">
                <h3>3️⃣ Rest: Collecting Remaining Values</h3>
                <div class="demo-area">
                    <div class="code-example">
                        <pre><code>// Rest in function parameters
function sum(...numbers: number[]): number &#123;
    return numbers.reduce((a, b) => a + b, 0);
&#125;
sum(1, 2, 3, 4);  // 10

// Rest in destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
// first = 1, second = 2, rest = [3, 4, 5]

const &#123; id, ...userData &#125; = user;
// Extracts 'id', collects rest in 'userData'</code></pre>
                    </div>
                    <div class="result-box">
                        <p>sum(1, 2, 3) = <strong>{{ calculateSum(1, 2, 3) }}</strong></p>
                        <p>sum(10, 20, 30, 40) = <strong>{{ calculateSum(10, 20, 30, 40) }}</strong></p>
                    </div>
                </div>
            </section>

            <!-- Angular Usage -->
            <section class="angular-section">
                <h3>🅰️ Critical for NgRx/Immutability</h3>
                <div class="code-example">
                    <pre><code>// NgRx Reducer Pattern
on(updateUser, (state, &#123; user &#125;) => (&#123;
    ...state,                              // Copy existing state
    user: &#123;                                // Update user immutably
        ...state.user,
        name: user.name
    &#125;
&#125;))

// Array update (add item)
on(addItem, (state, &#123; item &#125;) => (&#123;
    ...state,
    items: [...state.items, item]          // New array with new item
&#125;))

// Array update (remove item)
on(removeItem, (state, &#123; id &#125;) => (&#123;
    ...state,
    items: state.items.filter(i => i.id !== id)
&#125;))</code></pre>
                </div>
            </section>
        </div>
    `,
    styles: [`
        .demo-container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        h2 { color: #f7df1e; margin-bottom: 0.5rem; }
        .subtitle { color: #94a3b8; margin-bottom: 2rem; }
        .demo-section { background: #1e293b; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; }
        h3 { margin: 0 0 1rem; color: #f5f5f5; }
        .code-example pre { background: #0d1117; padding: 1rem; border-radius: 8px; overflow-x: auto; }
        .code-example code { color: #a6e3a1; font-size: 0.9rem; }
        .interactive { background: #0d1117; padding: 1rem; border-radius: 8px; margin-top: 1rem; }
        .interactive p { margin: 0.5rem 0; color: #e2e8f0; }
        .btn { background: #f7df1e; color: #000; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; margin-top: 0.5rem; }
        .btn:hover { background: #e5cd1b; }
        .result-box { background: #0d1117; padding: 1rem; border-radius: 8px; margin-top: 1rem; }
        .result-box p { color: #e2e8f0; margin: 0.5rem 0; }
        .result-box strong { color: #22c55e; }
        .angular-section { background: linear-gradient(135deg, rgba(221, 0, 49, 0.1), rgba(200, 0, 100, 0.1)); padding: 1.5rem; border-radius: 12px; border: 1px solid rgba(221, 0, 49, 0.3); }
        .angular-section h3 { color: #dd0031; }
    `]
})
export class SpreadRestComponent {
    originalArray = signal([1, 2, 3]);
    spreadArray = signal([...this.originalArray()]);
    user = signal({ name: 'John', age: 30 });
    updatedUser = signal({ ...this.user() });

    addToArray() {
        const newValue = this.originalArray().length + 1;
        this.spreadArray.set([...this.originalArray(), newValue]);
    }

    updateAge() {
        const current = this.user();
        this.updatedUser.set({ ...current, age: current.age + 1 });
    }

    calculateSum(...numbers: number[]): number {
        return numbers.reduce((a, b) => a + b, 0);
    }
}
