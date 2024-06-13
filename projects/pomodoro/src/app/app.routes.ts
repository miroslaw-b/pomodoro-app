import { Routes } from '@angular/router';
import { SettingsStateService } from './core/state/settings-state.service';

export const routes: Routes = [
  {
    path: '',
    providers: [SettingsStateService],
    children: [
      {
        path: 'timer',
        loadChildren: () =>
          import('./features/timer/timer.routes').then((m) => m.routes),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./features/settings/settings.routes').then((m) => m.routes),
      },
    ],
  },
  { path: '', pathMatch: 'full', redirectTo: 'timer' },
];
