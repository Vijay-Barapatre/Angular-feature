/**
 * USE CASE 1: PARENT COMPONENT
 * 
 * Demonstrates ngOnInit and ngOnDestroy lifecycle hooks.
 * This parent component controls the visibility of a timer component
 * to show proper initialization and cleanup patterns.
 * 
 * LEARNING OBJECTIVES:
 * - Understanding when ngOnInit is called
 * - Proper cleanup in ngOnDestroy
 * - Managing subscriptions and timers
 * - Preventing memory leaks
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TimerComponent } from './timer.component';

@Component({
    selector: 'app-use-case-1-parent',
    standalone: true,
    imports: [CommonModule, RouterLink, TimerComponent],
    templateUrl: './parent.component.html',
    styleUrl: './parent.component.css'
})
export class UseCase1ParentComponent {
    /**
     * Controls whether the timer component is rendered
     * When false, the timer component is destroyed (ngOnDestroy called)
     * When true, a new timer component is created (ngOnInit called)
     */
    showTimer = true;

    /**
     * Log of lifecycle events for display
     */
    lifecycleLog: { time: string; event: string; type: 'init' | 'destroy' | 'tick' }[] = [];

    /**
     * Toggle the timer component visibility
     * This demonstrates component creation and destruction
     */
    toggleTimer(): void {
        this.showTimer = !this.showTimer;
    }

    /**
     * Receive lifecycle events from the timer component
     * This is emitted via @Output from the child
     */
    onLifecycleEvent(event: { time: string; event: string; type: 'init' | 'destroy' | 'tick' }): void {
        this.lifecycleLog.unshift(event);
        // Keep only the last 20 events
        if (this.lifecycleLog.length > 20) {
            this.lifecycleLog.pop();
        }
    }

    /**
     * Clear the lifecycle log
     */
    clearLog(): void {
        this.lifecycleLog = [];
    }
}
