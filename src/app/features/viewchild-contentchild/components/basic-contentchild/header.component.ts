/**
 * CARD HEADER COMPONENT
 * Simple component to be projected into card
 */

import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-card-header',
    standalone: true,
    template: `
    <div class="card-header">
    Card Header
      <span class="icon">{{ icon }}</span>
      <h3>{{ title }}</h3>
    </div>
  `,
    styles: [`
    .card-header {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      padding: var(--spacing-md);
      background: var(--primary-color);
      border-radius: var(--radius-md) var(--radius-md) 0 0;
    }

    .icon {
      font-size: 1.5rem;
    }

    h3 {
      margin: 0;
      color: white;
    }
  `]
})
export class CardHeaderComponent {
    @Input() title: string = '';
    @Input() icon: string = '📄';
}
