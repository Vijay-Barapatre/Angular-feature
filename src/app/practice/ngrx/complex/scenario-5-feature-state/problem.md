# Scenario 5: Feature State (Lazy Loading)

## 🎯 Objective
Implement lazy-loaded feature state that registers when the route is activated.

## 📋 Problem Statement

Your application has multiple feature modules (Products, Orders, Users). Each feature should:
- Load its NgRx state only when the route is accessed
- Use provideState in route config
- Clean up state when navigating away (optional)

## ✅ Requirements

- [ ] Create feature state for Products module
- [ ] Register state using route providers
- [ ] Use provideState and provideEffects
- [ ] Access state from lazy-loaded components

## 🏁 Starting Point (Boilerplate)

### products.routes.ts (COMPLETE THIS)
```typescript
import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

export const PRODUCTS_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./products.component')
            .then(m => m.ProductsComponent),
        providers: [
            // TODO 1: Register feature state
            // provideState({ name: 'products', reducer: productsReducer })
            
            // TODO 2: Register feature effects
            // provideEffects(ProductsEffects)
        ]
    },
    {
        path: ':id',
        loadComponent: () => import('./product-detail.component')
            .then(m => m.ProductDetailComponent)
        // Note: State is inherited from parent route
    }
];
```

### products.state.ts
```typescript
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Product } from './product.model';

export interface ProductsState extends EntityState<Product> {
    loading: boolean;
    error: string | null;
    selectedId: string | null;
}

export const productsAdapter = createEntityAdapter<Product>();

export const initialState: ProductsState = productsAdapter.getInitialState({
    loading: false,
    error: null,
    selectedId: null
});

// ✅ Feature selector - matches the 'name' in provideState
export const selectProductsState = createFeatureSelector<ProductsState>('products');

// Adapter selectors
const { selectAll, selectEntities, selectTotal } = productsAdapter.getSelectors();

export const selectAllProducts = createSelector(selectProductsState, selectAll);
export const selectProductEntities = createSelector(selectProductsState, selectEntities);
export const selectProductsLoading = createSelector(selectProductsState, s => s.loading);
```

## 💡 Key Concepts

### Route-Level Providers
```typescript
{
    path: 'products',
    loadComponent: () => import('./products.component'),
    providers: [
        provideState({ name: 'products', reducer: productsReducer }),
        provideEffects(ProductsEffects)
    ]
}
```

### Feature State Registration Flow
```
1. User navigates to /products
2. Angular lazy-loads the route
3. provideState registers 'products' slice in store
4. provideEffects registers ProductsEffects
5. Component can now select from state
```

### Cleanup on Navigate Away
```typescript
// Optional: Clear state when leaving feature
export const clearProductsState = createAction('[Products] Clear State');

// In component
ngOnDestroy() {
    this.store.dispatch(clearProductsState());
}
```

## 📚 Resources

- [NgRx Feature States](https://ngrx.io/guide/store/feature-creators)
- [Lazy Loading Modules](https://angular.io/guide/lazy-loading-ngmodules)
