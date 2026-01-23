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

/**
 * ============================================================================
 * UNDERSTANDING TestBed.inject() - Service Testing Fundamentals
 * ============================================================================
 * 
 * What is TestBed.inject()?
 * -------------------------
 * TestBed.inject() is Angular's way to retrieve service instances from the
 * testing module's dependency injection (DI) container.
 * 
 * Think of it as: "Get me a service instance from the test environment"
 * 
 * Key Concepts:
 * -------------
 * 
 * 1. WHY use TestBed.inject()?
 *    ✅ Required when service has DEPENDENCIES (other services injected)
 *    ✅ TestBed automatically creates and injects dependencies
 *    ✅ Provides isolated test instance (not the real app's singleton)
 *    ✅ Allows you to provide MOCKS for dependencies
 * 
 * 2. When to skip TestBed (Direct Instantiation)?
 *    ✅ Service has NO dependencies
 *    ✅ Simple class with pure logic
 *    ✅ Faster test execution
 *    
 *    Example:
 *    let service = new CounterService();  // ✅ Works for simple services
 * 
 * 3. How Dependency Injection Works in Tests:
 * 
 *    // Service with dependencies
 *    @Injectable()
 *    export class UserService {
 *        constructor(private http: HttpClient) {}  // ← Dependency
 *    }
 *    
 *    // Test setup
 *    TestBed.configureTestingModule({
 *        providers: [
 *            UserService,
 *            { provide: HttpClient, useValue: mockHttp }  // ← Mock dependency
 *        ]
 *    });
 *    service = TestBed.inject(UserService);  // TestBed injects mockHttp
 * 
 * TestBed.inject() vs TestBed.get() (Deprecated):
 * ------------------------------------------------
 * - TestBed.inject() → ✅ Current, type-safe
 * - TestBed.get()    → ❌ Deprecated since Angular 9
 * 
 * Always use .inject() in new code!
 * 
 * Testing Flow:
 * -------------
 * 
 * 1. Configure TestBed
 *    TestBed.configureTestingModule({
 *        providers: [MyService]  // ← Register service
 *    });
 * 
 * 2. Inject Service
 *    service = TestBed.inject(MyService);  // ← Get instance
 * 
 * 3. Test Methods
 *    service.increment();
 *    expect(service.count).toBe(1);
 * 
 * Key Differences: TestBed vs Direct Instantiation
 * -------------------------------------------------
 * 
 * | Aspect | TestBed.inject() | new Service() |
 * |--------|------------------|---------------|
 * | Use When | Service has dependencies | Simple service, no DI |
 * | DI Support | ✅ Yes | ❌ No |
 * | Speed | Slower (DI overhead) | Faster (direct) |
 * | Mocking Deps | Easy (provide in TestBed) | Manual (pass to constructor) |
 * | Real-world | Realistic (uses DI) | Simplified |
 * 
 * Example Comparison:
 * -------------------
 * 
 * // WITH TestBed (for services with dependencies)
 * beforeEach(() => {
 *     TestBed.configureTestingModule({
 *         providers: [
 *             DataService,
 *             { provide: HttpClient, useValue: mockHttp }
 *         ]
 *     });
 *     service = TestBed.inject(DataService);  // ← HttpClient auto-injected
 * });
 * 
 * // WITHOUT TestBed (for simple services)
 * beforeEach(() => {
 *     service = new CounterService();  // ← No dependencies, just new it!
 * });
 * 
 * Service Testing vs Component Testing:
 * --------------------------------------
 * 
 * Component Testing:
 * - Uses ComponentFixture
 * - Tests template + logic
 * - Needs detectChanges()
 * - Tests DOM rendering
 * 
 * Service Testing:
 * - Uses TestBed.inject() or new Service()
 * - Tests logic ONLY (no template)
 * - NO detectChanges() needed
 * - NO DOM involved
 * 
 * Think of it as: Services = "Pure calculator logic" 🧮
 * 
 * Common Testing Patterns:
 * ------------------------
 * 
 * 1. Testing Synchronous Methods:
 *    service.increment();
 *    expect(service.count).toBe(1);
 * 
 * 2. Testing Observables:
 *    const values: number[] = [];
 *    service.count$.subscribe(v => values.push(v));
 *    service.increment();
 *    expect(values).toEqual([0, 1]);
 * 
 * 3. Testing Signals (Angular 17+):
 *    service.increment();
 *    expect(service.countSignal()).toBe(1);
 * 
 * 4. Testing async operations:
 *    const value = await firstValueFrom(service.data$);
 *    expect(value).toBe(expected);
 * 
 * Test Isolation:
 * ---------------
 * Each test gets a FRESH service instance (via beforeEach).
 * This ensures:
 * ✅ No shared state between tests
 * ✅ Tests are independent
 * ✅ Tests can run in any order
 * 
 * Example:
 * it('test 1', () => {
 *     service.setCount(100);
 *     expect(service.count).toBe(100);
 * });
 * 
 * it('test 2', () => {
 *     // Gets FRESH instance, count starts at 0 again
 *     expect(service.count).toBe(0);  // ✅ Pass
 * });
 * 
 * Memory Trick 🧠:
 * ----------------
 * TestBed.inject() = "Get service from test kitchen"
 * 
 * - TestBed = The test kitchen (where services are prepared)
 * - inject() = Serve me a fresh dish (service instance)
 * - providers = Recipe book (how to create services)
 * 
 * Quick Decision Tree:
 * --------------------
 * 
 * Does service have constructor dependencies?
 * │
 * ├─ YES → Use TestBed.inject()
 * │         TestBed provides/mocks dependencies automatically
 * │
 * └─ NO  → Use new Service()
 *          Faster, simpler, no DI overhead
 */

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
    /**
     * UNDERSTANDING OBSERVABLE TESTING
     * =================================
     * 
     * What are Observables?
     * ---------------------
     * Observables are STREAMS of data that emit values over time.
     * Think of them like a TV channel 📺 that broadcasts updates.
     * 
     * Why testing Observables is different:
     * --------------------------------------
     * - Observables are ASYNCHRONOUS (emit values over time)
     * - You must SUBSCRIBE to see the emitted values
     * - Need to handle async nature (done callback, async/await, or promises)
     * - Should UNSUBSCRIBE to prevent memory leaks
     * 
     * Three Common Testing Patterns:
     * -------------------------------
     * 
     * 1. done() callback      → For testing single async emission
     * 2. Array collection     → For testing multiple emissions (BEST for sequences)
     * 3. firstValueFrom()     → For getting first emission as Promise
     * 
     * Visual Flow:
     * ------------
     * 
     * Observable Stream:  ──0──→──1──→──2──→──1──→
     *                       ↑     ↑     ↑     ↑
     *                    Initial +3 changes from increment/decrement
     * 
     * Test collects:     [0] → [0,1] → [0,1,2] → [0,1,2,1]
     */

    describe('count$ Observable', () => {

        // =====================================================================
        // PATTERN 1: Testing with done() callback (Single Emission)
        // =====================================================================
        /**
         * Testing Initial Value with done()
         * ----------------------------------
         * 
         * The done() callback is Jasmine's way to handle async tests.
         * 
         * Why done() is needed:
         * - Observables emit asynchronously
         * - Without done(), test would finish BEFORE Observable emits
         * - done() tells Jasmine: "Wait until I call you!"
         * 
         * Flow:
         * 1. Subscribe to Observable
         * 2. Observable emits value → callback runs
         * 3. Assert the value
         * 4. Call done() → test finishes
         * 
         * Example without done() - WRONG ❌:
         * service.count$.subscribe(value => {
         *     expect(value).toBe(0);
         * });
         * // Test finishes immediately, subscribe callback never runs!
         * 
         * With done() - CORRECT ✅:
         * service.count$.subscribe(value => {
         *     expect(value).toBe(0);
         *     done();  // Now test waits!
         * });
         */
        it('should emit initial value of 0', (done) => {
            //                                  ↑
            //                          done is a callback provided by Jasmine

            service.count$.subscribe(value => {
                //      ↑          ↑
                //  Observable   Subscribe to receive emissions

                // ASSERT: First emission should be initial value
                expect(value).toBe(0);

                // CRITICAL: Tell Jasmine this async test is complete
                done();
                // ↑
                // Without this, test would timeout or pass prematurely
            });
        });

        // =====================================================================
        // PATTERN 2: Array Collection (Best for Multiple Emissions)
        // =====================================================================
        /**
         * Testing Multiple Emissions with Array Collection
         * -------------------------------------------------
         * 
         * This is the BEST pattern for testing Observable sequences.
         * 
         * Strategy:
         * 1. Create empty array to collect emissions
         * 2. Subscribe and push each emission into array
         * 3. Trigger actions that cause emissions
         * 4. Unsubscribe to prevent memory leaks
         * 5. Assert on the collected array
         * 
         * Why this pattern is preferred:
         * ✅ Tests entire emission history
         * ✅ Easy to debug (inspect array)
         * ✅ Verifies emission order
         * ✅ No complex async handling
         * 
         * Timeline Visualization:
         * -----------------------
         * 
         * Time:     T0          T1          T2          T3
         * Action:   Subscribe   increment   increment   decrement
         * Emits:    0     →     1      →    2      →    1
         * Array:    [0]   →     [0,1]  →    [0,1,2] →   [0,1,2,1]
         * 
         * Think of it as: Recording a TV broadcast 📹
         * - Subscribe = Start recording
         * - Actions = TV shows play
         * - Array = Your recorded episodes
         * - Assert = Verify what you recorded
         */
        it('should emit updates when count changes', async () => {
            // STEP 1: Create array to collect emitted values
            const emittedValues: number[] = [];
            //    ↑
            // This will store the complete emission history: [0, 1, 2, 1]

            // STEP 2: Subscribe and collect emissions
            const subscription = service.count$.subscribe(val => {
                emittedValues.push(val);
                //            ↑
                // Every time Observable emits, add value to array
                // This captures: initial value (0) + all changes (1, 2, 1)
            });

            // STEP 3: Trigger actions that cause Observable to emit
            service.increment();  // count: 0 → 1, Observable emits 1
            service.increment();  // count: 1 → 2, Observable emits 2
            service.decrement();  // count: 2 → 1, Observable emits 1

            // At this point, emittedValues = [0, 1, 2, 1]
            //                                 ↑  ↑  ↑  ↑
            //                            initial + 3 emissions

            // STEP 4: Unsubscribe to prevent memory leaks
            subscription.unsubscribe();
            //           ↑
            // IMPORTANT: Always clean up subscriptions in tests
            // Without this, subscription would stay active and leak memory

            // STEP 5: Assert on the collected emission history
            expect(emittedValues).toEqual([0, 1, 2, 1]);
            //     ↑                       ↑  ↑  ↑  ↑
            //   Collected array       Expected emission sequence
            //
            // toEqual() checks deep equality - perfect for arrays
            // This verifies:
            // ✅ Initial value was 0
            // ✅ First increment emitted 1
            // ✅ Second increment emitted 2
            // ✅ Decrement emitted 1
        });

        // =====================================================================
        // PATTERN 3: firstValueFrom() for Single Value (Modern Approach)
        // =====================================================================
        /**
         * Testing with firstValueFrom() - Async/Await Pattern
         * ----------------------------------------------------
         * 
         * firstValueFrom() is a RxJS utility that:
         * - Converts Observable → Promise
         * - Gets the FIRST emission only
         * - Automatically completes
         * 
         * Comparison to done() pattern:
         * 
         * OLD WAY (done callback):
         * it('test', (done) => {
         *     service.count$.subscribe(value => {
         *         expect(value).toBe(42);
         *         done();
         *     });
         * });
         * 
         * NEW WAY (firstValueFrom):
         * it('test', async () => {
         *     const value = await firstValueFrom(service.count$);
         *     expect(value).toBe(42);
         * });
         * 
         * Benefits:
         * ✅ Cleaner syntax (async/await instead of callbacks)
         * ✅ No need for done() callback
         * ✅ Easier to read and understand
         * ✅ Better for testing HTTP requests (single emission)
         * 
         * When to use:
         * - Testing HTTP calls (single response)
         * - Testing first emission only
         * - Want clean async/await syntax
         * 
         * When NOT to use:
         * - Testing multiple emissions (use array collection instead)
         * - Need to verify emission sequence
         */
        it('should work with firstValueFrom', async () => {
            //                                 ↑
            //                         Must use async keyword
            //                         because firstValueFrom returns Promise

            // ARRANGE: Set up the state
            service.setCount(42);
            // count$ will emit 42 on next subscription

            // ACT: Get first emission as Promise
            const value = await firstValueFrom(service.count$);
            //            ↑     ↑
            //         await    Converts Observable → Promise
            //                  Waits for first emission, then completes
            //
            // Behind the scenes:
            // 1. firstValueFrom subscribes to count$
            // 2. Gets first emission (42)
            // 3. Unsubscribes automatically
            // 4. Resolves Promise with value 42

            // ASSERT: Verify the emitted value
            expect(value).toBe(42);
            //     ↑
            // value is the first (and only) emission from count$

            // Note: No need to unsubscribe - firstValueFrom handles it!
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
