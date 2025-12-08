/**
 * USE CASE 3: COMPLEX OBJECTS - PARENT COMPONENT
 * 
 * -------------------------------------------------------------------------------
 * 🎯 FEATURE HIGHLIGHT: Reference vs. Value Updates
 * -------------------------------------------------------------------------------
 * This component acts as the "Smart" container that manages the data state.
 * It demonstrates the critical difference between mutating data and replacing it.
 * 
 * 🏗️ ARCHITECTURAL CONSIDERATIONS:
 * 1. **Unidirectional Data Flow**: Data flows down. By using immutable updates,
 *    we ensure the child components always receive a clear signal when to update.
 * 2. **Predictability**: Immutable updates make state changes traceable (e.g.,
 *    Redux/NgRx patterns rely on this). You can compare `prevObj !== nextObj`.
 * 
 * ⚡ PERFORMANCE CONSIDERATIONS:
 * 1. **Memory**: Creating new objects (Immutability) does create more garbage
 *    collection pressure than mutation. However, in modern JS engines, this cost
 *    is negligible compared to the massive CPU savings from skipping Change Detection
 *    in the view layer (OnPush).
 * 2. **Spread Operator**: Using `{ ...obj }` is an efficient shallow copy.
 * 
 * 🛠️ HOW IT WORKS:
 * - `mutateUser()`: Changes a property inside the SAME object. Reference doesn't change.
 *    Angular's OnPush check sees (OldRef === NewRef) and does NOTHING.
 * - `updateUserImmutable()`: Creates a NEW object. Reference changes.
 *    Angular's OnPush check sees (OldRef !== NewRef) and UPDATES the view.
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UseCase3ChildComponent, UserProfile } from './child.component';

@Component({
  selector: 'app-use-case-3-parent',
  standalone: true,
  imports: [CommonModule, RouterLink, UseCase3ChildComponent],
  template: `
    <div class="use-case-container">
      <div class="case-header">
        <a routerLink="/input-output" class="back-link">← Back to Overview</a>
        <h1>Use Case 3: Complex Objects & Immutability</h1>
        <p>Understand how object references affect change detection.</p>
      </div>

      <div class="content-grid">
        <!-- LEFT: Parent Controls -->
        <div class="column">
          <div class="card">
            <h2>👨‍💼 Parent Component</h2>
            
            <div class="control-section">
              <h3>❌ Bad Pattern (Mutation)</h3>
              <p class="desc">Modifies the existing object. Child won't update!</p>
              <button (click)="mutateUser()" class="btn btn-danger">
                Mutate Name (No Update)
              </button>
            </div>

            <div class="control-section">
              <h3>✅ Good Pattern (Immutability)</h3>
              <p class="desc">Creates a NEW object. Child updates!</p>
              <button (click)="updateUserImmutable()" class="btn btn-success">
                Update Name (Immutable)
              </button>
            </div>

            <div class="debug-info">
              <h4>Current Parent State:</h4>
              <pre>{{ currentUser | json }}</pre>
            </div>
          </div>
        </div>

        <!-- RIGHT: Child Display -->
        <div class="column">
          <app-use-case-3-child [user]="currentUser"></app-use-case-3-child>
        </div>
      </div>

      <div class="explanation-section card">
        <h2>📚 Why does this happen?</h2>
        <div class="explanation-grid">
          <div class="explanation-item">
            <h4>JavaScript References</h4>
            <p>Objects are passed by reference. If you change a property, the reference stays the same.</p>
          </div>
          <div class="explanation-item">
            <h4>OnPush Strategy</h4>
            <p>The child uses <code>ChangeDetectionStrategy.OnPush</code>. It only updates if the <strong>Input Reference</strong> changes.</p>
          </div>
          <div class="explanation-item">
            <h4>Immutability</h4>
            <p>Creating a copy <code>{{ '{ ...user }' }}</code> creates a new reference, triggering the update.</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @import '../use-case-1/parent.component.css';

    .control-section {
      margin-bottom: var(--spacing-lg);
      padding-bottom: var(--spacing-md);
      border-bottom: 1px solid var(--border-color);
    }

    .desc {
      font-size: 0.9rem;
      color: var(--text-muted);
      margin-bottom: var(--spacing-sm);
    }

    .btn-danger {
      background: #ef4444;
      color: white;
      width: 100%;
    }

    .btn-success {
      background: #10b981;
      color: white;
      width: 100%;
    }

    .debug-info pre {
      background: #1e293b;
      padding: 10px;
      border-radius: 4px;
      font-size: 0.8rem;
      overflow-x: auto;
    }
  `]
})
export class UseCase3ParentComponent {
  currentUser: UserProfile = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'User',
    settings: {
      notifications: true,
      theme: 'Dark'
    }
  };

  /**
   * MUTATION (BAD)
   * Modifies the property directly.
   * The object reference `this.currentUser` remains the SAME.
   * Child with OnPush will NOT detect this change.
   */
  mutateUser() {
    this.currentUser.name = 'Mutated Name ' + Math.floor(Math.random() * 100);
    console.log('Mutated user:', this.currentUser);
    // Note: Parent view updates because it uses Default change detection,
    // but Child view will NOT update.
  }

  /**
   * IMMUTABLE UPDATE (GOOD)
   * Creates a brand new object using the spread operator.
   * The object reference CHANGES.
   * Child with OnPush WILL detect this change.
   */
  updateUserImmutable() {
    this.currentUser = {
      ...this.currentUser,
      name: 'Immutable Name ' + Math.floor(Math.random() * 100)
    };
    console.log('New user object:', this.currentUser);
  }
}
