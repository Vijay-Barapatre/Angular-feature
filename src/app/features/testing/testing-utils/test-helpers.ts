/**
 * ============================================================================
 * REUSABLE TEST HELPERS
 * ============================================================================
 * 
 * Common utility functions for cleaner, more maintainable tests.
 * Import these in your spec files to reduce boilerplate.
 */

import { ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

// =============================================================================
// DOM QUERY HELPERS
// =============================================================================

/**
 * Query element by data-testid attribute
 * @param fixture - Component fixture
 * @param testId - Value of data-testid attribute
 */
export function getByTestId<T>(
    fixture: ComponentFixture<T>,
    testId: string
): DebugElement | null {
    return fixture.debugElement.query(By.css(`[data-testid="${testId}"]`));
}

/**
 * Query element by CSS selector
 */
export function queryEl<T>(
    fixture: ComponentFixture<T>,
    selector: string
): DebugElement | null {
    return fixture.debugElement.query(By.css(selector));
}

/**
 * Query all elements by CSS selector
 */
export function queryAllEl<T>(
    fixture: ComponentFixture<T>,
    selector: string
): DebugElement[] {
    return fixture.debugElement.queryAll(By.css(selector));
}

/**
 * Get text content of element by test ID
 */
export function getTextByTestId<T>(
    fixture: ComponentFixture<T>,
    testId: string
): string {
    const el = getByTestId(fixture, testId);
    return el?.nativeElement.textContent?.trim() ?? '';
}

/**
 * Get text content of element by selector
 */
export function getText<T>(
    fixture: ComponentFixture<T>,
    selector: string
): string {
    const el = queryEl(fixture, selector);
    return el?.nativeElement.textContent?.trim() ?? '';
}

// =============================================================================
// EVENT HELPERS
// =============================================================================

/**
 * Click element by test ID
 */
export function clickByTestId<T>(
    fixture: ComponentFixture<T>,
    testId: string
): void {
    const el = getByTestId(fixture, testId);
    if (el) {
        el.triggerEventHandler('click', null);
        fixture.detectChanges();
    }
}

/**
 * Click element by selector
 */
export function click<T>(
    fixture: ComponentFixture<T>,
    selector: string
): void {
    const el = queryEl(fixture, selector);
    if (el) {
        el.triggerEventHandler('click', null);
        fixture.detectChanges();
    }
}

/**
 * Set input value and trigger input event
 */
export function setInputValue<T>(
    fixture: ComponentFixture<T>,
    selector: string,
    value: string
): void {
    const el = queryEl(fixture, selector);
    if (el) {
        el.nativeElement.value = value;
        el.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
    }
}

/**
 * Set input value by test ID
 */
export function setInputByTestId<T>(
    fixture: ComponentFixture<T>,
    testId: string,
    value: string
): void {
    const el = getByTestId(fixture, testId);
    if (el) {
        el.nativeElement.value = value;
        el.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
    }
}

// =============================================================================
// ASSERTION HELPERS
// =============================================================================

/**
 * Check if element exists
 */
export function elementExists<T>(
    fixture: ComponentFixture<T>,
    selector: string
): boolean {
    return queryEl(fixture, selector) !== null;
}

/**
 * Check if element is visible (not hidden)
 */
export function isVisible<T>(
    fixture: ComponentFixture<T>,
    selector: string
): boolean {
    const el = queryEl(fixture, selector);
    if (!el) return false;
    const styles = getComputedStyle(el.nativeElement);
    return styles.display !== 'none' && styles.visibility !== 'hidden';
}

/**
 * Check if element has specific class
 */
export function hasClass<T>(
    fixture: ComponentFixture<T>,
    selector: string,
    className: string
): boolean {
    const el = queryEl(fixture, selector);
    return el?.nativeElement.classList.contains(className) ?? false;
}

// =============================================================================
// ASYNC HELPERS
// =============================================================================

/**
 * Wait for fixture to stabilize (use with async tests)
 */
export async function waitForStable<T>(fixture: ComponentFixture<T>): Promise<void> {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
}
