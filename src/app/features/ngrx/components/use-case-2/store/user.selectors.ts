import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>('usersViaEffects');

export const selectAllUsers = createSelector(
    selectUserState,
    (state) => state.users
);

export const selectUserLoading = createSelector(
    selectUserState,
    (state) => state.loading
);

export const selectUserError = createSelector(
    selectUserState,
    (state) => state.error
);

// Example of derived state: Count of users
export const selectUserCount = createSelector(
    selectAllUsers,
    (users) => users.length
);
