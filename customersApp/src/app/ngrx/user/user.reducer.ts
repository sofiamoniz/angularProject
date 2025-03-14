import { createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { User } from './user.module';

export interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: []
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsersSuccess, (state, { data }) => ({
    ...state,
    users: data,
  }))
);

