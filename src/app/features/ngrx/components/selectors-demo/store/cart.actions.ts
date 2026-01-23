import { createAction, props } from '@ngrx/store';
import { Product } from './cart.model';

export const addItem = createAction(
    '[Cart] Add Item',
    props<{ item: Product }>()
);

export const setDiscount = createAction(
    '[Cart] Set Discount',
    props<{ discount: number }>()
);

export const loadSampleData = createAction('[Cart] Load Sample Data');
