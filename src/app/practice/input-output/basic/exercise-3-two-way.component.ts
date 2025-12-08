/**
 * ============================================================================
 * 🟦 BASIC EXERCISE 3: TWO-WAY BINDING
 * ============================================================================
 * 
 * 📋 OBJECTIVE:
 * Learn how to implement two-way binding using @Input + @Output pattern.
 * 
 * 📝 DESCRIPTION:
 * Create a counter component with increment/decrement that syncs with parent.
 * 
 * ✅ EXPECTED BEHAVIOR:
 * 1. Display current count value
 * 2. Increment/decrement buttons update value
 * 3. Parent can set initial value
 * 4. Changes sync bidirectionally
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// ========================================
// CHILD COMPONENT (Complete the TODOs)
// ========================================

@Component({
    selector: 'app-counter',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="counter">
            <button (click)="decrement()" [disabled]="count <= min">−</button>
            <span class="value">{{ count }}</span>
            <button (click)="increment()" [disabled]="count >= max">+</button>
        </div>
    `,
    styles: [`
        .counter { display: inline-flex; align-items: center; gap: 0.5rem; background: #f8fafc; padding: 0.5rem; border-radius: 8px; }
        button { width: 36px; height: 36px; border: none; border-radius: 6px; background: #10b981; color: white; font-size: 1.25rem; cursor: pointer; }
        button:disabled { background: #e5e7eb; cursor: not-allowed; }
        button:hover:not(:disabled) { background: #059669; }
        .value { min-width: 50px; text-align: center; font-size: 1.5rem; font-weight: bold; }
    `]
})
export class CounterComponent {
    /**
     * TODO: Add @Input for count value
     * This will receive the current value from parent
     */
    // TODO: @Input() count = 0;

    /**
     * TODO: Add @Output for count changes
     * 
     * IMPORTANT: For two-way binding to work, the output name must be
     * the input name + "Change" (e.g., count → countChange)
     */
    // TODO: @Output() countChange = new EventEmitter<number>();

    /**
     * TODO: Add @Input for min value (optional)
     */
    // TODO: @Input() min = 0;

    /**
     * TODO: Add @Input for max value (optional)
     */
    // TODO: @Input() max = 100;

    count = 0;
    min = 0;
    max = 100;

    /**
     * TODO: Implement increment
     * 
     * Should:
     * 1. Increase count by 1 (if below max)
     * 2. Emit the new count value
     */
    increment(): void {
        // TODO: Write your logic here
        // if (this.count < this.max) {
        //     this.count++;
        //     this.countChange.emit(this.count);
        // }
    }

    /**
     * TODO: Implement decrement
     * 
     * Should:
     * 1. Decrease count by 1 (if above min)
     * 2. Emit the new count value
     */
    decrement(): void {
        // TODO: Write your logic here
    }
}

// ========================================
// PARENT COMPONENT (For testing)
// ========================================

@Component({
    selector: 'app-exercise-3-two-way',
    standalone: true,
    imports: [CommonModule, FormsModule, CounterComponent],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 3: Two-Way Binding</h2>
                <p>Complete the CounterComponent to support two-way binding with [(count)].</p>
                
                <h4>Tasks:</h4>
                <ul>
                    <li>Add &#64;Input() count property</li>
                    <li>Add &#64;Output() countChange EventEmitter</li>
                    <li>Implement increment() and decrement() methods</li>
                    <li>Emit changes after updating count</li>
                </ul>
                
                <div class="hint">
                    <strong>💡 Hint:</strong> Two-way binding syntax [(x)] requires:
                    <ul>
                        <li>&#64;Input() x - to receive value</li>
                        <li>&#64;Output() xChange - to emit changes</li>
                    </ul>
                </div>
            </div>

            <div class="demo">
                <h3>🎮 Test Your Implementation</h3>
                
                <div class="counter-demo">
                    <h4>Quantity:</h4>
                    <!-- TODO: Use two-way binding [(count)]="quantity" -->
                    <app-counter></app-counter>
                </div>

                <div class="parent-controls">
                    <h4>Parent Controls:</h4>
                    <input type="number" [(ngModel)]="quantity" min="0" max="100">
                    <button (click)="quantity = 0">Reset</button>
                    <button (click)="quantity = 50">Set to 50</button>
                </div>

                <div class="result">
                    <h4>Parent Value:</h4>
                    <p>quantity = <strong>{{ quantity }}</strong></p>
                    <p class="note">
                        If two-way binding works, changing the counter should update
                        the input above, and vice versa.
                    </p>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 700px; }
        .instructions { background: #f0fdf4; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; color: #1e1e2e; }
        .instructions h2 { margin: 0 0 0.5rem; color: #10b981; }
        .hint { margin-top: 1rem; padding: 0.75rem; background: #fef3c7; border-radius: 6px; font-size: 0.9rem; }
        .hint ul { margin: 0.5rem 0 0; padding-left: 1.5rem; }
        .demo { background: white; padding: 1.5rem; border-radius: 8px; }
        .counter-demo { margin-bottom: 1.5rem; }
        .counter-demo h4 { margin: 0 0 0.5rem; }
        .parent-controls { margin-bottom: 1rem; display: flex; gap: 0.5rem; align-items: center; }
        .parent-controls h4 { margin: 0; }
        .parent-controls input { padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 4px; width: 80px; }
        .parent-controls button { padding: 0.5rem 1rem; border: none; border-radius: 4px; background: #10b981; color: white; cursor: pointer; }
        .result { padding: 1rem; background: #f0fdf4; border-radius: 8px; }
        .result h4 { margin: 0 0 0.5rem; }
        .result p { margin: 0; }
        .result .note { margin-top: 0.5rem; font-size: 0.85rem; color: #6b7280; }
    `]
})
export class Exercise3TwoWayComponent {
    quantity = 5;
}
