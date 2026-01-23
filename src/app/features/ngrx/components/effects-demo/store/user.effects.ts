import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { UserService } from '../user.service';
import { loadUsers, loadUsersSuccess, loadUsersFailure } from './user.actions';

@Injectable()
export class UserEffects {
    private actions$ = inject(Actions);
    private userService = inject(UserService);

    // 🛡️ CRITICAL: Effect stream
    // 1. Listen for 'loadUsers' action
    // 2. Call Service
    // 3. Map result to 'Success' or 'Failure' action
    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadUsers),
            tap(() => console.log('Effects: Fetching users...')),
            mergeMap(() =>
                this.userService.getUsers().pipe(
                    map(users => loadUsersSuccess({ users })),
                    catchError(error => of(loadUsersFailure({ error: error.message })))
                )
            )
        )
    );
}
