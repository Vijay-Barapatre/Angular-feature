/**
 * @VIEWCHILDREN - TAB COMPONENT
 * 
 * Simple tab component that can be queried with @ViewChildren
 */

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-tab',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="tab" [class.active]="isActive" (click)="onClick()">
      <span class="tab-label">{{ label }}</span>
      <span class="tab-badge" *ngIf="badge">{{ badge }}</span>
    </div>
  `,
    styles: [`
    .tab {
      padding: var(--spacing-md) var(--spacing-lg);
      background: var(--bg-card);
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all var(--transition-fast);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--spacing-sm);
      border: 2px solid transparent;
    }

    .tab:hover {
      background: rgba(102, 126, 234, 0.1);
    }

    .tab.active {
      background: var(--primary-color);
      border-color: var(--accent-color);
    }

    .tab-label {
      font-weight: 600;
      color: var(--text-primary);
    }

    .tab.active .tab-label {
      color: white;
    }

    .tab-badge {
      background: var(--accent-color);
      color: white;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 0.75rem;
    }
  `]
})
export class TabComponent {
    @Input() label: string = '';
    @Input() badge?: string;

    isActive: boolean = false;

    activate(): void {
        this.isActive = true;
    }

    deactivate(): void {
        this.isActive = false;
    }

    onClick(): void {
        console.log(`Tab clicked: ${this.label}`);
    }
}
