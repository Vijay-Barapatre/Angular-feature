/**
 * USE CASE 5: PARENT COMPONENT - ngDoCheck (Custom Change Detection)
 * 
 * Demonstrates the ngDoCheck lifecycle hook for custom change detection.
 * Shows how to detect changes that Angular's default CD doesn't catch.
 * 
 * LEARNING OBJECTIVES:
 * - Understanding when ngDoCheck is called
 * - Detecting object mutations
 * - Performance considerations
 * - When to use vs. avoid
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ObjectDiffComponent } from './object-diff.component';

@Component({
    selector: 'app-use-case-5-parent',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink, ObjectDiffComponent],
    templateUrl: './parent.component.html',
    styleUrl: './parent.component.css'
})
export class UseCase5ParentComponent {
    /**
     * User object - will be mutated (not replaced)
     */
    user = {
        name: 'John Doe',
        email: 'john@example.com',
        preferences: {
            theme: 'dark',
            notifications: true
        }
    };

    /**
     * Log of DoCheck events
     */
    doCheckLog: { time: string; event: string; detected: boolean }[] = [];

    /**
     * Mutate the user object (Angular won't detect this by default)
     */
    mutateUser(): void {
        // This is a MUTATION - same object reference, different property value
        this.user.name = 'Jane Smith';
        console.log('⚠️ Mutated user.name (same reference!)');
    }

    /**
     * Replace the user object (Angular will detect this)
     */
    replaceUser(): void {
        // This is a REPLACEMENT - new object reference
        this.user = {
            ...this.user,
            name: 'Bob Wilson'
        };
        console.log('✅ Replaced user object (new reference!)');
    }

    /**
     * Mutate nested property
     */
    mutatePreferences(): void {
        this.user.preferences.theme = this.user.preferences.theme === 'dark' ? 'light' : 'dark';
        console.log('⚠️ Mutated user.preferences.theme');
    }

    /**
     * Receive DoCheck events from child
     */
    onDoCheckEvent(event: { time: string; event: string; detected: boolean }): void {
        this.doCheckLog.unshift(event);
        if (this.doCheckLog.length > 15) {
            this.doCheckLog.pop();
        }
    }

    /**
     * Clear the log
     */
    clearLog(): void {
        this.doCheckLog = [];
    }
}
