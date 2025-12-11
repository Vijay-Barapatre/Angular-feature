# Scenario 1: Basic Effects - Solution

## ✅ Complete Implementation

### products.effects.ts (SOLUTION)
```typescript
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductsService } from './products.service';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import * as ProductActions from './products.actions';

@Injectable()
export class ProductsEffects {
    private actions$ = inject(Actions);
    private productsService = inject(ProductsService);

    /**
     * ✅ Load Products Effect
     * 
     * Flow:
     * 1. Listen for loadProducts action
     * 2. Call API via service
     * 3. Dispatch success or failure
     */
    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            // ✅ Filter for loadProducts action only
            ofType(ProductActions.loadProducts),
            
            // ✅ switchMap cancels previous request if new one comes
            switchMap(() =>
                this.productsService.getProducts().pipe(
                    // ✅ On success, dispatch success action with products
                    map(products => ProductActions.loadProductsSuccess({ products })),
                    
                    // ✅ On error, catch and dispatch failure action
                    // IMPORTANT: catchError MUST be inside the inner pipe!
                    catchError(error => of(ProductActions.loadProductsFailure({ 
                        error: error.message 
                    })))
                )
            )
        )
    );
}
```

### Registration in app.config.ts
```typescript
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { ProductsEffects } from './store/products/products.effects';

export const appConfig: ApplicationConfig = {
    providers: [
        provideStore({}),
        provideEffects([ProductsEffects]),  // ✅ Register effects here
        provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
    ]
};
```

### products.reducer.ts
```typescript
import { createReducer, on } from '@ngrx/store';
import { Product } from './product.model';
import * as ProductActions from './products.actions';

export interface ProductsState {
    products: Product[];
    loading: boolean;
    error: string | null;
}

export const initialState: ProductsState = {
    products: [],
    loading: false,
    error: null
};

export const productsReducer = createReducer(
    initialState,
    
    // Set loading when action dispatched
    on(ProductActions.loadProducts, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    
    // Store products on success
    on(ProductActions.loadProductsSuccess, (state, { products }) => ({
        ...state,
        products,
        loading: false
    })),
    
    // Store error on failure
    on(ProductActions.loadProductsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    }))
);
```

## 🧠 Key Insights

1. **Why switchMap?**
   - Cancels previous request when new one starts
   - Prevents race conditions
   - Good for "load" operations

2. **Why catchError inside?**
   ```typescript
   // ❌ WRONG - Effect stream dies on error
   switchMap(() => api.call()),
   catchError(...)  // Outside inner pipe
   
   // ✅ CORRECT - Effect keeps working
   switchMap(() => api.call().pipe(
       catchError(...)  // Inside inner pipe
   ))
   ```

3. **Action Flow**
   ```
   Component dispatches loadProducts
           ↓
   Effect catches action (ofType)
           ↓
   API call made (switchMap)
           ↓
   Success? → dispatch loadProductsSuccess
   Error?   → dispatch loadProductsFailure
           ↓
   Reducer updates state
           ↓
   Component receives via selector
   ```
