/**
 * ============================================================================
 * 🏬 NgRx Store Basics - Educational Component
 * ============================================================================
 * 
 * This component demonstrates the fundamental concepts of NgRx:
 * - Actions: Events that describe what happened
 * - Reducers: Pure functions that handle state transitions
 * - Selectors: Pure functions that extract slices of state
 * - Store: The single source of truth for application state
 * 
 * ============================================================================
 * 📚 THE REDUX PATTERN
 * ============================================================================
 * 
 * The Redux pattern (which NgRx implements) follows a unidirectional data flow:
 * 
 *   ┌──────────────────────────────────────────────────────────────┐
 *   │                                                              │
 *   │   Component ──dispatch──> Action ──> Reducer ──> Store      │
 *   │       ▲                                            │        │
 *   │       └──────────select (Observable)───────────────┘        │
 *   │                                                              │
 *   └──────────────────────────────────────────────────────────────┘
 * 
 * ============================================================================
 * 🎯 KEY CONCEPTS
 * ============================================================================
 * 
 * 1. ACTIONS - "What happened"
 *    - Simple objects with a `type` property
 *    - Created with `createAction()` function
 *    - Can carry a payload via `props<T>()`
 *    - Naming convention: '[Feature] Event Name'
 * 
 * 2. REDUCERS - "How state changes"
 *    - Pure functions: (state, action) => newState
 *    - MUST be immutable (never modify state directly)
 *    - MUST be synchronous (no API calls!)
 *    - Use spread operator for immutable updates
 * 
 * 3. SELECTORS - "How to get state"
 *    - Pure functions that extract state slices
 *    - Memoized for performance (cached results)
 *    - Composable (selectors can use other selectors)
 *    - Return Observables when used with store.select()
 * 
 * 4. STORE - "Where state lives"
 *    - Single source of truth for the app
 *    - State is read-only (can only change via actions)
 *    - Changes are made with pure functions (reducers)
 * 
 * ============================================================================
 * ⚠️ COMMON PITFALLS
 * ============================================================================
 * 
 * ❌ BAD: Mutating state in reducer
 *    on(increment, state => { state.count++; return state; })
 * 
 * ✅ GOOD: Returning new state object
 *    on(increment, state => ({ ...state, count: state.count + 1 }))
 * 
 * ❌ BAD: API calls in reducer
 *    on(loadUsers, state => { this.http.get(...); return state; })
 * 
 * ✅ GOOD: Async operations in Effects (see Use Case 2)
 * 
 * ============================================================================
 * 🔍 WHY NGRX OVER SERVICES?
 * ============================================================================
 * 
 * For simple apps, a service with BehaviorSubject is fine.
 * NgRx shines in large apps because:
 * 
 * - Predictable state changes via strict unidirectional flow
 * - Time-travel debugging with Redux DevTools
 * - Clear separation of concerns (UI vs state vs side effects)
 * - Memoized selectors for performance
 * - Testable: Actions, reducers, and selectors are pure functions
 */
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { RouterLink } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Observable } from 'rxjs';

import { increment, decrement, reset, setCustomValue } from './store/counter.actions';
import { counterReducer } from './store/counter.reducer';
import { selectCount, selectUpdatedAt } from './store/counter.selectors';

@Component({
    selector: 'app-store-basics',
    standalone: true,
    imports: [CommonModule, RouterLink, AsyncPipe, DatePipe],
    template: `
        <div class="demo-container">
            <header class="demo-header">
                <a routerLink="/ngrx" class="back-link">← Back to NgRx Overview</a>
                <h1>🏬 Use Case 1: Store Basics</h1>
                <p>Understanding Actions, Reducers, Selectors, and the Store</p>
            </header>

            <div class="content-grid">
                <!-- VIZ -->
                <section class="card visualization-card">
                    <div class="state-circle" [class.pulse]="(updatedAt$ | async)">
                        <div class="count-value">{{ count$ | async }}</div>
                        <div class="state-label">Current State</div>
                    </div>
                    <div class="meta-info">
                        Last Updated: {{ (updatedAt$ | async) | date:'mediumTime' || 'Never' }}
                    </div>
                </section>

                <!-- CONTROLS -->
                <section class="card controls-card">
                    <h2>Dispatch Actions</h2>
                    <div class="button-group">
                        <button (click)="onDecrement()" class="btn decrement">
                            <span>-</span> Decrement
                        </button>
                        <button (click)="onReset()" class="btn reset">
                            Reset
                        </button>
                        <button (click)="onIncrement()" class="btn increment">
                            <span>+</span> Increment
                        </button>
                    </div>
                    
                    <div class="custom-input-group">
                        <input #customInput type="number" placeholder="Enter value" value="100">
                        <button (click)="onSetCustom(customInput.valueAsNumber)" class="btn custom">
                            Set Custom
                        </button>
                    </div>
                </section>

                <!-- CONCEPTS -->
                <section class="card concepts-card">
                    <h2>🔄 Redux Flow</h2>
                    <ul class="concept-list">
                        <li>
                            <span class="icon">🎬</span>
                            <div class="text">
                                <strong>Action</strong>
                                <small>Dispatched event describing WHAT happened</small>
                            </div>
                        </li>
                        <li>
                            <span class="icon">⚙️</span>
                            <div class="text">
                                <strong>Reducer</strong>
                                <small>Pure function calculating NEW state</small>
                            </div>
                        </li>
                        <li>
                            <span class="icon">🔍</span>
                            <div class="text">
                                <strong>Selector</strong>
                                <small>Observable slice of state</small>
                            </div>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    `,
    styles: [`
        .demo-container {
            max-width: 900px;
            margin: 0 auto;
            padding: 2rem;
        }
        .demo-header { margin-bottom: 2rem; }
        .back-link { color: #94a3b8; text-decoration: none; font-size: 0.9rem; }
        h1 { color: #f8fafc; margin: 0.5rem 0; }
        p { color: #94a3b8; }

        .content-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
        }
        
        .card {
            background: #1e293b;
            border-radius: 12px;
            padding: 2rem;
            border: 1px solid rgba(148, 163, 184, 0.1);
        }

        .visualization-card {
            grid-column: 1 / -1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #1e293b, #0f172a);
        }

        .state-circle {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            border: 4px solid #ba2bd2;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-bottom: 1rem;
            transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .state-circle.pulse {
            animation: pulse-animation 0.5s ease-out;
        }

        @keyframes pulse-animation {
            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(186, 43, 210, 0.7); }
            70% { transform: scale(1.1); box-shadow: 0 0 0 10px rgba(186, 43, 210, 0); }
            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(186, 43, 210, 0); }
        }

        .count-value {
            font-size: 3.5rem;
            font-weight: 700;
            color: #fff;
        }

        .state-label { color: #ba2bd2; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; }
        .meta-info { color: #64748b; font-family: monospace; }

        .button-group {
            display: flex;
            gap: 1rem;
            margin-bottom: 1.5rem;
        }

        .btn {
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: opacity 0.2s;
            color: white;
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }

        .btn:hover { opacity: 0.9; }
        .increment { background: #10b981; }
        .decrement { background: #ef4444; }
        .reset { background: #64748b; }
        .custom { background: #3b82f6; flex: 0 0 auto; }

        .custom-input-group {
            display: flex;
            gap: 1rem;
        }

        input {
            flex: 1;
            padding: 0.75rem;
            border-radius: 8px;
            border: 1px solid #334155;
            background: #0f172a;
            color: white;
        }

        .concept-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .concept-list li {
            display: flex;
            gap: 1rem;
            padding: 1rem 0;
            border-bottom: 1px solid #334155;
        }

        .concept-list li:last-child { border-bottom: none; }

        .icon { font-size: 1.5rem; }
        
        .text {
            display: flex;
            flex-direction: column;
        }

        strong { color: #f8fafc; }
        small { color: #94a3b8; }
    `]
})
export class StoreBasicsComponent {
    private store = inject(Store);

    // 🛡️ CRITICAL: Selectors return Observables
    count$: Observable<number> = this.store.select(selectCount);
    updatedAt$: Observable<Date | null> = this.store.select(selectUpdatedAt);

    onIncrement() {
        // 🛡️ CRITICAL: Dispatch Actions, don't mutate state directly
        this.store.dispatch(increment());
    }

    onDecrement() {
        this.store.dispatch(decrement());
    }

    onReset() {
        this.store.dispatch(reset());
    }

    onSetCustom(value: number) {
        this.store.dispatch(setCustomValue({ value }));
    }
}
