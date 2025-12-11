# Scenario 2: Entity Adapter

## 🎯 Objective
Use @ngrx/entity to manage normalized entity collections with efficient CRUD operations.

## 📋 Problem Statement

You're building a product management dashboard. The product list can grow to thousands of items, and you need:
- Fast lookups by ID
- Efficient updates/deletes
- Sorting capabilities
- Pagination support

Implement the products feature using @ngrx/entity's EntityAdapter.

## ✅ Requirements

- [ ] Create EntityAdapter for products
- [ ] Define EntityState with additional properties (loading, error)
- [ ] Use adapter methods in reducer (addOne, updateOne, removeOne, etc.)
- [ ] Use adapter selectors (selectAll, selectEntities, selectIds)
- [ ] Implement sorting by product name

## 🔄 Expected Behavior

| Action | Adapter Method | Result |
|--------|----------------|--------|
| Load Products | setAll | Replace all entities |
| Add Product | addOne | Add to collection |
| Update Product | updateOne | Update specific entity |
| Delete Product | removeOne | Remove from collection |

## 🏁 Starting Point (Boilerplate)

### product.model.ts
```typescript
export interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    inStock: boolean;
}
```

### product.state.ts (COMPLETE THIS)
```typescript
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Product } from './product.model';

// TODO 1: Create adapter with sorting
export const productAdapter = createEntityAdapter<Product>({
    // Add selectId and sortComparer
});

// TODO 2: Extend EntityState
export interface ProductState extends EntityState<Product> {
    // Add loading and error properties
}

// TODO 3: Create initial state
export const initialState: ProductState = productAdapter.getInitialState({
    // Add initial values for custom properties
});
```

### product.reducer.ts (COMPLETE THIS)
```typescript
import { createReducer, on } from '@ngrx/store';
import { productAdapter, initialState } from './product.state';
import * as ProductActions from './product.actions';

export const productReducer = createReducer(
    initialState,
    
    // TODO 4: Handle loadProductsSuccess using setAll
    on(ProductActions.loadProductsSuccess, (state, { products }) => {
        // Use productAdapter.setAll(...)
    }),
    
    // TODO 5: Handle addProduct using addOne
    on(ProductActions.addProduct, (state, { product }) => {
        // Use productAdapter.addOne(...)
    }),
    
    // TODO 6: Handle updateProduct using updateOne
    on(ProductActions.updateProduct, (state, { id, changes }) => {
        // Use productAdapter.updateOne(...)
    }),
    
    // TODO 7: Handle deleteProduct using removeOne
    on(ProductActions.deleteProduct, (state, { id }) => {
        // Use productAdapter.removeOne(...)
    })
);
```

### product.selectors.ts (COMPLETE THIS)
```typescript
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState, productAdapter } from './product.state';

// TODO 8: Create feature selector
export const selectProductState = createFeatureSelector<ProductState>('products');

// TODO 9: Get adapter selectors
const { selectAll, selectEntities, selectIds, selectTotal } = productAdapter.getSelectors();

// TODO 10: Create composed selectors
export const selectAllProducts = createSelector(
    selectProductState,
    // Apply selectAll
);

export const selectProductEntities = createSelector(
    selectProductState,
    // Apply selectEntities
);

// TODO 11: Create parameterized selector for single product
export const selectProductById = (id: string) => createSelector(
    selectProductEntities,
    // Return entity by id
);
```

## 💡 Hints

1. `createEntityAdapter<Product>({ selectId: (p) => p.id, sortComparer: (a, b) => a.name.localeCompare(b.name) })`
2. Adapter methods return new state, use them in reducers
3. `productAdapter.getSelectors()` returns { selectAll, selectEntities, selectIds, selectTotal }

## 📚 Resources

- [@ngrx/entity Guide](https://ngrx.io/guide/entity)
- [EntityAdapter API](https://ngrx.io/api/entity/EntityAdapter)
