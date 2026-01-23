import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Product } from './product.model';
import * as ProductActions from './product.actions';

// Create Entity Adapter
export const productAdapter: EntityAdapter<Product> = createEntityAdapter<Product>({
    selectId: (product) => product.id,
    sortComparer: (a, b) => a.name.localeCompare(b.name) // Sort alphabetically by name
});

// Extend EntityState to add additional properties
export interface ProductState extends EntityState<Product> {
    loading: boolean;
    error: string | null;
}

// Initial state using adapter
export const initialState: ProductState = productAdapter.getInitialState({
    loading: false,
    error: null
});

// Reducer
export const productReducer = createReducer(
    initialState,

    // Load Products Success - uses setAll
    on(ProductActions.loadProductsSuccess, (state, { products }) =>
        productAdapter.setAll(products, { ...state, loading: false })
    ),

    // Add Product - uses addOne
    on(ProductActions.addProduct, (state, { product }) =>
        productAdapter.addOne(product, state)
    ),

    // Update Product - uses updateOne
    on(ProductActions.updateProduct, (state, { update }) =>
        productAdapter.updateOne(update, state)
    ),

    // Toggle Stock - uses updateOne
    on(ProductActions.toggleProductStock, (state, { id }) => {
        const product = state.entities[id];
        if (!product) return state;

        return productAdapter.updateOne(
            {
                id,
                changes: { inStock: !product.inStock }
            },
            state
        );
    }),

    // Toggle All Stock - uses map
    on(ProductActions.toggleAllStock, (state) =>
        productAdapter.map(product => ({ ...product, inStock: !product.inStock }), state)
    ),

    // Remove Product - uses removeOne
    on(ProductActions.removeProduct, (state, { id }) =>
        productAdapter.removeOne(id, state)
    ),

    // Remove All Products - uses removeAll
    on(ProductActions.removeAllProducts, (state) =>
        productAdapter.removeAll(state)
    )
);
