/**
 * ============================================================================
 * SPEC FILE: Service Testing
 * ============================================================================
 * 
 * Demonstrates testing patterns for Angular services:
 * - Injecting services via TestBed
 * - Testing synchronous methods
 * - Testing Observable streams
 * - Testing Signal-based state
 */

import { TestBed } from '@angular/core/testing';
import { CounterService } from './counter.service';
import { firstValueFrom } from 'rxjs';

describe('CounterService', () => {
    let service: CounterService;

    beforeEach(() => {
        // Configure testing module with the service
        TestBed.configureTestingModule({
            providers: [CounterService]
        });

        // Inject the service
        service = TestBed.inject(CounterService);
    });

    // =========================================================================
    // BASIC TESTS: Service Creation
    // =========================================================================

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should initialize with count = 0', () => {
        expect(service.currentCount).toBe(0);
    });

    // =========================================================================
    // METHOD TESTS: State Mutations
    // =========================================================================

    describe('increment()', () => {
        it('should increment by 1 by default', () => {
            service.increment();
            expect(service.currentCount).toBe(1);
        });

        it('should increment by specified amount', () => {
            service.increment(5);
            expect(service.currentCount).toBe(5);
        });

        it('should accumulate increments', () => {
            service.increment();
            service.increment();
            service.increment();
            expect(service.currentCount).toBe(3);
        });
    });

    describe('decrement()', () => {
        it('should decrement by 1 by default', () => {
            service.setCount(10);
            service.decrement();
            expect(service.currentCount).toBe(9);
        });

        it('should decrement by specified amount', () => {
            service.setCount(10);
            service.decrement(3);
            expect(service.currentCount).toBe(7);
        });

        it('should not go below zero', () => {
            service.setCount(2);
            service.decrement(5);
            expect(service.currentCount).toBe(0);
        });
    });

    describe('reset()', () => {
        it('should reset count to zero', () => {
            service.setCount(100);
            service.reset();
            expect(service.currentCount).toBe(0);
        });
    });

    describe('setCount()', () => {
        it('should set count to specified value', () => {
            service.setCount(42);
            expect(service.currentCount).toBe(42);
        });

        it('should ignore negative values', () => {
            service.setCount(10);
            service.setCount(-5);
            expect(service.currentCount).toBe(10);
        });
    });

    // =========================================================================
    // OBSERVABLE TESTS: Testing Streams
    // =========================================================================

    describe('count$ Observable', () => {
        it('should emit initial value of 0', (done) => {
            service.count$.subscribe(value => {
                expect(value).toBe(0);
                done();
            });
        });

        it('should emit updates when count changes', async () => {
            // Collect emitted values
            const emittedValues: number[] = [];
            const subscription = service.count$.subscribe(val => emittedValues.push(val));

            service.increment();
            service.increment();
            service.decrement();

            subscription.unsubscribe();

            expect(emittedValues).toEqual([0, 1, 2, 1]);
        });

        it('should work with firstValueFrom', async () => {
            service.setCount(42);
            const value = await firstValueFrom(service.count$);
            expect(value).toBe(42);
        });
    });

    // =========================================================================
    // SIGNAL TESTS: Angular 17+ Signals
    // =========================================================================

    describe('countSignal', () => {
        it('should return initial value of 0', () => {
            expect(service.countSignal()).toBe(0);
        });

        it('should update when increment is called', () => {
            service.increment();
            expect(service.countSignal()).toBe(1);
        });
    });

    describe('doubleCount computed', () => {
        it('should return double the count', () => {
            service.setCount(5);
            expect(service.doubleCount()).toBe(10);
        });

        it('should update when count changes', () => {
            expect(service.doubleCount()).toBe(0);
            service.increment(3);
            expect(service.doubleCount()).toBe(6);
        });
    });

    // =========================================================================
    // ISOLATION TESTS: Each test is independent
    // =========================================================================

    describe('test isolation', () => {
        it('first test - sets count to 100', () => {
            service.setCount(100);
            expect(service.currentCount).toBe(100);
        });

        it('second test - count should be 0 (fresh instance)', () => {
            // Each test gets a fresh service instance
            expect(service.currentCount).toBe(0);
        });
    });
});
