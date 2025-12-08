import { createAction, props } from '@ngrx/store';

// 🛡️ CRITICAL: Good Action Naming Convention: [Source] Event
export const increment = createAction('[Counter Page] Increment');
export const decrement = createAction('[Counter Page] Decrement');
export const reset = createAction('[Counter Page] Reset');

// Action with payload
export const setCustomValue = createAction(
    '[Counter Page] Set Custom Value',
    props<{ value: number }>()
);
