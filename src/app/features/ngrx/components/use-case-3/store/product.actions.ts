import { createAction, props } from '@ngrx/store';
import { Product } from './product.model';
import { Update } from '@ngrx/entity';

// Load Products
export const loadProducts = createAction('[Product] Load Products');
export const loadProductsSuccess = createAction(
    '[Product] Load Products Success',
    props<{ products: Product[] }>()
);

// Add Product
export const addProduct = createAction(
    '[Product] Add Product',
    props<{ product: Product }>()
);

// Update Product
export const updateProduct = createAction(
    '[Product] Update Product',
    props<{ update: Update<Product> }>()
);

// Toggle Stock
export const toggleProductStock = createAction(
    '[Product] Toggle Stock',
    props<{ id: number }>()
);

// Toggle All Stock
export const toggleAllStock = createAction('[Product] Toggle All Stock');

// Remove Product
export const removeProduct = createAction(
    '[Product] Remove Product',
    props<{ id: number }>()
);

// Remove All Products
export const removeAllProducts = createAction('[Product] Remove All Products');
