/**
 * ============================================================================
 * 🟦 BASIC EXERCISE 1: SIMPLE @INPUT BINDING
 * ============================================================================
 * 
 * 📋 OBJECTIVE:
 * Learn how to pass data from parent to child using @Input decorator.
 * 
 * 📝 DESCRIPTION:
 * Create a user card component that displays user information passed from parent.
 * 
 * ✅ EXPECTED BEHAVIOR:
 * 1. Parent passes user object to child
 * 2. Child displays user name, email, and avatar
 * 3. Child shows default values when no data passed
 * 4. Input changes reflect immediately
 */

import { Component, Input, SimpleChanges, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// ========================================
// INTERFACE
// ========================================

interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    role: 'admin' | 'user' | 'guest';
}

// ========================================
// CHILD COMPONENT (Complete the TODOs)
// ========================================

@Component({
    selector: 'app-user-card',
    standalone: true,
    imports: [CommonModule],
    // changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="user-card" [class]="user?.role || 'guest'">
            <div class="avatar">
                <!-- TODO: Display user avatar or a default placeholder -->
                {{ getInitials() }}
            </div>
            <div class="info">
                <!-- TODO: Display user name with fallback -->
                <h3>{{ user?.name || 'Unknown User' }}</h3>
                <!-- TODO: Display user email with fallback -->
                <p class="email">{{ user?.email || 'No email' }}</p>
                <!-- TODO: Display user role badge -->
                <span class="role-badge">{{ user?.role || 'guest' }}</span>
            </div>
        </div>
    `,
    styles: [`
        .user-card { display: flex; gap: 1rem; padding: 1rem; border-radius: 8px; background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .user-card.admin { border-left: 4px solid #ef4444; }
        .user-card.user { border-left: 4px solid #10b981; }
        .user-card.guest { border-left: 4px solid #6b7280; }
        .avatar { width: 60px; height: 60px; border-radius: 50%; background: #10b981; color: white; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; font-weight: bold; }
        .info h3 { margin: 0 0 0.25rem; }
        .email { margin: 0 0 0.5rem; color: #6b7280; font-size: 0.9rem; }
        .role-badge { padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; background: #f3f4f6; text-transform: uppercase; }
    `]
})
export class UserCardComponent {
    /**
     * TODO: Add @Input decorator to receive user data
     * 
     * The user property should:
     * 1. Accept User object or undefined
     * 2. Have a default value of undefined
     * 
     * HINT: Add @Input() before the property declaration below
     */
    @Input() user: User | undefined;  // TODO: Add @Input() decorator here

    // constructor(private changeDetectorRef: ChangeDetectorRef) { }

    /**
     * TODO: Implement getInitials method
     * 
     * Should return:
     * - First letter of first name + first letter of last name
     * - "?" if no user or no name
     * 
     * Example: "John Doe" → "JD"
     */
    getInitials(): string {
        // TODO: Write your logic here
        // HINT: Split name by space, take first letter of each part

        return this.user?.name.split(' ').map(name => name.charAt(0).toUpperCase()).join('') || '?'; // Replace with your implementation
    }

    // ngOnChanges(changes: SimpleChanges): void {
    //     console.log('UserCardComponent ngOnChanges:', changes);
    //     if (changes['user']) {
    //         console.log('UserCardComponent user changed:', this.user);
    //         this.getInitials();
    //         //changedetect 
    //         this.changeDetectorRef.detectChanges();
    //     }
    // }


}

// ========================================
// PARENT COMPONENT (For testing)
// ========================================

@Component({
    selector: 'app-exercise-1-simple-input',
    standalone: true,
    imports: [CommonModule, FormsModule, UserCardComponent],
    template: `
        <div class="exercise">
            <div class="instructions">
                <h2>🟦 Exercise 1: Simple &#64;Input Binding</h2>
                <p>Complete the UserCardComponent to receive and display user data.</p>
                
                <h4>Tasks:</h4>
                <ul>
                    <li>Add &#64;Input() decorator to the user property</li>
                    <li>Display user name, email, and role in the template</li>
                    <li>Implement getInitials() method</li>
                    <li>Handle undefined/null values gracefully</li>
                </ul>
            </div>

            <div class="demo">
                <h3>🎮 Test Your Implementation</h3>
                
                <div class="controls">
                    <label>Select User:</label>
                    <select [(ngModel)]="selectedUserId" (change)="selectUser()">
                        <option [value]="null">No User (test fallback)</option>
                        <option *ngFor="let u of users" [value]="u.id">{{ u.name }}</option>
                    </select>
                </div>

                <div class="result">
                    <h4>Result:</h4>
                    <!-- TODO: Pass selectedUser to the UserCardComponent -->
                    <app-user-card [user]="selectedUser"></app-user-card>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .exercise { max-width: 700px; }
        .instructions { background: #f0fdf4; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; color: #1e1e2e; }
        .instructions h2 { margin: 0 0 0.5rem; color: #10b981; }
        .instructions ul { margin: 0.5rem 0 0; padding-left: 1.5rem; }
        .demo { background: white; padding: 1.5rem; border-radius: 8px; }
        .controls { margin-bottom: 1rem; }
        .controls select { padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 4px; min-width: 200px; }
        .result { padding: 1rem; background: #f8fafc; border-radius: 8px; }
        .result h4 { margin: 0 0 1rem; }
    `]
})
export class Exercise1SimpleInputComponent {
    users: User[] = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
        { id: 3, name: 'Guest User', email: 'guest@example.com', role: 'guest' }
    ];

    selectedUserId: number | null = 1;
    selectedUser: User | undefined;

    constructor() {
        this.selectUser();
    }

    selectUser(): void {
        this.selectedUser = this.users.find(u => u.id == this.selectedUserId);
        // Use spread operator to create a NEW object (important for immutability)
        // this.selectedUser = found ? { ...found } : undefined;
    }
}
