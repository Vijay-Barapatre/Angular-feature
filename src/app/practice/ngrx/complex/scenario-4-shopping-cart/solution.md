# Scenario 4: Shopping Cart - Solution

## ✅ Complete Implementation

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
    taxRate: number;
}
```

### cart.actions.ts
```typescript
import { createAction, props } from '@ngrx/store';
import { CartItem } from './cart.model';

export const addToCart = createAction(
    '[Cart] Add Item',
    props<{ productId: string; name: string; price: number; quantity: number }>()
);

export const removeFromCart = createAction(
    '[Cart] Remove Item',
    props<{ productId: string }>()
);

export const updateQuantity = createAction(
    '[Cart] Update Quantity',
    props<{ productId: string; quantity: number }>()
);

export const applyDiscount = createAction(
    '[Cart] Apply Discount',
    props<{ code: string }>()
);

export const removeDiscount = createAction('[Cart] Remove Discount');

export const clearCart = createAction('[Cart] Clear');

export const loadCartFromStorage = createAction(
    '[Cart] Load From Storage',
    props<{ items: CartItem[] }>()
);
```

### cart.reducer.ts (COMPLETE SOLUTION)
```typescript
import { createReducer, on } from '@ngrx/store';
import { CartState } from './cart.model';
import * as CartActions from './cart.actions';

export const initialState: CartState = {
    items: [],
    discountCode: null,
    discountPercent: 0,
    taxRate: 0.08
};

// ✅ Discount codes lookup
const DISCOUNT_CODES: Record<string, number> = {
    'SAVE10': 10,
    'SAVE20': 20,
    'HALF': 50,
    'NEWYEAR': 25
};

export const cartReducer = createReducer(
    initialState,
    
    // ✅ Add to cart - check if exists
    on(CartActions.addToCart, (state, { productId, name, price, quantity }) => {
        const existingIndex = state.items.findIndex(i => i.productId === productId);
        
        if (existingIndex >= 0) {
            // ✅ Item exists - update quantity immutably
            return {
                ...state,
                items: state.items.map((item, index) =>
                    index === existingIndex
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            };
        } else {
            // ✅ New item - add to array
            return {
                ...state,
                items: [...state.items, { productId, name, price, quantity }]
            };
        }
    }),
    
    // ✅ Remove from cart
    on(CartActions.removeFromCart, (state, { productId }) => ({
        ...state,
        items: state.items.filter(item => item.productId !== productId)
    })),
    
    // ✅ Update quantity (remove if 0)
    on(CartActions.updateQuantity, (state, { productId, quantity }) => {
        if (quantity <= 0) {
            // Remove item if quantity is 0 or less
            return {
                ...state,
                items: state.items.filter(item => item.productId !== productId)
            };
        }
        
        return {
            ...state,
            items: state.items.map(item =>
                item.productId === productId
                    ? { ...item, quantity }
                    : item
            )
        };
    }),
    
    // ✅ Apply discount code
    on(CartActions.applyDiscount, (state, { code }) => {
        const upperCode = code.toUpperCase();
        const discountPercent = DISCOUNT_CODES[upperCode] || 0;
        
        return {
            ...state,
            discountCode: discountPercent > 0 ? upperCode : null,
            discountPercent
        };
    }),
    
    // ✅ Remove discount
    on(CartActions.removeDiscount, (state) => ({
        ...state,
        discountCode: null,
        discountPercent: 0
    })),
    
    // ✅ Clear cart
    on(CartActions.clearCart, (state) => ({
        ...state,
        items: [],
        discountCode: null,
        discountPercent: 0
    })),
    
    // ✅ Load from storage
    on(CartActions.loadCartFromStorage, (state, { items }) => ({
        ...state,
        items
    }))
);
```

### cart.selectors.ts (COMPLETE SOLUTION)
```typescript
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.model';

export const selectCartState = createFeatureSelector<CartState>('cart');

// ✅ Basic selectors
export const selectCartItems = createSelector(
    selectCartState,
    (state) => state.items
);

export const selectDiscountCode = createSelector(
    selectCartState,
    (state) => state.discountCode
);

export const selectDiscountPercent = createSelector(
    selectCartState,
    (state) => state.discountPercent
);

export const selectTaxRate = createSelector(
    selectCartState,
    (state) => state.taxRate
);

// ✅ Derived selectors
export const selectItemCount = createSelector(
    selectCartItems,
    (items) => items.reduce((total, item) => total + item.quantity, 0)
);

export const selectUniqueItemCount = createSelector(
    selectCartItems,
    (items) => items.length
);

export const selectSubtotal = createSelector(
    selectCartItems,
    (items) => items.reduce((total, item) => total + (item.price * item.quantity), 0)
);

export const selectDiscountAmount = createSelector(
    selectSubtotal,
    selectDiscountPercent,
    (subtotal, discountPercent) => subtotal * (discountPercent / 100)
);

export const selectAfterDiscount = createSelector(
    selectSubtotal,
    selectDiscountAmount,
    (subtotal, discount) => subtotal - discount
);

export const selectTaxAmount = createSelector(
    selectAfterDiscount,
    selectTaxRate,
    (afterDiscount, taxRate) => afterDiscount * taxRate
);

export const selectGrandTotal = createSelector(
    selectAfterDiscount,
    selectTaxAmount,
    (afterDiscount, tax) => afterDiscount + tax
);

// ✅ ViewModel for component - single subscription
export const selectCartViewModel = createSelector(
    selectCartItems,
    selectItemCount,
    selectSubtotal,
    selectDiscountCode,
    selectDiscountAmount,
    selectTaxAmount,
    selectGrandTotal,
    (items, itemCount, subtotal, discountCode, discountAmount, taxAmount, grandTotal) => ({
        items,
        itemCount,
        subtotal,
        discountCode,
        discountAmount,
        taxAmount,
        grandTotal,
        isEmpty: items.length === 0
    })
);

// ✅ Parameterized selector - get item by ID
export const selectCartItemById = (productId: string) => createSelector(
    selectCartItems,
    (items) => items.find(item => item.productId === productId)
);

// ✅ Check if item is in cart
export const selectIsInCart = (productId: string) => createSelector(
    selectCartItems,
    (items) => items.some(item => item.productId === productId)
);
```

### cart.effects.ts (BONUS: LocalStorage sync)
```typescript
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap, withLatestFrom } from 'rxjs/operators';
import * as CartActions from './cart.actions';
import { selectCartItems } from './cart.selectors';

@Injectable()
export class CartEffects {
    private actions$ = inject(Actions);
    private store = inject(Store);

    // ✅ Save to localStorage on every cart change
    saveToStorage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                CartActions.addToCart,
                CartActions.removeFromCart,
                CartActions.updateQuantity,
                CartActions.clearCart
            ),
            withLatestFrom(this.store.select(selectCartItems)),
            tap(([_, items]) => {
                localStorage.setItem('cart', JSON.stringify(items));
            })
        ),
        { dispatch: false }
    );
}
```

### cart.component.ts (Usage Example)
```typescript
@Component({
    selector: 'app-cart',
    template: `
        @if (vm$ | async; as vm) {
            <div class="cart">
                <h2>Your Cart ({{ vm.itemCount }} items)</h2>
                
                @for (item of vm.items; track item.productId) {
                    <div class="cart-item">
                        <span>{{ item.name }}</span>
                        <input type="number" 
                               [value]="item.quantity"
                               (change)="updateQty(item.productId, $event)">
                        <span>{{ item.price * item.quantity | currency }}</span>
                        <button (click)="remove(item.productId)">Remove</button>
                    </div>
                }
                
                <div class="totals">
                    <div>Subtotal: {{ vm.subtotal | currency }}</div>
                    @if (vm.discountCode) {
                        <div>Discount ({{ vm.discountCode }}): -{{ vm.discountAmount | currency }}</div>
                    }
                    <div>Tax: {{ vm.taxAmount | currency }}</div>
                    <div class="grand-total">Total: {{ vm.grandTotal | currency }}</div>
                </div>
            </div>
        }
    `
})
export class CartComponent {
    private store = inject(Store);
    
    vm$ = this.store.select(selectCartViewModel);
    
    updateQty(productId: string, event: Event) {
        const quantity = +(event.target as HTMLInputElement).value;
        this.store.dispatch(CartActions.updateQuantity({ productId, quantity }));
    }
    
    remove(productId: string) {
        this.store.dispatch(CartActions.removeFromCart({ productId }));
    }
}
```

## 🧠 Key Insights

1. **Selector Composition Chain**
   ```
   selectCartItems
        ↓
   selectSubtotal = Σ(price × qty)
        ↓
   selectDiscountAmount = subtotal × discount%
        ↓
   selectAfterDiscount = subtotal - discount
        ↓
   selectTaxAmount = afterDiscount × taxRate
        ↓
   selectGrandTotal = afterDiscount + tax
   ```

2. **Memoization Benefits**
   - If items don't change, subtotal doesn't recompute
   - If subtotal doesn't change, downstream doesn't recompute
   - Only changed selectors recalculate

3. **ViewModel Pattern**
   - Single selector combines all UI needs
   - Single subscription in component
   - Better performance than multiple subscriptions
