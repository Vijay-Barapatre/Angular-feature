/**
 * BASIC @VIEWCHILD - CHILD COMPONENT
 * 
 * This is a simple counter component that will be accessed by the parent
 * using @ViewChild. It exposes public methods and properties that the parent
 * can call and read directly.
 * 
 * KEY LEARNING POINTS:
 * - Components can expose public API (methods and properties)
 * - Parent can access child via @ViewChild
 * - This is different from @Input/@Output (which is data/event driven)
 * 
 * DATA FLOW DIAGRAM:
 * ```mermaid
 * graph LR
 *     Parent["Parent Component"] -->|@ViewChild reference| Child["Child Component"]
 *     Parent -->|"Calls child.increment()"| Child
 *     Parent -->|"Reads child.count"| Child
 * ```
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="counter-widget">
      <h3>Counter Widget</h3>
      <div class="counter-display">
        <span class="count">{{ count }}</span>
      </div>
      <div class="counter-controls">
        <button (click)="decrement()" class="btn btn-secondary">-</button>
        <button (click)="reset()" class="btn btn-secondary">Reset</button>
        <button (click)="increment()" class="btn btn-secondary">+</button>
      </div>
      <p class="info">This component can be controlled by the parent using &#64;ViewChild!</p>
    </div>
  `,
  styles: [`
    .counter-widget {
      background: var(--bg-card);
      padding: var(--spacing-xl);
      border-radius: var(--radius-lg);
      text-align: center;
      border: 2px solid var(--primary-color);
    }

    .counter-widget h3 {
      color: var(--primary-light);
      margin-bottom: var(--spacing-lg);
    }

    .counter-display {
      margin: var(--spacing-xl) 0;
    }

    .count {
      font-size: 4rem;
      font-weight: bold;
      color: var(--accent-color);
      display: block;
    }

    .counter-controls {
      display: flex;
      gap: var(--spacing-md);
      justify-content: center;
      margin-bottom: var(--spacing-md);
    }

    .info {
      color: var(--text-muted);
      font-size: 0.9rem;
      margin-top: var(--spacing-lg);
    }
  `]
})
export class CounterComponent {
  /**
   * PUBLIC PROPERTIES
   * The parent can read these directly via ViewChild reference
   */
  count: number = 0;

  /**
   * PUBLIC METHODS
   * The parent can call these methods directly via ViewChild reference
   */

  increment(): void {
    this.count++;
    console.log('Counter incremented from CHILD:', this.count);
  }

  decrement(): void {
    this.count--;
    console.log('Counter decremented from CHILD:', this.count);
  }

  reset(): void {
    this.count = 0;
    console.log('Counter reset from CHILD');
  }

  /**
   * UTILITY METHOD
   * Parent can call this to set a specific value
   */
  setValue(value: number): void {
    this.count = value;
    console.log('Counter set to:', value);
  }

  /**
   * GETTER METHOD
   * Parent can check if counter is positive
   */
  get isPositive(): boolean {
    return this.count > 0;
  }
}
