# Scenario 1: Effects

## 🎯 Objective

Handle side effects using NgRx Effects for async operations.

## 📋 Scenario

Implement an effect that calls an API when loadProducts is dispatched, then dispatches success or failure actions.

## ✅ Requirements

- [ ] Create ProductsEffects class
- [ ] Listen for loadProducts action
- [ ] Call ProductsService.getAll()
- [ ] Map success response to loadProductsSuccess
- [ ] Catch errors and dispatch loadProductsFailure

## 💻 Solution

```typescript
// store/products/products.effects.ts
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, of } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import * as ProductActions from './products.actions';

@Injectable()
export class ProductsEffects {
  private actions$ = inject(Actions);
  private productsService = inject(ProductsService);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      switchMap(() =>
        this.productsService.getAll().pipe(
          map(products => ProductActions.loadProductsSuccess({ products })),
          catchError(error => of(ProductActions.loadProductsFailure({ 
            error: error.message 
          })))
        )
      )
    )
  );
}
```

### Register Effects

```typescript
// app.config.ts
provideEffects([ProductsEffects])
```
