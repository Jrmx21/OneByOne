import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPageRoutingModule } from './admin-routing.module';

import { AdminPage } from './admin.page';
import { BuscarImagenPipe } from '../pipes/buscar-imagen.pipe';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPageRoutingModule,
    
  ],
  declarations: [AdminPage,BuscarImagenPipe]
})
export class AdminPageModule {}
