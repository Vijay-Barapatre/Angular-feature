/**
 * COMPUTED SIGNALS
 * 
 * Demonstrates derived state with computed():
 * - computed() creates read-only derived signals
 * - Automatically tracks dependencies
 * - Only recalculates when dependencies change
 * - Memoized - same input = cached result
 */

import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface CartItem {
    name: string;
    price: number;
    quantity: number;
}

@Component({
    selector: 'app-use-case-2-demo',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule],
    template: `
        <div class="demo-container">
            <header class="demo-header">
                <a routerLink="/signals" class="back-link">← Back to Overview</a>
                <h1>🧮 Computed Signals</h1>
                <p>Derive read-only values that auto-update when dependencies change</p>
            </header>

            <section class="demo-section">
                <h2>🛒 Interactive Demo: Shopping Cart</h2>
                
                <div class="cart-container">
                    <div class="items-panel">
                        <h3>Cart Items</h3>
                        @for (item of items(); track item.name) {
                            <div class="cart-item">
                                <span class="item-name">{{ item.name }}</span>
                                <span class="item-price">\${{ item.price }}</span>
                                <div class="quantity-control">
                                    <button (click)="updateQuantity(item.name, -1)">-</button>
                                    <span>{{ item.quantity }}</span>
                                    <button (click)="updateQuantity(item.name, 1)">+</button>
                                </div>
                                <span class="item-total">\${{ item.price * item.quantity }}</span>
                            </div>
                        }
                    </div>

                    <div class="summary-panel">
                        <h3>Order Summary</h3>
                        <div class="summary-row">
                            <span>Items:</span>
                            <span>{{ totalItems() }}</span>
                        </div>
                        <div class="summary-row">
                            <span>Subtotal:</span>
                            <span>\${{ subtotal() }}</span>
                        </div>
                        <div class="summary-row">
                            <span>Tax (10%):</span>
                            <span>\${{ tax().toFixed(2) }}</span>
                        </div>
                        <div class="summary-row total">
                            <span>Total:</span>
                            <span>\${{ total().toFixed(2) }}</span>
                        </div>
                        <p class="computed-note">
                            💡 All values above are computed() signals!
                        </p>
                    </div>
                </div>
            </section>

            <section class="code-section">
                <h2>💻 Key Code Patterns</h2>
                
                <div class="code-block">
                    <div class="code-header">Creating Computed Signals</div>
                    <pre><code>// Source signal
items = signal&lt;CartItem[]&gt;([...]);

// computed() - Auto-tracks 'items' dependency
subtotal = computed(() => 
    this.items().reduce((sum, item) => 
        sum + item.price * item.quantity, 0
    )
);

// Computed can depend on other computed!
tax = computed(() => this.subtotal() * 0.1);
total = computed(() => this.subtotal() + this.tax());</code></pre>
                </div>
            </section>

            <section class="key-points">
                <h2>🎯 Key Points</h2>
                <ul>
                    <li><strong>computed(fn)</strong> - Creates a read-only derived signal</li>
                    <li><strong>Auto-tracking</strong> - Dependencies are detected automatically</li>
                    <li><strong>Memoized</strong> - Only recalculates when dependencies change</li>
                    <li><strong>Composable</strong> - Computed can depend on other computed</li>
                    <li>Cannot set() or update() a computed signal</li>
                </ul>
            </section>
        </div>
    `,
    styles: [`
        .demo-container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 2rem;
        }

        .demo-header {
            margin-bottom: 2rem;
        }

        .back-link {
            color: var(--primary-light);
            text-decoration: none;
        }

        h1 {
            background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        h2, h3 {
            color: var(--primary-light);
        }

        .cart-container {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 2rem;
        }

        .items-panel, .summary-panel {
            background: var(--bg-card);
            border-radius: 12px;
            padding: 1.5rem;
            border: 1px solid rgba(102, 126, 234, 0.2);
        }

        .cart-item {
            display: grid;
            grid-template-columns: 2fr 1fr 1fr 1fr;
            align-items: center;
            padding: 0.75rem 0;
            border-bottom: 1px solid rgba(102, 126, 234, 0.1);
        }

        .item-name {
            font-weight: 600;
        }

        .item-price {
            color: var(--text-secondary);
        }

        .quantity-control {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .quantity-control button {
            width: 28px;
            height: 28px;
            border: none;
            border-radius: 4px;
            background: var(--primary-color);
            color: white;
            cursor: pointer;
        }

        .item-total {
            font-weight: 600;
            color: var(--accent-color);
        }

        .summary-row {
            display: flex;
            justify-content: space-between;
            padding: 0.5rem 0;
            border-bottom: 1px solid rgba(102, 126, 234, 0.1);
        }

        .summary-row.total {
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--accent-color);
            border-bottom: none;
            margin-top: 0.5rem;
        }

        .computed-note {
            margin-top: 1rem;
            padding: 0.75rem;
            background: rgba(102, 126, 234, 0.1);
            border-radius: 8px;
            font-size: 0.85rem;
            color: var(--primary-light);
        }

        .code-section, .key-points {
            margin-top: 2rem;
        }

        .code-block {
            background: #1e293b;
            border-radius: 8px;
            overflow: hidden;
        }

        .code-header {
            background: rgba(102, 126, 234, 0.2);
            padding: 0.5rem 1rem;
            color: var(--primary-light);
            font-weight: 600;
        }

        .code-block pre {
            padding: 1rem;
            margin: 0;
            overflow-x: auto;
        }

        .code-block code {
            color: #94a3b8;
            font-family: 'Fira Code', monospace;
        }

        .key-points ul {
            list-style: none;
            padding: 0;
        }

        .key-points li {
            padding: 0.5rem 0;
            padding-left: 1.5rem;
            position: relative;
            color: var(--text-secondary);
        }

        .key-points li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: var(--accent-color);
        }
    `]
})
export class UseCase2DemoComponent {
    // 🚦 Source signal - the cart items
    items = signal<CartItem[]>([
        { name: 'Angular Book', price: 49, quantity: 1 },
        { name: 'TypeScript Guide', price: 35, quantity: 2 },
        { name: 'RxJS Handbook', price: 42, quantity: 1 }
    ]);

    // 🧮 Computed signals - derived from items
    totalItems = computed(() =>
        this.items().reduce((sum, item) => sum + item.quantity, 0)
    );

    subtotal = computed(() =>
        this.items().reduce((sum, item) => sum + item.price * item.quantity, 0)
    );

    // Computed can depend on other computed!
    tax = computed(() => this.subtotal() * 0.1);

    total = computed(() => this.subtotal() + this.tax());

    updateQuantity(name: string, delta: number): void {
        this.items.update(items =>
            items.map(item =>
                item.name === name
                    ? { ...item, quantity: Math.max(0, item.quantity + delta) }
                    : item
            ).filter(item => item.quantity > 0)
        );
    }
}
