import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideStore, provideState } from '@ngrx/store';
import { TodosEffects } from './features/todos/store/todos.effects';
import { TODOS_FEATURE_KEY, todosReducer } from './features/todos/store/todos.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    // NgRx
    provideStore(), // root
    provideState(TODOS_FEATURE_KEY, todosReducer),
    provideEffects([TodosEffects]),
    provideStoreDevtools({
      maxAge: 25,
      trace: false,
      connectInZone: true,
      autoPause: true,
    }),
  ]
};
