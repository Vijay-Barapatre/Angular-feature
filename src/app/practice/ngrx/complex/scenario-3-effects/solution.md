# Scenario 3: Effects with API Integration - Solution

## ✅ Complete Implementation

### user.model.ts
```typescript
export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user' | 'guest';
}
```

### user.actions.ts
```typescript
import { createAction, props } from '@ngrx/store';
import { User } from './user.model';

// Load
export const loadUsers = createAction('[Users Page] Load');
export const loadUsersSuccess = createAction(
    '[Users API] Load Success',
    props<{ users: User[] }>()
);
export const loadUsersFailure = createAction(
    '[Users API] Load Failure',
    props<{ error: string }>()
);

// Refresh (user-initiated, with retry)
export const refreshUsers = createAction('[Users Page] Refresh');

// Single user
export const loadUser = createAction(
    '[User Detail] Load',
    props<{ id: string }>()
);
export const loadUserSuccess = createAction(
    '[User API] Load User Success',
    props<{ user: User }>()
);
export const loadUserFailure = createAction(
    '[User API] Load User Failure',
    props<{ error: string }>()
);
```

### user.effects.ts (COMPLETE SOLUTION)
```typescript
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from './user.service';
import { of, timer, EMPTY } from 'rxjs';
import { 
    map, catchError, switchMap, retry, tap, 
    exhaustMap, mergeMap, takeUntil 
} from 'rxjs/operators';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
    private actions$ = inject(Actions);
    private userService = inject(UserService);

    /**
     * ✅ Basic Load Effect
     * - Listens for loadUsers action
     * - Calls API service
     * - Dispatches success or failure
     */
    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loadUsers),
            switchMap(() =>
                this.userService.getUsers().pipe(
                    map(users => UserActions.loadUsersSuccess({ users })),
                    catchError(error => of(UserActions.loadUsersFailure({ 
                        error: this.mapError(error) 
                    })))
                )
            )
        )
    );

    /**
     * ✅ Load Effect with Retry (Exponential Backoff)
     * - Retries 3 times with increasing delays: 2s, 4s, 8s
     * - Only retries on server errors (5xx)
     */
    refreshUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.refreshUsers),
            switchMap(() =>
                this.userService.getUsers().pipe(
                    // Retry with exponential backoff
                    retry({
                        count: 3,
                        delay: (error, retryCount) => {
                            // Only retry on server errors
                            if (error.status && error.status < 500) {
                                throw error; // Don't retry client errors
                            }
                            const delayMs = Math.pow(2, retryCount) * 1000;
                            console.log(`Retry ${retryCount} in ${delayMs}ms`);
                            return timer(delayMs);
                        }
                    }),
                    map(users => UserActions.loadUsersSuccess({ users })),
                    catchError(error => of(UserActions.loadUsersFailure({ 
                        error: this.mapError(error) 
                    })))
                )
            )
        )
    );

    /**
     * ✅ Load Single User Effect
     * - Uses mergeMap to allow parallel requests
     * - Good for loading details while list is loading
     */
    loadUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loadUser),
            mergeMap(({ id }) =>
                this.userService.getUserById(id).pipe(
                    map(user => UserActions.loadUserSuccess({ user })),
                    catchError(error => of(UserActions.loadUserFailure({ 
                        error: this.mapError(error) 
                    })))
                )
            )
        )
    );

    /**
     * ✅ Non-Dispatching Effect (Logging/Analytics)
     * - dispatch: false means no action is dispatched
     * - Used for side effects like logging, analytics
     */
    logActions$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                UserActions.loadUsersSuccess,
                UserActions.loadUsersFailure
            ),
            tap(action => {
                if (action.type === UserActions.loadUsersSuccess.type) {
                    console.log('Users loaded:', action.users.length);
                    // Analytics: trackEvent('users_loaded', action.users.length)
                } else {
                    console.error('Failed to load users:', action.error);
                    // Analytics: trackError('users_load_failed', action.error)
                }
            })
        ),
        { dispatch: false }
    );

    /**
     * Helper: Map HTTP errors to user-friendly messages
     */
    private mapError(error: any): string {
        if (error.status === 0) {
            return 'Network error. Please check your connection.';
        }
        if (error.status === 401) {
            return 'Session expired. Please log in again.';
        }
        if (error.status === 403) {
            return 'You do not have permission to view this.';
        }
        if (error.status === 404) {
            return 'Resource not found.';
        }
        if (error.status >= 500) {
            return 'Server error. Please try again later.';
        }
        return error.message || 'An unexpected error occurred.';
    }
}
```

### user.reducer.ts
```typescript
import { createReducer, on } from '@ngrx/store';
import { User } from './user.model';
import * as UserActions from './user.actions';

export interface UserState {
    users: User[];
    selectedUser: User | null;
    loading: boolean;
    error: string | null;
}

export const initialState: UserState = {
    users: [],
    selectedUser: null,
    loading: false,
    error: null
};

export const userReducer = createReducer(
    initialState,
    
    // Load Users
    on(UserActions.loadUsers, UserActions.refreshUsers, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    
    on(UserActions.loadUsersSuccess, (state, { users }) => ({
        ...state,
        users,
        loading: false
    })),
    
    on(UserActions.loadUsersFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),
    
    // Load Single User
    on(UserActions.loadUser, (state) => ({
        ...state,
        loading: true
    })),
    
    on(UserActions.loadUserSuccess, (state, { user }) => ({
        ...state,
        selectedUser: user,
        loading: false
    })),
    
    on(UserActions.loadUserFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    }))
);
```

## 📊 Flattening Operators Reference

| Operator | Behavior | Use Case |
|----------|----------|----------|
| `switchMap` | Cancel previous | Search, Load |
| `mergeMap` | Run parallel | Independent fetches |
| `concatMap` | Queue in order | Save operations |
| `exhaustMap` | Ignore while busy | Submit button |

## 🧠 Key Insights

1. **Always catch errors INSIDE inner pipe**
   ```typescript
   // ✅ Correct
   switchMap(() => api.call().pipe(
       map(...),
       catchError(...)  // Inside inner pipe
   ))
   
   // ❌ Wrong - breaks effect stream
   switchMap(() => api.call().pipe(map(...))),
   catchError(...)  // Outside - stream dies on error
   ```

2. **Non-dispatching effects**
   ```typescript
   someEffect$ = createEffect(
       () => this.actions$.pipe(
           tap(...)  // Side effect only
       ),
       { dispatch: false }  // Required!
   );
   ```

3. **Error handling strategy**
   - Map technical errors to user-friendly messages
   - Log errors for debugging
   - Consider showing toast/snackbar for errors
