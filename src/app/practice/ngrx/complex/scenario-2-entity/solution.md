# Scenario 2: Entity Adapter - Solution

## ✅ Complete Implementation

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

### product.state.ts
```typescript
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Product } from './product.model';

/**
 * Create EntityAdapter with custom configuration
 * - selectId: Extract unique identifier from entity
 * - sortComparer: Sort entities alphabetically by name
 */
export const productAdapter = createEntityAdapter<Product>({
    selectId: (product) => product.id,
    sortComparer: (a, b) => a.name.localeCompare(b.name)
});

/**
 * Extend EntityState with custom properties
 * EntityState already includes: { ids: string[], entities: { [id: string]: Product } }
 */
export interface ProductState extends EntityState<Product> {
    loading: boolean;
    error: string | null;
    selectedProductId: string | null;
}

/**
 * Create initial state using adapter helper
 * getInitialState() returns { ids: [], entities: {} }
 * We extend with our custom properties
 */
export const initialState: ProductState = productAdapter.getInitialState({
    loading: false,
    error: null,
    selectedProductId: null
});
```

### product.actions.ts
```typescript
import { createAction, props } from '@ngrx/store';
import { Product } from './product.model';

// Load Products
export const loadProducts = createAction('[Products] Load');
export const loadProductsSuccess = createAction(
    '[Products] Load Success',
    props<{ products: Product[] }>()
);
export const loadProductsFailure = createAction(
    '[Products] Load Failure',
    props<{ error: string }>()
);

// CRUD
export const addProduct = createAction(
    '[Products] Add',
    props<{ product: Product }>()
);

export const updateProduct = createAction(
    '[Products] Update',
    props<{ id: string; changes: Partial<Product> }>()
);

export const deleteProduct = createAction(
    '[Products] Delete',
    props<{ id: string }>()
);

// Selection
export const selectProduct = createAction(
    '[Products] Select',
    props<{ id: string }>()
);
```

### product.reducer.ts
```typescript
import { createReducer, on } from '@ngrx/store';
import { productAdapter, initialState } from './product.state';
import * as ProductActions from './product.actions';

export const productReducer = createReducer(
    initialState,
    
    // Loading state
    on(ProductActions.loadProducts, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    
    // ✅ setAll - Replace entire collection
    on(ProductActions.loadProductsSuccess, (state, { products }) =>
        productAdapter.setAll(products, {
            ...state,
            loading: false
        })
    ),
    
    on(ProductActions.loadProductsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),
    
    // ✅ addOne - Add single entity
    on(ProductActions.addProduct, (state, { product }) =>
        productAdapter.addOne(product, state)
    ),
    
    // ✅ updateOne - Update single entity with partial changes
    on(ProductActions.updateProduct, (state, { id, changes }) =>
        productAdapter.updateOne({ id, changes }, state)
    ),
    
    // ✅ removeOne - Delete single entity
    on(ProductActions.deleteProduct, (state, { id }) =>
        productAdapter.removeOne(id, state)
    ),
    
    // Selection
    on(ProductActions.selectProduct, (state, { id }) => ({
        ...state,
        selectedProductId: id
    }))
);
```

### product.selectors.ts
```typescript
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState, productAdapter } from './product.state';

// ✅ Feature selector
export const selectProductState = createFeatureSelector<ProductState>('products');

// ✅ Get adapter's built-in selectors
const {
    selectIds,      // string[]
    selectEntities, // { [id: string]: Product }
    selectAll,      // Product[]
    selectTotal     // number
} = productAdapter.getSelectors();

// ✅ Compose with feature selector
export const selectAllProducts = createSelector(
    selectProductState,
    selectAll
);

export const selectProductEntities = createSelector(
    selectProductState,
    selectEntities
);

export const selectProductIds = createSelector(
    selectProductState,
    selectIds
);

export const selectProductCount = createSelector(
    selectProductState,
    selectTotal
);

// ✅ Custom selectors
export const selectLoading = createSelector(
    selectProductState,
    (state) => state.loading
);

export const selectError = createSelector(
    selectProductState,
    (state) => state.error
);

// ✅ Parameterized selector - get product by ID
export const selectProductById = (id: string) => createSelector(
    selectProductEntities,
    (entities) => entities[id]
);

// ✅ Selector for selected product
export const selectSelectedProductId = createSelector(
    selectProductState,
    (state) => state.selectedProductId
);

export const selectSelectedProduct = createSelector(
    selectProductEntities,
    selectSelectedProductId,
    (entities, selectedId) => selectedId ? entities[selectedId] : null
);

// ✅ Derived selectors
export const selectInStockProducts = createSelector(
    selectAllProducts,
    (products) => products.filter(p => p.inStock)
);

export const selectProductsByCategory = (category: string) => createSelector(
    selectAllProducts,
    (products) => products.filter(p => p.category === category)
);
```

## 📊 Entity Adapter Methods Reference

| Method | Purpose | Example |
|--------|---------|---------|
| `addOne` | Add one entity | `adapter.addOne(product, state)` |
| `addMany` | Add multiple entities | `adapter.addMany(products, state)` |
| `setAll` | Replace all entities | `adapter.setAll(products, state)` |
| `setOne` | Add or replace one | `adapter.setOne(product, state)` |
| `updateOne` | Update one entity | `adapter.updateOne({ id, changes }, state)` |
| `updateMany` | Update multiple | `adapter.updateMany(updates, state)` |
| `upsertOne` | Add or update | `adapter.upsertOne(product, state)` |
| `removeOne` | Remove one entity | `adapter.removeOne(id, state)` |
| `removeMany` | Remove multiple | `adapter.removeMany(ids, state)` |
| `removeAll` | Clear collection | `adapter.removeAll(state)` |

## 🧠 Key Insights

1. **Why Entity Adapter?**
   - O(1) lookups instead of O(n)
   - Built-in CRUD operations
   - Automatic sorting
   - Type-safe selectors

2. **State Structure**
   ```typescript
   {
     ids: ['1', '2', '3'],
     entities: {
       '1': { id: '1', name: 'Product A', ... },
       '2': { id: '2', name: 'Product B', ... },
       '3': { id: '3', name: 'Product C', ... }
     },
     loading: false,
     error: null
   }
   ```

3. **Best Practices**
   - Always extend EntityState for consistency
   - Use adapter methods, never mutate directly
   - Compose selectors for derived data
