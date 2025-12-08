/**
 * ============================================================================
 * 🟦 BASIC EXERCISE 2: COMPUTED SIGNALS
 * ============================================================================
 */

import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-exercise-2-computed',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 2: Computed Signals</h2>
                <p>Create derived state with computed signals.</p>
                
                <h4>Tasks:</h4>
                <ul>
                    <li>Create computed signals for fullName, isAdult, discountedPrice</li>
                    <li>Computed signals auto-update when dependencies change</li>
                </ul>
            </div>

            <div class="demo">
                <h3>👤 User Profile</h3>
                
                <div class="form-row">
                    <label>First Name:</label>
                    <input [value]="firstName()" (input)="firstName.set($any($event.target).value)">
                </div>
                <div class="form-row">
                    <label>Last Name:</label>
                    <input [value]="lastName()" (input)="lastName.set($any($event.target).value)">
                </div>
                <div class="form-row">
                    <label>Age:</label>
                    <input type="number" [value]="age()" (input)="age.set(+$any($event.target).value)">
                </div>

                <div class="results">
                    <p><strong>Full Name:</strong> {{ fullName() }}</p>
                    <p><strong>Is Adult:</strong> {{ isAdult() ? 'Yes ✅' : 'No ❌' }}</p>
                </div>

                <hr>

                <h3>🛒 Price Calculator</h3>
                
                <div class="form-row">
                    <label>Base Price ($):</label>
                    <input type="number" [value]="basePrice()" (input)="basePrice.set(+$any($event.target).value)">
                </div>
                <div class="form-row">
                    <label>Quantity:</label>
                    <input type="number" [value]="quantity()" (input)="quantity.set(+$any($event.target).value)">
                </div>
                <div class="form-row">
                    <label>Discount (%):</label>
                    <input type="number" [value]="discountPercent()" (input)="discountPercent.set(+$any($event.target).value)">
                </div>

                <div class="results price-results">
                    <p><strong>Subtotal:</strong> \${{ subtotal().toFixed(2) }}</p>
                    <p><strong>Discount:</strong> -\${{ discountAmount().toFixed(2) }}</p>
                    <p class="total"><strong>Total:</strong> \${{ total().toFixed(2) }}</p>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 600px; }
        .instructions { background: #f0fdf4; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; color: #1e1e2e; }
        .instructions h2 { margin: 0 0 0.5rem; color: #8b5cf6; }
        .demo { background: white; padding: 1.5rem; border-radius: 8px; }
        .form-row { display: flex; align-items: center; gap: 1rem; margin-bottom: 0.75rem; }
        .form-row label { min-width: 120px; }
        .form-row input { flex: 1; padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 4px; }
        .results { padding: 1rem; background: #f8fafc; border-radius: 8px; margin-top: 1rem; }
        .price-results { background: #f0fdf4; }
        .total { font-size: 1.25rem; color: #10b981; }
        hr { margin: 1.5rem 0; border: none; border-top: 1px solid #e5e7eb; }
    `]
})
export class Exercise2ComputedComponent {
    // User Profile Signals
    firstName = signal('John');
    lastName = signal('Doe');
    age = signal(25);

    /**
     * TODO: Create computed signal for full name
     * 
     * HINT: fullName = computed(() => `${this.firstName()} ${this.lastName()}`);
     */
    fullName = computed(() => `${this.firstName()} ${this.lastName()}`);

    /**
     * TODO: Create computed signal for isAdult (age >= 18)
     */
    isAdult = computed(() => this.age() >= 18);

    // Price Calculator Signals
    basePrice = signal(100);
    quantity = signal(2);
    discountPercent = signal(10);

    /**
     * TODO: Create computed signal for subtotal (basePrice * quantity)
     */
    subtotal = computed(() => this.basePrice() * this.quantity());

    /**
     * TODO: Create computed signal for discount amount
     */
    discountAmount = computed(() => this.subtotal() * (this.discountPercent() / 100));

    /**
     * TODO: Create computed signal for total (subtotal - discount)
     */
    total = computed(() => this.subtotal() - this.discountAmount());
}
