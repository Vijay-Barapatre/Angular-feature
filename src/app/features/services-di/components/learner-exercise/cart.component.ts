import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from './cart.service';

@Component({
    selector: 'app-cart-solution',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="cart-solution">
      <div class="cart-header">
        <h3>🛒 Shopping Cart Solution</h3>
        <span class="badge">{{ cart.itemCount() }} items</span>
      </div>
      
      <div class="cart-body">
        <div class="products-list">
          <h4>Available Products</h4>
          <div class="product-item" *ngFor="let product of products">
            <div class="product-info">
              <span class="product-name">{{ product.name }}</span>
              <span class="product-price">\${{ product.price }}</span>
            </div>
            <button (click)="addToCart(product)" class="btn-add">Add</button>
          </div>
        </div>

        <div class="cart-summary">
          <h4>Your Cart</h4>
          <div *ngIf="cart.items().length === 0" class="empty-state">
            Cart is empty
          </div>
          
          <div class="cart-items">
            <div *ngFor="let item of cart.items()" class="cart-item">
              <span>{{ item.name }} (x{{ item.quantity }})</span>
              <div class="item-actions">
                <span>\${{ item.price * item.quantity | number:'1.2-2' }}</span>
                <button (click)="cart.removeItem(item.id)" class="btn-remove">×</button>
              </div>
            </div>
          </div>

          <div class="total-row">
            <span>Total:</span>
            <span class="total-amount">\${{ cart.totalPrice() | number:'1.2-2' }}</span>
          </div>
          
          <button *ngIf="cart.items().length > 0" (click)="cart.clearCart()" class="btn-clear">
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .cart-solution {
      background: var(--bg-secondary);
      border-radius: var(--radius-lg);
      border: 2px solid var(--success);
      overflow: hidden;
      margin-top: var(--spacing-xl);
    }
    .cart-solution h3 { margin: 0; }
    .cart-header {
      background: linear-gradient(135deg, var(--success), #34d399);
      padding: var(--spacing-lg);
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: var(--bg-primary);
    }
    .badge {
      background: rgba(0,0,0,0.2);
      padding: 4px 12px;
      border-radius: 12px;
      font-weight: 600;
    }
    .cart-body {
      padding: var(--spacing-lg);
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--spacing-xl);
    }
    @media (max-width: 768px) {
      .cart-body { grid-template-columns: 1fr; }
    }
    .products-list h4, .cart-summary h4 {
      color: var(--text-secondary);
      margin-bottom: var(--spacing-md);
      border-bottom: 1px solid var(--border-color);
      padding-bottom: var(--spacing-xs);
    }
    .product-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--spacing-sm);
      background: var(--bg-card);
      margin-bottom: var(--spacing-sm);
      border-radius: var(--radius-md);
    }
    .product-info { display: flex; flex-direction: column; }
    .product-name { font-weight: 600; }
    .product-price { color: var(--text-secondary); font-size: 0.9rem; }
    .cart-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--spacing-sm);
      border-bottom: 1px solid var(--border-color);
    }
    .item-actions { display: flex; align-items: center; gap: var(--spacing-sm); }
    .total-row {
      display: flex;
      justify-content: space-between;
      margin-top: var(--spacing-lg);
      padding-top: var(--spacing-md);
      border-top: 2px solid var(--border-color);
      font-weight: 700;
      font-size: 1.2rem;
    }
    .total-amount { color: var(--success); }
    .btn-add {
      background: var(--success);
      color: white;
      border: none;
      padding: 4px 12px;
      border-radius: 4px;
      cursor: pointer;
    }
    .btn-remove {
      background: rgba(239, 68, 68, 0.1);
      color: var(--error);
      border: none;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .btn-remove:hover { background: var(--error); color: white; }
    .btn-clear {
      width: 100%;
      margin-top: var(--spacing-md);
      background: transparent;
      border: 1px solid var(--text-muted);
      color: var(--text-muted);
      padding: 8px;
      border-radius: 4px;
      cursor: pointer;
    }
    .btn-clear:hover { border-color: var(--error); color: var(--error); }
    .empty-state { text-align: center; color: var(--text-muted); padding: var(--spacing-lg); font-style: italic; }
  `]
})
export class CartComponent {
    cart = inject(CartService);

    products: CartItem[] = [
        { id: 1, name: 'Angular Primitives', price: 29.99, quantity: 1 },
        { id: 2, name: 'RxJS Masterclass', price: 49.99, quantity: 1 },
        { id: 3, name: 'Design Patterns', price: 39.99, quantity: 1 }
    ];

    addToCart(product: CartItem) {
        this.cart.addItem(product);
    }
}
