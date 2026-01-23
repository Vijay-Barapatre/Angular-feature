/**
 * CUSTOM EVENTS - PARENT COMPONENT
 * 
 * Demonstrates:
 * 1. Handling events with custom payloads
 * 2. Type-safe event handling
 * 3. Managing list state based on child events
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UseCase4ChildComponent, Product, CartEvent } from './child.component';

interface CartItem {
  product: Product;
  quantity: number;
}

@Component({
  selector: 'app-use-case-4-parent',
  standalone: true,
  imports: [CommonModule, RouterLink, UseCase4ChildComponent],
  template: `
  
    <div class="use-case-container">
      <div class="case-header">
        <a routerLink="/input-output" class="back-link">← Back to Overview</a>
        <h1>Custom Event Payloads</h1>
        <p>Pass rich data structures back to the parent via events.</p>
      </div>

      <div class="content-grid">
        <!-- LEFT: Product List -->
        <div class="column">
          <div class="card">
            <h2>🛍️ Products</h2>
            <div class="products-grid">
              <app-use-case-4-child
                *ngFor="let product of products"
                [product]="product"
                (itemAdded)="onItemAdded($event)">
              </app-use-case-4-child>
            </div>
          </div>
        </div>

        <!-- RIGHT: Shopping Cart -->
        <div class="column">
          <div class="card cart-card">
            <h2>🛒 Shopping Cart</h2>
            
            <div *ngIf="cart.length === 0" class="empty-cart">
              Your cart is empty
            </div>

            <div *ngFor="let item of cart" class="cart-item">
              <div class="item-info">
                <span class="item-name">{{ item.product.name }}</span>
                <span class="item-qty">x{{ item.quantity }}</span>
              </div>
              <span class="item-total">
                \${{ (item.product.price * item.quantity).toFixed(2) }}
              </span>
            </div>

            <div class="cart-total" *ngIf="cart.length > 0">
              <span>Total:</span>
              <span class="total-amount">\${{ cartTotal.toFixed(2) }}</span>
            </div>

            <div class="last-event" *ngIf="lastEvent">
              <h4>Last Event Payload:</h4>
              <pre>{{ lastEvent | json }}</pre>
            </div>
          </div>
        </div>
      </div>

      <div class="explanation-section card">
        <h2>📚 Key Takeaway</h2>
        <p>
          Instead of just emitting a boolean or string, you can emit <strong>Interfaces</strong>.
          This ensures the parent receives exactly the data structure it expects!
        </p>
      </div>
    </div>
  `,
  styles: [`
    @import '../basic-input-output/parent.component.css';

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: var(--spacing-md);
    }

    .cart-card {
      position: sticky;
      top: 20px;
    }

    .empty-cart {
      text-align: center;
      padding: var(--spacing-xl);
      color: var(--text-muted);
      border: 2px dashed var(--border-color);
      border-radius: var(--radius-md);
    }

    .cart-item {
      display: flex;
      justify-content: space-between;
      padding: var(--spacing-sm) 0;
      border-bottom: 1px solid var(--border-color);
    }

    .item-qty {
      color: var(--text-muted);
      margin-left: 8px;
      font-size: 0.9rem;
    }

    .cart-total {
      margin-top: var(--spacing-lg);
      padding-top: var(--spacing-md);
      border-top: 2px solid var(--border-color);
      display: flex;
      justify-content: space-between;
      font-weight: bold;
      font-size: 1.2rem;
    }

    .total-amount {
      color: var(--success);
    }

    .last-event {
      margin-top: var(--spacing-lg);
      background: #1e293b;
      padding: 10px;
      border-radius: 4px;
    }
    
    .last-event pre {
      font-size: 0.8rem;
      color: #94a3b8;
    }
  `]
})
export class UseCase4ParentComponent {
  products: Product[] = [
    { id: 1, name: 'Angular Hoodie', price: 49.99, category: 'Apparel', inStock: true },
    { id: 2, name: 'TypeScript Mug', price: 15.50, category: 'Accessories', inStock: true },
    { id: 3, name: 'Sticker Pack', price: 8.99, category: 'Accessories', inStock: true },
    { id: 4, name: 'Vintage Cap', price: 25.00, category: 'Apparel', inStock: false }
  ];

  cart: CartItem[] = [];
  lastEvent: CartEvent | null = null;

  get cartTotal(): number {
    return this.cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  onItemAdded(event: CartEvent) {
    this.lastEvent = event;

    const product = this.products.find(p => p.id === event.productId);
    if (!product) return;

    const existingItem = this.cart.find(item => item.product.id === event.productId);

    if (existingItem) {
      existingItem.quantity += event.quantity;
    } else {
      this.cart.push({
        product: product,
        quantity: event.quantity
      });
    }
  }
}
