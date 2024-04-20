import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pins/list',
    pathMatch: 'full'
  },
  {
    path: 'pins',
    loadChildren: () => import('./shared/modules/create-pins/create-pins.module').then(m => m.CreatePinsModule)
  },
  {
    path: 'customers',
    loadChildren: () => import('./shared/modules/create-customers/create-customers.module').then(m => m.CreateCustomersModule)
  }
];
