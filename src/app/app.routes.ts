import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pins/list',
    pathMatch: 'full'
  },
  {
    path: 'pins',
    loadChildren: () => import('./modules/pins/pins.module').then(m => m.PinsModule)
  },
];
