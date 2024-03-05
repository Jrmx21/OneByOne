import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
// import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/tabs/tabs.module').then((m) => m.TabsPageModule),
    
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminPageModule),
    // ...canActivate(()=>redirectUnauthorizedTo(['/login'])),
    //  canActivate:[NoAuthGuard]
  },
  {
    path: 'edicion-frase-modal',
    loadChildren: () =>
      import('./pages/modals/edicion-frase-modal/edicion-frase-modal.module').then(
        (m) => m.EdicionFraseModalPageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
