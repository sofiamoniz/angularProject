import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { userReducer } from './ngrx/user/user.reducer';
import { provideEffects } from '@ngrx/effects';
import { UserEffects } from './ngrx/user/user.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { GeneralEffects } from './ngrx/general/general.effects';
import { GeneralReducer } from './ngrx/general/general.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideEffects([UserEffects, GeneralEffects]),
    provideStore({ users: userReducer, general: GeneralReducer }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
