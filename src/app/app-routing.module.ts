import { Component, NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';
import { loginGuard } from './guards/login.guard';
// import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
    
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
      import('./modals/edicion-frase-modal/edicion-frase-modal.module').then(
        (m) => m.EdicionFraseModalPageModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
