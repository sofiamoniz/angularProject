import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { UserService } from './user.service';
import { UserActions } from './user.actions';
import { User } from './user.module';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

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
}
