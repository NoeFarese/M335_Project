import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'geolocation',
    loadComponent: () => import('./geolocation/geolocation.page').then( m => m.GeolocationPage)
  },
  {
    path: 'distance',
    loadComponent: () => import('./distance/distance.page').then( m => m.DistancePage)
  },
  {
    path: 'qr-code',
    loadComponent: () => import('./qr-code/qr-code.page').then( m => m.QRCodePage)
  },
  {
    path: 'device-status',
    loadComponent: () => import('./device-status/device-status.page').then( m => m.DeviceStatusPage)
  },
  {
    path: 'finish',
    loadComponent: () => import('./finish/finish.page').then( m => m.FinishPage)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }
];
