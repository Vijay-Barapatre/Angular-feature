import { createReducer, on } from '@ngrx/store';
import { CartState, Product } from './cart.model';
import * as CartActions from './cart.actions';

export const initialState: CartState = {
    items: [
        { id: 1, name: 'Laptop', price: 999, category: 'Electronics', quantity: 1 },
        { id: 2, name: 'Mouse', price: 29, category: 'Electronics', quantity: 2 },
        { id: 3, name: 'Coffee', price: 12, category: 'Food', quantity: 3 },
        { id: 4, name: 'Notebook', price: 5, category: 'Office', quantity: 5 },
    ],
    discount: 10,
    taxRate: 8
};

export const cartReducer = createReducer(
    initialState,

    on(CartActions.addItem, (state, { item }) => ({
        ...state,
        items: [...state.items, item]
    })),

    on(CartActions.setDiscount, (state, { discount }) => ({
        ...state,
        discount
    })),

    on(CartActions.loadSampleData, (state) => initialState)
);
