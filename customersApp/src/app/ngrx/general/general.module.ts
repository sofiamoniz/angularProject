import { MatSnackBarConfig } from '@angular/material/snack-bar';

export interface SnackbarOptions
  extends Pick<
    MatSnackBarConfig,
    'duration' | 'horizontalPosition' | 'verticalPosition' | 'panelClass'
  > {
  message: string;
  actionLabel?: string;
}
