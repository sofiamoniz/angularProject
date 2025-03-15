import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from './user.module';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ data: User[] }>(),
    'Load Users Failure': props<{ error: string }>(),
    'Delete User': props<{ id: string }>(),
    'Delete User Success': props<{ id: string }>(),
    'Delete User Failure': props<{ error: string }>(),
  }
});
