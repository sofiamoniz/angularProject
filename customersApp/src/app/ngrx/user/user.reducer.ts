import { createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { User } from './user.module';

export interface UserState {
  users: User[];
  loading: boolean;
  error: {
    deleteUser: boolean;
  };
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: { deleteUser: false },
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsers, (state) => ({
    ...state,
    loading: true,
  })),
  on(UserActions.loadUsersSuccess, (state, { data }) => ({
    ...state,
    users: data,
    loading: false,
  })),
  on(UserActions.loadUsersFailure, (state) => ({
    ...state,
    loading: false,
  })),
  on(UserActions.deleteUserSuccess, (state, { id }) => ({
    ...state,
    users: state.users.filter(user => user.id !== id),
  })),
  on(UserActions.deleteUserFailure, (state) => ({
    ...state,
    error: { ...state.error, deleteUser: true },
  }))
);
