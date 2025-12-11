/**
 * ============================================================================
 * 🔍 NgRx Selectors Deep Dive - Educational Component
 * ============================================================================
 * 
 * Selectors are pure functions that extract and derive data from the store.
 * They are the "query layer" of NgRx - like SQL for your state.
 * 
 * ============================================================================
 * 📚 WHY SELECTORS?
 * ============================================================================
 * 
 * 1. MEMOIZATION: Results are cached. If inputs don't change, computation
 *    is skipped and cached value is returned.
 * 
 * 2. COMPOSITION: Selectors can build on other selectors, creating a
 *    hierarchy of derived data.
 * 
 * 3. DECOUPLING: Components don't know state structure. Change state
 *    shape, update selector, components still work.
 * 
 * 4. TESTABILITY: Pure functions are easy to unit test.
 * 
 * ============================================================================
 * 🎯 SELECTOR TYPES
 * ============================================================================
 * 
 * 1. Feature Selector - Gets a slice of root state
 *    createFeatureSelector<UserState>('users')
 * 
 * 2. Simple Selector - Extracts a property
 *    createSelector(selectUserState, state => state.loading)
 * 
 * 3. Composed Selector - Combines multiple selectors
 *    createSelector(selectUsers, selectFilter, (users, filter) => ...)
 * 
 * 4. Parameterized Selector - Takes runtime arguments
 *    selectUserById = (id) => createSelector(...)
 */
import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    quantity: number;
}

interface CartState {
    items: Product[];
    discount: number;
    taxRate: number;
}

@Component({
    selector: 'app-selectors-demo',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule],
    template: `
        <div class="demo-container">
            <header class="demo-header">
                <a routerLink="/ngrx" class="back-link">← Back to NgRx Overview</a>
                <h1>🔍 Use Case 4: Selectors Deep Dive</h1>
                <p>Memoized, Composed, and Parameterized Selectors</p>
            </header>

            <div class="content-grid">
                <!-- CART STATE -->
                <section class="card state-card">
                    <h2>📦 Cart State (Raw)</h2>
                    <div class="code-block">
                        <pre>items: {{ cart().items.length }} products
discount: {{ cart().discount }}%
taxRate: {{ cart().taxRate }}%</pre>
                    </div>
                    <div class="controls">
                        <label>Discount %: <input type="range" min="0" max="50" [ngModel]="cart().discount" (ngModelChange)="setDiscount($event)"></label>
                        <span class="value">{{ cart().discount }}%</span>
                    </div>
                </section>

                <!-- DERIVED VALUES -->
                <section class="card derived-card">
                    <h2>📊 Derived Values (Selectors)</h2>
                    <div class="derived-grid">
                        <div class="derived-item">
                            <span class="label">selectSubtotal</span>
                            <span class="value">\${{ selectSubtotal() | number:'1.2-2' }}</span>
                            <span class="formula">Σ(price × quantity)</span>
                        </div>
                        <div class="derived-item">
                            <span class="label">selectDiscountAmount</span>
                            <span class="value">-\${{ selectDiscountAmount() | number:'1.2-2' }}</span>
                            <span class="formula">subtotal × discount%</span>
                        </div>
                        <div class="derived-item">
                            <span class="label">selectAfterDiscount</span>
                            <span class="value">\${{ selectAfterDiscount() | number:'1.2-2' }}</span>
                            <span class="formula">subtotal - discount</span>
                        </div>
                        <div class="derived-item">
                            <span class="label">selectTax</span>
                            <span class="value">+\${{ selectTax() | number:'1.2-2' }}</span>
                            <span class="formula">afterDiscount × taxRate%</span>
                        </div>
                        <div class="derived-item highlight">
                            <span class="label">selectGrandTotal</span>
                            <span class="value total">\${{ selectGrandTotal() | number:'1.2-2' }}</span>
                            <span class="formula">afterDiscount + tax</span>
                        </div>
                    </div>
                </section>

                <!-- MEMOIZATION DEMO -->
                <section class="card memo-card">
                    <h2>⚡ Memoization Demo</h2>
                    <p class="description">Selectors cache results. Click buttons to see when computation happens.</p>
                    <div class="memo-stats">
                        <div class="stat">
                            <span class="value">{{ computeCount() }}</span>
                            <span class="label">Subtotal Computed</span>
                        </div>
                        <div class="stat">
                            <span class="value">{{ selectCallCount() }}</span>
                            <span class="label">Selector Called</span>
                        </div>
                    </div>
                    <div class="button-row">
                        <button (click)="callSelectorWithoutChange()" class="btn">
                            Call Selector (No State Change)
                        </button>
                        <button (click)="addRandomItem()" class="btn primary">
                            Add Item (State Changes)
                        </button>
                    </div>
                    <p class="hint">
                        Notice: Calling selector without state change doesn't increment "Computed"!
                    </p>
                </section>

                <!-- PARAMETERIZED SELECTOR -->
                <section class="card param-card">
                    <h2>🎯 Parameterized Selector</h2>
                    <p class="description">Select items by category</p>
                    <div class="category-buttons">
                        @for (cat of categories; track cat) {
                            <button 
                                [class.active]="selectedCategory() === cat"
                                (click)="selectedCategory.set(cat)"
                                class="cat-btn">
                                {{ cat }}
                            </button>
                        }
                    </div>
                    <div class="category-result">
                        <span class="count">{{ selectByCategory().length }}</span> items
                        <span class="total">\${{ selectCategoryTotal() | number:'1.2-2' }}</span>
                    </div>
                </section>

                <!-- SELECTOR CHAIN VISUALIZATION -->
                <section class="card chain-card">
                    <h2>🔗 Selector Composition Chain</h2>
                    <div class="chain">
                        <div class="chain-node">selectItems</div>
                        <div class="chain-arrow">↓</div>
                        <div class="chain-node">selectSubtotal</div>
                        <div class="chain-arrow">↓</div>
                        <div class="chain-node">selectAfterDiscount</div>
                        <div class="chain-arrow">↓</div>
                        <div class="chain-node">selectTax</div>
                        <div class="chain-arrow">↓</div>
                        <div class="chain-node highlight">selectGrandTotal</div>
                    </div>
                    <p class="hint">Each selector only recomputes if its inputs change!</p>
                </section>
            </div>
        </div>
    `,
    styles: [`
        .demo-container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .demo-header { margin-bottom: 2rem; }
        .back-link { color: #94a3b8; text-decoration: none; font-size: 0.9rem; }
        h1 { color: #f8fafc; margin: 0.5rem 0; }
        p { color: #94a3b8; }

        .content-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }

        .card {
            background: #1e293b;
            border-radius: 12px;
            padding: 1.5rem;
            border: 1px solid rgba(148, 163, 184, 0.1);
        }
        .card h2 { color: #f8fafc; margin: 0 0 1rem 0; font-size: 1.1rem; }
        .description { color: #64748b; font-size: 0.9rem; margin-bottom: 1rem; }

        .code-block {
            background: #0f172a;
            padding: 1rem;
            border-radius: 8px;
            font-family: monospace;
            font-size: 0.85rem;
            color: #10b981;
            margin-bottom: 1rem;
        }

        .derived-card { grid-column: 1 / -1; }
        .derived-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem; }
        .derived-item {
            background: #0f172a;
            padding: 1rem;
            border-radius: 8px;
            text-align: center;
        }
        .derived-item .label { display: block; color: #64748b; font-size: 0.75rem; font-family: monospace; }
        .derived-item .value { display: block; font-size: 1.5rem; font-weight: bold; color: #f8fafc; margin: 0.5rem 0; }
        .derived-item .formula { display: block; color: #94a3b8; font-size: 0.7rem; }
        .derived-item.highlight { background: linear-gradient(135deg, #3b82f6, #8b5cf6); }
        .derived-item .value.total { color: white; font-size: 1.8rem; }

        .controls { display: flex; align-items: center; gap: 1rem; }
        .controls label { color: #94a3b8; }
        .controls input[type="range"] { width: 150px; }
        .controls .value { color: #3b82f6; font-weight: bold; }

        .memo-card { grid-column: 1 / -1; }
        .memo-stats { display: flex; gap: 2rem; margin-bottom: 1rem; }
        .stat { text-align: center; padding: 1rem; background: #0f172a; border-radius: 8px; min-width: 150px; }
        .stat .value { display: block; font-size: 2rem; font-weight: bold; color: #3b82f6; }
        .stat .label { color: #64748b; font-size: 0.85rem; }

        .button-row { display: flex; gap: 1rem; margin-bottom: 1rem; }
        .btn { padding: 0.75rem 1.5rem; border-radius: 8px; border: none; background: #334155; color: white; cursor: pointer; }
        .btn.primary { background: #3b82f6; }
        .hint { color: #f59e0b; font-size: 0.85rem; margin: 0; }

        .category-buttons { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
        .cat-btn { padding: 0.5rem 1rem; border-radius: 6px; border: 1px solid #334155; background: #0f172a; color: #94a3b8; cursor: pointer; }
        .cat-btn.active { background: #3b82f6; color: white; border-color: #3b82f6; }
        .category-result { display: flex; justify-content: space-between; padding: 1rem; background: #0f172a; border-radius: 8px; }
        .category-result .count { color: #f8fafc; font-size: 1.5rem; font-weight: bold; }
        .category-result .total { color: #10b981; font-size: 1.5rem; font-weight: bold; }

        .chain-card { grid-column: 1 / -1; }
        .chain { display: flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 1rem; }
        .chain-node { background: #0f172a; padding: 0.75rem 1rem; border-radius: 8px; color: #f8fafc; font-family: monospace; font-size: 0.85rem; }
        .chain-node.highlight { background: linear-gradient(135deg, #3b82f6, #8b5cf6); }
        .chain-arrow { color: #64748b; font-size: 1.5rem; }
    `]
})
export class SelectorsDemoComponent {
    // State
    cart = signal<CartState>({
        items: [
            { id: 1, name: 'Laptop', price: 999, category: 'Electronics', quantity: 1 },
            { id: 2, name: 'Mouse', price: 29, category: 'Electronics', quantity: 2 },
            { id: 3, name: 'Coffee', price: 12, category: 'Food', quantity: 3 },
            { id: 4, name: 'Notebook', price: 5, category: 'Office', quantity: 5 },
        ],
        discount: 10,
        taxRate: 8
    });

    categories = ['All', 'Electronics', 'Food', 'Office'];
    selectedCategory = signal('All');

    // Memoization tracking
    computeCount = signal(0);
    selectCallCount = signal(0);

    // SELECTORS (as computed - memoized!)

    // Base selector - get items
    selectItems = computed(() => this.cart().items);

    // Composed selector - subtotal from items
    selectSubtotal = computed(() => {
        this.computeCount.update(c => c + 1); // Track computation
        return this.cart().items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    });

    // Selector using another selector + state
    selectDiscountAmount = computed(() =>
        this.selectSubtotal() * (this.cart().discount / 100)
    );

    selectAfterDiscount = computed(() =>
        this.selectSubtotal() - this.selectDiscountAmount()
    );

    selectTax = computed(() =>
        this.selectAfterDiscount() * (this.cart().taxRate / 100)
    );

    // Final composed selector
    selectGrandTotal = computed(() =>
        this.selectAfterDiscount() + this.selectTax()
    );

    // Parameterized selector (factory pattern)
    selectByCategory = computed(() => {
        const category = this.selectedCategory();
        if (category === 'All') return this.cart().items;
        return this.cart().items.filter(item => item.category === category);
    });

    selectCategoryTotal = computed(() =>
        this.selectByCategory().reduce((sum, item) => sum + (item.price * item.quantity), 0)
    );

    // Actions
    setDiscount(value: number) {
        this.cart.update(state => ({ ...state, discount: value }));
    }

    callSelectorWithoutChange() {
        this.selectCallCount.update(c => c + 1);
        // Just read the selector - won't recompute if state unchanged
        const total = this.selectGrandTotal();
        console.log('Grand Total:', total);
    }

    addRandomItem() {
        const newItem: Product = {
            id: Date.now(),
            name: 'New Item',
            price: Math.round(Math.random() * 100),
            category: this.categories[Math.floor(Math.random() * 3) + 1],
            quantity: 1
        };
        this.cart.update(state => ({
            ...state,
            items: [...state.items, newItem]
        }));
    }
}
