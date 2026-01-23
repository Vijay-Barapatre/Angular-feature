/**
 * PARENT COMPONENT - Content Projection Lifecycle
 * 
 * Demonstrates ngAfterContentInit and ngAfterContentChecked hooks.
 * Shows how to access @ContentChild elements after content projection.
 * 
 * LEARNING OBJECTIVES:
 * - Understanding content projection with <ng-content>
 * - Accessing projected content with @ContentChild
 * - Difference between View and Content lifecycle hooks
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TabContainerComponent } from './tab-container.component';
import { TabItemComponent } from './tab-item.component';

@Component({
    selector: 'app-use-case-4-parent',
    standalone: true,
    imports: [CommonModule, RouterLink, TabContainerComponent, TabItemComponent],
    templateUrl: './parent.component.html',
    styleUrl: './parent.component.css'
})
export class UseCase4ParentComponent {
    /**
     * Control which tabs are shown
     */
    showExtraTab = false;

    /**
     * Log of content lifecycle events
     */
    contentLifecycleLog: { time: string; event: string; type: 'init' | 'checked' }[] = [];

    /**
     * Dynamic content for tabs
     */
    dynamicContent = 'Initial content';

    /**
     * Toggle extra tab visibility
     */
    toggleExtraTab(): void {
        this.showExtraTab = !this.showExtraTab;
    }

    /**
     * Update dynamic content
     */
    updateContent(): void {
        this.dynamicContent = `Updated at ${new Date().toLocaleTimeString()}`;
    }

    /**
     * Receive lifecycle events from child
     */
    onContentLifecycleEvent(event: { time: string; event: string; type: 'init' | 'checked' }): void {
        this.contentLifecycleLog.unshift(event);
        if (this.contentLifecycleLog.length > 15) {
            this.contentLifecycleLog.pop();
        }
    }

    /**
     * Clear the log
     */
    clearLog(): void {
        this.contentLifecycleLog = [];
    }
}
