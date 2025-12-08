import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset, setCustomValue } from './counter.actions';

export interface CounterState {
    count: number;
    updatedAt: Date | null;
}

export const initialState: CounterState = {
    count: 0,
    updatedAt: null
};

// 🛡️ CRITICAL: Reducers must be pure functions
export const counterReducer = createReducer(
    initialState,
    on(increment, (state) => ({
        ...state,
        count: state.count + 1,
        updatedAt: new Date()
    })),
    on(decrement, (state) => ({
        ...state,
        count: state.count - 1,
        updatedAt: new Date()
    })),
    on(reset, (state) => ({
        ...state,
        count: 0,
        updatedAt: new Date()
    })),
    on(setCustomValue, (state, { value }) => ({
        ...state,
        count: value,
        updatedAt: new Date()
    }))
);
