import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CounterState } from './counter.reducer';

// 🛡️ CRITICAL: Feature Selector
// In a real app, this key would be defined in a constant
export const selectCounterState = createFeatureSelector<CounterState>('counter');

// 🛡️ CRITICAL: Memoized Selectors
export const selectCount = createSelector(
    selectCounterState,
    (state) => state.count
);

export const selectUpdatedAt = createSelector(
    selectCounterState,
    (state) => state.updatedAt
);

// Derived selector
export const selectCountMultiplied = (factor: number) => createSelector(
    selectCount,
    (count) => count * factor
);
