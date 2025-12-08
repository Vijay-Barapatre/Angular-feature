/**
 * DATA SERVICE - USE CASE 1: Basic Service & Injection
 * 
 * PURPOSE:
 * This service demonstrates the fundamental concept of Angular services:
 * - A class decorated with @Injectable
 * - Registered at the root level (singleton pattern)
 * - Methods to manage and share data across components
 * 
 * KEY CONCEPTS:
 * 1. @Injectable() decorator marks this class for DI
 * 2. providedIn: 'root' makes it a singleton (one instance app-wide)
 * 3. Any component can inject this service and share the same data
 * 
 * ANALOGY:
 * Think of this service as a "Shared Whiteboard" in an office:
 * - Any employee (component) can write on it
 * - Any employee can read from it
 * - There's only ONE whiteboard (singleton)
 * - Changes are instantly visible to everyone
 */

import { Injectable } from '@angular/core';

/**
 * The @Injectable decorator tells Angular this class can be
 * injected as a dependency into other classes.
 * 
 * providedIn: 'root' means:
 * - Angular creates ONE instance at app startup
 * - This instance is shared across the ENTIRE application
 * - Tree-shakable: if not used, it's removed from the bundle
 */
@Injectable({
    providedIn: 'root'
})
export class DataService {
    /**
     * Shared state that all components can access.
     * Since this service is a singleton, this array is shared.
     */
    private messages: string[] = [];

    /**
     * Counter to track operations (visible to all consumers)
     */
    private operationCount = 0;

    /**
     * Add a new message to the shared list.
     * Any component can call this, and all other components will see the change.
     * 
     * @param message - The message to add
     */
    addMessage(message: string): void {
        this.messages.push(message);
        this.operationCount++;
        console.log(`[DataService] Added message: "${message}". Total: ${this.messages.length}`);
    }

    /**
     * Get all messages from the shared list.
     * Returns a copy to prevent direct mutation from outside.
     * 
     * @returns Array of all messages
     */
    getMessages(): string[] {
        return [...this.messages]; // Return a copy for immutability
    }

    /**
     * Clear all messages from the list.
     */
    clearMessages(): void {
        this.messages = [];
        this.operationCount++;
        console.log('[DataService] All messages cleared');
    }

    /**
     * Get the total number of operations performed.
     * This demonstrates shared state tracking.
     */
    getOperationCount(): number {
        return this.operationCount;
    }

    /**
     * Get the count of messages.
     */
    getMessageCount(): number {
        return this.messages.length;
    }
}
