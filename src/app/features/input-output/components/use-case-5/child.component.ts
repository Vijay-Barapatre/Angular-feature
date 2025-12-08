/**
 * USE CASE 5: INPUT TRANSFORMS - CHILD COMPONENT
 * 
 * Demonstrates:
 * 1. Angular 16+ `transform` function in @Input
 * 2. Using setters for validation/side-effects
 * 3. Type coercion (string -> number, string -> boolean)
 */

import { Component, Input, booleanAttribute, numberAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';

// Custom transform function
function toUpperCase(value: string): string {
    return value ? value.toUpperCase() : '';
}

@Component({
    selector: 'app-use-case-5-child',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="child-container">
      <h3>👶 Child Component</h3>
      
      <div class="input-display">
        <div class="row">
          <span class="label">Label (Transformed to Upper):</span>
          <span class="value">{{ label }}</span>
        </div>

        <div class="row">
          <span class="label">Count (Coerced to Number):</span>
          <span class="value">{{ count }} (Type: {{ typeofCount }})</span>
        </div>

        <div class="row">
          <span class="label">Disabled (Coerced to Boolean):</span>
          <span class="value status" [class.active]="disabled">
            {{ disabled }}
          </span>
        </div>

        <div class="row">
          <span class="label">Priority (Validated via Setter):</span>
          <span class="value">{{ priority }}</span>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .child-container {
      background: var(--bg-card);
      padding: var(--spacing-lg);
      border-radius: var(--radius-md);
      border: 1px solid var(--border-color);
    }

    .row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }

    .label { color: var(--text-muted); }
    .value { font-weight: bold; color: var(--primary-light); }

    .status.active { color: #ef4444; }
  `]
})
export class UseCase5ChildComponent {
    // 1. Transform String
    @Input({ transform: toUpperCase }) label: string = '';

    // 2. Built-in Number Transform (handles "10", 10, etc.)
    @Input({ transform: numberAttribute }) count: number = 0;

    // 3. Built-in Boolean Transform (handles "true", "", etc.)
    @Input({ transform: booleanAttribute }) disabled: boolean = false;

    // 4. Setter for Validation
    private _priority: number = 1;

    @Input()
    set priority(value: number) {
        // Clamp value between 1 and 5
        this._priority = Math.min(Math.max(value, 1), 5);
    }

    get priority(): number {
        return this._priority;
    }

    get typeofCount(): string {
        return typeof this.count;
    }
}
