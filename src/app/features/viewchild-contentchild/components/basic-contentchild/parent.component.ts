/**
 * BASIC @CONTENTCHILD - PARENT COMPONENT
 * 
 * Demonstrates content projection and accessing projected components
 * 
 * KEY CONCEPT: View vs Content
 * - View children: Defined in YOUR template
 * - Content children: Projected FROM parent template
 * 
 * DATA FLOW:
 * ```mermaid
 * graph TD
 *     Parent["Parent Template"] -->|Projects| Content["&lt;app-card&gt;&lt;app-card-header&gt;&lt;/app-card-header&gt;&lt;/app-card&gt;"]
 *     Content -->|ng-content| CardComponent["Card Component"]
 *     CardComponent -->|@ContentChild| AccessHeader["Access CardHeaderComponent"]
 * ```
 */

import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CardContainerComponent } from './card.component';
import { CardHeaderComponent } from './header.component';

@Component({
  selector: 'app-use-case-4-parent',
  standalone: true,
  imports: [CommonModule, RouterLink, CardContainerComponent, CardHeaderComponent],
  template: `
    <div class="use-case-container">
      <div class="case-header">
        <a routerLink="/viewchild-contentchild" class="back-link">← Back to Overview</a>
        <h1>Basic &#64;ContentChild</h1>
        <p>Learn content projection and access projected components.</p>
      </div>

      <div class="content-grid">
        <div class="column">
          <div class="card">
            <h2>👨‍💼 Parent Component</h2>
            <p class="sub-header">Projects content INTO the card component</p>

            <div class="control-section">
              <h3>Card Information</h3>
              <button (click)="getCardInfo()" class="btn btn-primary">
                Get Card Header Info
              </button>
              <div *ngIf="cardInfo" class="info-display">
                <code>{{ cardInfo }}</code>
              </div>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="card child-card">
            <h2>📦 Projected Content</h2>
            
            <app-card #myCard>
              <app-card-header title="User Profile" icon="👤"></app-card-header>
              <p>This header is <strong>projected content</strong> from the parent.</p>
              <p>The card component accesses it using &#64;ContentChild.</p>
            </app-card>
          </div>
        </div>
      </div>     
    </div>
  `,
  styles: [`
    @import '../../../input-output/components/use-case-1/parent.component.css';

    .info-display {
      margin-top: var(--spacing-md);
      padding: var(--spacing-md);
      background: var(--bg-card);
      border-radius: var(--radius-sm);
    }

    .code-example {
      background: #1e293b;
      padding: var(--spacing-lg);
      border-radius: var(--radius-md);
      margin-top: var(--spacing-lg);
    }

    .code-example h3 {
      color: var(--primary-light);
      margin-bottom: var(--spacing-md);
    }

    .code-example code {
      color: #94a3b8;
      font-family: 'Courier New', monospace;
      font-size: 0.85rem;
      line-height: 1.6;
    }
  `]
})
export class UseCase4ParentComponent {
  @ViewChild('myCard')
  cardComponent?: CardContainerComponent;

  cardInfo: string = '';

  getCardInfo(): void {
    if (this.cardComponent) {
      this.cardInfo = `Header Title: ${this.cardComponent.getHeaderTitle()}`;
    }
  }
}
