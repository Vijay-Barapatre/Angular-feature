/**
 * ============================================================================
 * SPEC FILE: Performance-Aware Testing - Complete Guide
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

/**
 * ============================================================================
 * UNDERSTANDING PERFORMANCE-AWARE TESTING
 * ============================================================================
 * 
 * What is Performance-Aware Testing?
 * -----------------------------------
 * Writing tests that:
 * 1. Run FAST (milliseconds, not seconds)
 * 2. Test what matters (logic > implementation details)
 * 3. Minimize TestBed overhead
 * 4. Skip unnecessary change detection
 * 5. Use direct instantiation when possible
 * 
 * Why Does Test Speed Matter?
 * ----------------------------
 * Slow tests = Slow feedback loop
 * 
 * Example:
 * - 1000 tests × 100ms each = 100 seconds (1.5 minutes) ✅ Good
 * - 1000 tests × 500ms each = 500 seconds (8+ minutes) ❌ Too slow
 * 
 * Developers run tests constantly. Every second saved = faster iterations!
 * 
 * The OnPush Challenge:
 * ---------------------
 * Components with OnPush change detection strategy ONLY update when:
 * 1. @Input reference changes
 * 2. Event handler fires (click, etc.)
 * 3. Async pipe receives new value
 * 4. changeDetectorRef.markForCheck() called
 * 
 * Internal mutations DON'T trigger updates:
 * this.count++; // ❌ DOM won't update with OnPush
 * 
 * Testing OnPush Components:
 * ---------------------------
 * Must manually trigger change detection using:
 * 
 * Option 1: setInput() (recommended)
 * fixture.componentRef.setInput('count', 42);
 * 
 * Option 2: markForCheck()
 * fixture.componentRef.changeDetectorRef.markForCheck();
 * fixture.detectChanges();
 * 
 * Option 3: Component method that calls markForCheck()
 * component.incrementWithCD(); // Internally calls markForCheck()
 * fixture.detectChanges();
 * 
 * Performance Optimization Strategies:
 * ------------------------------------
 * 
 * 1. MINIMAL TESTBED IMPORTS 🚀 (HIGH IMPACT)
 *    ✅ imports: [ComponentUnderTest]
 *    ❌ imports: [AppModule, SharedModule, ...]
 *    
 *    Why: TestBed compiles everything you import
 *    Loading AppModule = loading entire app = SLOW
 * 
 * 2. TEST LOGIC ONLY (SKIP DOM) ⚡ (HIGH IMPACT)
 *    When testing business logic:
 *    - Don't call fixture.detectChanges()
 *    - Don't query DOM elements
 *    - Just test component properties/methods
 *    
 *    Example:
 *    component.calculate(5);
 *    expect(component.result).toBe(10);
 *    // No DOM = 10x faster!
 * 
 * 3. DIRECT INSTANTIATION 🏎️ (HIGHEST IMPACT)
 *    For services without dependencies:
 *    const service = new MyService();
 *    // No TestBed = 100x faster!
 *    
 *    LIMITATION: Doesn't work with inject() function
 * 
 * 4. SHARED TESTBED (beforeAll) 📦 (MEDIUM IMPACT)
 *    Configure TestBed ONCE for multiple tests:
 *    beforeAll(() => TestBed.configureTestingModule(...))
 *    
 *    Trade-off: Tests share state (can cause flaky tests)
 * 
 * 5. SKIP detectChanges() WHEN POSSIBLE ⏭️
 *    Only call detectChanges() when testing DOM
 *    Logic tests don't need it
 * 
 * OnPush Change Detection Deep Dive:
 * -----------------------------------
 * 
 * What is OnPush?
 * OnPush is a change detection strategy that ONLY checks for changes when:
 * - Input property reference changes
 * - Events fired from template
 * - Async pipe emits
 * - Manual markForCheck()
 * 
 * Default vs OnPush:
 * 
 * Default Strategy:
 * component.count++; → detectChanges() → DOM updates ✅
 * 
 * OnPush Strategy:
 * component.count++; → detectChanges() → DOM NOT updated ❌
 * (Component state changes, but Angular doesn't re-render)
 * 
 * Why use OnPush?
 * - PERFORMANCE: Skips unnecessary change detection
 * - Large apps with many components benefit greatly
 * - But requires immutable patterns (new object references)
 * 
 * How to Test OnPush Components:
 * -------------------------------
 * 
 * Scenario 1: Internal mutation (won't update DOM)
 * component.count++; // State changes
 * fixture.detectChanges(); // ❌ Won't help!
 * // DOM still shows old value
 * 
 * Scenario 2: Input change (WILL update DOM)
 * fixture.componentRef.setInput('count', 42); // New reference
 * fixture.detectChanges(); // ✅ OnPush triggers!
 * // DOM shows new value
 * 
 * Scenario 3: markForCheck (WILL update DOM)
 * component.incrementWithCD(); // Calls markForCheck internally
 * fixture.detectChanges(); // ✅ OnPush triggers!
 * // DOM shows new value
 * 
 * The setInput() API:
 * -------------------
 * fixture.componentRef.setInput('propertyName', value)
 * 
 * What it does:
 * 1. Sets the @Input property
 * 2. Marks component for check (OnPush-aware)
 * 3. Simulates what parent component would do
 * 
 * Why use it:
 * - Proper way to test @Input changes
 * - Works with OnPush out of the box
 * - More realistic than direct property assignment
 * 
 * Testing Patterns:
 * -----------------
 * 
 * Pattern 1: Test logic only (fastest)
 * it('calculates correctly', () => {
 *     component.value = 5;
 *     component.double();
 *     expect(component.result).toBe(10);
 *     // No fixture, no DOM, no detectChanges = FAST!
 * });
 * 
 * Pattern 2: Test OnPush with setInput
 * it('updates on input change', () => {
 *     fixture.componentRef.setInput('data', newData);
 *     fixture.detectChanges();
 *     // Verify DOM updated
 * });
 * 
 * Pattern 3: Test with markForCheck
 * it('updates when marked', () => {
 *     component.methodThatCallsMarkForCheck();
 *     fixture.detectChanges();
 *     // Verify DOM updated
 * });
 * 
 * Speed Comparison:
 * -----------------
 * 
 * Slowest → Fastest:
 * 1. Full TestBed + imports: [AppModule] = 500ms+ per test
 * 2. Minimal TestBed + imports: [Component] = 50-100ms per test
 * 3. Logic test (no DOM) = 10-20ms per test
 * 4. Direct instantiation (no TestBed) = 1-5ms per test
 * 
 * For 1000 tests:
 * - Full TestBed: 500+ seconds (8+ minutes) 😱
 * - Minimal TestBed: 50-100 seconds (< 2 minutes) 🙂
 * - Logic only: 10-20 seconds ⚡
 * - Direct: 1-5 seconds 🚀
 * 
 * Best Practices:
 * ---------------
 * 
 * ✅ DO:
 * - Import ONLY what you need
 * - Test logic without DOM when possible
 * - Use setInput() for OnPush components
 * - Use direct instantiation for simple services
 * - Profile your tests to find slow ones
 * 
 * ❌ DON'T:
 * - Import AppModule or big SharedModules
 * - Call detectChanges() if not testing DOM
 * - Test implementation details
 * - Use TestBed for simple logic tests
 * 
 * Memory Trick 🧠:
 * ----------------
 * OnPush = Lazy employee 😴
 * - Won't work unless you explicitly tell them
 * - setInput() = New task (they wake up)
 * - markForCheck() = Tap on shoulder (they wake up)
 * - Internal mutation = Whisper (they don't hear)
 * 
 * Performance = Racing car 🏎️
 * - Minimal imports = Light car (fast)
 * - Logic tests = Straight road (fast)
 * - DOM tests = Winding road (slower)
 * - Full TestBed = Heavy truck (slow)
 * 
 * Quick Decision Tree:
 * --------------------
 * 
 * What are you testing?
 * │
 * ├─ Service without dependencies
 * │  └─ Use: new Service() ⚡ (Fastest)
 * │
 * ├─ Component logic only
 * │  └─ Use: component.method() (no fixture) ⚡
 * │
 * ├─ Component with OnPush + DOM
 * │  ├─ Testing @Input → setInput()
 * │  └─ Testing internal → method with markForCheck()
 * │
 * └─ Component (Default strategy) + DOM
 *    └─ Use: fixture + detectChanges()
 */

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
