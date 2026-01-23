import { createAction, props } from '@ngrx/store';

export const increment = createAction('[DevTools Demo] Increment');
export const decrement = createAction('[DevTools Demo] Decrement');
export const reset = createAction('[DevTools Demo] Reset');
export const setRandom = createAction(
    '[DevTools Demo] Set Random',
    props<{ value: number }>()
);
