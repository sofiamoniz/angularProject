import { createActionGroup, props } from '@ngrx/store';
import { SnackbarOptions } from './general.module';

export const GeneralActions = createActionGroup({
  source: 'General',
  events: {
    'Show notification': props<{ data: SnackbarOptions }>(),
  }
});
