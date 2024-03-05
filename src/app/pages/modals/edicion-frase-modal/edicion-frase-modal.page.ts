import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edicion-frase-modal',
  templateUrl: './edicion-frase-modal.page.html',
})
export class EdicionFraseModalPage {
  @Input() frase: any;

  constructor(private modalController: ModalController) {}

  guardarEdicion() {
    this.modalController.dismiss(this.frase);
  }
}
