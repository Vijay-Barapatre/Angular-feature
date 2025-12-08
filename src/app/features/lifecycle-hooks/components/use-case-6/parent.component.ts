/**
 * USE CASE 6: PARENT COMPONENT - Complete Lifecycle Demo
 * 
 * Demonstrates ALL lifecycle hooks in their execution order.
 * Visual logging shows exactly when each hook is called.
 * 
 * LEARNING OBJECTIVES:
 * - See all hooks in action simultaneously
 * - Understand the exact execution order
 * - Visualize the update cycle
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LifecycleDemoComponent } from './lifecycle-demo.component';

@Component({
    selector: 'app-use-case-6-parent',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink, LifecycleDemoComponent],
    templateUrl: './parent.component.html',
    styleUrl: './parent.component.css'
})
export class UseCase6ParentComponent {
    /**
     * Controls demo component visibility
     */
    showDemo = true;

    /**
     * Input value to pass to demo component
     */
    inputValue = 'Hello World';

    /**
     * Master log of all lifecycle events
     */
    lifecycleLog: {
        time: string;
        hook: string;
        phase: string;
        color: string;
    }[] = [];

    /**
     * Toggle demo component
     */
    toggleDemo(): void {
        this.showDemo = !this.showDemo;
    }

    /**
     * Update input value
     */
    updateInput(): void {
        this.inputValue = `Updated at ${new Date().toLocaleTimeString()}`;
    }

    /**
     * Trigger change detection
     */
    triggerCD(): void {
        // Any action triggers CD
    }

    /**
     * Receive lifecycle events
     */
    onLifecycleEvent(event: { time: string; hook: string; phase: string; color: string }): void {
        this.lifecycleLog.unshift(event);
        if (this.lifecycleLog.length > 30) {
            this.lifecycleLog.pop();
        }
    }

    /**
     * Clear the log
     */
    clearLog(): void {
        this.lifecycleLog = [];
    }
}
