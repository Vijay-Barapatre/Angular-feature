/**
 * COUNTER SERVICE - Singleton vs Component-Scoped
 * 
 * PURPOSE:
 * This service is used to demonstrate the difference between:
 * 1. Singleton services (providedIn: 'root')
 * 2. Component-scoped services (providers: [...] in component)
 * 
 * KEY INSIGHT:
 * The SAME service class can create DIFFERENT instances depending on
 * WHERE it's provided. This is crucial for understanding Angular DI!
 */

import { Injectable } from '@angular/core';

/**
 * Notice: providedIn: 'root' means this is a SINGLETON by default.
 * However, if a component provides this service in its own providers array,
 * that component (and its children) will get a NEW instance.
 */
@Injectable({
    providedIn: 'root'
})
export class CounterService {
    /**
     * Unique ID for this instance.
     * Helps visualize that different instances are separate.
     */
    readonly instanceId: string;

    /**
     * The counter value for this instance.
     */
    private _count = 0;

    constructor() {
        // Generate a random ID to identify THIS instance
        this.instanceId = Math.random().toString(36).substring(2, 8).toUpperCase();
        console.log(`[CounterService] New instance created: ${this.instanceId}`);
    }

    /**
     * Get current count
     */
    get count(): number {
        return this._count;
    }

    /**
     * Increment counter
     */
    increment(): void {
        this._count++;
        console.log(`[CounterService ${this.instanceId}] Count: ${this._count}`);
    }

    /**
     * Decrement counter
     */
    decrement(): void {
        this._count--;
        console.log(`[CounterService ${this.instanceId}] Count: ${this._count}`);
    }

    /**
     * Reset counter
     */
    reset(): void {
        this._count = 0;
        console.log(`[CounterService ${this.instanceId}] Reset to 0`);
    }
}
