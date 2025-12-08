/**
 * USE CASE 2: PARENT COMPONENT - ngOnChanges
 * 
 * Demonstrates the ngOnChanges lifecycle hook by:
 * - Passing changing @Input values to child component
 * - Showing how SimpleChanges tracks previous/current values
 * - Demonstrating isFirstChange() detection
 * 
 * LEARNING OBJECTIVES:
 * - Understanding when ngOnChanges is called
 * - Using SimpleChanges to track value changes
 * - Comparing previous and current values
 * - Performance considerations
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserCardComponent } from './user-card.component';

/**
 * User interface for the demo
 */
export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user' | 'guest';
    lastLogin: Date;
}

@Component({
    selector: 'app-use-case-2-parent',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink, UserCardComponent],
    templateUrl: './parent.component.html',
    styleUrl: './parent.component.css'
})
export class UseCase2ParentComponent {
    /**
     * Current user data - passed as @Input to child
     */
    currentUser: User = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user',
        lastLogin: new Date()
    };

    /**
     * Theme setting - passed as @Input to child
     */
    theme: 'light' | 'dark' = 'dark';

    /**
     * Show badge setting - passed as @Input to child
     */
    showBadge = true;

    /**
     * Log of changes for display
     */
    changesLog: { time: string; changes: string }[] = [];

    /**
     * Sample users for quick switching
     */
    sampleUsers: User[] = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', lastLogin: new Date() },
        { id: 2, name: 'Jane Admin', email: 'jane@example.com', role: 'admin', lastLogin: new Date() },
        { id: 3, name: 'Guest User', email: 'guest@example.com', role: 'guest', lastLogin: new Date() }
    ];

    /**
     * Change the user name
     */
    updateName(name: string): void {
        this.currentUser = { ...this.currentUser, name };
    }

    /**
     * Change the user email
     */
    updateEmail(email: string): void {
        this.currentUser = { ...this.currentUser, email };
    }

    /**
     * Switch to a different user
     */
    switchUser(user: User): void {
        this.currentUser = { ...user, lastLogin: new Date() };
    }

    /**
     * Toggle theme
     */
    toggleTheme(): void {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
    }

    /**
     * Toggle badge visibility
     */
    toggleBadge(): void {
        this.showBadge = !this.showBadge;
    }

    /**
     * Receive changes log from child component
     */
    onChangesDetected(log: { time: string; changes: string }): void {
        this.changesLog.unshift(log);
        if (this.changesLog.length > 15) {
            this.changesLog.pop();
        }
    }

    /**
     * Clear the changes log
     */
    clearLog(): void {
        this.changesLog = [];
    }
}
