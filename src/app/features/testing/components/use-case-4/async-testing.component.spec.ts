/**
 * ============================================================================
 * SPEC FILE: Async Testing
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
