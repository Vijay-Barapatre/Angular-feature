# Scenario 4: Shopping Cart

## 🎯 Objective
Implement a complete shopping cart feature using NgRx with derived selectors for totals.

## 📋 Problem Statement

You're building an e-commerce shopping cart. Implement:
- Add/remove items from cart
- Update item quantities
- Calculate subtotal, tax, and grand total using selectors
- Apply discount codes
- Persist cart to localStorage

This is a **COMMON INTERVIEW QUESTION** - master it!

## ✅ Requirements

- [ ] Define cart state with items array
- [ ] Create actions for add, remove, update quantity, clear
- [ ] Implement reducer with immutable updates
- [ ] Create composed selectors for derived values
- [ ] Add discount code support
- [ ] Sync to localStorage on changes

## 🔄 Expected Behavior

| Action | State Change | Derived Values Update |
|--------|--------------|----------------------|
| Add item | items += 1 | subtotal, tax, total |
| Remove item | items -= 1 | subtotal, tax, total |
| Update qty | item.qty = n | subtotal, tax, total |
| Apply discount | discount = % | discountAmount, total |

## 🏁 Starting Point (Boilerplate)

### cart.model.ts
```typescript
export interface CartItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl?: string;
}

export interface CartState {
    items: CartItem[];
    discountCode: string | null;
    discountPercent: number;
    taxRate: number;  // e.g., 0.08 for 8%
}
```

### cart.actions.ts (COMPLETE THIS)
```typescript
import { createAction, props } from '@ngrx/store';
import { CartItem } from './cart.model';

// TODO 1: Add to cart (if exists, increment quantity)
export const addToCart = createAction(
    '[Cart] Add Item',
    // What props do we need?
);

// TODO 2: Remove from cart
export const removeFromCart = createAction(
    '[Cart] Remove Item',
    // What props do we need?
);

// TODO 3: Update quantity
export const updateQuantity = createAction(
    '[Cart] Update Quantity',
    // What props do we need?
);

// TODO 4: Apply discount code
export const applyDiscount = createAction(
    '[Cart] Apply Discount',
    // What props do we need?
);

// TODO 5: Clear cart
export const clearCart = createAction('[Cart] Clear');

// TODO 6: Load cart from localStorage
export const loadCartFromStorage = createAction(
    '[Cart] Load From Storage',
    props<{ items: CartItem[] }>()
);
```

### cart.reducer.ts (COMPLETE THIS)
```typescript
import { createReducer, on } from '@ngrx/store';
import { CartState } from './cart.model';
import * as CartActions from './cart.actions';

export const initialState: CartState = {
    items: [],
    discountCode: null,
    discountPercent: 0,
    taxRate: 0.08  // 8% tax
};

export const cartReducer = createReducer(
    initialState,
    
    // TODO 7: Add to cart - check if item exists, update qty or add new
    on(CartActions.addToCart, (state, { productId, name, price, quantity }) => {
        const existingIndex = state.items.findIndex(i => i.productId === productId);
        
        if (existingIndex >= 0) {
            // Item exists - increment quantity
            // TODO: Return new state with updated quantity
        } else {
            // New item - add to array
            // TODO: Return new state with new item
        }
    }),
    
    // TODO 8: Remove from cart
    on(CartActions.removeFromCart, (state, { productId }) => {
        // TODO: Filter out the item
    }),
    
    // TODO 9: Update quantity
    on(CartActions.updateQuantity, (state, { productId, quantity }) => {
        // TODO: Map items, update matching item's quantity
        // If quantity is 0, remove item
    }),
    
    // TODO 10: Apply discount (validate code, set percent)
    on(CartActions.applyDiscount, (state, { code }) => {
        // Simple discount codes
        const discounts: Record<string, number> = {
            'SAVE10': 10,
            'SAVE20': 20,
            'HALF': 50
        };
        
        // TODO: Look up code, set discountPercent
    }),
    
    // TODO 11: Clear cart
    on(CartActions.clearCart, (state) => ({
        // TODO: Reset items and discount
    })),
    
    on(CartActions.loadCartFromStorage, (state, { items }) => ({
        ...state,
        items
    }))
);
```

### cart.selectors.ts (COMPLETE THIS)
```typescript
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.model';

export const selectCartState = createFeatureSelector<CartState>('cart');

// TODO 12: Select all items
export const selectCartItems = createSelector(
    selectCartState,
    // Return items array
);

// TODO 13: Select item count (total quantity of all items)
export const selectItemCount = createSelector(
    selectCartItems,
    // Sum all quantities
);

// TODO 14: Select subtotal (before discount and tax)
export const selectSubtotal = createSelector(
    selectCartItems,
    // Sum (price * quantity) for all items
);

// TODO 15: Select discount amount
export const selectDiscountAmount = createSelector(
    selectSubtotal,
    selectCartState,
    // Calculate: subtotal * (discountPercent / 100)
);

// TODO 16: Select after-discount amount
export const selectAfterDiscount = createSelector(
    selectSubtotal,
    selectDiscountAmount,
    // Subtract discount from subtotal
);

// TODO 17: Select tax amount
export const selectTaxAmount = createSelector(
    selectAfterDiscount,
    selectCartState,
    // Calculate: afterDiscount * taxRate
);

// TODO 18: Select grand total
export const selectGrandTotal = createSelector(
    selectAfterDiscount,
    selectTaxAmount,
    // Add tax to after-discount amount
);

// TODO 19: Select cart ViewModel (for component)
export const selectCartViewModel = createSelector(
    selectCartItems,
    selectItemCount,
    selectSubtotal,
    selectDiscountAmount,
    selectTaxAmount,
    selectGrandTotal,
    // Return object with all values
);
```

## 💡 Hints

1. Always spread arrays: `[...state.items]` not `state.items.push()`
2. Use `map()` to update single item in array immutably
3. Composed selectors recompute only when inputs change
4. Consider using Entity Adapter for larger item collections

## 🎯 Bonus Challenges

1. **Persist to localStorage**: Create effect that saves cart on every change
2. **Stock validation**: Check stock before adding to cart
3. **Wishlist**: Move items between cart and wishlist

## 📚 Resources

- [NgRx Selectors](https://ngrx.io/guide/store/selectors)
- [Immutable Updates](https://redux.js.org/usage/structuring-reducers/immutable-update-patterns)
