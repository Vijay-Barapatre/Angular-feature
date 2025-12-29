import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState, productAdapter } from './product.reducer';

// Feature selector
export const selectProductState = createFeatureSelector<ProductState>('products');

// Get selectors from adapter
const { selectIds, selectEntities, selectAll, selectTotal } = productAdapter.getSelectors();

// Adapter-provided selectors
export const selectProductIds = createSelector(selectProductState, selectIds);
export const selectProductEntities = createSelector(selectProductState, selectEntities);
export const selectAllProducts = createSelector(selectProductState, selectAll);
export const selectProductTotal = createSelector(selectProductState, selectTotal);

// Custom selectors
export const selectInStockProducts = createSelector(
    selectAllProducts,
    (products) => products.filter(p => p.inStock)
);

export const selectInStockCount = createSelector(
    selectInStockProducts,
    (products) => products.length
);

export const selectProductById = (id: number) => createSelector(
    selectProductEntities,
    (entities) => entities[id]
);

// Entity structure for display
export const selectEntityStructure = createSelector(
    selectProductState,
    (state) => ({
        ids: state.ids,
        entities: `{ ${(state.ids as number[]).join(', ')} }`
    })
);
