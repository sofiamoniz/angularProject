import { createReducer, on } from '@ngrx/store';
import { SnackbarOptions } from './general.module';
import { GeneralActions } from './general.actions';

export interface GeneralState {
  notification?: SnackbarOptions;
}

const initialState: GeneralState = {};

export const GeneralReducer = createReducer(
  initialState,
  on(GeneralActions.showNotification, (state, { data }) => ({
    ...state,
    notification: data,
  }))
);
