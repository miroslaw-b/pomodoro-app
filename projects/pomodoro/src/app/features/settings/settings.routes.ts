import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'session',
    loadComponent: () =>
      import('./pages/session-page/session-page.component').then(
        (m) => m.SessionPageComponent,
      ),
  },
  { path: '', pathMatch: 'full', redirectTo: 'session' },
];
