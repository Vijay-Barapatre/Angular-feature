/**
 * ============================================================================
 * USE CASE 4: COMPUTED SIGNALS WITH ASYNC DATA
 * ============================================================================
 */

import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { of, delay } from 'rxjs';

interface Product {
    id: number;
    name: string;
    price: number;
}

@Component({
    selector: 'app-computed-async',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <header class="header">
                <h1>🧮 Computed + Async</h1>
                <p class="subtitle">Derive values from async signals</p>
            </header>

            <section class="concept-section">
                <h2>The Pattern</h2>
                <p>
                    Convert async data to Signal with <code>toSignal()</code>, 
                    then derive new values with <code>computed()</code>.
                </p>
            </section>

            <section class="demo-section">
                <h2>Live Demo: Shopping Cart</h2>
                
                <div class="products">
                    <h3>Products (from "API")</h3>
                    @for (product of products(); track product.id) {
                        <div class="product" (click)="addToCart(product)">
                            <span>{{ product.name }}</span>
                            <span>\${{ product.price }}</span>
                            <button>Add</button>
                        </div>
                    }
                </div>

                <div class="cart">
                    <h3>🛒 Cart</h3>
                    @for (item of cart(); track item.id) {
                        <div class="cart-item">
                            {{ item.name }} - \${{ item.price }}
                        </div>
                    }
                    @empty {
                        <p class="empty">Cart is empty</p>
                    }
                    
                    <div class="totals">
                        <div>Subtotal: <strong>\${{ subtotal() }}</strong></div>
                        <div>Tax (10%): <strong>\${{ tax() }}</strong></div>
                        <div class="total">Total: <strong>\${{ total() }}</strong></div>
                    </div>
                </div>
            </section>

            <section class="code-section">
                <h2>📝 Implementation Pattern</h2>
                <pre class="code"><code>// 1. Async data from API → Signal
products = toSignal(
  this.http.get&lt;Product[]&gt;('/api/products'),
  {{ '{' }} initialValue: [] {{ '}' }}
);

// 2. Local state signal
cart = signal&lt;Product[]&gt;([]);

// 3. Computed values (derived)
subtotal = computed(() => 
  this.cart().reduce((sum, p) => sum + p.price, 0)
);

tax = computed(() => this.subtotal() * 0.1);

total = computed(() => this.subtotal() + this.tax());</code></pre>
            </section>

            <section class="flow-section">
                <h2>📊 Data Flow</h2>
                <div class="flow">
                    <div class="step">Observable</div>
                    <div class="arrow">→ toSignal()</div>
                    <div class="step">Signal</div>
                    <div class="arrow">→ computed()</div>
                    <div class="step">Derived Signal</div>
                    <div class="arrow">→</div>
                    <div class="step">Template</div>
                </div>
            </section>

            <section class="benefits">
                <h2>✨ Benefits</h2>
                <ul>
                    <li><strong>Automatic updates</strong> - computed recalculates when dependencies change</li>
                    <li><strong>Lazy evaluation</strong> - only computed when read</li>
                    <li><strong>No subscription management</strong> - all handled automatically</li>
                    <li><strong>Type safety</strong> - full TypeScript support</li>
                </ul>
            </section>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: var(--primary-color, #667eea); }

        .demo-section { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin: 2rem 0; }
        .products, .cart { background: var(--bg-secondary, #f8f9fa); padding: 1.5rem; border-radius: 12px; }
        .products h3, .cart h3 { margin-top: 0; }
        .product { display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: white; border-radius: 6px; margin-bottom: 0.5rem; cursor: pointer; }
        .product:hover { background: #e0e7ff; }
        .product button { padding: 0.25rem 0.75rem; border: none; border-radius: 4px; background: #667eea; color: white; cursor: pointer; }
        .cart-item { padding: 0.5rem; background: white; border-radius: 4px; margin-bottom: 0.25rem; }
        .empty { color: var(--text-secondary); font-style: italic; }
        .totals { margin-top: 1rem; padding-top: 1rem; border-top: 2px solid #e5e7eb; }
        .totals div { margin-bottom: 0.25rem; }
        .totals .total { font-size: 1.25rem; color: var(--primary-color); }

        .code { background: #1e1e2e; color: #a6e3a1; padding: 1.5rem; border-radius: 10px; overflow-x: auto; }

        .flow { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 0.5rem; margin-top: 1rem; }
        .flow .step { background: var(--primary-color, #667eea); color: white; padding: 0.5rem 1rem; border-radius: 6px; }
        .flow .arrow { color: var(--primary-color); font-weight: bold; }

        .benefits { background: linear-gradient(135deg, #10b98120, #14b8a620); padding: 2rem; border-radius: 12px; }
        .benefits ul { padding-left: 1.5rem; }
    `]
})
export class ComputedAsyncComponent {
    // Simulated async API call → Signal
    products = toSignal(
        of<Product[]>([
            { id: 1, name: 'Laptop', price: 999 },
            { id: 2, name: 'Phone', price: 699 },
            { id: 3, name: 'Tablet', price: 499 }
        ]).pipe(delay(500)),
        { initialValue: [] }
    );

    // Local cart state
    cart = signal<Product[]>([]);

    // Computed values - auto-update when cart changes
    subtotal = computed(() =>
        this.cart().reduce((sum, p) => sum + p.price, 0)
    );

    tax = computed(() => Math.round(this.subtotal() * 0.1 * 100) / 100);

    total = computed(() => this.subtotal() + this.tax());

    addToCart(product: Product) {
        this.cart.update(items => [...items, product]);
    }
}
