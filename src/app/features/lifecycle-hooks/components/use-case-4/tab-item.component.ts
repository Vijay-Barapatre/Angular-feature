/**
 * TAB ITEM COMPONENT - Individual Tab for Content Projection Demo
 * 
 * This component represents a single tab that gets projected into
 * the TabContainerComponent using <ng-content>.
 * 
 * CONTENT PROJECTION PATTERN:
 * <app-tab-container>
 *   <app-tab-item title="Tab 1">Content 1</app-tab-item>  <-- This is PROJECTED
 *   <app-tab-item title="Tab 2">Content 2</app-tab-item>
 * </app-tab-container>
 */

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-tab-item',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="tab-item" [class.active]="isActive">
            <ng-content></ng-content>
        </div>
    `,
    styles: [`
        .tab-item {
            display: none;
        }

        .tab-item.active {
            display: block;
            animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .tab-item :host ::ng-deep p {
            margin: var(--spacing-sm) 0;
            color: var(--text-secondary);
        }

        .tab-item :host ::ng-deep ul {
            margin: var(--spacing-sm) 0;
            padding-left: var(--spacing-lg);
        }

        .tab-item :host ::ng-deep li {
            color: var(--text-secondary);
            margin-bottom: var(--spacing-xs);
        }
    `]
})
export class TabItemComponent {
    /**
     * Tab title for header display
     */
    @Input() title = 'Tab';

    /**
     * Tab icon for visual identification
     */
    @Input() icon = '📄';

    /**
     * Whether this tab is currently active
     * Controlled by parent TabContainerComponent
     */
    isActive = false;
}
