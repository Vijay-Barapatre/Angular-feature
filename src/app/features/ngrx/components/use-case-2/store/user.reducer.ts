import { createReducer, on } from '@ngrx/store';
import { loadUsers, loadUsersSuccess, loadUsersFailure, clearUsers } from './user.actions';
import { User } from '../user.service';

export interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
}

export const initialState: UserState = {
    users: [],
    loading: false,
    error: null
};

export const userReducer = createReducer(
    initialState,
    // 🛡️ CRITICAL: Reset error and set loading true
    on(loadUsers, state => ({
        ...state,
        loading: true,
        error: null
    })),
    // 🛡️ CRITICAL: Populate data and turn off loading
    on(loadUsersSuccess, (state, { users }) => ({
        ...state,
        users,
        loading: false,
        error: null
    })),
    // 🛡️ CRITICAL: Save error and turn off loading
    on(loadUsersFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),
    on(clearUsers, state => initialState)
);
