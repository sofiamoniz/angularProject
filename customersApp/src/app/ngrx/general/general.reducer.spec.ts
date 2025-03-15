import { GeneralReducer, GeneralState } from './general.reducer';
import { GeneralActions } from './general.actions';
import { SnackbarOptions } from './general.module';

describe('GeneralReducer', () => {
  const initialState: GeneralState = {};

  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const unknownAction = { type: 'UNKNOWN_ACTION' } as any;
      const newState = GeneralReducer(initialState, unknownAction);
      expect(newState).toEqual(initialState);
    });
  });

  describe('an inicial state', () => {
    it('should be returned', () => {
      const notificationData: SnackbarOptions = {
        message: 'User deleted with success',
        actionLabel: 'Close',
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['success-snackbar'],
      };

      const newState = GeneralReducer(
        initialState,
        GeneralActions.showNotification({ data: notificationData })
      );

      expect(newState.notification).toEqual(notificationData);
    });
  });
});
