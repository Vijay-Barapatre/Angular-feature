/**
 * ============================================================================
 * USE CASE 2: SERVICE TESTING - Counter Service
 * ============================================================================
 * 
 * A simple injectable service demonstrating testable patterns:
 * - State management with private properties
 * - Public methods for state mutation
 * - Observable state with BehaviorSubject
 */

import { Injectable, signal, computed } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CounterService {
    /**
     * Private state using BehaviorSubject for Observable pattern
     */
    private countSubject = new BehaviorSubject<number>(0);

    /**
     * Public Observable for subscribers
     */
    count$ = this.countSubject.asObservable();

    /**
     * Signal-based state (Angular 17+)
     */
    countSignal = signal(0);

    /**
     * Computed signal for derived state
     */
    doubleCount = computed(() => this.countSignal() * 2);

    /**
     * Get current count value synchronously
     */
    get currentCount(): number {
        return this.countSubject.getValue();
    }

    /**
     * Increment counter by specified amount
     * @param amount - Amount to increment (default: 1)
     */
    increment(amount = 1): void {
        const newValue = this.currentCount + amount;
        this.countSubject.next(newValue);
        this.countSignal.set(newValue);
    }

    /**
     * Decrement counter by specified amount (minimum 0)
     * @param amount - Amount to decrement (default: 1)
     */
    decrement(amount = 1): void {
        const newValue = Math.max(0, this.currentCount - amount);
        this.countSubject.next(newValue);
        this.countSignal.set(newValue);
    }

    /**
     * Reset counter to zero
     */
    reset(): void {
        this.countSubject.next(0);
        this.countSignal.set(0);
    }

    /**
     * Set counter to specific value
     * @param value - New counter value
     */
    setCount(value: number): void {
        if (value >= 0) {
            this.countSubject.next(value);
            this.countSignal.set(value);
        }
    }
}
