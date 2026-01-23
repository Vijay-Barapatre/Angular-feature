/**
 * CUSTOM EVENTS - CHILD COMPONENT
 * 
 * Demonstrates:
 * 1. Defining custom interfaces for event data
 * 2. Emitting complex objects via Output
 * 3. Multiple Output events
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

// Define the shape of our product and event payload
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

export interface CartEvent {
  productId: number;
  quantity: number;
  action: 'add' | 'remove';
}

@Component({
  selector: 'app-use-case-4-child',
  standalone: true,
  imports: [CommonModule],
  template: `
    child
    <div class="product-card" [class.out-of-stock]="!product.inStock">
      <div class="product-header">
        <h3>{{ product.name }}</h3>
        <span class="price">\${{ product.price }}</span>
      </div>
      
      <p class="category">{{ product.category }}</p>
      
      <div class="controls" *ngIf="product.inStock; else outOfStockTpl">
        <div class="quantity-selector">
          <button (click)="decreaseQty()" [disabled]="quantity <= 1">-</button>
          <span>{{ quantity }}</span>
          <button (click)="increaseQty()">+</button>
        </div>

        <button (click)="addToCart()" class="btn-add">
          Add to Cart 🛒
        </button>
      </div>

      <ng-template #outOfStockTpl>
        <div class="out-of-stock-badge">Out of Stock</div>
      </ng-template>
    </div>
  `,
  styles: [`
    .product-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: var(--spacing-md);
      transition: transform 0.2s;
    }

    .product-card:hover {
      transform: translateY(-2px);
      border-color: var(--primary-color);
    }

    .product-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-sm);
    }

    .price {
      font-weight: bold;
      color: var(--accent-color);
      font-size: 1.1rem;
    }

    .category {
      color: var(--text-muted);
      font-size: 0.85rem;
      margin-bottom: var(--spacing-md);
    }

    .controls {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
    }

    .quantity-selector {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background: rgba(255,255,255,0.05);
      padding: 4px;
      border-radius: 4px;
    }

    .quantity-selector button {
      width: 24px;
      height: 24px;
      border-radius: 4px;
      border: none;
      background: var(--bg-primary);
      color: var(--text-primary);
      cursor: pointer;
    }

    .quantity-selector button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .btn-add {
      width: 100%;
      padding: 8px;
      background: var(--primary-color);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
    }

    .btn-add:hover {
      background: var(--primary-dark);
    }

    .out-of-stock-badge {
      background: var(--bg-primary);
      color: var(--text-muted);
      text-align: center;
      padding: 8px;
      border-radius: 4px;
      font-style: italic;
    }

    .out-of-stock {
      opacity: 0.7;
    }
  `]
})
export class UseCase4ChildComponent {
  @Input() product!: Product;

  // Custom Event with typed payload
  @Output() itemAdded = new EventEmitter<CartEvent>();

  quantity: number = 1;

  increaseQty() {
    this.quantity++;
  }

  decreaseQty() {
    if (this.quantity > 1) this.quantity--;
  }

  addToCart() {
    // Emit complex object
    const event: CartEvent = {
      productId: this.product.id,
      quantity: this.quantity,
      action: 'add'
    };

    this.itemAdded.emit(event);

    // Reset
    this.quantity = 1;
  }
}
