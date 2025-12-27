/**
 * ============================================================================
 * SPEC FILE: Component Testing Basics
 * ============================================================================
 * 
 * This spec file demonstrates fundamental Angular testing patterns:
 * - TestBed configuration for standalone components
 * - ComponentFixture usage
 * - DOM querying and assertions
 * - Event simulation
 * - Input/Output testing
 * 
 * JASMINE MATCHERS EXPLAINED:
 * ---------------------------
 * Jasmine provides assertion methods (matchers) to verify expected outcomes:
 * 
 * - expect(actual).toBe(expected)        ? Checks STRICT EQUALITY (===)
 * - expect(actual).toEqual(expected)     ? Checks DEEP EQUALITY (for objects/arrays)
 * - expect(actual).toBeTruthy()          ? Checks if value is truthy (true, 1, "text")
 * - expect(actual).toBeFalsy()           ? Checks if value is falsy (false, 0, null, undefined)
 * - expect(actual).toBeTrue()            ? Checks if value is EXACTLY true
 * - expect(actual).toBeFalse()           ? Checks if value is EXACTLY false
 * - expect(actual).toContain(item)       ? Checks if array/string contains item
 * - expect(actual).toHaveBeenCalled()    ? Checks if spy was called
 * 
 * EXAMPLE:
 * --------
 * expect(component.count).toBe(0);
 * 
 * Breakdown:
 * - expect(component.count)   ? The actual value being tested
 * - .toBe(0)                  ? The matcher checking if count === 0 (strict equality)
 * 
 * Why toBe() instead of ==?
 * - toBe() uses === (no type coercion)
 * - toBe(0) passes for 0 but FAILS for "0" or false
 * - More precise and safer than == comparison
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ComponentTestingComponent } from './component-testing.component';

describe('ComponentTestingComponent', () => {
    let component: ComponentTestingComponent;
    let fixture: ComponentFixture<ComponentTestingComponent>;

    /**
     * =========================================================================
     * SETUP: beforeEach
     * =========================================================================
     * Runs before each test to create a fresh component instance
     */
    beforeEach(async () => {
        // Configure the testing module
        // For standalone components, just import the component directly
        await TestBed.configureTestingModule({
            imports: [ComponentTestingComponent]
        }).compileComponents();

        // Create the component fixture
        fixture = TestBed.createComponent(ComponentTestingComponent);

        // Get the component instance
        component = fixture.componentInstance;

        // Trigger initial change detection
        fixture.detectChanges();
    });

    // =========================================================================
    // BASIC TESTS: Component Creation
    // =========================================================================

    it('should create the component', () => {
        // ARRANGE & ACT: Component is created in beforeEach
        // ASSERT: Component instance exists
        expect(component).toBeTruthy();
    });

    /**
     * Testing initial state with toBe(0)
     * ----------------------------------
     * This test verifies the component's default state.
     * 
     * expect(component.count).toBe(0) breaks down to:
     * 
     * 1. component.count        ? Access the actual value (should be 0)
     * 2. .toBe(0)              ? Jasmine matcher for STRICT equality check
     * 
     * Why toBe() for primitive values:
     * --------------------------------
     * - toBe() uses === (identity/reference check)
     * - Perfect for primitives: numbers, strings, booleans
     * - expect(5).toBe(5)       ? PASS
     * - expect(5).toBe("5")     ? FAIL (different types)
     * - expect(5).toBe(4 + 1)   ? PASS (same value)
     * 
     * Alternative matchers for different scenarios:
     * ---------------------------------------------
     * - .toEqual(0)           ? Also works, but overkill for primitives
     * - .toBeLessThan(1)      ? Check if count < 1
     * - .toBeGreaterThanOrEqual(0) ? Check if count >= 0
     * - .toBeFalsy()          ? Would FAIL (0 is falsy, but not explicit enough)
     * 
     * Memory trick: "toBe or not toBe" - use for simple equality! ??
     */
    it('should initialize with count = 0', () => {
        // ASSERT: Default initial state
        // toBe(0) ? Strict equality check (component.count === 0)
        expect(component.count).toBe(0);
    });

    // =========================================================================
    // DOM QUERY TESTS: Reading the Template
    // =========================================================================

    /**
     * Testing DOM content with toBe()
     * --------------------------------
     * When testing text content in the DOM, we compare strings.
     * 
     * expect(countEl.nativeElement.textContent.trim()).toBe('0')
     * 
     * Breakdown:
     * 1. countEl.nativeElement.textContent ? Get DOM text (may have whitespace)
     * 2. .trim()                           ? Remove leading/trailing whitespace
     * 3. .toBe('0')                        ? String equality check ('0' === '0')
     * 
     * Important: DOM text is always a STRING!
     * - expect(textContent).toBe('0')  ? PASS (string comparison)
     * - expect(textContent).toBe(0)    ? FAIL ('0' !== 0, different types)
     * 
     * Why trim()?
     * - HTML may have whitespace: "  0  " or "\n0\n"
     * - Always trim when comparing DOM text
     */
    it('should display the initial count in the DOM', () => {
        // ARRANGE: Get the count display element
        const countEl = fixture.debugElement.query(By.css('[data-testid="count-display"]'));

        // ASSERT: DOM reflects the component state
        // Note: textContent returns STRING, so we compare to '0' not 0
        expect(countEl.nativeElement.textContent.trim()).toBe('0');
    });

    it('should have increment and decrement buttons', () => {
        // ARRANGE: Query for buttons
        const incrementBtn = fixture.debugElement.query(By.css('[data-testid="increment-btn"]'));
        const decrementBtn = fixture.debugElement.query(By.css('[data-testid="decrement-btn"]'));

        // ASSERT: Both buttons exist
        expect(incrementBtn).toBeTruthy();
        expect(decrementBtn).toBeTruthy();
    });

    // =========================================================================
    // EVENT TESTS: User Interactions
    // =========================================================================

    /**
     * Testing state changes with toBe(1)
     * -----------------------------------
     * After an action, we verify the new state.
     * 
     * expect(component.count).toBe(1)
     * 
     * This checks:
     * - After increment, count changed from 0 ? 1
     * - Value is EXACTLY 1 (not "1", not true, not 1.0 - but NUMBER 1)
     * 
     * Test Pattern for state changes:
     * 1. ACT    ? Trigger the action (button click)
     * 2. UPDATE ? Call fixture.detectChanges() to update DOM
     * 3. ASSERT ? Verify component state (toBe)
     * 4. ASSERT ? Verify DOM reflects state (toBe with string)
     */
    it('should increment count when increment button is clicked', () => {
        // ARRANGE: Get the button
        const incrementBtn = fixture.debugElement.query(By.css('[data-testid="increment-btn"]'));

        // ACT: Simulate click event
        incrementBtn.triggerEventHandler('click', null);
        fixture.detectChanges(); // Important: Update the view

        // ASSERT: Count increased (NUMBER comparison)
        expect(component.count).toBe(1);

        // ASSERT: DOM is updated (STRING comparison)
        const countEl = fixture.debugElement.query(By.css('[data-testid="count-display"]'));
        expect(countEl.nativeElement.textContent.trim()).toBe('1');
    });

    /**
     * Testing with custom initial values
     * -----------------------------------
     * Sometimes you need to test from a specific state.
     * 
     * component.count = 5;  ? Set up test scenario
     * expect(component.count).toBe(4);  ? Verify result after action
     * 
     * This is the AAA pattern:
     * - ARRANGE: Set up initial state (count = 5)
     * - ACT:     Perform action (decrement)
     * - ASSERT:  Verify outcome (count === 4)
     */
    it('should decrement count when decrement button is clicked', () => {
        // ARRANGE: Set initial count > 0
        component.count = 5;
        fixture.detectChanges();

        // ACT: Click decrement
        const decrementBtn = fixture.debugElement.query(By.css('[data-testid="decrement-btn"]'));
        decrementBtn.triggerEventHandler('click', null);
        fixture.detectChanges();

        // ASSERT: 5 - 1 = 4
        expect(component.count).toBe(4);
    });

    /**
     * Testing boundary conditions
     * ---------------------------
     * Important to test edge cases like "can't go below zero".
     * 
     * expect(component.count).toBe(0) ? Should remain at 0
     * 
     * This verifies:
     * - Business logic prevents negative numbers
     * - Value stays at boundary (0) even after decrement attempt
     * 
     * Why this test matters:
     * - Guards against bugs (negative counts)
     * - Documents expected behavior
     * - Prevents regression (if someone changes the logic)
     */
    it('should not decrement below zero', () => {
        // ARRANGE: Count is already 0
        expect(component.count).toBe(0);

        // ACT: Try to decrement
        const decrementBtn = fixture.debugElement.query(By.css('[data-testid="decrement-btn"]'));
        decrementBtn.triggerEventHandler('click', null);
        fixture.detectChanges();

        // ASSERT: Count stays at 0 (boundary protection)
        expect(component.count).toBe(0);
    });

    /**
     * Testing boolean properties with toBeTrue()
     * -------------------------------------------
     * When testing boolean properties, use specific matchers:
     * 
     * - expect(value).toBeTrue()   ? EXACTLY true
     * - expect(value).toBeFalse()  ? EXACTLY false
     * 
     * Why not toBe(true)?
     * - toBeTrue() is more semantic and readable
     * - Both work, but toBeTrue() is Jasmine best practice
     * 
     * Comparison:
     * - expect(disabled).toBe(true)     ? Works but less clear
     * - expect(disabled).toBeTrue()     ? Preferred - explicit intent
     * - expect(disabled).toBeTruthy()   ??  Too loose (accepts 1, "yes", etc.)
     */
    it('should disable decrement button when count is 0', () => {
        // ARRANGE: Count is 0
        expect(component.count).toBe(0);
        fixture.detectChanges();

        // ASSERT: Button is disabled (boolean check)
        const decrementBtn = fixture.debugElement.query(By.css('[data-testid="decrement-btn"]'));
        expect(decrementBtn.nativeElement.disabled).toBeTrue();
    });

    // =========================================================================
    // INPUT TESTS: Testing @Input() Properties
    // =========================================================================

    /**
     * Testing @Input bindings
     * -----------------------
     * When parent component sets @Input, we test component accepts it.
     * 
     * component.count = 10;  ? Simulate parent setting @Input
     * expect(textContent).toBe('10')  ? Verify DOM updated
     * 
     * Note: DOM shows '10' (string) even though component.count is 10 (number)
     * Angular's interpolation converts number ? string in template
     */
    it('should accept initial count via @Input', () => {
        // ARRANGE: Set the input (simulating parent component)
        component.count = 10;
        fixture.detectChanges();

        // ASSERT: Component reflects input (DOM shows string '10')
        const countEl = fixture.debugElement.query(By.css('[data-testid="count-display"]'));
        expect(countEl.nativeElement.textContent.trim()).toBe('10');
    });

    // =========================================================================
    // OUTPUT TESTS: Testing @Output() Emitters
    // =========================================================================

    /**
     * Testing @Output events with spies
     * ---------------------------------
     * Use Jasmine spies to verify EventEmitter calls.
     * 
     * spyOn(component.countChange, 'emit')  ? Create spy
     * expect(emitSpy).toHaveBeenCalledWith(1)  ? Verify call with argument
     * 
     * Spy matchers:
     * - toHaveBeenCalled()           ? Was it called at all?
     * - toHaveBeenCalledWith(1)      ? Was it called with specific argument?
     * - toHaveBeenCalledTimes(2)     ? How many times called?
     * 
     * Why spy?
     * - Doesn't require subscribing to EventEmitter
     * - Jasmine tracks all calls automatically
     * - Can verify arguments, call count, etc.
     */
    it('should emit countChange when incremented', () => {
        // ARRANGE: Spy on the output
        const emitSpy = spyOn(component.countChange, 'emit');

        // ACT: Increment
        component.increment();

        // ASSERT: Output was emitted with new value
        expect(emitSpy).toHaveBeenCalledWith(1);
    });

    it('should emit countChange when decremented', () => {
        // ARRANGE
        component.count = 5;
        const emitSpy = spyOn(component.countChange, 'emit');

        // ACT
        component.decrement();

        // ASSERT: 5 - 1 = 4 was emitted
        expect(emitSpy).toHaveBeenCalledWith(4);
    });

    // =========================================================================
    // MULTIPLE INTERACTIONS: Complex Scenarios
    // =========================================================================

    /**
     * Testing cumulative state changes
     * --------------------------------
     * Some tests verify behavior over multiple actions.
     * 
     * Loop 5 times ? increment each time
     * expect(component.count).toBe(5)  ? Verify final state
     * 
     * This tests:
     * - State accumulates correctly (0 ? 1 ? 2 ? 3 ? 4 ? 5)
     * - No race conditions or lost updates
     * - Component handles rapid repeated events
     * 
     * Testing pattern for loops:
     * 1. ACT multiple times in loop
     * 2. detectChanges ONCE after loop (or per iteration if needed)
     * 3. ASSERT final state
     */
    it('should handle multiple increments correctly', () => {
        // ARRANGE
        const incrementBtn = fixture.debugElement.query(By.css('[data-testid="increment-btn"]'));

        // ACT: Click 5 times
        for (let i = 0; i < 5; i++) {
            incrementBtn.triggerEventHandler('click', null);
        }
        fixture.detectChanges();

        // ASSERT: 0 + 5 clicks = 5
        expect(component.count).toBe(5);
    });
});

/**
 * ============================================================================
 * JASMINE MATCHERS QUICK REFERENCE CARD
 * ============================================================================
 * 
 * EQUALITY MATCHERS:
 * ------------------
 * expect(value).toBe(expected)              ? Strict equality (===), primitives
 * expect(value).toEqual(expected)           ? Deep equality, objects/arrays
 * expect(value).not.toBe(unexpected)        ? Negation
 * 
 * TRUTHINESS MATCHERS:
 * --------------------
 * expect(value).toBeTrue()                  ? Exactly true
 * expect(value).toBeFalse()                 ? Exactly false
 * expect(value).toBeTruthy()                ? Any truthy value
 * expect(value).toBeFalsy()                 ? Any falsy value
 * expect(value).toBeDefined()               ? Not undefined
 * expect(value).toBeUndefined()             ? Is undefined
 * expect(value).toBeNull()                  ? Is null
 * 
 * NUMBER MATCHERS:
 * ----------------
 * expect(value).toBeGreaterThan(5)          ? value > 5
 * expect(value).toBeGreaterThanOrEqual(5)   ? value >= 5
 * expect(value).toBeLessThan(10)            ? value < 10
 * expect(value).toBeLessThanOrEqual(10)     ? value <= 10
 * expect(value).toBeCloseTo(5.3, 0.1)       ? Floating point comparison
 * expect(value).toBeNaN()                   ? Is NaN
 * 
 * STRING/ARRAY MATCHERS:
 * ----------------------
 * expect(array).toContain(item)             ? Array/string includes item
 * expect(string).toMatch(/pattern/)         ? Regex match
 * expect(string).toMatch('substring')       ? String contains substring
 * 
 * SPY MATCHERS:
 * -------------
 * expect(spy).toHaveBeenCalled()            ? Called at least once
 * expect(spy).toHaveBeenCalledWith(arg)     ? Called with specific args
 * expect(spy).toHaveBeenCalledTimes(n)      ? Called exactly n times
 * expect(spy).not.toHaveBeenCalled()        ? Never called
 * 
 * TYPE MATCHERS:
 * --------------
 * expect(value).toBeInstanceOf(Class)       ? Is instance of class
 * 
 * ERROR MATCHERS:
 * ---------------
 * expect(() => fn()).toThrow()              ? Function throws error
 * expect(() => fn()).toThrowError('msg')    ? Throws with specific message
 * 
 * ============================================================================
 * COMMON PATTERNS:
 * ============================================================================
 * 
 * 1. Test primitive values:
 *    expect(component.count).toBe(0);
 * 
 * 2. Test objects/arrays:
 *    expect(component.user).toEqual({ name: 'John', age: 30 });
 * 
 * 3. Test DOM text:
 *    expect(element.nativeElement.textContent.trim()).toBe('Expected Text');
 * 
 * 4. Test booleans:
 *    expect(component.isActive).toBeTrue();
 * 
 * 5. Test EventEmitter:
 *    const spy = spyOn(component.save, 'emit');
 *    component.onSave();
 *    expect(spy).toHaveBeenCalledWith(data);
 * 
 * 6. Test async operations:
 *    await fixture.whenStable();
 *    expect(component.data).toBeDefined();
 * 
 * ============================================================================
 */
