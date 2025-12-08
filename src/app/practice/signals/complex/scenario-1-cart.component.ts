/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 1: SHOPPING CART WITH SIGNALS
 * ============================================================================
 */

import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
}

interface CartItem {
    product: Product;
    quantity: number;
}

@Component({
    selector: 'app-scenario-1-cart',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 1: Shopping Cart with Signals</h2>
                <p>Manage entire cart state using signals - no RxJS needed!</p>
            </div>

            <div class="layout">
                <div class="products">
                    <h3>🛍️ Products</h3>
                    <div class="product-grid">
                        @for (product of products; track product.id) {
                            <div class="product-card">
                                <span class="product-image">{{ product.image }}</span>
                                <h4>{{ product.name }}</h4>
                                <p class="price">\${{ product.price.toFixed(2) }}</p>
                                <button (click)="addToCart(product)">Add to Cart</button>
                            </div>
                        }
                    </div>
                </div>

                <div class="cart">
                    <h3>🛒 Cart ({{ itemCount() }} items)</h3>
                    @if (cartItems().length > 0) {
                        <div class="cart-items">
                            @for (item of cartItems(); track item.product.id) {
                                <div class="cart-item">
                                    <span>{{ item.product.image }}</span>
                                    <div class="item-info">
                                        <strong>{{ item.product.name }}</strong>
                                        <span>\${{ item.product.price }}</span>
                                    </div>
                                    <div class="qty-controls">
                                        <button (click)="updateQuantity(item.product.id, -1)">−</button>
                                        <span>{{ item.quantity }}</span>
                                        <button (click)="updateQuantity(item.product.id, 1)">+</button>
                                    </div>
                                    <span class="subtotal">\${{ (item.product.price * item.quantity).toFixed(2) }}</span>
                                </div>
                            }
                        </div>
                        <div class="cart-total">
                            <span>Total:</span>
                            <span>\${{ total().toFixed(2) }}</span>
                        </div>
                    } @else {
                        <p class="empty">Cart is empty</p>
                    }
                </div>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 1000px; }
        .instructions { background: #fef2f2; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #8b5cf6; }
        .layout { display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem; }
        .product-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        .product-card { padding: 1rem; background: white; border-radius: 8px; text-align: center; }
        .product-image { font-size: 2.5rem; }
        .product-card h4 { margin: 0.5rem 0 0.25rem; }
        .product-card .price { color: #10b981; font-weight: bold; }
        .product-card button { width: 100%; padding: 0.5rem; background: #8b5cf6; color: white; border: none; border-radius: 4px; cursor: pointer; }
        .cart { background: white; padding: 1rem; border-radius: 8px; }
        .cart-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem; background: #f8fafc; border-radius: 6px; margin-bottom: 0.5rem; }
        .item-info { flex: 1; }
        .item-info strong { display: block; font-size: 0.9rem; }
        .item-info span { font-size: 0.8rem; color: #6b7280; }
        .qty-controls { display: flex; align-items: center; gap: 0.5rem; }
        .qty-controls button { width: 24px; height: 24px; border: none; border-radius: 4px; background: #e5e7eb; cursor: pointer; }
        .subtotal { font-weight: bold; min-width: 60px; text-align: right; }
        .cart-total { display: flex; justify-content: space-between; padding: 1rem; background: #8b5cf6; color: white; border-radius: 6px; margin-top: 1rem; font-weight: bold; }
        .empty { text-align: center; color: #9ca3af; padding: 2rem; }
    `]
})
export class Scenario1CartComponent {
    products: Product[] = [
        { id: 1, name: 'Laptop', price: 999.99, image: '💻' },
        { id: 2, name: 'Phone', price: 699.99, image: '📱' },
        { id: 3, name: 'Headphones', price: 199.99, image: '🎧' },
        { id: 4, name: 'Watch', price: 299.99, image: '⌚' }
    ];

    /**
     * TODO: Create signal for cart items
     */
    cartItems = signal<CartItem[]>([]);

    /**
     * TODO: Create computed signal for total item count
     */
    itemCount = computed(() =>
        this.cartItems().reduce((sum, item) => sum + item.quantity, 0)
    );

    /**
     * TODO: Create computed signal for cart total
     */
    total = computed(() =>
        this.cartItems().reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    );

    /**
     * TODO: Add product to cart
     */
    addToCart(product: Product): void {
        this.cartItems.update(items => {
            const existing = items.find(i => i.product.id === product.id);
            if (existing) {
                return items.map(i =>
                    i.product.id === product.id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            }
            return [...items, { product, quantity: 1 }];
        });
    }

    /**
     * TODO: Update item quantity
     */
    updateQuantity(productId: number, delta: number): void {
        this.cartItems.update(items => {
            return items
                .map(i => i.product.id === productId
                    ? { ...i, quantity: i.quantity + delta }
                    : i)
                .filter(i => i.quantity > 0);
        });
    }
}
