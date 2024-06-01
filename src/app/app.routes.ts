import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'geolocation',
    loadComponent: () => import('./geolocation/geolocation.page').then( m => m.GeolocationPage)
  },  {
    path: 'distance',
    loadComponent: () => import('./distance/distance.page').then( m => m.DistancePage)
  }

];
