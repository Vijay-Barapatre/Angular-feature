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

    it('should initialize with count = 0', () => {
        // ASSERT: Default initial state
        expect(component.count).toBe(0);
    });

    // =========================================================================
    // DOM QUERY TESTS: Reading the Template
    // =========================================================================

    it('should display the initial count in the DOM', () => {
        // ARRANGE: Get the count display element
        const countEl = fixture.debugElement.query(By.css('[data-testid="count-display"]'));

        // ASSERT: DOM reflects the component state
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

    it('should increment count when increment button is clicked', () => {
        // ARRANGE: Get the button
        const incrementBtn = fixture.debugElement.query(By.css('[data-testid="increment-btn"]'));

        // ACT: Simulate click event
        incrementBtn.triggerEventHandler('click', null);
        fixture.detectChanges(); // Important: Update the view

        // ASSERT: Count increased
        expect(component.count).toBe(1);

        // ASSERT: DOM is updated
        const countEl = fixture.debugElement.query(By.css('[data-testid="count-display"]'));
        expect(countEl.nativeElement.textContent.trim()).toBe('1');
    });

    it('should decrement count when decrement button is clicked', () => {
        // ARRANGE: Set initial count > 0
        component.count = 5;
        fixture.detectChanges();

        // ACT: Click decrement
        const decrementBtn = fixture.debugElement.query(By.css('[data-testid="decrement-btn"]'));
        decrementBtn.triggerEventHandler('click', null);
        fixture.detectChanges();

        // ASSERT
        expect(component.count).toBe(4);
    });

    it('should not decrement below zero', () => {
        // ARRANGE: Count is already 0
        expect(component.count).toBe(0);

        // ACT: Try to decrement
        const decrementBtn = fixture.debugElement.query(By.css('[data-testid="decrement-btn"]'));
        decrementBtn.triggerEventHandler('click', null);
        fixture.detectChanges();

        // ASSERT: Count stays at 0
        expect(component.count).toBe(0);
    });

    it('should disable decrement button when count is 0', () => {
        // ARRANGE: Count is 0
        expect(component.count).toBe(0);
        fixture.detectChanges();

        // ASSERT: Button is disabled
        const decrementBtn = fixture.debugElement.query(By.css('[data-testid="decrement-btn"]'));
        expect(decrementBtn.nativeElement.disabled).toBeTrue();
    });

    // =========================================================================
    // INPUT TESTS: Testing @Input() Properties
    // =========================================================================

    it('should accept initial count via @Input', () => {
        // ARRANGE: Set the input
        component.count = 10;
        fixture.detectChanges();

        // ASSERT: Component reflects input
        const countEl = fixture.debugElement.query(By.css('[data-testid="count-display"]'));
        expect(countEl.nativeElement.textContent.trim()).toBe('10');
    });

    // =========================================================================
    // OUTPUT TESTS: Testing @Output() Emitters
    // =========================================================================

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

        // ASSERT
        expect(emitSpy).toHaveBeenCalledWith(4);
    });

    // =========================================================================
    // MULTIPLE INTERACTIONS: Complex Scenarios
    // =========================================================================

    it('should handle multiple increments correctly', () => {
        // ARRANGE
        const incrementBtn = fixture.debugElement.query(By.css('[data-testid="increment-btn"]'));

        // ACT: Click 5 times
        for (let i = 0; i < 5; i++) {
            incrementBtn.triggerEventHandler('click', null);
        }
        fixture.detectChanges();

        // ASSERT
        expect(component.count).toBe(5);
    });
});
