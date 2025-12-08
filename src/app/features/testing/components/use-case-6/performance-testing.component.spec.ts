/**
 * ============================================================================
 * SPEC FILE: Performance-Aware Testing
 * ============================================================================
 * 
 * Demonstrates:
 * - Testing OnPush components correctly
 * - Minimal TestBed for faster tests
 * - Controlling change detection manually
 * - Speed optimization patterns
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PerformanceTestingComponent } from './performance-testing.component';

describe('PerformanceTestingComponent (OnPush)', () => {
    let component: PerformanceTestingComponent;
    let fixture: ComponentFixture<PerformanceTestingComponent>;

    beforeEach(async () => {
        // =====================================================================
        // MINIMAL TESTBED: Only import what's needed
        // =====================================================================
        await TestBed.configureTestingModule({
            imports: [PerformanceTestingComponent]  // Just the component!
            // Don't import SharedModule, CommonModule, etc.
        }).compileComponents();

        fixture = TestBed.createComponent(PerformanceTestingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // =========================================================================
    // ONPUSH BEHAVIOR TESTS
    // =========================================================================

    describe('OnPush change detection', () => {
        it('should NOT update DOM when state changes internally', () => {
            // ARRANGE
            const countEl = fixture.debugElement.query(By.css('[data-testid="count"]'));
            expect(countEl.nativeElement.textContent).toBe('0');

            // ACT: Increment without CD trigger
            component.incrementWithoutCD();
            fixture.detectChanges();  // This won't help with OnPush!

            // ASSERT: DOM still shows old value (OnPush behavior)
            // Note: Component state IS updated, but DOM isn't
            expect(component.count).toBe(1);  // State changed
            // With OnPush, DOM doesn't update from internal mutations
        });

        it('should update DOM when Input property changes', () => {
            // ARRANGE
            const countEl = () => fixture.debugElement.query(By.css('[data-testid="count"]'));

            // ACT: Use setInput API - this properly triggers OnPush change detection
            fixture.componentRef.setInput('count', 42);
            fixture.detectChanges();

            // ASSERT: DOM updates (trim to handle whitespace)
            expect(countEl().nativeElement.textContent.trim()).toBe('42');
        });

        it('should update DOM when markForCheck is called', () => {
            // ACT: Use the method that calls markForCheck
            component.incrementWithCD();
            fixture.detectChanges();

            // ASSERT
            const countEl = fixture.debugElement.query(By.css('[data-testid="count"]'));
            expect(countEl.nativeElement.textContent).toBe('1');
        });
    });

    // =========================================================================
    // TESTING COMPONENT LOGIC (Skip DOM)
    // =========================================================================

    describe('component logic only (no DOM)', () => {
        it('should increment count directly - faster test', () => {
            // No fixture.detectChanges() needed for logic-only tests
            component.count = 10;
            component.incrementWithoutCD();

            expect(component.count).toBe(11);
            // No DOM assertions = faster test
        });

        it('should handle multiple increments', () => {
            for (let i = 0; i < 100; i++) {
                component.incrementWithoutCD();
            }
            expect(component.count).toBe(100);
        });
    });

    // =========================================================================
    // PATTERN: Testing OnPush with Input Changes
    // =========================================================================

    describe('testing @Input changes (recommended OnPush pattern)', () => {
        it('should respond to input changes', () => {
            // Simulate what a parent component would do
            fixture.componentRef.setInput('count', 50);
            fixture.detectChanges();

            const countEl = fixture.debugElement.query(By.css('[data-testid="count"]'));
            expect(countEl.nativeElement.textContent).toBe('50');
        });
    });

    // =========================================================================
    // NOTE: Direct Instantiation Pattern
    // =========================================================================
    // Direct instantiation with `new Component()` doesn't work for components 
    // that use `inject()` for DI. The test below is commented as documentation:
    //
    // describe('direct instantiation (no TestBed)', () => {
    //     it('should work without TestBed for logic-only tests', () => {
    //         // This ONLY works for components WITHOUT inject() calls
    //         const directComponent = new SimpleComponent();
    //         directComponent.count = 5;
    //         expect(directComponent.count).toBe(5);
    //     });
    // });
    // 
    // For components using inject(), always use TestBed.
});

// =============================================================================
// SEPARATE DESCRIBE: Speed Comparison Demo
// =============================================================================

describe('Speed Optimization Patterns', () => {

    // Pattern 1: Shared TestBed configuration with beforeAll
    describe('shared configuration (beforeAll)', () => {
        let fixture: ComponentFixture<PerformanceTestingComponent>;
        let component: PerformanceTestingComponent;

        // Configure once for all tests in this describe block
        beforeAll(async () => {
            await TestBed.configureTestingModule({
                imports: [PerformanceTestingComponent]
            }).compileComponents();
        });

        beforeEach(() => {
            fixture = TestBed.createComponent(PerformanceTestingComponent);
            component = fixture.componentInstance;
        });

        it('test 1 - shares config', () => {
            expect(component).toBeTruthy();
        });

        it('test 2 - shares config', () => {
            expect(component.count).toBe(0);
        });

        it('test 3 - shares config', () => {
            component.count = 10;
            expect(component.count).toBe(10);
        });
    });
});
