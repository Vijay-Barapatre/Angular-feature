/**
 * USE CASE 1: BASIC @Input() and @Output() - PARENT COMPONENT
 * 
 * This example demonstrates the fundamental concepts of parent-child communication in Angular:
 * 
 * 1. @Input(): Passing data FROM parent TO child
 * 2. @Output(): Emitting events FROM child TO parent
 * 3. Property binding: [propertyName]="value"
 * 4. Event binding: (eventName)="handler($event)"
 * 
 * REAL-WORLD SCENARIO:
 * A user dashboard displaying user information and handling user actions
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UseCase1ChildComponent } from './child.component';

@Component({
    selector: 'app-use-case-1-parent',
    standalone: true,
    imports: [CommonModule, RouterLink, UseCase1ChildComponent],
    templateUrl: './parent.component.html',
    styleUrl: './parent.component.css'
})
export class UseCase1ParentComponent {
    /**
     * PARENT COMPONENT STATE
     * This data lives in the parent and will be passed to the child
     */

    // Simple string property
    userName: string = 'John Doe';

    // Number property
    userAge: number = 28;

    // Boolean property
    isUserActive: boolean = true;

    // Array property (list of user's favorite colors)
    favoriteColors: string[] = ['Blue', 'Green', 'Purple'];

    /**
     * EVENT LOG
     * Stores events received from the child component
     * This demonstrates how parent receives data back from child
     */
    eventLog: string[] = [];

    /**
     * EVENT HANDLER: User Greeting Click
     * 
     * This method is called when the child component emits a 'greetingClick' event
     * 
     * @param message - The message emitted by the child component
     * 
     * IMPORTANT CONCEPTS:
     * - The child doesn't know about this method
     * - The child only emits an event
     * - The parent decides what to do with the event
     */
    onGreetingClick(message: string): void {
        const timestamp = new Date().toLocaleTimeString();
        this.eventLog.unshift(`[${timestamp}] ${message}`);

        // Keep only last 5 events for cleaner display
        if (this.eventLog.length > 5) {
            this.eventLog.pop();
        }
    }

    /**
     * EVENT HANDLER: Favorite Color Click
     * 
     * Shows how parent can handle events with different data types
     * 
     * @param color - The color string clicked in the child
     */
    onColorClick(color: string): void {
        const timestamp = new Date().toLocaleTimeString();
        this.eventLog.unshift(`[${timestamp}] User clicked on color: ${color}`);

        if (this.eventLog.length > 5) {
            this.eventLog.pop();
        }
    }

    /**
     * MODIFY DATA METHODS
     * These demonstrate that changing parent data automatically updates the child
     * because of Angular's change detection
     */

    changeName(): void {
        // Update the username - child component will automatically receive new value
        const names = ['Alice Johnson', 'Bob Smith', 'Carol Williams', 'David Brown'];
        this.userName = names[Math.floor(Math.random() * names.length)];
    }

    toggleActiveStatus(): void {
        // Toggle boolean value
        this.isUserActive = !this.isUserActive;
    }

    incrementAge(): void {
        // Increment age
        this.userAge++;
    }

    addFavoriteColor(): void {
        // Add a random color to the array
        const newColors = ['Red', 'Yellow', 'Orange', 'Pink', 'Cyan'];
        const randomColor = newColors[Math.floor(Math.random() * newColors.length)];

        // Check if color doesn't already exist
        if (!this.favoriteColors.includes(randomColor)) {
            this.favoriteColors.push(randomColor);
        }
    }

    clearEventLog(): void {
        this.eventLog = [];
    }
}
