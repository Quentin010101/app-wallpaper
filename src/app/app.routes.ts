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
        loadComponent: () => import('./gallery/gallery-router/gallery-router.page').then((m) => m.GalleryRouterPage),
        children: [
          {
            path: '',
            loadComponent: () => import('./gallery/gallery/gallery.page').then((m) => m.GalleryPage),
          },
          {
            path: 'folder',
            loadComponent: () => import('./gallery/folder-detail/folder-detail.page').then((m) => m.FolderDetailPage),
          },
        ]
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
  {
    path: 'folder-detail',
    loadComponent: () => import('./gallery/folder-detail/folder-detail.page').then( m => m.FolderDetailPage)
  },
  {
    path: 'gallery-router',
    loadComponent: () => import('./gallery/gallery-router/gallery-router.page').then( m => m.GalleryRouterPage)
  },

];
