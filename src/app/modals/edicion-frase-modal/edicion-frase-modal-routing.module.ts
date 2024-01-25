import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EdicionFraseModalPage } from './edicion-frase-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EdicionFraseModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EdicionFraseModalPageRoutingModule {}
