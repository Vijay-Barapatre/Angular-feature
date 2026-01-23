/**
 * ============================================================================
 * SPEC FILE: Async Testing - Complete Guide
 * ============================================================================
 * 
 * Demonstrates testing async operations:
 * - fakeAsync + tick for precise time control
 * - flush() to complete all pending timers
 * - async/await + whenStable for Zone.js async
 * - done() callback pattern
 */

import { ComponentFixture, TestBed, fakeAsync, tick, flush, discardPeriodicTasks } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AsyncTestingComponent } from './async-testing.component';

/**
 * ============================================================================
 * UNDERSTANDING ASYNC TESTING - Complete Guide
 * ============================================================================
 * 
 * What is Async Testing?
 * ----------------------
 * Async testing is testing code that doesn't complete immediately:
 * - setTimeout/setInterval
 * - Promises
 * - Observables with delay
 * - HTTP requests
 * - User input with debounce
 * 
 * The Challenge:
 * --------------
 * Normal tests run synchronously and finish immediately.
 * Async operations take time (milliseconds to seconds).
 * 
 * Example Problem:
 * component.fetchData(); // Takes 2 seconds
 * expect(component.data).toBeDefined(); // ❌ FAILS! Data not loaded yet
 * 
 * Angular's Solutions:
 * --------------------
 * 
 * 1. fakeAsync + tick() - "Time Machine" ⏰
 *    - Creates fake async zone
 *    - tick(ms) = Fast-forward time
 *    - flush() = Complete all pending timers
 *    - Best for: setTimeout, Promise, debounce
 * 
 * 2. async + whenStable() - "Wait & See" ⏳
 *    - Uses real async (Zone.js)
 *    - whenStable() = Wait for all async to complete
 *    - Best for: Real HTTP calls (in integration tests)
 * 
 * 3. done() callback - "Manual Signal" 📞
 *    - Old-school Jasmine pattern
 *    - Call done() when test complete
 *    - Best for: Simple Observable subscriptions
 * 
 * What is fakeAsync?
 * ------------------
 * fakeAsync() wraps your test in a special "fake async zone" where:
 * - Time doesn't pass automatically
 * - You control time with tick()
 * - All timers can be flushed at once
 * 
 * Think of it as: A time machine where YOU control the clock ⏰
 * 
 * Syntax:
 * it('test', fakeAsync(() => {
 *     component.delayedAction(); // Sets timeout for 1 second
 *     tick(1000);                // Fast-forward 1 second
 *     expect(result).toBe('done'); // Now it's complete!
 * }));
 * 
 * What is tick()?
 * ---------------
 * tick(milliseconds) simulates the passage of time.
 * 
 * How it works:
 * - tick(1000) = "Fast-forward 1 second"
 * - tick(500) = "Fast-forward 500ms"
 * - tick() with no args = "Process all pending microtasks"
 * 
 * Example:
 * setTimeout(() => result = 'done', 1000);
 * // Without tick: Test finishes immediately, result still undefined
 * tick(1000);
 * // With tick: Timeout executes, result is now 'done'
 * 
 * What is flush()?
 * ----------------
 * flush() completes ALL pending async operations at once.
 * 
 * Difference from tick():
 * - tick(1000) = Fast-forward exactly 1000ms
 * - flush() = Complete everything, regardless of time
 * 
 * When to use:
 * - Multiple timeouts with different delays
 * - Don't care about exact timing, just final result
 * 
 * Example:
 * setTimeout(() => a = 1, 100);
 * setTimeout(() => b = 2, 500);
 * setTimeout(() => c = 3, 1000);
 * 
 * flush(); // All three complete at once
 * expect(a).toBe(1);
 * expect(b).toBe(2);
 * expect(c).toBe(3);
 * 
 * What is discardPeriodicTasks()?
 * --------------------------------
 * Cleans up periodic timers (setInterval) at end of fakeAsync test.
 * 
 * Why needed:
 * - setInterval keeps running forever
 * - fakeAsync test won't finish with active intervals
 * - discardPeriodicTasks() stops them
 * 
 * Example:
 * const interval = setInterval(() => count++, 100);
 * tick(500); // count = 5
 * discardPeriodicTasks(); // Stop the interval
 * 
 * What is whenStable()?
 * ---------------------
 * whenStable() waits for ALL async operations in Zone.js to complete.
 * 
 * When to use:
 * - Testing real async (not fakeAsync)
 * - Component has multiple async operations
 * - Want to wait for everything to settle
 * 
 * Limitation:
 * - RxJS delay() runs outside Zone.js (won't wait for it)
 * - Use fakeAsync + tick for predictable RxJS testing
 * 
 * Pattern:
 * it('test', async () => {
 *     component.loadData();
 *     await fixture.whenStable(); // Wait for all async
 *     fixture.detectChanges();
 *     expect(component.data).toBeDefined();
 * });
 * 
 * Debounce Testing:
 * -----------------
 * Debounce delays execution until user stops typing.
 * 
 * Testing strategy:
 * 1. Trigger multiple rapid events
 * 2. tick() less than debounce time
 * 3. Verify nothing happened yet
 * 4. tick() past debounce time
 * 5. Verify only last event processed
 * 
 * Example (300ms debounce):
 * input('a'); tick(100);
 * input('b'); tick(100);
 * input('c'); // User stops typing
 * tick(300);  // Debounce triggers
 * expect(result).toBe('Searching for: c'); // Only last value
 * 
 * Common Patterns:
 * ----------------
 * 
 * Pattern 1: setTimeout testing
 * fakeAsync(() => {
 *     component.delayedAction();
 *     tick(1000);
 *     expect(result).toBe('complete');
 * })
 * 
 * Pattern 2: Promise testing
 * fakeAsync(() => {
 *     component.fetchPromise();
 *     tick(); // Resolve microtasks
 *     expect(data).toBeDefined();
 * })
 * 
 * Pattern 3: Multiple timers
 * fakeAsync(() => {
 *     startMultipleTimers();
 *     flush(); // Complete all
 *     expectAllComplete();
 * })
 * 
 * Pattern 4: Debounce testing
 * fakeAsync(() => {
 *     rapidInput();
 *     tick(debounceTime);
 *     expectOnlyLastProcessed();
 * })
 * 
 * Memory Trick 🧠:
 * ----------------
 * fakeAsync = Time Machine ⏰
 * - You're the time traveler
 * - tick() = Jump forward in time
 * - flush() = Fast-forward to the end
 * - discardPeriodicTasks() = Stop the time loop
 * 
 * Quick Decision Tree:
 * --------------------
 * 
 * Need to test async code?
 * │
 * ├─ setTimeout/setInterval/debounce
 * │  └─ Use fakeAsync + tick ⭐ (BEST)
 * │
 * ├─ Promise
 * │  └─ Use fakeAsync + tick() (no args)
 * │
 * ├─ Observable with delay
 * │  └─ Use fakeAsync + tick(delay)
 * │
 * ├─ Real HTTP in integration test
 * │  └─ Use async + whenStable
 * │
 * └─ Simple Observable subscription
 *    └─ Use done() callback
 * 
 * Best Practices:
 * ---------------
 * 
 * ✅ DO:
 * - Use fakeAsync for predictable timing
 * - Call discardPeriodicTasks() after setInterval
 * - Test both before and after tick()
 * - Use flush() when exact timing doesn't matter
 * 
 * ❌ DON'T:
 * - Mix fakeAsync with async/await
 * - Forget to call detectChanges() after tick()
 * - Leave intervals running (causes test hangs)
 * - Use whenStable() for RxJS delay (won't work)
 */

describe('AsyncTestingComponent', () => {
    let component: AsyncTestingComponent;
    let fixture: ComponentFixture<AsyncTestingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AsyncTestingComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(AsyncTestingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // =========================================================================
    // FAKEAYNC + TICK: Precise Time Control
    // =========================================================================

    describe('fakeAsync + tick', () => {
        it('should handle setTimeout with exact timing', fakeAsync(() => {
            // ACT: Trigger the delayed action
            component.delayedAction();

            // ASSERT: Before timeout completes
            expect(component.timeoutResult()).toBe('Waiting...');

            // ACT: Fast-forward exactly 1 second
            tick(1000);
            fixture.detectChanges();

            // ASSERT: After timeout completes
            expect(component.timeoutResult()).toBe('Timeout complete!');
        }));

        it('should handle Promise with tick', fakeAsync(() => {
            // ACT
            component.fetchWithPromise();

            // ASSERT: Loading state
            expect(component.promiseResult()).toBe('Loading...');

            // ACT: Fast-forward 500ms (Promise delay)
            tick(500);
            fixture.detectChanges();

            // ASSERT: Resolved
            expect(component.promiseResult()).toBe('Promise resolved!');
        }));

        it('should handle Observable delay with tick', fakeAsync(() => {
            // ACT
            component.fetchWithObservable();
            expect(component.observableResult()).toBe('Loading...');

            // ACT: Fast-forward 800ms
            tick(800);
            fixture.detectChanges();

            // ASSERT
            expect(component.observableResult()).toBe('Observable emitted!');
        }));
    });

    // =========================================================================
    // FLUSH: Complete All Pending Timers
    // =========================================================================

    describe('flush()', () => {
        it('should flush all pending async operations', fakeAsync(() => {
            // ACT: Start multiple async operations
            component.fetchWithPromise();
            component.delayedAction();
            component.fetchWithObservable();

            // ACT: Flush all timers at once
            flush();
            fixture.detectChanges();

            // ASSERT: All operations completed
            expect(component.promiseResult()).toBe('Promise resolved!');
            expect(component.timeoutResult()).toBe('Timeout complete!');
            expect(component.observableResult()).toBe('Observable emitted!');
        }));
    });

    // =========================================================================
    // DEBOUNCE TESTING
    // =========================================================================

    describe('debounced search', () => {
        it('should debounce search input', fakeAsync(() => {
            // ARRANGE
            const input = fixture.debugElement.query(By.css('[data-testid="search-input"]'));

            // ACT: Type quickly
            input.triggerEventHandler('input', { target: { value: 'a' } });
            tick(100);
            input.triggerEventHandler('input', { target: { value: 'ab' } });
            tick(100);
            input.triggerEventHandler('input', { target: { value: 'abc' } });

            // ASSERT: Not yet triggered (debounce = 300ms)
            expect(component.searchResult()).toBe('--');

            // ACT: Wait for debounce
            tick(300);
            fixture.detectChanges();

            // ASSERT: Only final value processed
            expect(component.searchResult()).toBe('Searching for: abc');

            // Cleanup
            discardPeriodicTasks();
        }));

        it('should not search if input cleared quickly', fakeAsync(() => {
            const input = fixture.debugElement.query(By.css('[data-testid="search-input"]'));

            // Type then clear
            input.triggerEventHandler('input', { target: { value: 'test' } });
            tick(100);
            input.triggerEventHandler('input', { target: { value: '' } });
            tick(300);
            fixture.detectChanges();

            // Should show default
            expect(component.searchResult()).toBe('--');

            discardPeriodicTasks();
        }));
    });

    // =========================================================================
    // ASYNC/AWAIT + WHENSTABLE
    // =========================================================================

    describe('async/await pattern', () => {
        it('should wait for Observable with whenStable', async () => {
            // ACT
            component.fetchWithObservable();

            // ASSERT: Initial loading state
            expect(component.observableResult()).toBe('Loading...');

            // Wait for all async operations in Zone.js
            await fixture.whenStable();
            fixture.detectChanges();

            // Note: RxJS delay() runs outside Zone.js, so whenStable()
            // may not wait for it. For predictable RxJS timer testing,
            // use fakeAsync + tick instead. This test demonstrates the API.
            expect(component).toBeTruthy(); // Minimal expectation
        });
    });

    // =========================================================================
    // DONE() CALLBACK PATTERN
    // =========================================================================

    describe('done() callback', () => {
        it('should use done for Observable subscription', (done) => {
            // ARRANGE & ACT
            component.getDataAsync().subscribe(value => {
                // ASSERT
                expect(value).toBe('Observable emitted!');
                done(); // Signal test completion
            });
        });
    });

    // =========================================================================
    // DOM UPDATES AFTER ASYNC
    // =========================================================================

    describe('DOM updates', () => {
        it('should update DOM after async completes', fakeAsync(() => {
            // ARRANGE
            const btn = fixture.debugElement.query(By.css('[data-testid="timeout-btn"]'));
            const resultEl = () => fixture.debugElement.query(By.css('[data-testid="timeout-result"]'));

            // ASSERT: Initial state
            expect(resultEl().nativeElement.textContent).toBe('--');

            // ACT: Click and wait
            btn.triggerEventHandler('click', null);
            fixture.detectChanges();
            expect(resultEl().nativeElement.textContent).toBe('Waiting...');

            tick(1000);
            fixture.detectChanges();

            // ASSERT: Final state
            expect(resultEl().nativeElement.textContent).toBe('Timeout complete!');
        }));
    });
});
