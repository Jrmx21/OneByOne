import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { ToastController } from '@ionic/angular';
import { TabsPage } from '../tabs/tabs.page';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  showIntroUsuario: boolean = false;
  valorInput: string = '';
  fraseUsuario: string = '';
  autorUsuario: string = '';
  myApp: string = 'OneByOne';
tipoAutor: string="autor";
  mostrarValor() {
    console.log(this.fraseUsuario + ' guardado');
    console.log(this.autorUsuario + ' guardado');
  }

  mostrarIntroFraseUsuario() {
    if (this.showIntroUsuario == false) {
      this.showIntroUsuario = true;
    } else {
      this.showIntroUsuario = false;
    }
  }

  enviarFrase() {
    const data = {
      fraseUsuario: this.fraseUsuario,
      autorUsuario: this.autorUsuario,
    };

    this.dataService
      .fraseUsuario(this.fraseUsuario, this.autorUsuario)
      .subscribe((data) => {
        console.log(data);
      });
  }
  ngOnInit() {}
  constructor(
    private http: HttpClient,
    private router: Router,
    private dataService: DataService,
    private toastController: ToastController,
    public tabs: TabsPage
  ) {}
  frase: string = '';
  autor: string = '';

  async publicarFrase(): Promise<void> {
    if(this.tipoAutor=="anonimo"){
      this.autor='Anónimo';
    }
    if (this.frase && this.autor) {
      const nuevaFrase = {
        frase: this.frase,
        autor: this.autor,
      };

      this.dataService.publicarFraseEnFirebase(nuevaFrase);

      const toast = await this.toastController.create({
        message: 'Frase publicada exitosamente',
        duration: 2000,
        position: 'bottom',
        color: 'success',
      });
      toast.present();

      // Borrar los campos del formulario
      this.frase = '';
      this.autor = '';
    } else {
      const toast = await this.toastController.create({
        message: 'Por favor, completa todos los campos',
        duration: 2000,
        position: 'bottom',
        color: 'danger',
      });
      toast.present();
    }
  }
}
