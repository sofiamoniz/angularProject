import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { UserService } from './user.service';
import { UserActions } from './user.actions';
import { User } from './user.module';
import { Store } from '@ngrx/store';
import { GeneralActions } from '../general/general.actions';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store
  )
  {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map((users: User[]) => UserActions.loadUsersSuccess({ data: users })),
          catchError((error) =>
            of(UserActions.loadUsersFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      mergeMap(({ id }) =>
        this.userService.deleteUser(id).pipe(
          map(() => {
            this.store.dispatch(UserActions.loadUsers()); // Reload info

             /* dispatch success message */
            this.store.dispatch(
              GeneralActions.showNotification({
                data: {
                  message: 'User deleted with success',
                  actionLabel: 'Close',
                  duration: 3000,
                  horizontalPosition: 'right',
                  verticalPosition: 'top',
                  panelClass: ['success-snackbar'],
                },
              })
            );

            return UserActions.deleteUserSuccess({ id });
          }),
          catchError((error) => {
             /* dispatch error message */
            this.store.dispatch(
              GeneralActions.showNotification({
                data: {
                  message: 'Error deleting user',
                  actionLabel: 'Close',
                  duration: 3000,
                  horizontalPosition: 'right',
                  verticalPosition: 'top',
                  panelClass: ['error-snackbar'],
                },
              })
            );
            return of(UserActions.deleteUserFailure({ error: error.message }));
          })
        )
      )
    )
  );
}
