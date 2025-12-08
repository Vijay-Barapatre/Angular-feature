/**
 * USE CASE 3: COMPLEX OBJECTS - CHILD COMPONENT
 * 
 * -------------------------------------------------------------------------------
 * 🎯 FEATURE HIGHLIGHT: OnPush Change Detection & Immutability
 * -------------------------------------------------------------------------------
 * This component demonstrates how to optimize performance when passing large
 * or complex objects (like User Profiles, Lists, Configs) to child components.
 * 
 * 🏗️ ARCHITECTURAL CONSIDERATIONS:
 * 1. **Smart vs. Dumb Components**: This is a "Dumb" (Presentational) component.
 *    It purely renders data passed to it and has no internal state logic.
 * 2. **Immutability Contract**: By using OnPush, we sign a contract: "I will only
 *    update if the REFERENCE of my inputs changes." This forces the parent to
 *    use immutable data patterns (creating new objects instead of mutating old ones).
 * 
 * ⚡ PERFORMANCE CONSIDERATIONS:
 * 1. **Change Detection Skip**: With `Default` strategy, Angular checks this component
 *    every time *anything* happens in the app. With `OnPush`, Angular SKIPS this
 *    entire component subtree unless:
 *    - An @Input() reference changes
 *    - An event originates from within this component
 *    - An Observable pipe emits (AsyncPipe)
 * 2. **Huge Lists**: This is critical for performance in large lists (e.g., data grids).
 *    If you have 1000 rows, you don't want to check all 1000 every time a button click
 *    happens elsewhere.
 * 
 * 🛠️ HOW IT WORKS:
 * - We set `changeDetection: ChangeDetectionStrategy.OnPush` in the decorator.
 * - We rely on the Parent to pass a NEW object reference when data updates.
 */

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'User' | 'Guest';
  settings: {
    notifications: boolean;
    theme: string;
  };
}

@Component({
  selector: 'app-use-case-3-child',
  standalone: true,
  imports: [CommonModule],
  // CRITICAL: This tells Angular to only check when input references change!
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="child-container" [class.highlight]="isHighlighted">
      <div class="header">
        <h3>👶 Child Component (OnPush)</h3>
        <span class="badge">ChangeDetection: OnPush</span>
      </div>

      <div class="user-card">
        <div class="user-avatar">
          {{ user.name.charAt(0).toUpperCase() }}
        </div>
        
        <div class="user-details">
          <div class="detail-row">
            <span class="label">Name:</span>
            <span class="value">{{ user.name }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Email:</span>
            <span class="value">{{ user.email }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Role:</span>
            <span class="value role-badge" [class]="user.role.toLowerCase()">
              {{ user.role }}
            </span>
          </div>
          <div class="detail-row">
            <span class="label">Theme:</span>
            <span class="value">{{ user.settings.theme }}</span>
          </div>
        </div>
      </div>

      <div class="render-log">
        <p>Last Rendered: {{ lastRender | date:'mediumTime' }}</p>
        <small>(Updates only when change detection runs)</small>
      </div>

      <div class="info-box">
        <p><strong>💡 Observation:</strong></p>
        <p>If Parent <em>mutates</em> the object, I won't update.</p>
        <p>If Parent <em>replaces</em> the object, I will update!</p>
      </div>
    </div>
  `,
  styles: [`
    .child-container {
      background: var(--bg-card);
      padding: var(--spacing-lg);
      border-radius: var(--radius-md);
      border: 2px solid var(--border-color);
      transition: all 0.3s ease;
    }

    .child-container.highlight {
      border-color: var(--primary-color);
      box-shadow: 0 0 15px rgba(102, 126, 234, 0.2);
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-lg);
    }

    .badge {
      background: var(--warning);
      color: #000;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: bold;
    }

    .user-card {
      display: flex;
      gap: var(--spacing-md);
      background: rgba(255, 255, 255, 0.05);
      padding: var(--spacing-md);
      border-radius: var(--radius-md);
      margin-bottom: var(--spacing-md);
    }

    .user-avatar {
      width: 50px;
      height: 50px;
      background: var(--primary-gradient);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: bold;
      color: white;
    }

    .user-details {
      flex: 1;
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      font-size: 0.9rem;
    }

    .label {
      color: var(--text-muted);
    }

    .role-badge {
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 0.8rem;
    }
    .role-badge.admin { background: #ef4444; color: white; }
    .role-badge.user { background: #3b82f6; color: white; }
    .role-badge.guest { background: #10b981; color: white; }

    .render-log {
      text-align: center;
      color: var(--text-muted);
      font-size: 0.8rem;
      margin-top: var(--spacing-md);
      padding-top: var(--spacing-md);
      border-top: 1px solid var(--border-color);
    }

    .info-box {
      margin-top: var(--spacing-md);
      background: rgba(245, 158, 11, 0.1); /* Warning color */
      border-left: 3px solid var(--warning);
      padding: var(--spacing-sm) var(--spacing-md);
      font-size: 0.9rem;
    }
  `]
})
export class UseCase3ChildComponent {
  @Input() user!: UserProfile;

  // Helper to visualize when change detection runs
  get lastRender(): Date {
    return new Date();
  }

  get isHighlighted(): boolean {
    // Flash effect when re-rendered
    return true;
  }
}
