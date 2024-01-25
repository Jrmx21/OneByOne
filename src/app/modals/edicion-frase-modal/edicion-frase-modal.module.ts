import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EdicionFraseModalPageRoutingModule } from './edicion-frase-modal-routing.module';

import { EdicionFraseModalPage } from './edicion-frase-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EdicionFraseModalPageRoutingModule
  ],
  declarations: [EdicionFraseModalPage]
})
export class EdicionFraseModalPageModule {}
