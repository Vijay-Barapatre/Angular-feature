/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 2: DYNAMIC FORM ARRAYS
 * ============================================================================
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
    selector: 'app-scenario-2-arrays',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 2: Dynamic Form Arrays</h2>
                <p>Add/remove form fields dynamically using FormArray.</p>
            </div>

            <div class="form-container">
                <form [formGroup]="orderForm" (ngSubmit)="onSubmit()">
                    <div class="form-section">
                        <h3>📦 Order Items</h3>
                        <button type="button" class="add-btn" (click)="addItem()">
                            + Add Item
                        </button>

                        <div formArrayName="items" class="items-list">
                            @for (item of items.controls; track item; let i = $index) {
                                <div class="item-row" [formGroupName]="i">
                                    <input formControlName="name" placeholder="Item name">
                                    <input formControlName="quantity" type="number" placeholder="Qty" style="width: 80px">
                                    <input formControlName="price" type="number" placeholder="Price" style="width: 100px">
                                    <span class="item-total">
                                        = \${{ getItemTotal(i).toFixed(2) }}
                                    </span>
                                    <button type="button" class="remove-btn" (click)="removeItem(i)">×</button>
                                </div>
                            }
                        </div>

                        @if (items.length === 0) {
                            <p class="empty">No items added yet</p>
                        }
                    </div>

                    <div class="order-summary">
                        <p>Items: {{ items.length }}</p>
                        <p class="total">Total: \${{ getOrderTotal().toFixed(2) }}</p>
                    </div>

                    <button type="submit" [disabled]="orderForm.invalid || items.length === 0">
                        Place Order
                    </button>
                </form>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 700px; }
        .instructions { background: #fef2f2; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #3b82f6; }
        .form-container form { background: white; padding: 1.5rem; border-radius: 8px; }
        .form-section h3 { margin: 0 0 1rem; }
        .add-btn { padding: 0.5rem 1rem; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer; margin-bottom: 1rem; }
        .items-list { display: flex; flex-direction: column; gap: 0.75rem; }
        .item-row { display: flex; gap: 0.5rem; align-items: center; padding: 0.75rem; background: #f8fafc; border-radius: 6px; }
        .item-row input { padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 4px; }
        .item-row input:first-child { flex: 1; }
        .item-total { min-width: 80px; font-weight: bold; color: #10b981; }
        .remove-btn { width: 32px; height: 32px; border: none; border-radius: 4px; background: #ef4444; color: white; cursor: pointer; font-size: 1.25rem; }
        .empty { text-align: center; color: #9ca3af; padding: 2rem; }
        .order-summary { padding: 1rem; background: #1e1e2e; border-radius: 8px; color: white; margin: 1rem 0; text-align: right; }
        .order-summary .total { font-size: 1.25rem; font-weight: bold; color: #10b981; }
        button[type="submit"] { width: 100%; padding: 0.75rem; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; }
        button:disabled { opacity: 0.5; }
    `]
})
export class Scenario2ArraysComponent {
    orderForm;

    constructor(private fb: FormBuilder) {
        this.orderForm = this.fb.group({
            items: this.fb.array([])
        });
    }

    get items(): FormArray {
        return this.orderForm.get('items') as FormArray;
    }

    addItem(): void {
        const itemGroup = this.fb.group({
            name: ['', Validators.required],
            quantity: [1, [Validators.required, Validators.min(1)]],
            price: [0, [Validators.required, Validators.min(0)]]
        });
        this.items.push(itemGroup);
    }

    removeItem(index: number): void {
        this.items.removeAt(index);
    }

    getItemTotal(index: number): number {
        const item = this.items.at(index);
        const qty = item.get('quantity')?.value || 0;
        const price = item.get('price')?.value || 0;
        return qty * price;
    }

    getOrderTotal(): number {
        return this.items.controls.reduce((sum, _, i) => sum + this.getItemTotal(i), 0);
    }

    onSubmit(): void {
        console.log('Order:', this.orderForm.value);
        alert('Order placed!');
    }
}
