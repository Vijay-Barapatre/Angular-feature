# Exercise 4: Selectors

## 🎯 Objective

Create memoized selectors using `createSelector` to efficiently query state.

## 📋 Scenario

Build selectors to query products state, including derived data like filtered products and statistics.

## ✅ Requirements

- [ ] Create feature selector for products state
- [ ] Create selector for all products
- [ ] Create selector for loading state
- [ ] Create selector for product by ID
- [ ] Create selector for total product count
- [ ] Create selector for products above a price

## 💡 Hints

1. `createFeatureSelector` gets a slice of state
2. `createSelector` composes selectors
3. Selectors are memoized - cached until inputs change
4. Use factory functions for parameterized selectors

## 🏁 Starting Point

```typescript
// store/products/products.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './products.reducer';

// TODO: Create feature selector
// TODO: Create derived selectors
```
