/**
 * ============================================================================
 * ⚙️ NgRx REDUCER - Counter Feature
 * ============================================================================
 * 
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ 🎯 WHAT IS A REDUCER?                                                   │
 * ├─────────────────────────────────────────────────────────────────────────┤
 * │ A reducer is a PURE FUNCTION that takes:                                │
 * │   - Current state                                                      │
 * │   - An action (what happened)                                          │
 * │                                                                         │
 * │ And returns:                                                            │
 * │   - NEW state (never mutates the original!)                            │
 * │                                                                         │
 * │ Formula: (state, action) => newState                                   │
 * └─────────────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ 🚨 CRITICAL RULES FOR REDUCERS                                          │
 * ├─────────────────────────────────────────────────────────────────────────┤
 * │ 1. PURE: Same inputs always produce same output                        │
 * │    ❌ No API calls                                                     │
 * │    ❌ No random values                                                 │
 * │    ❌ No Date.now() (except for demo - use Effects in real apps)      │
 * │                                                                         │
 * │ 2. IMMUTABLE: Never modify state directly                              │
 * │    ❌ state.count++ (MUTATION!)                                       │
 * │    ✅ { ...state, count: state.count + 1 } (NEW OBJECT)              │
 * │                                                                         │
 * │ 3. SYNCHRONOUS: No async operations                                    │
 * │    ❌ await fetch(...)                                                │
 * │    ✅ Use Effects for async (see Use Case 2)                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 * 
 * ============================================================================
 * 📁 RELATED FILES:
 * ============================================================================
 * 
 * ./counter.actions.ts   - Actions that this reducer handles
 * ./counter.selectors.ts - Selectors that read from this state
 * ../store-basics.component.ts - Component using this feature
 * 
 * ============================================================================
 * 🔄 DATA FLOW:
 * ============================================================================
 * 
 *   Actions File          This Reducer              Selectors
 *   ────────────          ────────────              ─────────
 *       │                      │                        │
 *   increment() ──────────────>│                        │
 *                              │ on(increment, ...)     │
 *                              │ Returns NEW state      │
 *                              │ { count: count + 1 }   │
 *                              │────────────────────────>│
 *                              │                        │ selectCount
 *                              │                        │ Returns 1
 * 
 * ============================================================================
 * 📊 STATE SHAPE:
 * ============================================================================
 * 
 * This reducer manages a "slice" of the global store:
 * 
 *   Global Store (AppState)
 *   ├── counter: CounterState  <── THIS REDUCER MANAGES THIS
 *   │   ├── count: number
 *   │   └── updatedAt: Date | null
 *   │
 *   ├── users: UserState       <── Another reducer would manage this
 *   └── products: ProductState <── Another reducer would manage this
 * 
 * ============================================================================
 * 🔧 KEY TYPESCRIPT CONCEPTS USED IN THIS FILE:
 * ============================================================================
 * 
 * 1️⃣ HIGHER-ORDER FUNCTION (Factory Function)
 *    createReducer() is a function that RETURNS a function.
 *    It takes configuration (initial state + handlers) and returns
 *    the actual reducer function: (state, action) => newState
 * 
 *    const counterReducer = createReducer(...);
 *    // counterReducer is now: (state: CounterState, action: Action) => CounterState
 * 
 * 2️⃣ GENERIC TYPES
 *    createReducer<CounterState> infers the state type from initialState.
 *    TypeScript knows every handler must return CounterState.
 * 
 * 3️⃣ REST PARAMETERS (...args)
 *    createReducer accepts multiple on() handlers using rest syntax:
 *    createReducer(initialState, on(...), on(...), on(...))
 *    Internally: function createReducer(initial, ...ons: On[])
 * 
 * 4️⃣ ARROW FUNCTIONS
 *    Handler functions use arrow syntax for concise callbacks:
 *    on(increment, (state) => ({ ...state, count: state.count + 1 }))
 *                 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *                 Arrow function returning new state object
 * 
 * 5️⃣ SPREAD OPERATOR (...)
 *    Used for IMMUTABLE state updates:
 *    { ...state, count: newValue }
 *    Creates new object with all state properties, then overrides count
 * 
 * 6️⃣ DESTRUCTURING IN PARAMETERS
 *    Extract payload from action:
 *    on(setCustomValue, (state, { value }) => ...)
 *                              ^^^^^^^^^ Destructure value from action
 * 
 * 7️⃣ IMPLICIT RETURN (Arrow Functions)
 *    When arrow function body is wrapped in (), it returns that object:
 *    (state) => ({ ...state, count: 0 })  // Implicitly returns the object
 *    vs
 *    (state) => { return { ...state, count: 0 }; }  // Explicit return
 * 
 * ============================================================================
 * 📖 createReducer UNDER THE HOOD:
 * ============================================================================
 * 
 * // Simplified version of what createReducer does:
 * function createReducer<S>(initialState: S, ...ons: ActionHandler<S>[]) {
 *     // Returns a reducer function (this is the higher-order pattern)
 *     return function reducer(state: S = initialState, action: Action): S {
 *         // Find matching handler for this action type
 *         const handler = ons.find(on => on.types.includes(action.type));
 *         
 *         if (handler) {
 *             return handler.reducer(state, action);  // Call handler
 *         }
 *         return state;  // No match = return unchanged state
 *     };
 * }
 * 
 * ============================================================================
 * 🆚 OLD SWITCH STATEMENT vs createReducer:
 * ============================================================================
 * 
 * ❌ OLD WAY (verbose, error-prone string matching):
 * 
 * function counterReducer(state = initialState, action: Action): CounterState {
 *     switch (action.type) {
 *         case '[Counter] Increment':  // String literal - typos cause bugs!
 *             return { ...state, count: state.count + 1 };
 *         case '[Counter] Decrement':
 *             return { ...state, count: state.count - 1 };
 *         default:
 *             return state;
 *     }
 * }
 * 
 * ✅ NEW WAY with createReducer (type-safe, less boilerplate):
 * 
 * const counterReducer = createReducer(
 *     initialState,
 *     on(increment, state => ({ ...state, count: state.count + 1 })),
 *     on(decrement, state => ({ ...state, count: state.count - 1 }))
 * );
 * 
 * Benefits:
 * - Actions are imported, not string literals (typos caught at compile time)
 * - Less boilerplate code
 * - Handler types are inferred automatically
 * - Easier to read and maintain
 * 
 * ============================================================================
 */

import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset, setCustomValue } from './counter.actions';


// ============================================================================
// STATE INTERFACE
// ============================================================================

/**
 * CounterState defines the SHAPE of this feature's state
 * 
 * WHY INTERFACE?
 *   - TypeScript knows what properties exist
 *   - Autocomplete works in selectors/components
 *   - Catch typos at compile time
 * 
 * This interface is used by:
 *   - This reducer (to define initial state)
 *   - Selectors (to know what to select)
 *   - Components (for type-safe access)
 */
export interface CounterState {
    /** The current counter value */
    count: number;

    /** Last time the counter was updated (for demo purposes) */
    updatedAt: Date | null;
}


// ============================================================================
// INITIAL STATE
// ============================================================================

/**
 * The STARTING state when the app loads
 * 
 * This is what the state looks like before any actions are dispatched.
 * The reducer returns this if it receives an action it doesn't recognize.
 * 
 * IMPORTANT: All properties must be initialized!
 */
export const initialState: CounterState = {
    count: 0,
    updatedAt: null
};


// ============================================================================
// REDUCER FUNCTION
// ============================================================================

/**
 * The COUNTER REDUCER - handles state transitions
 * 
 * HOW createReducer WORKS:
 *   1. First argument: initial state
 *   2. Remaining arguments: `on()` functions mapping actions to handlers
 * 
 * HOW on() WORKS:
 *   - First arg: the action to respond to
 *   - Second arg: function that receives (state, action) and returns NEW state
 * 
 * WHAT HAPPENS WHEN ACTION IS DISPATCHED:
 *   1. Store receives dispatched action
 *   2. Store calls this reducer with (currentState, action)
 *   3. Reducer finds matching `on()` handler
 *   4. Handler returns NEW state object
 *   5. Store updates its state
 *   6. Selectors re-run, components update via async pipe
 */
export const counterReducer = createReducer(
    initialState,

    /**
     * HANDLE: increment action
     * 
     * INPUT:  { count: 5, updatedAt: ... }
     * OUTPUT: { count: 6, updatedAt: new Date() }
     * 
     * NOTE: We use spread operator (...state) to copy existing properties
     *       Then we override only the properties we want to change
     *       This ensures we don't lose any state properties!
     */
    on(increment, function (state: CounterState): CounterState {
        // ========================================
        // TRADITIONAL FUNCTION SYNTAX (for learning)
        // ========================================
        // This is equivalent to the arrow function version:
        //   (state) => ({ ...state, count: state.count + 1, updatedAt: new Date() })
        // 
        // Steps:
        // 1. Create new state object (never mutate original!)
        // 2. Spread existing properties
        // 3. Override properties we want to change
        // 4. Explicitly return the new state

        const newState: CounterState = {
            ...state,                    // Copy all existing properties
            count: state.count + 1,      // Override count with new value
            updatedAt: new Date()        // Update timestamp
        };

        return newState;  // Must explicitly return with traditional function
    }),

    /**
     * HANDLE: decrement action
     * 
     * INPUT:  { count: 5, updatedAt: ... }
     * OUTPUT: { count: 4, updatedAt: new Date() }
     */
    on(decrement, (state) => ({
        ...state,
        count: state.count - 1,
        updatedAt: new Date()
    })),

    /**
     * HANDLE: reset action
     * 
     * INPUT:  { count: 42, updatedAt: ... }
     * OUTPUT: { count: 0, updatedAt: new Date() }
     */
    on(reset, (state) => ({
        ...state,
        count: 0,
        updatedAt: new Date()
    })),

    /**
     * HANDLE: setCustomValue action (with payload)
     * 
     * This action carries a PAYLOAD: { value: number }
     * 
     * The second parameter to the handler function gives us access to:
     *   - state: the current state
     *   - action properties: we destructure { value } from the action
     * 
     * INPUT action:  { type: '...', value: 100 }
     * INPUT state:   { count: 5, updatedAt: ... }
     * OUTPUT:        { count: 100, updatedAt: new Date() }
     */
    on(setCustomValue, (state, { value }) => ({
        ...state,
        count: value,                // Use payload value
        updatedAt: new Date()
    }))
);


// ============================================================================
// REGISTERING THE REDUCER (Done in AppConfig or Module)
// ============================================================================

/**
 * This reducer needs to be registered with the NgRx Store.
 *
 * In app.config.ts (standalone) or app.module.ts (NgModule):
 *
 * provideStore({ counter: counterReducer })
 *
 * OR for feature module:
 *
 * provideState('counter', counterReducer)
 *
 * The key 'counter' matches what we use in the feature selector:
 * createFeatureSelector<CounterState>('counter')
 *
 * See: ./counter.selectors.ts
 */


// ============================================================================
// COMMON PATTERNS
// ============================================================================

/**
 * PATTERN: Updating nested objects
 * 
 * on(updateUserAddress, (state, { address }) => ({
 *     ...state,
 *     user: {
 *         ...state.user,
 *         address: {
 *             ...state.user.address,
 *             ...address
 *         }
 *     }
 * }))
 * 
 * PATTERN: Updating item in array
 * 
 * on(updateUser, (state, { id, changes }) => ({
 *     ...state,
 *     users: state.users.map(user =>
 *         user.id === id ? { ...user, ...changes } : user
 *     )
 * }))
 * 
 * PATTERN: Adding item to array
 * 
 * on(addUser, (state, { user }) => ({
 *     ...state,
 *     users: [...state.users, user]
 * }))
 * 
 * PATTERN: Removing item from array
 * 
 * on(removeUser, (state, { id }) => ({
 *     ...state,
 *     users: state.users.filter(user => user.id !== id)
 * }))
 */
