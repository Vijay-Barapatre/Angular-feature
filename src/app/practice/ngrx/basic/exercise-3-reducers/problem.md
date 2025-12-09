# Exercise 3: Reducers

## 🎯 Objective

Create pure reducer functions using `createReducer` and `on` to handle state changes.

## 📋 Scenario

Implement a products reducer that manages loading state, product data, and errors. The reducer should respond to the actions created in Exercise 2.

## ✅ Requirements

- [ ] Define ProductsState interface with products, loading, error
- [ ] Create initial state
- [ ] Handle loadProducts - set loading true
- [ ] Handle loadProductsSuccess - store products, loading false
- [ ] Handle loadProductsFailure - store error, loading false
- [ ] Maintain immutability

## 🔄 Expected Behavior

| Current State | Action | New State |
|---------------|--------|-----------|
| `{ loading: false }` | loadProducts | `{ loading: true }` |
| `{ loading: true }` | loadProductsSuccess | `{ products: [...], loading: false }` |
| `{ loading: true }` | loadProductsFailure | `{ error: '...', loading: false }` |

## 💡 Hints

1. Always return new object references for state changes
2. Use spread operator for immutable updates
3. `on()` ties actions to state transitions
4. Reducers must be pure functions - no side effects

## 🏁 Starting Point

```typescript
// store/products/products.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './products.actions';

export interface ProductsState {
  // TODO: Define state shape
}

const initialState: ProductsState = {
  // TODO: Set initial values
};

export const productsReducer = createReducer(
  initialState,
  // TODO: Add on() handlers
);
```
