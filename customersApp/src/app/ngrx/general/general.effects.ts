import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs/operators';
import { GeneralActions } from './general.actions';

@Injectable({
  providedIn: 'root',
})
export class GeneralEffects {
  constructor(private actions$: Actions, private snackBar: MatSnackBar) {}

  showNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GeneralActions.showNotification),
        tap(({ data }) => {
          this.snackBar.open(data.message, data.actionLabel ?? 'Close', {
            duration: data.duration ?? 3000,
            horizontalPosition: data.horizontalPosition ?? 'right',
            verticalPosition: data.verticalPosition ?? 'top',
            panelClass: data.panelClass ?? [''],
          });
        })
      ),
    { dispatch: false }
  );
}
