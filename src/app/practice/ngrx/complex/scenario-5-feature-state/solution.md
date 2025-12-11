# Scenario 5: Feature State - Solution

## ✅ Complete Implementation

### products.routes.ts
```typescript
import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { productsReducer } from './store/products.reducer';
import { ProductsEffects } from './store/products.effects';

export const PRODUCTS_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./products-list.component')
            .then(m => m.ProductsListComponent),
        providers: [
            // ✅ Register feature state when route is activated
            provideState({ name: 'products', reducer: productsReducer }),
            provideEffects(ProductsEffects)
        ],
        children: [
            {
                path: ':id',
                loadComponent: () => import('./product-detail.component')
                    .then(m => m.ProductDetailComponent)
                // Child routes inherit parent's state providers
            }
        ]
    }
];
```

### app.routes.ts (Main routing)
```typescript
import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { 
        path: 'home', 
        loadComponent: () => import('./home/home.component')
            .then(m => m.HomeComponent) 
    },
    { 
        // ✅ Lazy load products feature with its state
        path: 'products', 
        loadChildren: () => import('./products/products.routes')
            .then(m => m.PRODUCTS_ROUTES)
    },
    {
        // ✅ Another lazy-loaded feature
        path: 'orders',
        loadChildren: () => import('./orders/orders.routes')
            .then(m => m.ORDERS_ROUTES)
    }
];
```

### products.reducer.ts
```typescript
import { createReducer, on } from '@ngrx/store';
import { productsAdapter, initialState, ProductsState } from './products.state';
import * as ProductsActions from './products.actions';

export const productsReducer = createReducer(
    initialState,
    
    on(ProductsActions.loadProducts, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    
    on(ProductsActions.loadProductsSuccess, (state, { products }) =>
        productsAdapter.setAll(products, {
            ...state,
            loading: false
        })
    ),
    
    on(ProductsActions.loadProductsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),
    
    on(ProductsActions.selectProduct, (state, { id }) => ({
        ...state,
        selectedId: id
    })),
    
    // ✅ Optional: Clear state on navigate away
    on(ProductsActions.clearProducts, (state) =>
        productsAdapter.removeAll({
            ...state,
            loading: false,
            error: null,
            selectedId: null
        })
    )
);
```

### products.effects.ts
```typescript
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { ProductsService } from './products.service';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import * as ProductsActions from './products.actions';

@Injectable()
export class ProductsEffects implements OnInitEffects {
    private actions$ = inject(Actions);
    private productsService = inject(ProductsService);

    // ✅ Auto-load when effect is registered
    ngrxOnInitEffects(): Action {
        return ProductsActions.loadProducts();
    }

    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsActions.loadProducts),
            switchMap(() =>
                this.productsService.getProducts().pipe(
                    map(products => ProductsActions.loadProductsSuccess({ products })),
                    catchError(error => of(ProductsActions.loadProductsFailure({ 
                        error: error.message 
                    })))
                )
            )
        )
    );
}
```

### products-list.component.ts
```typescript
import { Component, inject, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { selectAllProducts, selectProductsLoading } from './store/products.selectors';
import * as ProductsActions from './store/products.actions';

@Component({
    selector: 'app-products-list',
    standalone: true,
    imports: [AsyncPipe, RouterLink],
    template: `
        <h1>Products</h1>
        
        @if (loading$ | async) {
            <div>Loading...</div>
        }
        
        @for (product of products$ | async; track product.id) {
            <div class="product-card">
                <a [routerLink]="[product.id]">{{ product.name }}</a>
                <span>{{ product.price | currency }}</span>
            </div>
        }
        
        <router-outlet></router-outlet>
    `
})
export class ProductsListComponent implements OnDestroy {
    private store = inject(Store);
    
    products$ = this.store.select(selectAllProducts);
    loading$ = this.store.select(selectProductsLoading);
    
    // ✅ Optional: Clear state when leaving feature
    ngOnDestroy() {
        // Uncomment if you want to clear state on navigate away
        // this.store.dispatch(ProductsActions.clearProducts());
    }
}
```

## 📊 Feature State vs Root State

| Aspect | Root State | Feature State |
|--------|-----------|---------------|
| Registration | `provideStore(reducers)` in app.config | `provideState()` in route |
| Loading | App startup | Route activation |
| Memory | Always in memory | Only when route active |
| Use Case | Auth, settings, global UI | Feature-specific data |

## 🧠 Key Insights

1. **State Isolation**: Feature states are scoped to their routes
2. **Inheritance**: Child routes inherit parent's state providers
3. **OnInitEffects**: Effects can auto-dispatch on registration
4. **Cleanup**: Consider clearing state when navigating away for memory

## 🔄 State Lifecycle

```
┌────────────────────────────────────────────────┐
│  App Start                                     │
│  └─> provideStore({}) - Root state ready       │
└────────────────────────────────────────────────┘
                      │
                      ▼ User navigates to /products
┌────────────────────────────────────────────────┐
│  Route Activation                              │
│  └─> provideState('products', reducer)         │
│  └─> provideEffects(ProductsEffects)           │
│  └─> ngrxOnInitEffects() dispatches loadProducts│
└────────────────────────────────────────────────┘
                      │
                      ▼ User navigates away
┌────────────────────────────────────────────────┐
│  Route Deactivation                            │
│  └─> State remains in store (unless cleared)   │
│  └─> Effects are no longer listening           │
└────────────────────────────────────────────────┘
```
