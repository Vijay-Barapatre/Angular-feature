# Scenario 3: Effects with API Integration

## 🎯 Objective
Handle async API calls using NgRx Effects with proper error handling and retry logic.

## 📋 Problem Statement

You're building a user management system that fetches users from an API. Implement:
- Load users effect with API call
- Retry logic for transient failures
- Loading state management
- Error handling with user-friendly messages

## ✅ Requirements

- [ ] Create effect that listens for loadUsers action
- [ ] Call UserService.getUsers() 
- [ ] Dispatch loadUsersSuccess on success
- [ ] Dispatch loadUsersFailure on error
- [ ] Implement retry with exponential backoff (3 attempts)
- [ ] Handle specific HTTP error codes differently

## 🔄 Expected Behavior

| Scenario | Dispatched Actions |
|----------|-------------------|
| API Success | loadUsers → loadUsersSuccess |
| API Error (retry works) | loadUsers → loadUsersSuccess |
| API Error (retry exhausted) | loadUsers → loadUsersFailure |
| Network Error | loadUsers → loadUsersFailure |

## 🏁 Starting Point (Boilerplate)

### user.actions.ts
```typescript
import { createAction, props } from '@ngrx/store';
import { User } from './user.model';

export const loadUsers = createAction('[Users] Load');
export const loadUsersSuccess = createAction(
    '[Users API] Load Success',
    props<{ users: User[] }>()
);
export const loadUsersFailure = createAction(
    '[Users API] Load Failure',
    props<{ error: string }>()
);

// Refresh action (user initiated)
export const refreshUsers = createAction('[Users Page] Refresh');
```

### user.effects.ts (COMPLETE THIS)
```typescript
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from './user.service';
import { of, timer } from 'rxjs';
import { map, catchError, switchMap, retry, mergeMap } from 'rxjs/operators';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
    private actions$ = inject(Actions);
    private userService = inject(UserService);

    // TODO 1: Basic load effect
    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loadUsers),
            // TODO: Use switchMap to call service
            // TODO: Map response to success action
            // TODO: Catch error and return failure action
        )
    );

    // TODO 2: Load effect with retry
    loadUsersWithRetry$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.refreshUsers),
            switchMap(() =>
                this.userService.getUsers().pipe(
                    // TODO: Add retry with exponential backoff
                    // Hint: retry({ count: 3, delay: (err, retryCount) => timer(Math.pow(2, retryCount) * 1000) })
                    map(users => UserActions.loadUsersSuccess({ users })),
                    catchError(error => {
                        // TODO: Map error to user-friendly message
                        return of(UserActions.loadUsersFailure({ error: error.message }));
                    })
                )
            )
        )
    );

    // TODO 3: Non-dispatching effect (for logging/analytics)
    logActions$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loadUsersSuccess, UserActions.loadUsersFailure),
            // TODO: Add tap to log action
            // Return EMPTY or use { dispatch: false }
        ),
        { dispatch: false }
    );
}
```

### user.service.ts
```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
    private http = inject(HttpClient);
    private apiUrl = '/api/users';

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl);
    }

    getUserById(id: string): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/${id}`);
    }
}
```

## 💡 Hints

1. Always use `catchError` INSIDE the inner Observable pipe
2. Return `of(failureAction)` from catchError, never throw
3. Use `switchMap` for load requests, `exhaustMap` for mutations
4. `{ dispatch: false }` for effects that don't dispatch actions

## 🎯 Bonus Challenges

1. **Cancel on Navigate**: Cancel pending request when user navigates away
2. **Polling**: Refresh data every 30 seconds while on page
3. **Optimistic Update**: Update UI before API confirms

## 📚 Resources

- [NgRx Effects Guide](https://ngrx.io/guide/effects)
- [RxJS Retry Operators](https://rxjs.dev/api/operators/retry)
