/**
 * TWO-WAY BINDING - CHILD COMPONENT
 * 
 * -------------------------------------------------------------------------------
 * 🎯 FEATURE HIGHLIGHT: "Banana-in-a-Box" Syntax Support
 * -------------------------------------------------------------------------------
 * This component demonstrates how to create a custom component that supports
 * Angular's two-way binding syntax: [(value)]="property".
 * 
 * 🏗️ ARCHITECTURAL CONSIDERATIONS:
 * 1. **Coupling**: Two-way binding creates a tighter coupling between parent and child
 *    than one-way binding. The parent gives up some control over the data flow.
 * 2. **State Management**: Useful for "Leaf Components" (inputs, checkboxes, widgets)
 *    where the component's sole job is to capture user input for the parent.
 *    Avoid using this for complex state that affects many parts of the app.
 * 3. **Forms vs. Binding**: For complex forms, prefer Angular's Reactive Forms
 *    (FormControl) over manual two-way binding, as they offer validation and
 *    status tracking out of the box.
 * 
 * ⚡ PERFORMANCE CONSIDERATIONS:
 * 1. **Event Noise**: Every update emits an event. If bound to a text input's
 *    'input' event (as seen below), it triggers Change Detection on every keystroke.
 *    For high-frequency updates, consider debouncing or using 'blur' events.
 * 2. **Parent Re-rendering**: When the child emits the change event, the parent
 *    updates its bound property, which triggers a re-render of the parent view.
 * 
 * 🛠️ HOW IT WORKS:
 * Angular desugars `[(counter)]="val"` into:
 * - [counter]="val"        (Data Down)
 * - (counterChange)="val=$event" (Events Up)
 * 
 * DATA FLOW DIAGRAM:
 * ```mermaid
 * graph TD
 *     Parent[Parent Component] <-->|[(Two-Way Binding)]| Child[Child Component]
 *     
 *     subgraph Under The Hood
 *     Parent -->|@Input() [property]| Child
 *     Child -->|@Output() (propertyChange)| Parent
 *     end
 * ```
 * 
 * Therefore, we MUST follow the naming convention: `@Output() [name]Change`.
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-use-case-2-child',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="child-container">
      <div class="two-way-demo">
        <h3>Counter Control</h3>
        <div class="counter-controls">
          <button (click)="decrementCounter()" class="btn btn-secondary">-</button>
          <span class="counter-display">{{ counter }}</span>
          <button (click)="incrementCounter()" class="btn btn-secondary">+</button>
        </div>
      </div>

      <div class="two-way-demo">
        <h3>Text Input Control</h3>
        <!--
          Using ngModel for internal binding,
          then emitting changes to parent
        -->
        <input
          type="text"
          [value]="userInput"
          (input)="onInputChange($event)"
          class="text-input"
          placeholder="Type here...">
        <p class="character-count">{{ userInput.length }} characters</p>
      </div>

      <div class="info-box">
        <p><strong>💡 How it works:</strong></p>
        <p>When I change the value, I emit it via the "Change" event.</p>
        <p>Parent receives it and updates its own value.</p>
        <p>Then parent sends the updated value back to me via &#64;Input().</p>
      </div>
    </div>
  `,
  styles: [`
    @import '../use-case-1/child.component.css';
    
    .two-way-demo {
      background: var(--bg-card);
      padding: var(--spacing-lg);
      border-radius: var(--radius-md);
      margin-bottom: var(--spacing-lg);
    }
    
    .two-way-demo h3 {
      font-size: 1rem;
      margin-bottom: var(--spacing-md);
      color: var(--primary-light);
    }
    
    .counter-controls {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-lg);
    }
    
    .counter-display {
      font-size: 2rem;
      font-weight: 700;
      color: var(--primary-light);
      min-width: 60px;
      text-align: center;
    }
    
    .text-input {
      width: 100%;
      padding: var(--spacing-md);
      border: 2px solid var(--primary-color);
      border-radius: var(--radius-md);
      background: var(--bg-primary);
      color: var(--text-primary);
      font-size: 1rem;
    }
    
    .character-count {
      text-align: right;
      color: var(--text-muted);
      font-size: 0.875rem;
      margin-top: var(--spacing-sm);
    }
  `]
})
export class UseCase2ChildComponent {
  /**
   * TWO-WAY BINDING INPUTS
   * These work together with their corresponding "Change" outputs
   */
  @Input() counter: number = 0;
  @Input() userInput: string = '';

  /**
   * TWO-WAY BINDING OUTPUTS
   * MUST have "Change" suffix to work with [()] syntax
   */
  @Output() counterChange = new EventEmitter<number>();
  @Output() userInputChange = new EventEmitter<string>();

  /**
   * When child modifies counter, emit the new value
   */
  incrementCounter(): void {
    this.counter++;
    this.counterChange.emit(this.counter); // Emit to parent
  }

  decrementCounter(): void {
    this.counter--;
    this.counterChange.emit(this.counter); // Emit to parent
  }

  /**
   * When input changes, emit the new value
   */
  onInputChange(event: Event): void {
    const newValue = (event.target as HTMLInputElement).value;
    this.userInput = newValue;
    this.userInputChange.emit(newValue); // Emit to parent
  }
}
