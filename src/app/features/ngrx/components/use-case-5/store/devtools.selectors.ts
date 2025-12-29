import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DevToolsState } from './devtools.model';

export const selectDevToolsState = createFeatureSelector<DevToolsState>('devtools');

export const selectCount = createSelector(
    selectDevToolsState,
    (state) => state.count
);
