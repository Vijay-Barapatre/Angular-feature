/**
 * CARD CONTAINER COMPONENT
 * Accepts projected content via ng-content
 */

import { Component, ContentChild, AfterContentInit } from '@angular/core';
import { CardHeaderComponent } from './header.component';

@Component({
    selector: 'app-card',
    standalone: true,
    template: `
    <div class="card-container">
    card
      <ng-content select="app-card-header"></ng-content>
      <div class="card-body">
        <ng-content></ng-content>
      </div>
    </div>
  `,
    styles: [`
    .card-container {
      background: var(--bg-card);
      border-radius: var(--radius-lg);
      border: 2px solid var(--primary-color);
      overflow: hidden;
    }

    .card-body {
      padding: var(--spacing-lg);
    }
  `]
})
export class CardContainerComponent implements AfterContentInit {
    /**
     * @ContentChild - Access projected header component
     */
    @ContentChild(CardHeaderComponent)
    header?: CardHeaderComponent;

    ngAfterContentInit(): void {
        console.log('✅ Content initialized');
        console.log('Header component:', this.header);
        if (this.header) {
            console.log('Header title:', this.header.title);
        }
    }

    getHeaderTitle(): string {
        return this.header?.title || 'No header';
    }
}
