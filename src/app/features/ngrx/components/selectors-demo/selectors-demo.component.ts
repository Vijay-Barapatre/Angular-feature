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
 * 🎯 SELECTOR TYPES DEMONSTRATED
 * ============================================================================
 * 
 * 1. Feature Selector - Gets a slice of root state
 *    selectCartState = createFeatureSelector<CartState>('cart')
 * 
 * 2. Simple Selector - Extracts a property
 *    selectCartItems = createSelector(selectCartState, state => state.items)
 * 
 * 3. Composed Selector - Combines multiple selectors
 *    selectGrandTotal = createSelector(selectAfterDiscount, selectTax, ...)
 * 
 * 4. Parameterized Selector - Takes runtime arguments
 *    selectItemsByCategory = (category) => createSelector(...)
 */
import { Component, signal, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as CartActions from './store/cart.actions';
import * as CartSelectors from './store/cart.selectors';
import { Product } from './store/cart.model';

@Component({
    selector: 'app-selectors-demo',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule],
    template: `
        <div class="demo-container">
            <header class="demo-header">
                <a routerLink="/ngrx" class="back-link">← Back to NgRx Overview</a>
                <h1>🔍 Selectors Deep Dive</h1>
                <p>Memoized, Composed, and Parameterized Selectors with <strong>createSelector()</strong></p>
            </header>

            <div class="content-grid">
                <!-- CART STATE -->
                <section class="card state-card">
                    <h2>📦 Cart State (Raw)</h2>
                    <div class="code-block">
                        <pre>items: {{ (items$ | async)?.length || 0 }} products
discount: {{ (discount$ | async) }}%
taxRate: {{ (taxRate$ | async) }}%</pre>
                    </div>
                    <div class="controls">
                        <label>Discount %: <input type="range" min="0" max="50" 
                            [ngModel]="(discount$ | async)" 
                            (ngModelChange)="setDiscount($event)"></label>
                        <span class="value">{{ (discount$ | async) }}%</span>
                    </div>
                </section>

                <!-- DERIVED VALUES -->
                <section class="card derived-card">
                    <h2>📊 Derived Values (Selectors)</h2>
                    <div class="derived-grid">
                        <div class="derived-item">
                            <span class="label">selectSubtotal</span>
                            <span class="value">\${{ (subtotal$ | async) | number:'1.2-2' }}</span>
                            <span class="formula">Σ(price × quantity)</span>
                        </div>
                        <div class="derived-item">
                            <span class="label">selectDiscountAmount</span>
                            <span class="value">-\${{ (discountAmount$ | async) | number:'1.2-2' }}</span>
                            <span class="formula">subtotal × discount%</span>
                        </div>
                        <div class="derived-item">
                            <span class="label">selectAfterDiscount</span>
                            <span class="value">\${{ (afterDiscount$ | async) | number:'1.2-2' }}</span>
                            <span class="formula">subtotal - discount</span>
                        </div>
                        <div class="derived-item">
                            <span class="label">selectTax</span>
                            <span class="value">+\${{ (tax$ | async) | number:'1.2-2' }}</span>
                            <span class="formula">afterDiscount × taxRate%</span>
                        </div>
                        <div class="derived-item highlight">
                            <span class="label">selectGrandTotal</span>
                            <span class="value total">\${{ (grandTotal$ | async) | number:'1.2-2' }}</span>
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
                        <span class="count">{{ (categoryItems$ | async)?.length || 0 }}</span> items
                        <span class="total">\${{ (categoryTotal$ | async) | number:'1.2-2' }}</span>
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
    private store = inject(Store);

    // Observable selectors from NgRx store
    items$ = this.store.select(CartSelectors.selectCartItems);
    discount$ = this.store.select(CartSelectors.selectDiscount);
    taxRate$ = this.store.select(CartSelectors.selectTaxRate);

    // Composed selectors
    subtotal$ = this.store.select(CartSelectors.selectSubtotal);
    discountAmount$ = this.store.select(CartSelectors.selectDiscountAmount);
    afterDiscount$ = this.store.select(CartSelectors.selectAfterDiscount);
    tax$ = this.store.select(CartSelectors.selectTax);
    grandTotal$ = this.store.select(CartSelectors.selectGrandTotal);

    // Category selection
    categories = ['All', 'Electronics', 'Food', 'Office'];
    selectedCategory = signal('All');

    // Parameterized selectors (recreated when category changes)
    categoryItems$ = this.store.select(CartSelectors.selectItemsByCategory(this.selectedCategory()));
    categoryTotal$ = this.store.select(CartSelectors.selectCategoryTotal(this.selectedCategory()));

    // Memoization tracking
    computeCount = signal(0);
    selectCallCount = signal(0);

    constructor() {
        // Update parameterized selectors when category changes
        effect(() => {
            const category = this.selectedCategory();
            this.categoryItems$ = this.store.select(CartSelectors.selectItemsByCategory(category));
            this.categoryTotal$ = this.store.select(CartSelectors.selectCategoryTotal(category));
        });
    }

    setDiscount(value: number) {
        this.store.dispatch(CartActions.setDiscount({ discount: value }));
    }

    callSelectorWithoutChange() {
        this.selectCallCount.update(c => c + 1);
        // Read selector - won't recompute if state unchanged (memoization!)
        this.grandTotal$.subscribe((total: number) => {
            console.log('Grand Total:', total);
            this.computeCount.set(CartSelectors.getSubtotalComputeCount());
        }).unsubscribe();
    }

    addRandomItem() {
        const newItem: Product = {
            id: Date.now(),
            name: 'New Item',
            price: Math.round(Math.random() * 100),
            category: this.categories[Math.floor(Math.random() * 3) + 1],
            quantity: 1
        };
        this.store.dispatch(CartActions.addItem({ item: newItem }));

        // Update compute count
        setTimeout(() => {
            this.computeCount.set(CartSelectors.getSubtotalComputeCount());
        }, 100);
    }
}
