/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 1: SHOPPING CART
 * ============================================================================
 * 
 * 📋 REAL-WORLD REQUIREMENT:
 * Build a shopping cart with product listing, quantity controls, and total.
 * 
 * 📝 PROBLEM STATEMENT:
 * - ProductCard receives product data and emits add-to-cart events
 * - CartItem displays item with quantity controls
 * - Parent manages cart state and calculates totals
 * 
 * ✅ EXPECTED RESULT:
 * - Add products to cart
 * - Update quantities
 * - Remove items
 * - Show real-time total
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

// ========================================
// INTERFACES
// ========================================

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

// ========================================
// PRODUCT CARD COMPONENT
// ========================================

@Component({
    selector: 'app-product-card',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="product-card">
            <div class="product-image">{{ product?.image }}</div>
            <h4>{{ product?.name }}</h4>
            <p class="price">\${{ product?.price?.toFixed(2) }}</p>
            <button (click)="onAddToCart()">Add to Cart</button>
        </div>
    `,
    styles: [`
        .product-card { padding: 1rem; background: white; border-radius: 8px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .product-image { font-size: 3rem; margin-bottom: 0.5rem; }
        h4 { margin: 0 0 0.25rem; }
        .price { color: #10b981; font-weight: bold; margin: 0 0 0.75rem; }
        button { width: 100%; padding: 0.5rem; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer; }
        button:hover { background: #059669; }
    `]
})
export class ProductCardComponent {
    /**
     * TODO: Add @Input for product
     */
    // TODO: @Input() product: Product | undefined;
    product: Product | undefined;

    /**
     * TODO: Add @Output to emit when product is added
     */
    // TODO: @Output() addToCart = new EventEmitter<Product>();

    /**
     * TODO: Implement add to cart
     */
    onAddToCart(): void {
        /*
         * TODO: Implement feature logic here
         * 
         * if (this.product) {
         *     this.addToCart.emit(this.product);
         * }
         */
    }
}

// ========================================
// CART ITEM COMPONENT
// ========================================

@Component({
    selector: 'app-cart-item',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="cart-item">
            <span class="item-image">{{ item?.product?.image }}</span>
            <div class="item-info">
                <h5>{{ item?.product?.name }}</h5>
                <p>\${{ item?.product?.price?.toFixed(2) }}</p>
            </div>
            <div class="quantity-controls">
                <button (click)="onDecrease()">−</button>
                <span>{{ item?.quantity }}</span>
                <button (click)="onIncrease()">+</button>
            </div>
            <span class="subtotal">\${{ getSubtotal()?.toFixed(2) }}</span>
            <button class="remove" (click)="onRemove()">🗑️</button>
        </div>
    `,
    styles: [`
        .cart-item { display: flex; align-items: center; gap: 1rem; padding: 0.75rem; background: #f8fafc; border-radius: 6px; margin-bottom: 0.5rem; }
        .item-image { font-size: 1.5rem; }
        .item-info { flex: 1; }
        .item-info h5 { margin: 0; font-size: 0.9rem; }
        .item-info p { margin: 0; font-size: 0.8rem; color: #6b7280; }
        .quantity-controls { display: flex; align-items: center; gap: 0.5rem; }
        .quantity-controls button { width: 28px; height: 28px; border: none; border-radius: 4px; background: #e5e7eb; cursor: pointer; }
        .quantity-controls span { min-width: 30px; text-align: center; }
        .subtotal { font-weight: bold; min-width: 60px; text-align: right; }
        .remove { background: none; border: none; cursor: pointer; font-size: 1.2rem; }
    `]
})
export class CartItemComponent {
    /**
     * TODO: Add @Input for cart item
     */
    // TODO: @Input() item: CartItem | undefined;
    item: CartItem | undefined;

    /**
     * TODO: Add @Output for quantity changes
     * Should emit { productId: number, quantity: number }
     */
    // TODO: @Output() quantityChange = new EventEmitter<{ productId: number; quantity: number }>();

    /**
     * TODO: Add @Output for remove action
     * Should emit product ID
     */
    // TODO: @Output() remove = new EventEmitter<number>();

    getSubtotal(): number {
        if (!this.item) return 0;
        return this.item.product.price * this.item.quantity;
    }

    /**
     * TODO: Implement increase quantity
     */
    onIncrease(): void {
        /*
         * TODO: Implement feature logic here
         */
    }

    /**
     * TODO: Implement decrease quantity
     */
    onDecrease(): void {
        /*
         * TODO: Implement feature logic here
         */
    }

    /**
     * TODO: Implement remove item
     */
    onRemove(): void {
        /*
         * TODO: Implement feature logic here
         */
    }
}

// ========================================
// MAIN COMPONENT
// ========================================

@Component({
    selector: 'app-scenario-1-shopping-cart',
    standalone: true,
    imports: [CommonModule, ProductCardComponent, CartItemComponent],
    template: `
        <div class="shopping-cart">
            <div class="instructions">
                <h2>🟥 Scenario 1: Shopping Cart</h2>
                <p>Build a complete shopping cart with product cards, cart items, and totals.</p>
                
                <h4>TODO Tasks:</h4>
                <ul>
                    <li>ProductCard: &#64;Input product, &#64;Output addToCart</li>
                    <li>CartItem: &#64;Input item, &#64;Output quantityChange, &#64;Output remove</li>
                    <li>Wire up all events in the parent template</li>
                </ul>
            </div>

            <div class="layout">
                <div class="products">
                    <h3>🛍️ Products</h3>
                    <div class="product-grid">
                        <!-- TODO: Add [product] input and (addToCart) output -->
                        <app-product-card 
                            *ngFor="let p of products"
                        ></app-product-card>
                    </div>
                </div>

                <div class="cart">
                    <h3>🛒 Cart ({{ cartItems.length }} items)</h3>
                    <div class="cart-items" *ngIf="cartItems.length > 0">
                        <!-- TODO: Add [item] input and (quantityChange), (remove) outputs -->
                        <app-cart-item 
                            *ngFor="let item of cartItems"
                        ></app-cart-item>
                    </div>
                    <div class="empty-cart" *ngIf="cartItems.length === 0">
                        Cart is empty. Add some products!
                    </div>
                    <div class="cart-total" *ngIf="cartItems.length > 0">
                        <span>Total:</span>
                        <span class="total-amount">\${{ getTotal().toFixed(2) }}</span>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .shopping-cart { max-width: 1000px; }
        .instructions { background: #fef2f2; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #ef4444; }
        .instructions h2 { margin: 0 0 0.5rem; color: #ef4444; }
        .layout { display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem; }
        .products h3, .cart h3 { margin: 0 0 1rem; }
        .product-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        .cart { background: white; padding: 1rem; border-radius: 8px; height: fit-content; }
        .empty-cart { padding: 2rem; text-align: center; color: #6b7280; }
        .cart-total { display: flex; justify-content: space-between; padding: 1rem; background: #10b981; color: white; border-radius: 6px; margin-top: 1rem; }
        .total-amount { font-size: 1.25rem; font-weight: bold; }
    `]
})
export class Scenario1ShoppingCartComponent {
    products: Product[] = [
        { id: 1, name: 'Laptop', price: 999.99, image: '💻' },
        { id: 2, name: 'Phone', price: 699.99, image: '📱' },
        { id: 3, name: 'Headphones', price: 199.99, image: '🎧' },
        { id: 4, name: 'Watch', price: 299.99, image: '⌚' }
    ];

    cartItems: CartItem[] = [];

    /**
     * TODO: Implement add to cart
     */
    addToCart(product: Product): void {
        const existing = this.cartItems.find(i => i.product.id === product.id);
        if (existing) {
            existing.quantity++;
        } else {
            this.cartItems.push({ product, quantity: 1 });
        }
    }

    /**
     * TODO: Implement quantity change handler
     */
    onQuantityChange(data: { productId: number; quantity: number }): void {
        const item = this.cartItems.find(i => i.product.id === data.productId);
        if (item) {
            item.quantity = data.quantity;
            if (item.quantity <= 0) {
                this.removeFromCart(data.productId);
            }
        }
    }

    /**
     * TODO: Implement remove from cart
     */
    removeFromCart(productId: number): void {
        this.cartItems = this.cartItems.filter(i => i.product.id !== productId);
    }

    getTotal(): number {
        return this.cartItems.reduce((sum, item) =>
            sum + (item.product.price * item.quantity), 0
        );
    }
}
