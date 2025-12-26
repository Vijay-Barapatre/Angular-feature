/**
 * ============================================================================
 * 🔍 NgRx SELECTORS - Counter Feature
 * ============================================================================
 * 
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ 🎯 WHAT ARE SELECTORS?                                                  │
 * ├─────────────────────────────────────────────────────────────────────────┤
 * │ Selectors are PURE FUNCTIONS that extract and derive data from state.  │
 * │                                                                         │
 * │ They are:                                                               │
 * │   • Pure functions: (state) => derivedValue                            │
 * │   • MEMOIZED: Results are cached, only recompute when inputs change   │
 * │   • COMPOSABLE: Selectors can use other selectors                     │
 * │   • Used with store.select() to get Observables                       │
 * └─────────────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ 💡 WHY USE SELECTORS INSTEAD OF DIRECT STATE ACCESS?                    │
 * ├─────────────────────────────────────────────────────────────────────────┤
 * │ 1. PERFORMANCE (Memoization)                                           │
 * │    • If state.count hasn't changed, selector returns cached value     │
 * │    • Prevents unnecessary re-renders                                   │
 * │                                                                         │
 * │ 2. DECOUPLING                                                          │
 * │    • Components don't know state shape                                 │
 * │    • If state structure changes, only update selectors                │
 * │                                                                         │
 * │ 3. REUSABILITY                                                         │
 * │    • Same selector used across multiple components                    │
 * │    • Computed values defined once, used everywhere                    │
 * │                                                                         │
 * │ 4. TESTABILITY                                                         │
 * │    • Pure functions are easy to unit test                             │
 * │    • No mocking needed, just pass state objects                       │
 * └─────────────────────────────────────────────────────────────────────────┘
 * 
 * ============================================================================
 * 📁 RELATED FILES:
 * ============================================================================
 * 
 * ./counter.actions.ts   - Actions that trigger state changes
 * ./counter.reducer.ts   - Reducer that updates state (defines CounterState)
 * ../store-basics.component.ts - Component that uses these selectors
 * 
 * ============================================================================
 * 🔄 DATA FLOW:
 * ============================================================================
 * 
 *   Store                    This File                Component
 *   ─────                    ─────────                ─────────
 *     │                          │                        │
 *     │  State changes          │                        │
 *     │ ────────────────────────>│                        │
 *     │                          │ selectCount(state)     │
 *     │                          │ Returns: 5             │
 *     │                          │────────────────────────>│
 *     │                          │                        │ count$ | async
 *     │                          │                        │ Displays: 5
 * 
 * ============================================================================
 */

import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CounterState } from './counter.reducer';


// ============================================================================
// FEATURE SELECTOR (Step 1: Access the feature slice)
// ============================================================================

/**
 * FEATURE SELECTOR - Selects the entire counter state slice
 * 
 * HOW IT WORKS:
 *   The global store might look like:
 *   {
 *     counter: { count: 5, updatedAt: ... },   <── This selector gets THIS
 *     users: { ... },
 *     products: { ... }
 *   }
 * 
 * The string 'counter' MUST match the key used when registering the reducer:
 *   provideStore({ counter: counterReducer })
 *                   ^^^^^^^
 *                   This key!
 * 
 * USAGE:
 *   This selector is used as the base for other selectors.
 *   Rarely used directly in components (use specific selectors instead).
 */
export const selectCounterState = createFeatureSelector<CounterState>('counter');


// ============================================================================
// PROPERTY SELECTORS (Step 2: Extract specific properties)
// ============================================================================

/**
 * SELECT COUNT - Extracts just the count value
 * 
 * HOW createSelector WORKS:
 *   First argument(s): parent selector(s) to use as input
 *   Last argument: projector function that combines/transforms inputs
 * 
 *   createSelector(
 *     selectCounterState,              // Input: entire counter state
 *     (state) => state.count           // Output: just the count number
 *   )
 * 
 * MEMOIZATION IN ACTION:
 *   If count is 5 and we call selectCount:
 *   - First call: Runs projector, returns 5, caches result
 *   - Second call (count still 5): Returns cached 5 (no computation!)
 *   - Third call (count changed to 6): Runs projector, returns 6, caches
 * 
 * USAGE IN COMPONENT:
 *   count$ = this.store.select(selectCount);
 *   // In template: {{ count$ | async }}
 */
export const selectCount = createSelector(
    selectCounterState,
    (state: CounterState) => state.count
);


/**
 * SELECT UPDATED AT - Extracts the last update timestamp
 * 
 * Returns: Date | null
 *   - Date: When counter was last changed
 *   - null: Counter has never been changed since app load
 * 
 * USAGE IN COMPONENT:
 *   updatedAt$ = this.store.select(selectUpdatedAt);
 *   // In template: {{ updatedAt$ | async | date:'medium' }}
 */
export const selectUpdatedAt = createSelector(
    selectCounterState,
    (state: CounterState) => state.updatedAt
);


// ============================================================================
// DERIVED/COMPUTED SELECTORS (Combine multiple selectors or add logic)
// ============================================================================

/**
 * SELECT COUNT MULTIPLIED - Returns count multiplied by a factor
 * 
 * This is a PARAMETERIZED SELECTOR (factory function pattern).
 * It's a function that RETURNS a selector.
 * 
 * WHY THIS PATTERN?
 *   Regular selectors can't take parameters.
 *   To pass a parameter, we create a function that returns a selector.
 * 
 * HOW IT WORKS:
 *   const selectDouble = selectCountMultiplied(2);  // Creates selector
 *   store.select(selectDouble);                     // Uses selector
 * 
 * USAGE IN COMPONENT:
 *   doubled$ = this.store.select(selectCountMultiplied(2));
 *   tripled$ = this.store.select(selectCountMultiplied(3));
 */
export const selectCountMultiplied = (factor: number) => createSelector(
    selectCount,
    (count: number) => count * factor
);


/**
 * EXAMPLE: Selector combining multiple values
 *
 * export const selectCounterSummary = createSelector(
 *     selectCount,
 *     selectUpdatedAt,
 *     (count, updatedAt) => ({
 *         value: count,
 *         lastUpdate: updatedAt,
 *         isPositive: count > 0,
 *         isNegative: count < 0,
 *         isZero: count === 0
 *     })
 * );
 */


/**
 * EXAMPLE: Selector with filtering
 *
 * export const selectActiveUsers = createSelector(
 *     selectAllUsers,
 *     (users) => users.filter(user => user.isActive)
 * );
 */


/**
 * EXAMPLE: Selector with sorting
 *
 * export const selectUsersSortedByName = createSelector(
 *     selectAllUsers,
 *     (users) => [...users].sort((a, b) => a.name.localeCompare(b.name))
 * );
 */


// ============================================================================
// USING SELECTORS IN COMPONENTS
// ============================================================================

/**
 * PATTERN 1: Observable with async pipe (RECOMMENDED)
 *
 * @Component({...})
 * export class MyComponent {
 *     count$ = this.store.select(selectCount);
 *     // Template: {{ count$ | async }}
 * }
 *
 *
 * PATTERN 2: Subscribe in component (use sparingly)
 *
 * @Component({...})
 * export class MyComponent implements OnInit, OnDestroy {
 *     count = 0;
 *     private destroy$ = new Subject<void>();
 *
 *     ngOnInit() {
 *         this.store.select(selectCount).pipe(
 *             takeUntil(this.destroy$)
 *         ).subscribe(count => {
 *             this.count = count;
 *         });
 *     }
 *
 *     ngOnDestroy() {
 *         this.destroy$.next();
 *         this.destroy$.complete();
 *     }
 * }
 *
 *
 * PATTERN 3: Signals (Angular 16+)
 *
 * @Component({...})
 * export class MyComponent {
 *     count = this.store.selectSignal(selectCount);
 *     // Template: {{ count() }}
 * }
 */


// ============================================================================
// TESTING SELECTORS
// ============================================================================

/**
 * Selectors are easy to test because they're pure functions:
 * 
 * describe('Counter Selectors', () => {
 *     it('should select count', () => {
 *         const state: CounterState = { count: 42, updatedAt: null };
 *         const result = selectCount.projector(state);
 *         expect(result).toBe(42);
 *     });
 *
 *     it('should multiply count by factor', () => {
 *         const count = 5;
 *         const result = selectCountMultiplied(3).projector(count);
 *         expect(result).toBe(15);
 *     });
 * });
 * 
 * Note: Use .projector() to test just the projector function
 *       without needing to set up the full state tree.
 */
