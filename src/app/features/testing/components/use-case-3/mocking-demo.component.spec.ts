/**
 * ============================================================================
 * SPEC FILE: Mocking Dependencies
 * ============================================================================
 * 
 * Demonstrates testing components with mocked dependencies:
 * - jasmine.createSpyObj for mock services
 * - Controlling return values
 * - Verifying method calls
 * - Testing error scenarios
 */

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';

import { MockingDemoComponent } from './mocking-demo.component';
import { UserService, User } from './user.service';

/**
 * ============================================================================
 * UNDERSTANDING MOCKING & SPIES - Complete Guide
 * ============================================================================
 * 
 * What is Mocking?
 * ----------------
 * Mocking is creating FAKE versions of dependencies (services, APIs) that:
 * - Return controlled, predictable data
 * - Don't make real HTTP calls or database queries
 * - Let you test component logic in ISOLATION
 * 
 * Think of it as: Using a "stunt double" 🤸 instead of the real actor 🎭
 * 
 * Why Mock?
 * ---------
 * 
 * Without Mocking (Using Real Service):
 * ❌ Real HTTP calls → slow tests (network delays)
 * ❌ Unpredictable results (API could be down, data changes)
 * ❌ Hard to test error scenarios (how do you force a 404?)
 * ❌ Tests depend on external systems (database, API)
 * ❌ Flaky tests that randomly fail
 * 
 * With Mocking:
 * ✅ Fast (no network calls)
 * ✅ Predictable (you control exactly what returns)
 * ✅ Test edge cases easily (errors, empty data, slow responses)
 * ✅ Isolated (tests only YOUR component logic)
 * ✅ Reliable (no external dependencies)
 * 
 * Real-World Comparison:
 * ----------------------
 * 
 * Production (Real Service):
 * Component → UserService → HTTP → Real API → Database
 *                           ↑
 *                     Slow, unpredictable
 * 
 * Testing (Mock Service):
 * Component → MockUserService → Returns { id: 1, name: 'Test' }
 *                              ↑
 *                        Fast, controlled
 * 
 * What is jasmine.createSpyObj()?
 * --------------------------------
 * jasmine.createSpyObj() is Jasmine's utility to create mock objects with spy methods.
 * 
 * Syntax:
 * const mock = jasmine.createSpyObj('ServiceName', ['method1', 'method2']);
 *                                    ↑                ↑
 *                               Display name    Methods to spy on
 * 
 * What it creates:
 * - An object with method1() and method2() as spies
 * - Each method is automatically a Jasmine spy (tracks calls)
 * - You configure what each method returns
 * - You verify how many times it was called, with what arguments
 * 
 * Complete Mocking Flow:
 * ----------------------
 * 
 * 1. CREATE MOCK:
 *    mockService = jasmine.createSpyObj('UserService', ['getUser', 'save']);
 * 
 * 2. CONFIGURE RETURN VALUES:
 *    mockService.getUser.and.returnValue(of({ id: 1, name: 'Test' }));
 * 
 * 3. PROVIDE IN TESTBED:
 *    providers: [{ provide: UserService, useValue: mockService }]
 *    This tells Angular: "When component asks for UserService, give it mockService"
 * 
 * 4. TEST COMPONENT:
 *    component.loadUser(); // Calls mockService.getUser()
 * 
 * 5. VERIFY CALLS:
 *    expect(mockService.getUser).toHaveBeenCalled();
 *    expect(mockService.getUser).toHaveBeenCalledWith(1);
 * 
 * jasmine.createSpyObj() Parameters:
 * -----------------------------------
 * 
 * Parameter 1: Service Name (string)
 * - Display name for debugging
 * - Shows in error messages
 * 
 * Parameter 2: Methods (string[])
 * - Array of method names to create as spies
 * - These will be callable and trackable
 * 
 * Parameter 3 (Optional): Properties (object)
 * - For mocking Observable properties like user$
 * - Example: { user$: of(null) }
 * 
 * Example:
 * const mock = jasmine.createSpyObj(
 *     'UserService',              // Name
 *     ['getUser', 'save'],        // Methods
 *     { currentUser$: of(null) }  // Properties (optional)
 * );
 * 
 * Configuring Spy Behavior:
 * --------------------------
 * 
 * 1. and.returnValue() - Return static value:
 *    spy.and.returnValue(of({ id: 1 }));
 * 
 * 2. and.returnValues() - Return different values per call:
 *    spy.and.returnValues(of(user1), of(user2), of(user3));
 * 
 * 3. and.callFake() - Execute custom function:
 *    spy.and.callFake((id) => of({ id, name: `User ${id}` }));
 * 
 * 4. throwError() - Simulate errors:
 *    spy.and.returnValue(throwError(() => new Error('404')));
 * 
 * 5. and.callThrough() - Call real implementation:
 *    spy.and.callThrough(); // Usually not used with createSpyObj
 * 
 * Spy Verification Matchers:
 * --------------------------
 * 
 * 1. Was it called?
 *    expect(spy).toHaveBeenCalled();
 * 
 * 2. Called with specific arguments?
 *    expect(spy).toHaveBeenCalledWith(1, 'test');
 * 
 * 3. How many times called?
 *    expect(spy).toHaveBeenCalledTimes(3);
 * 
 * 4. NOT called?
 *    expect(spy).not.toHaveBeenCalled();
 * 
 * 5. Called before another spy?
 *    expect(spy1).toHaveBeenCalledBefore(spy2);
 * 
 * 6. Get call arguments:
 *    spy.calls.argsFor(0)           // First call arguments
 *    spy.calls.mostRecent().args    // Last call arguments
 * 
 * Provider Pattern in TestBed:
 * ----------------------------
 * 
 * { provide: UserService, useValue: mockUserService }
 *    ↑                    ↑          ↑
 *  Real Token        Strategy    Mock instance
 * 
 * How it works:
 * - When component's constructor has `constructor(private userService: UserService)`
 * - Angular's DI looks up UserService token
 * - Finds the provider: { provide: UserService, useValue: mockUserService }
 * - Injects mockUserService instead of real UserService
 * - Component now uses the mock!
 * 
 * Provider Strategies:
 * --------------------
 * 
 * 1. useValue - Provide pre-created instance (most common for mocks):
 *    { provide: UserService, useValue: mockUserService }
 * 
 * 2. useClass - Create new instance from class:
 *    { provide: UserService, useClass: MockUserService }
 * 
 * 3. useFactory - Create with factory function:
 *    { provide: UserService, useFactory: () => createMock() }
 * 
 * Testing Async Operations with fakeAsync & tick:
 * ------------------------------------------------
 * 
 * fakeAsync() - Creates fake async zone for testing:
 * - Wraps test in special zone that controls time
 * - Lets you simulate passage of time
 * 
 * tick() - Simulates passage of time:
 * - Processes pending async operations (setTimeout, Promises, Observables)
 * - tick(1000) = fast-forward 1 second
 * - tick() without args = process all pending operations
 * 
 * Example:
 * it('test', fakeAsync(() => {
 *     component.loadUser(1);    // Triggers async Observable
 *     tick();                   // Process the Observable emission
 *     expect(component.user).toBeDefined();
 * }));
 * 
 * Common Mocking Patterns:
 * ------------------------
 * 
 * Pattern 1: Success case
 * mockService.getUser.and.returnValue(of({ id: 1, name: 'Test' }));
 * 
 * Pattern 2: Error case
 * mockService.getUser.and.returnValue(throwError(() => new Error('Not found')));
 * 
 * Pattern 3: Different values per test
 * // In test 1:
 * mockService.getUser.and.returnValue(of(adminUser));
 * // In test 2:
 * mockService.getUser.and.returnValue(of(guestUser));
 * 
 * Pattern 4: Conditional logic
 * mockService.getUser.and.callFake((id) => {
 *     return id === 1 ? of(user) : throwError(() => new Error('Not found'));
 * });
 * 
 * Memory Trick 🧠:
 * ----------------
 * Mocking = Stunt Double in Movies 🎬
 * 
 * - Real Service = Lead actor (expensive, unpredictable)
 * - Mock Service = Stunt double (controlled, safe)
 * - createSpyObj = Casting the double
 * - returnValue = The script (what to do)
 * - toHaveBeenCalled = Director checking if stunt happened
 * 
 * Quick Decision Tree:
 * --------------------
 * 
 * Does component depend on external service?
 * │
 * ├─ YES → Mock it!
 * │         Use createSpyObj + provide with useValue
 * │
 * └─ NO  → No mocking needed
 *          Test component directly
 * 
 * Best Practices:
 * ---------------
 * 
 * ✅ DO:
 * - Mock external dependencies (HTTP, services)
 * - Configure default return values in beforeEach
 * - Override per test when testing specific scenarios
 * - Verify critical method calls
 * - Test both success AND error scenarios
 * 
 * ❌ DON'T:
 * - Mock Angular framework (ChangeDetectorRef, Router - use real)
 * - Mock everything (over-mocking)
 * - Share mock instances between tests (create fresh in beforeEach)
 * - Verify every single method call (test behavior, not implementation)
 * - Mock private methods (test public API only)
 */

describe('MockingDemoComponent', () => {
    let component: MockingDemoComponent;
    let fixture: ComponentFixture<MockingDemoComponent>;
    let mockUserService: jasmine.SpyObj<UserService>;

    // Test data
    const mockUser: User = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        role: 'admin'
    };

    beforeEach(async () => {
        // =====================================================================
        // CREATE MOCK SERVICE
        // =====================================================================
        /**
         * jasmine.createSpyObj() creates a mock object with spy methods
         * 
         * What it does:
         * 1. Creates an object of type jasmine.SpyObj<UserService>
         * 2. Adds getUser(), getUsers(), isAdmin() as spy methods
         * 3. Each method is trackable (can verify calls)
         * 4. Each method returns undefined by default (must configure)
         * 
         * Syntax breakdown:
         * jasmine.createSpyObj(name, methods)
         *                      ↑     ↑
         *                   Display  Array of method names
         *                    name
         */
        mockUserService = jasmine.createSpyObj('UserService', [
            'getUser',
            'getUsers',
            'isAdmin'
        ]);

        // =====================================================================
        // CONFIGURE DEFAULT RETURN VALUES
        // =====================================================================
        /**
         * Configure what spies return by default
         * 
         * Why set defaults here (in beforeEach)?
         * - Most tests will use success scenarios
         * - Avoids repeating configuration in every test
         * - Individual tests can override these for specific scenarios
         * 
         * Pattern:
         * spy.and.returnValue(value)
         *     ↑        ↑
         *   Spy    Configures return value
         * 
         * For Observables:
         * - Use of() for success: of({ id: 1, name: 'Test' })
         * - Use throwError() for errors: throwError(() => new Error('404'))
         */

        // Default success case - returns Observable with mock user
        mockUserService.getUser.and.returnValue(of(mockUser));
        //              ↑           ↑
        //          Spy method  Configure to return Observable

        // Default boolean response
        mockUserService.isAdmin.and.returnValue(true);

        await TestBed.configureTestingModule({
            imports: [MockingDemoComponent],
            providers: [
                // =====================================================================
                // PROVIDE MOCK INSTEAD OF REAL SERVICE
                // =====================================================================
                /**
                 * Provider Pattern: Dependency Injection Replacement
                 * 
                 * { provide: UserService, useValue: mockUserService }
                 *    ↑                    ↑          ↑
                 *  Token (what          Strategy   What to actually
                 *  component asks for)             provide
                 * 
                 * How it works:
                 * 1. Component constructor has: constructor(private userService: UserService)
                 * 2. Angular DI sees component needs UserService
                 * 3. DI looks up providers for UserService token
                 * 4. Finds: { provide: UserService, useValue: mockUserService }
                 * 5. Injects mockUserService instead of creating real UserService
                 * 6. Component.userService now points to mockUserService! 🎭
                 * 
                 * Result:
                 * - Component calls this.userService.getUser(1)
                 * - Actually calls mockUserService.getUser(1)
                 * - Returns: of(mockUser) (the configured return value)
                 * - No real HTTP call is made! ✅
                 * 
                 * useValue vs other strategies:
                 * - useValue: Provide existing instance (our spy object)
                 * - useClass: Provide class to instantiate
                 * - useFactory: Provide factory function
                 */
                { provide: UserService, useValue: mockUserService }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(MockingDemoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // =========================================================================
    // BASIC TESTS
    // =========================================================================

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    /**
     * Testing Initial State
     * ---------------------
     * Verifies component doesn't load data until explicitly triggered
     * Also verifies spy hasn't been called yet
     */
    it('should not load user on init', () => {
        // By default, user should be null
        expect(component.user()).toBeNull();

        // VERIFY: Service method was NOT called
        expect(mockUserService.getUser).not.toHaveBeenCalled();
        //                                ↑
        //                         Spy verification matcher
        //                   Ensures component doesn't auto-load on init
    });

    // =========================================================================
    // MOCKING SUCCESS SCENARIOS
    // =========================================================================

    it('should load user when button is clicked', fakeAsync(() => {
        // ARRANGE: Button reference
        const loadBtn = fixture.debugElement.query(By.css('[data-testid="load-btn"]'));

        // ACT: Click the button
        loadBtn.triggerEventHandler('click', null);
        tick(); // Process async operations
        fixture.detectChanges();

        // ASSERT: User data is displayed
        expect(component.user()).toEqual(mockUser);
        expect(mockUserService.getUser).toHaveBeenCalledWith(1);
    }));

    it('should display user name in template', fakeAsync(() => {
        // ACT
        component.loadUser(1);
        tick();
        fixture.detectChanges();

        // ASSERT
        const nameEl = fixture.debugElement.query(By.css('[data-testid="user-name"]'));
        expect(nameEl.nativeElement.textContent).toContain('Test User');
    }));

    it('should display user role badge', fakeAsync(() => {
        // ACT
        component.loadUser(1);
        tick();
        fixture.detectChanges();

        // ASSERT
        const roleEl = fixture.debugElement.query(By.css('[data-testid="user-role"]'));
        expect(roleEl.nativeElement.textContent.trim()).toBe('admin');
    }));

    // =========================================================================
    // MOCKING DIFFERENT RETURN VALUES
    // =========================================================================

    it('should handle different user roles', fakeAsync(() => {
        // ARRANGE: Override return value for this test
        const guestUser: User = { ...mockUser, name: 'Guest', role: 'guest' };
        mockUserService.getUser.and.returnValue(of(guestUser));

        // ACT
        component.loadUser(1);
        tick();
        fixture.detectChanges();

        // ASSERT
        expect(component.user()?.role).toBe('guest');
    }));

    // =========================================================================
    // MOCKING ERROR SCENARIOS
    // =========================================================================

    it('should display error when service fails', fakeAsync(() => {
        // ARRANGE: Mock error response
        mockUserService.getUser.and.returnValue(
            throwError(() => new Error('User not found'))
        );

        // ACT
        component.loadUser(999);
        tick();
        fixture.detectChanges();

        // ASSERT
        expect(component.error()).toBe('User not found');
        const errorEl = fixture.debugElement.query(By.css('[data-testid="error"]'));
        expect(errorEl).toBeTruthy();
    }));

    // =========================================================================
    // LOADING STATE TESTS
    // =========================================================================

    it('should show loading state while fetching', () => {
        // ARRANGE: Don't let Observable complete yet
        // ACT
        component.loading.set(true);
        fixture.detectChanges();

        // ASSERT
        const loadingEl = fixture.debugElement.query(By.css('[data-testid="loading"]'));
        expect(loadingEl).toBeTruthy();
    });

    // =========================================================================
    // VERIFYING CALL COUNTS
    // =========================================================================

    it('should call getUser exactly once per click', fakeAsync(() => {
        // ACT
        component.loadUser(1);
        tick();

        // ASSERT
        expect(mockUserService.getUser).toHaveBeenCalledTimes(1);

        // ACT: Click again
        component.loadUser(2);
        tick();

        // ASSERT
        expect(mockUserService.getUser).toHaveBeenCalledTimes(2);
        expect(mockUserService.getUser).toHaveBeenCalledWith(2);
    }));

    // =========================================================================
    // VERIFYING CALL ARGUMENTS
    // =========================================================================

    it('should pass correct ID to service', fakeAsync(() => {
        // ACT
        component.loadUser(42);
        tick();

        // ASSERT
        expect(mockUserService.getUser).toHaveBeenCalledWith(42);
    }));
});
