/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 4: STATE MANAGEMENT WITH RXJS
 * ============================================================================
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, scan, map } from 'rxjs';
import { FormsModule } from '@angular/forms';

interface State {
    count: number;
    items: string[];
    loading: boolean;
}

type Action =
    | { type: 'INCREMENT' }
    | { type: 'DECREMENT' }
    | { type: 'ADD_ITEM'; payload: string }
    | { type: 'REMOVE_ITEM'; payload: number }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'RESET' };

@Component({
    selector: 'app-scenario-4-state',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 4: State Management</h2>
                <p>Redux-like state management using RxJS.</p>
            </div>

            <div class="content">
                <div class="state-display">
                    <h4>Current State</h4>
                    <pre>{{ currentState() | json }}</pre>
                </div>

                <div class="actions-panel">
                    <div class="action-group">
                        <h4>Counter Actions</h4>
                        <button (click)="dispatch({ type: 'INCREMENT' })">+1</button>
                        <button (click)="dispatch({ type: 'DECREMENT' })">-1</button>
                        <span class="value">Count: {{ count() }}</span>
                    </div>

                    <div class="action-group">
                        <h4>Items Actions</h4>
                        <div class="input-row">
                            <input [(ngModel)]="newItem" placeholder="New item">
                            <button (click)="addItem()">Add</button>
                        </div>
                        <div class="items-list">
                            @for (item of items(); track item; let i = $index) {
                                <div class="item">
                                    {{ item }}
                                    <button (click)="dispatch({ type: 'REMOVE_ITEM', payload: i })">×</button>
                                </div>
                            }
                        </div>
                    </div>

                    <div class="action-group">
                        <h4>Loading State</h4>
                        <button (click)="toggleLoading()">
                            {{ loading() ? 'Stop Loading' : 'Start Loading' }}
                        </button>
                        @if (loading()) {
                            <span class="loading-indicator">🔄 Loading...</span>
                        }
                    </div>
                </div>

                <button class="reset-btn" (click)="dispatch({ type: 'RESET' })">
                    🔄 Reset State
                </button>

                <div class="action-log">
                    <h4>Action Log</h4>
                    @for (action of actionLog(); track action) {
                        <div class="log-entry">{{ action }}</div>
                    }
                </div>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 700px; }
        .instructions { background: #fef2f2; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; color: #1e1e2e; border-left: 4px solid #f59e0b; }
        .content { background: white; padding: 1.5rem; border-radius: 8px; }
        .state-display { padding: 1rem; background: #1e1e2e; border-radius: 8px; margin-bottom: 1rem; }
        .state-display h4 { margin: 0 0 0.5rem; color: white; font-size: 0.9rem; }
        .state-display pre { margin: 0; color: #a6e3a1; font-size: 0.85rem; }
        .actions-panel { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1rem; }
        .action-group { padding: 1rem; background: #f8fafc; border-radius: 8px; }
        .action-group h4 { margin: 0 0 0.75rem; font-size: 0.9rem; color: #6b7280; }
        .action-group button { padding: 0.5rem 1rem; background: #f59e0b; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 0.5rem; }
        .value { margin-left: 1rem; font-weight: bold; color: #f59e0b; }
        .input-row { display: flex; gap: 0.5rem; margin-bottom: 0.5rem; }
        .input-row input { flex: 1; padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 4px; }
        .items-list { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .item { display: flex; align-items: center; gap: 0.5rem; padding: 0.25rem 0.5rem; background: #e5e7eb; border-radius: 4px; font-size: 0.85rem; }
        .item button { padding: 0.125rem 0.5rem; background: #ef4444; font-size: 0.8rem; margin: 0; }
        .loading-indicator { margin-left: 1rem; animation: pulse 1s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .reset-btn { width: 100%; padding: 0.75rem; background: #6b7280; color: white; border: none; border-radius: 6px; cursor: pointer; margin-bottom: 1rem; }
        .action-log { padding: 1rem; background: #1e1e2e; border-radius: 8px; max-height: 120px; overflow-y: auto; }
        .action-log h4 { margin: 0 0 0.5rem; color: white; font-size: 0.9rem; }
        .log-entry { color: #a6e3a1; font-family: monospace; font-size: 0.75rem; padding: 0.125rem 0; }
    `]
})
export class Scenario4StateComponent {
    private initialState: State = {
        count: 0,
        items: ['Apple', 'Banana'],
        loading: false
    };

    private actions$ = new BehaviorSubject<Action>({ type: 'RESET' });

    currentState = signal<State>(this.initialState);
    count = signal(0);
    items = signal<string[]>([]);
    loading = signal(false);
    actionLog = signal<string[]>([]);
    newItem = '';

    constructor() {
        this.actions$.pipe(
            scan((state, action) => this.reducer(state, action), this.initialState)
        ).subscribe(state => {
            this.currentState.set(state);
            this.count.set(state.count);
            this.items.set(state.items);
            this.loading.set(state.loading);
        });
    }

    private reducer(state: State, action: Action): State {
        switch (action.type) {
            case 'INCREMENT':
                return { ...state, count: state.count + 1 };
            case 'DECREMENT':
                return { ...state, count: state.count - 1 };
            case 'ADD_ITEM':
                return { ...state, items: [...state.items, action.payload] };
            case 'REMOVE_ITEM':
                return { ...state, items: state.items.filter((_, i) => i !== action.payload) };
            case 'SET_LOADING':
                return { ...state, loading: action.payload };
            case 'RESET':
                return this.initialState;
            default:
                return state;
        }
    }

    dispatch(action: Action): void {
        const timestamp = new Date().toLocaleTimeString();
        this.actionLog.update(log => [`[${timestamp}] ${action.type}`, ...log].slice(0, 10));
        this.actions$.next(action);
    }

    addItem(): void {
        if (this.newItem.trim()) {
            this.dispatch({ type: 'ADD_ITEM', payload: this.newItem });
            this.newItem = '';
        }
    }

    toggleLoading(): void {
        this.dispatch({ type: 'SET_LOADING', payload: !this.loading() });
    }
}
