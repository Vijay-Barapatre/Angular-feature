# Scenario 1: Basic Effects

## 🎯 Objective
Handle async API operations using NgRx Effects.

## 📋 Problem Statement

You have a products list that needs to fetch data from an API. Implement:
- Effect that listens for loadProducts action
- Call ProductsService.getProducts()
- Dispatch success or failure actions

## ✅ Requirements

- [ ] Create ProductsEffects class with @Injectable()
- [ ] Inject Actions and ProductsService
- [ ] Create loadProducts$ effect
- [ ] Use switchMap to call API
- [ ] Map response to loadProductsSuccess
- [ ] Catch errors with catchError

## 🏁 Starting Point (Boilerplate)

### products.actions.ts
```typescript
import { createAction, props } from '@ngrx/store';
import { Product } from './product.model';

export const loadProducts = createAction('[Products Page] Load');

export const loadProductsSuccess = createAction(
    '[Products API] Load Success',
    props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
    '[Products API] Load Failure',
    props<{ error: string }>()
);
```

### products.effects.ts (COMPLETE THIS)
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

    // TODO: Create the loadProducts$ effect
    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            // TODO 1: Listen for loadProducts action using ofType()
            
            // TODO 2: Use switchMap to call productsService.getProducts()
            
            // TODO 3: Map response to loadProductsSuccess action
            
            // TODO 4: Catch errors and return loadProductsFailure action
        )
    );
}
```

### products.service.ts
```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.model';

@Injectable({ providedIn: 'root' })
export class ProductsService {
    private http = inject(HttpClient);
    
    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>('/api/products');
    }
}
```

## 💡 Hints

1. `ofType(action)` filters for specific action types
2. `switchMap` cancels previous requests when new action comes
3. `catchError` must return an Observable (use `of()`)
4. Always catch errors INSIDE the inner Observable pipe

## 🎯 Expected Result

When `store.dispatch(loadProducts())` is called:
1. Effect intercepts the action
2. API call is made
3. On success: `loadProductsSuccess({ products })` is dispatched
4. On error: `loadProductsFailure({ error })` is dispatched
