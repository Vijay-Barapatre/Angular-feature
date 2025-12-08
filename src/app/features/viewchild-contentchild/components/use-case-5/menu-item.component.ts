/**
 * MENU ITEM COMPONENT
 * Component to be projected multiple times
 */

import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-menu-item',
    standalone: true,
    template: `
    <div class="menu-item">
      <span class="icon">{{ icon }}</span>
      <span class="label">{{ label }}</span>
    </div>
  `,
    styles: [`
    .menu-item {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      padding: var(--spacing-sm) var(--spacing-md);
      background: var(--bg-card);
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .menu-item:hover {
      background: var(--primary-color);
    }

    .icon {
      font-size: 1.25rem;
    }

    .label {
      color: var(--text-primary);
    }
  `]
})
export class MenuItemComponent {
    @Input() label: string = '';
    @Input() icon: string = '📌';

    isHighlighted: boolean = false;

    highlight(): void {
        this.isHighlighted = true;
    }

    unhighlight(): void {
        this.isHighlighted = false;
    }
}
