import { createAction, props } from '@ngrx/store';
import { User } from '../user.service';

// 🛡️ CRITICAL: Standard "Load / Success / Failure" Triad
export const loadUsers = createAction('[User Page] Load Users');

export const loadUsersSuccess = createAction(
    '[User API] Load Users Success',
    props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
    '[User API] Load Users Failure',
    props<{ error: string }>()
);

export const clearUsers = createAction('[User Page] Clear Users');
