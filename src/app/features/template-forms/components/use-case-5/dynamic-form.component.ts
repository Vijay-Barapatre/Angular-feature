
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface OrderItem {
    id: number;
    productName: string;
    quantity: number;
    price: number;
}

interface Order {
    customerName: string;
    items: OrderItem[];
}

@Component({
    selector: 'app-dynamic-form',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    template: `
    <div class="form-container">
      <h1>🔢 Use Case 5: Dynamic Forms</h1>
      <p class="desc">Managing dynamic lists (Add/Remove items) with unique names and real-time totals.</p>

      <form #orderForm="ngForm" (ngSubmit)="onSubmit(orderForm)">
        
        <!-- Header Info -->
        <div class="form-group">
          <label>Customer Name</label>
          <input type="text" name="customerName" [(ngModel)]="order.customerName" required placeholder="Who is this for?">
        </div>

        <!-- Dynamic List -->
        <div class="items-section">
          <h3>Order Items ({{ order.items.length }})</h3>
          
          <div *ngIf="order.items.length === 0" class="empty-state">
            No items in the order. Click "Add Item" to start.
          </div>

          <div *ngFor="let item of order.items; let i = index; trackBy: trackById" class="item-card">
            <div class="item-header">
              <span class="badg">Item #{{ i + 1 }}</span>
              <button type="button" class="btn-remove" (click)="removeItem(i)" title="Remove Item">&times;</button>
            </div>

            <div class="row">
              <!-- Product Name -->
              <div class="col-grow">
                <input 
                  type="text" 
                  [name]="'product-' + i" 
                  [(ngModel)]="item.productName" 
                  required 
                  placeholder="Product Name"
                >
              </div>
              
              <!-- Quantity -->
              <div class="col-small">
                <input 
                  type="number" 
                  [name]="'qty-' + i" 
                  [(ngModel)]="item.quantity" 
                  required 
                  min="1"
                  placeholder="Qty"
                >
              </div>

              <!-- Price -->
              <div class="col-small">
                <input 
                  type="number" 
                  [name]="'price-' + i" 
                  [(ngModel)]="item.price" 
                  required 
                  min="0.01"
                  step="0.01"
                  placeholder="Price"
                >
              </div>

              <!-- Row Total (Calculated) -->
              <div class="col-total">
                {{ (item.quantity * item.price) | currency }}
              </div>
            </div>
          </div>

          <button type="button" class="btn-add" (click)="addItem()">+ Add Item</button>
        </div>

        <!-- Validation Error for Empty List -->
        <div *ngIf="orderForm.submitted && order.items.length === 0" class="error-banner">
          ⚠️ Order must have at least one item.
        </div>

        <!-- Footer / Grand Total -->
        <div class="footer">
          <div class="grand-total">
            Total: {{ calculateGrandTotal() | currency }}
          </div>
          <button type="submit" [disabled]="orderForm.invalid || order.items.length === 0">Place Order</button>
        </div>

      </form>

      <div class="debug-panel">
        <h3>🔍 Data Model</h3>
        <pre>{{ order | json }}</pre>
      </div>

      <a routerLink="/template-forms" class="back-link">← Back to Overview</a>
    </div>
  `,
    styles: [`
    .form-container {
      max-width: 700px;
      margin: 30px auto;
      padding: 20px;
      border: 1px solid var(--border-color);
      border-radius: 8px;
    }

    input {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      width: 100%;
    }

    .form-group { margin-bottom: 20px; }
    
    label { display: block; margin-bottom: 5px; font-weight: bold; }

    .items-section {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 20px;
    }

    .item-card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 10px;
      margin-bottom: 10px;
      animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-5px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .item-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
    }

    .badg {
      font-size: 0.75rem;
      background: #e2e8f0;
      padding: 2px 6px;
      border-radius: 4px;
      color: #64748b;
    }

    .row {
      display: flex;
      gap: 10px;
      align-items: center;
    }

    .col-grow { flex-grow: 1; }
    .col-small { width: 70px; }
    .col-total { 
      width: 80px; 
      text-align: right; 
      font-weight: bold; 
      color: #16a34a;
    }

    .btn-remove {
      background: transparent;
      border: none;
      color: #ef4444;
      font-size: 1.2rem;
      cursor: pointer;
      line-height: 1;
    }

    .btn-add {
      width: 100%;
      padding: 10px;
      background: white;
      border: 2px dashed #cbd5e1;
      color: #64748b;
      border-radius: 6px;
      cursor: pointer;
      font-weight: bold;
    }

    .btn-add:hover {
      border-color: #3b82f6;
      color: #3b82f6;
    }

    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
      padding-top: 20px;
      border-top: 2px solid #e2e8f0;
    }

    .grand-total {
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--text-primary);
    }

    button[type="submit"] {
      padding: 12px 24px;
      background: var(--primary-color);
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 1.1rem;
      font-weight: bold;
      cursor: pointer;
    }

    button[type="submit"]:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    .error-banner {
      background: #fee2e2;
      color: #b91c1c;
      padding: 10px;
      border-radius: 4px;
      margin-top: 10px;
      text-align: center;
    }

    .debug-panel {
      margin-top: 40px;
      padding: 15px;
      background: #1e293b;
      color: #cbd5e1;
      border-radius: 6px;
      overflow: auto;
    }
    
    .back-link {
        display: block;
        margin-top: 20px;
        text-align: center;
        color: var(--primary-color);
        text-decoration: none;
    }
    
    .empty-state {
        text-align: center;
        padding: 20px;
        color: #94a3b8;
        font-style: italic;
    }
  `]
})
export class DynamicFormComponent {
    order: Order = {
        customerName: '',
        items: [
            { id: 1, productName: 'Laptop', quantity: 1, price: 999.00 }
        ]
    };

    private nextId = 2;

    addItem() {
        this.order.items.push({
            id: this.nextId++,
            productName: '',
            quantity: 1,
            price: 0
        });
    }

    removeItem(index: number) {
        this.order.items.splice(index, 1);
    }

    calculateGrandTotal(): number {
        return this.order.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }

    // Tracking function for *ngFor performance and focus management
    trackById(index: number, item: OrderItem) {
        return item.id;
    }

    onSubmit(form: NgForm) {
        if (form.valid && this.order.items.length > 0) {
            alert(`Order Placed!\nTotal: $${this.calculateGrandTotal()}`);
            console.log('Final Order:', this.order);
        }
    }
}
