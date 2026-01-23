import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.model';

// Feature selector
export const selectCartState = createFeatureSelector<CartState>('cart');

// Base selectors
export const selectCartItems = createSelector(
    selectCartState,
    (state) => state.items
);

export const selectDiscount = createSelector(
    selectCartState,
    (state) => state.discount
);

export const selectTaxRate = createSelector(
    selectCartState,
    (state) => state.taxRate
);

// Composed selector - Subtotal
let subtotalComputeCount = 0;
export const selectSubtotal = createSelector(
    selectCartItems,
    (items) => {
        subtotalComputeCount++;
        console.log(`🔍 Selector computed! Count: ${subtotalComputeCount}`);
        return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
);

// Selector using another selector - Discount Amount
export const selectDiscountAmount = createSelector(
    selectSubtotal,
    selectDiscount,
    (subtotal, discount) => subtotal * (discount / 100)
);

// Selector composition chain - After Discount
export const selectAfterDiscount = createSelector(
    selectSubtotal,
    selectDiscountAmount,
    (subtotal, discountAmount) => subtotal - discountAmount
);

// Further composition - Tax
export const selectTax = createSelector(
    selectAfterDiscount,
    selectTaxRate,
    (afterDiscount, taxRate) => afterDiscount * (taxRate / 100)
);

// Final composed selector - Grand Total
export const selectGrandTotal = createSelector(
    selectAfterDiscount,
    selectTax,
    (afterDiscount, tax) => afterDiscount + tax
);

// Parameterized selector - Items by category
export const selectItemsByCategory = (category: string) => createSelector(
    selectCartItems,
    (items) => {
        if (category === 'All') return items;
        return items.filter(item => item.category === category);
    }
);

// Parameterized selector - Category total
export const selectCategoryTotal = (category: string) => createSelector(
    selectItemsByCategory(category),
    (items) => items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
);

// Expose compute count for memoization demo
export const getSubtotalComputeCount = () => subtotalComputeCount;
