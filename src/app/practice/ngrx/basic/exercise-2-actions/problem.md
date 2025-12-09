# Exercise 2: Actions

## 🎯 Objective

Create type-safe NgRx actions using `createAction` and `props` for a products feature.

## 📋 Scenario

You need to define actions for loading products from an API. This includes initiating the load, handling success with product data, and handling failures with error messages.

## ✅ Requirements

- [ ] Create `loadProducts` action (no payload)
- [ ] Create `loadProductsSuccess` action with products array
- [ ] Create `loadProductsFailure` action with error message
- [ ] Add CRUD actions: add, update, delete
- [ ] Use proper action naming convention: `[Feature] Event`

## 🔄 Expected Behavior

| Action | When Dispatched | Payload |
|--------|-----------------|---------|
| loadProducts | User navigates to products | None |
| loadProductsSuccess | API returns data | `{ products: Product[] }` |
| loadProductsFailure | API fails | `{ error: string }` |
| addProduct | Form submitted | `{ product: Product }` |

## 💡 Hints

1. Action names follow pattern: `[Feature] Past Tense Event`
2. `props<T>()` defines the action payload type
3. Group related actions in a single file
4. Actions are pure functions - no side effects

## 📚 Resources

- [NgRx Actions](https://ngrx.io/guide/store/actions)
- [createAction API](https://ngrx.io/api/store/createAction)

## 🏁 Starting Point

```typescript
// store/products/products.actions.ts
import { createAction, props } from '@ngrx/store';

// TODO: Define Product interface
// TODO: Create load actions
// TODO: Create CRUD actions
```
