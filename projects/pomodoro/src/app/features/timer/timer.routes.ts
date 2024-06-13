import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/timer-page/timer-page.component').then(
        (m) => m.TimerPageComponent,
      ),
  },
];
