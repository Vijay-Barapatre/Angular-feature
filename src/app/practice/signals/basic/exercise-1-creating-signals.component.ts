/**
 * ============================================================================
 * 🟦 BASIC EXERCISE 1: CREATING AND READING SIGNALS
 * ============================================================================
 * 
 * 📋 OBJECTIVE:
 * Learn how to create signals and read their values in templates and code.
 * 
 * 📝 DESCRIPTION:
 * Create a counter component using signals instead of regular properties.
 * 
 * ✅ EXPECTED BEHAVIOR:
 * 1. Display current count value
 * 2. Increment/decrement buttons work
 * 3. Reset button sets to 0
 * 4. Count updates immediately in template
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-exercise-1-signals',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 1: Creating and Reading Signals</h2>
                <p>Create a counter using Angular signals.</p>
                
                <h4>Tasks:</h4>
                <ul>
                    <li>Create a signal for the count value</li>
                    <li>Read the signal in the template using ()</li>
                    <li>Implement increment, decrement, and reset</li>
                </ul>
                
                <div class="hint">
                    <strong>💡 Hint:</strong> Use signal() to create, count() to read
                </div>
            </div>

            <div class="demo">
                <h3>🎮 Counter Demo</h3>
                
                <div class="counter-display">
                    <!-- TODO: Display count signal value using count() -->
                    <span class="count-value">{{ count() }}</span>
                </div>
                
                <div class="controls">
                    <button (click)="decrement()">−</button>
                    <button (click)="reset()">Reset</button>
                    <button (click)="increment()">+</button>
                </div>

                <div class="info-box">
                    <p>Count is {{ count() >= 0 ? 'positive' : 'negative' }}</p>
                    <p>Doubled: {{ doubled() }}</p>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 600px; }
        .instructions { background: #f0fdf4; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; }
        .instructions h2 { margin: 0 0 0.5rem; color: #8b5cf6; }
        .hint { margin-top: 1rem; padding: 0.75rem; background: #eff6ff; border-radius: 6px; }
        .demo { background: white; padding: 1.5rem; border-radius: 8px; text-align: center; }
        .counter-display { margin: 2rem 0; }
        .count-value { font-size: 5rem; font-weight: bold; color: #8b5cf6; }
        .controls { display: flex; justify-content: center; gap: 1rem; margin-bottom: 1.5rem; }
        .controls button { width: 60px; height: 60px; border: none; border-radius: 12px; font-size: 1.5rem; cursor: pointer; background: #8b5cf6; color: white; }
        .controls button:hover { background: #7c3aed; }
        .info-box { padding: 1rem; background: #f8fafc; border-radius: 8px; }
    `]
})
export class Exercise1SignalsComponent {
    /**
     * TODO: Create a signal for count
     * 
     * HINT: count = signal(0);
     */
    count = signal(0);  // TODO: Initialize with signal()

    /**
     * TODO: Create a computed signal for doubled value
     * 
     * HINT: doubled = computed(() => this.count() * 2);
     */
    doubled = signal(0);  // TODO: Change to computed()

    /**
     * TODO: Implement increment
     * 
     * HINT: Use this.count.update(v => v + 1)
     * or this.count.set(this.count() + 1)
     */
    increment(): void {
        // TODO: Implement using update() or set()
        this.count.update(v => v + 1);
        this.doubled.set(this.count() * 2);
    }

    /**
     * TODO: Implement decrement
     */
    decrement(): void {
        // TODO: Implement
        this.count.update(v => v - 1);
        this.doubled.set(this.count() * 2);
    }

    /**
     * TODO: Implement reset
     */
    reset(): void {
        // TODO: Implement using set()
        this.count.set(0);
        this.doubled.set(0);
    }
}
