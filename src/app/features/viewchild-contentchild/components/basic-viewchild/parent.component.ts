/**
 * BASIC @VIEWCHILD - PARENT COMPONENT
 * 
 * This component demonstrates the fundamental usage of @ViewChild decorator
 * to access a child component instance.
 * 
 * -------------------------------------------------------------------------------
 * 🎯 FEATURE HIGHLIGHT: Direct Component Access
 * -------------------------------------------------------------------------------
 * @ViewChild allows you to get a reference to:
 * 1. Child component instances
 * 2. Directives
 * 3. Template reference variables
 * 
 * 🏗️ IMPORTANT CONCEPTS:
 * 1. **AfterViewInit**: ViewChild is only available AFTER the view initializes
 * 2. **Static Option**: Use {static: true} only if the child is always present
 * 3. **Null Safety**: Use ! (definite assignment) or ? (optional chaining)
 * 
 * ⚡ WHEN TO USE:
 * - Need to call child methods imperatively
 * - Need to read child state without event emission
 * - Tightly coupled parent-child interactions
 * 
 * ⚠️ WHEN NOT TO USE:
 * - For data passing (use @Input instead)
 * - For event handling (use @Output instead)
 * - When you want loose coupling
 * 
 * DATA FLOW DIAGRAM:
 * ```mermaid
 * sequenceDiagram
 *     participant Parent
 *     participant Angular
 *     participant Child
 *     
 *     Parent->>Angular: ngAfterViewInit()
 *     Angular->>Parent: @ViewChild resolved
 *     Parent->>Child: counterChild.increment()
 *     Child->>Child: Updates internal state
 *     Parent->>Child: Read counterChild.count
 *     Child-->>Parent: Returns value
 * ```
 */

import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CounterComponent } from './child.component';

@Component({
  selector: 'app-use-case-1-parent',
  standalone: true,
  imports: [CommonModule, RouterLink, CounterComponent],
  template: `
    <div class="use-case-container">
      <div class="case-header">
        <a routerLink="/viewchild-contentchild" class="back-link">← Back to Overview</a>
        <h1>Basic &#64;ViewChild</h1>
        <p>Access child component instances and call their methods directly.</p>
      </div>

      <div class="content-grid">
        <!-- LEFT: Parent Controls -->
        <div class="column">
          <div class="card">
            <h2>👨‍💼 Parent Component</h2>
            <p class="sub-header">Control the child counter from here using &#64;ViewChild!</p>

            <div class="control-section">
              <h3>Direct Method Calls</h3>
              <p class="desc">These buttons call methods on the child component:</p>
              <div class="actions">
                <button (click)="incrementFromParent()" class="btn btn-primary">
                  📈 Increment from Parent
                </button>
                <button (click)="decrementFromParent()" class="btn btn-primary">
                  📉 Decrement from Parent
                </button>
                <button (click)="resetFromParent()" class="btn btn-primary">
                  🔄 Reset from Parent
                </button>
                <button (click)="setRandomValue()" class="btn btn-accent">
                  🎲 Set Random Value
                </button>
              </div>
            </div>

            <div class="status-section">
              <h3>Reading Child State</h3>
              <p class="desc">Parent can read child properties directly:</p>
              <div class="status-grid">
                <div class="status-item">
                  <label>Current Count:</label>
                  <code>{{ counterChild.count }}</code>
                </div>
                <div class="status-item">
                  <label>Is Positive:</label>
                  <code>{{ counterChild.isPositive }}</code>
                </div>
              </div>
            </div>

            <div class="debug-section">
              <h3>🔍 How It Works</h3>
              <pre><code>// In TypeScript:
&#64;ViewChild(CounterComponent)
counterChild!: CounterComponent;

// Call child methods:
this.counterChild.increment();

// Read child properties:
const value = this.counterChild.count;</code></pre>
            </div>
          </div>
        </div>

        <!-- RIGHT: Child Component -->
        <div class="column">
          <div class="card child-card">
            <h2>👶 Child Component</h2>
            <p class="sub-header">Can be controlled by both user clicks AND parent!</p>
            
            <!-- The actual child component -->
            <app-counter></app-counter>
          </div>
        </div>
      </div>

      <!-- Explanation Section -->
      <div class="explanation-section card">
        <h2>📚 Key Takeaways</h2>
        <div class="explanation-grid">
          <div class="explanation-item">
            <h4>1️⃣ Declaration Syntax</h4>
            <code>&#64;ViewChild(CounterComponent) counterChild!: CounterComponent;</code>
            <p class="detail">The ! tells TypeScript "this will be assigned by Angular"</p>
          </div>

          <div class="explanation-item">
            <h4>2️⃣ Timing is Critical</h4>
            <p>&#64;ViewChild is <strong>undefined</strong> in constructor and ngOnInit!</p>
            <p class="detail">Only use it in ngAfterViewInit or later lifecycle hooks.</p>
          </div>

          <div class="explanation-item">
            <h4>3️⃣ Direct Access Pattern</h4>
            <p>You get the actual component instance, not a copy.</p>
            <p class="detail">Changes are immediate and synchronous.</p>
          </div>

          <div class="explanation-item">
            <h4>4️⃣ vs &#64;Input/&#64;Output</h4>
            <p>&#64;ViewChild = Tight coupling, imperative control</p>
            <p class="detail">&#64;Input/&#64;Output = Loose coupling, declarative data flow</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @import '../../../input-output/components/basic-input-output/parent.component.css';

    .control-section, .status-section {
      margin-bottom: var(--spacing-xl);
      padding-bottom: var(--spacing-lg);
      border-bottom: 1px solid rgba(102, 126, 234, 0.1);
    }

    .control-section:last-child, .status-section:last-child {
      border-bottom: none;
    }

    .desc {
      color: var(--text-muted);
      font-size: 0.9rem;
      margin-bottom: var(--spacing-md);
    }

    .status-grid {
      display: grid;
      gap: var(--spacing-sm);
    }

    .status-item {
      display: flex;
      justify-content: space-between;
      padding: var(--spacing-sm);
      background: var(--bg-card);
      border-radius: var(--radius-sm);
    }

    .status-item label {
      color: var(--text-secondary);
      font-weight: 600;
    }

    .status-item code {
      color: var(--accent-color);
      background: rgba(118, 75, 162, 0.1);
      padding: 2px 8px;
      border-radius: 4px;
    }

    .debug-section {
      background: #1e293b;
      padding: var(--spacing-lg);
      border-radius: var(--radius-md);
      margin-top: var(--spacing-lg);
    }

    .debug-section h3 {
      color: var(--primary-light);
      margin-bottom: var(--spacing-md);
    }

    .debug-section pre {
      margin: 0;
      overflow-x: auto;
    }

    .debug-section code {
      color: #94a3b8;
      font-family: 'Courier New', monospace;
      font-size: 0.85rem;
      line-height: 1.6;
    }

    .btn-accent {
      background: var(--accent-color);
      color: white;
    }

    .btn-accent:hover {
      opacity: 0.9;
    }
  `]
})
export class UseCase1ParentComponent implements AfterViewInit {
  /**
   * @ViewChild DECORATOR
   * 
   * This decorator queries the view for a child component/directive/element.
   * 
   * SYNTAX: @ViewChild(ComponentType) propertyName!: ComponentType;
   * 
   * Parameters:
   * - ComponentType: The class of the component to find
   * - Options (optional): { static: boolean, read: any }
   * 
   * The ! (definite assignment assertion) tells TypeScript that Angular
   * will assign this value, even though it's not assigned in the constructor.
   */
  @ViewChild(CounterComponent)
  counterChild!: CounterComponent;

  /**
   * LIFECYCLE HOOK: AfterViewInit
   * 
   * This is called AFTER Angular initializes the component's views and child views.
   * This is the EARLIEST point where @ViewChild is guaranteed to be set.
   * 
   * IMPORTANT: Do NOT try to access @ViewChild in constructor or ngOnInit!
   */
  ngAfterViewInit(): void {
    console.log('✅ AfterViewInit: ViewChild is now available!');
    console.log('Child counter instance:', this.counterChild);
    console.log('Initial count:', this.counterChild.count);
  }

  /**
   * PARENT METHODS
   * These methods use the ViewChild reference to control the child
   */

  incrementFromParent(): void {
    // Call child's public method
    this.counterChild.increment();
    console.log('Parent called increment, new count:', this.counterChild.count);
  }

  decrementFromParent(): void {
    this.counterChild.decrement();
  }

  resetFromParent(): void {
    this.counterChild.reset();
  }

  setRandomValue(): void {
    const randomValue = Math.floor(Math.random() * 100);
    // Call child's setValue method with a parameter
    this.counterChild.setValue(randomValue);
  }
}
