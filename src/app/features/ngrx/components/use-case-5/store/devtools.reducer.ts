import { createReducer, on } from '@ngrx/store';
import { DevToolsState } from './devtools.model';
import * as DevToolsActions from './devtools.actions';

export const initialState: DevToolsState = {
    count: 0
};

export const devToolsReducer = createReducer(
    initialState,

    on(DevToolsActions.increment, (state) => ({
        ...state,
        count: state.count + 1
    })),

    on(DevToolsActions.decrement, (state) => ({
        ...state,
        count: state.count - 1
    })),

    on(DevToolsActions.reset, (state) => ({
        ...state,
        count: 0
    })),

    on(DevToolsActions.setRandom, (state, { value }) => ({
        ...state,
        count: value
    }))
);
