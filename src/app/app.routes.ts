import { Routes } from '@angular/router';
import { TabsComponent } from './tabs/tabs.component';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsComponent,
    children:[
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'gallery',
        loadComponent: () => import('./gallery/gallery.page').then((m) => m.GalleryPage),
      },
      {
        path: 'setting',
        loadComponent: () => import('./setting/setting.page').then( m => m.SettingPage)
      },
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full',
  },

];
