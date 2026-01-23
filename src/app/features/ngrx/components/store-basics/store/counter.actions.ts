/**
 * ============================================================================
 * 🎬 NgRx ACTIONS - Counter Feature
 * ============================================================================
 * 
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ 🎯 WHAT ARE ACTIONS?                                                    │
 * ├─────────────────────────────────────────────────────────────────────────┤
 * │ Actions are EVENTS that describe WHAT HAPPENED in your application.    │
 * │                                                                         │
 * │ They are:                                                               │
 * │   • Plain objects with a 'type' property                               │
 * │   • Dispatched from components/services                                │
 * │   • Handled by reducers to update state                               │
 * │   • Can carry a payload (extra data)                                  │
 * │                                                                         │
 * │ Think of actions like ANNOUNCEMENTS:                                    │
 * │   "Hey everyone, the user clicked the increment button!"              │
 * │   "Hey everyone, the API returned user data!"                         │
 * │   "Hey everyone, there was an error loading products!"                │
 * └─────────────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ 📋 NAMING CONVENTION: [Source] Event                                    │
 * ├─────────────────────────────────────────────────────────────────────────┤
 * │ The bracketed prefix indicates WHERE the action was dispatched from:   │
 * │                                                                         │
 * │   [Counter Page] Increment     - User clicked button on counter page  │
 * │   [Users API] Load Success     - API call returned successfully       │
 * │   [Auth Guard] Redirect        - Route guard triggered redirect       │
 * │   [Router] Navigation          - Router caused this action            │
 * │                                                                         │
 * │ This helps with debugging - you can see action history in DevTools    │
 * │ and immediately know WHERE each action came from.                     │
 * └─────────────────────────────────────────────────────────────────────────┘
 * 
 * ============================================================================
 * 📁 RELATED FILES IN THIS FEATURE:
 * ============================================================================
 * 
 * ./counter.reducer.ts   - Handles these actions and updates state
 * ./counter.selectors.ts - Selects state values for components
 * ../store-basics.component.ts - Component that dispatches these actions
 * 
 * ============================================================================
 * 🔄 DATA FLOW:
 * ============================================================================
 * 
 *   Component                    This File              Reducer
 *   ─────────                    ─────────              ───────
 *       │                            │                     │
 *       │  store.dispatch(          │                     │
 *       │    increment()            │                     │
 *       │  )                        │                     │
 *       │ ─────────────────────────>│                     │
 *       │                           │ Action dispatched   │
 *       │                           │────────────────────>│
 *       │                           │                     │ Updates state
 *       │                           │                     │
 * 
 * ============================================================================
 */

import { createAction, props } from '@ngrx/store';


// ============================================================================
// SIMPLE ACTIONS (No Payload)
// ============================================================================

/**
 * INCREMENT ACTION
 * 
 * WHAT IT DOES:
 *   Signals that the counter should be increased by 1
 * 
 * WHEN IT'S DISPATCHED:
 *   When user clicks the "+" / "Increment" button
 * 
 * HOW IT'S HANDLED:
 *   The reducer receives this and returns new state with count + 1
 *   See: ./counter.reducer.ts, line with `on(increment, ...)`
 * 
 * USAGE IN COMPONENT:
 *   this.store.dispatch(increment());
 */
export const increment = createAction('[Counter Page] Increment');


/**
 * DECREMENT ACTION
 * 
 * WHAT IT DOES:
 *   Signals that the counter should be decreased by 1
 * 
 * WHEN IT'S DISPATCHED:
 *   When user clicks the "-" / "Decrement" button
 * 
 * HOW IT'S HANDLED:
 *   The reducer returns new state with count - 1
 *   See: ./counter.reducer.ts
 * 
 * USAGE IN COMPONENT:
 *   this.store.dispatch(decrement());
 */
export const decrement = createAction('[Counter Page] Decrement');


/**
 * RESET ACTION
 * 
 * WHAT IT DOES:
 *   Signals that the counter should be reset to 0
 * 
 * WHEN IT'S DISPATCHED:
 *   When user clicks the "Reset" button
 * 
 * HOW IT'S HANDLED:
 *   The reducer returns new state with count = 0
 *   See: ./counter.reducer.ts
 * 
 * USAGE IN COMPONENT:
 *   this.store.dispatch(reset());
 */
export const reset = createAction('[Counter Page] Reset');


// ============================================================================
// ACTIONS WITH PAYLOAD (Using props<T>())
// ============================================================================

/**
 * SET CUSTOM VALUE ACTION
 * 
 * WHAT IT DOES:
 *   Sets the counter to a specific value provided by the user
 * 
 * HOW PAYLOAD WORKS:
 *   - props<{ value: number }>() defines the shape of extra data
 *   - When dispatching, you pass an object: { value: 42 }
 *   - The reducer receives this in the action parameter
 * 
 * WHEN IT'S DISPATCHED:
 *   When user enters a number and clicks "Set Custom"
 * 
 * HOW IT'S HANDLED:
 *   The reducer extracts { value } from action and sets count = value
 *   See: ./counter.reducer.ts
 * 
 * USAGE IN COMPONENT:
 *   this.store.dispatch(setCustomValue({ value: 100 }));
 * 
 * WHAT THE ACTION OBJECT LOOKS LIKE:
 *   {
 *     type: '[Counter Page] Set Custom Value',
 *     value: 100
 *   }
 */
export const setCustomValue = createAction(
    '[Counter Page] Set Custom Value',
    props<{ value: number }>()
);


// ============================================================================
// ACTION PATTERNS FOR ASYNC OPERATIONS (Preview - See )
// ============================================================================

/**
 * For async operations (API calls), you typically create 3 actions:
 * 
 * 1. TRIGGER:   [Users Page] Load Users       - Start loading
 * 2. SUCCESS:   [Users API] Load Users Success - API returned data
 * 3. FAILURE:   [Users API] Load Users Failure - API returned error
 * 
 * Example:
 * 
 * export const loadUsers = createAction('[Users Page] Load Users');
 * 
 * export const loadUsersSuccess = createAction(
 *     '[Users API] Load Users Success',
 *     props<{ users: User[] }>()
 * );
 * 
 * export const loadUsersFailure = createAction(
 *     '[Users API] Load Users Failure',
 *     props<{ error: string }>()
 * );
 * 
 * The actual API call happens in an EFFECT, not a reducer.
 * See: Effects for async operations
 */
