import { createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { User } from './user.module';

export interface UserState {
  users: User[];
  loading: boolean;
  error: {
    deleteUser?: boolean;
    getUsers?: boolean;
  };
}

export const initialState: UserState = {
  users: [],
  loading: false,
  error: { deleteUser: false, getUsers: false },
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsers, (state) => ({
    ...state,
    loading: true,
    error: { ...state.error, getUsers: undefined },
  })),
  on(UserActions.loadUsersSuccess, (state, { data }) => ({
    ...state,
    users: data,
    loading: false,
    error: { ...state.error, getUsers: false },
  })),
  on(UserActions.loadUsersFailure, (state) => ({
    ...state,
    loading: false,
    error: { ...state.error, getUser: true },
  })),
  on(UserActions.deleteUser, (state) => ({
    ...state,
    loading: true,
    error: { ...state.error, deleteUser: undefined },
  })),
  on(UserActions.deleteUserSuccess, (state, { id }) => ({
    ...state,
    users: state.users.filter(user => user.id !== id),
    error: { ...state.error, deleteUser: false },
  })),
  on(UserActions.deleteUserFailure, (state) => ({
    ...state,
    error: { ...state.error, deleteUser: true },
  }))
);
