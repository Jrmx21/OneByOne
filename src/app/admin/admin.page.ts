import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ModalController, NavController } from '@ionic/angular';
import { EdicionFraseModalPage } from '../modals/edicion-frase-modal/edicion-frase-modal.page';
import { AuthService } from '../services/auth.service';
import { LowerCasePipe } from '@angular/common';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  frases: any[] = [];
  nuevaFrase: any = {};
  frasesUsuario: any[] = [];
  campoBusqueda: 'frases' | 'frases_usuario' | 'frases_del_dia' = 'frases';
  textoBusqueda: string = '';
  fechaBusqueda: string = '';
  frasesDelDia: any[] = [];

  constructor(
    private dataService: DataService,
    private navCtrl: NavController,
    private modalController: ModalController,
    private auth: AuthService
  ) {}
  tipoBusqueda: 'id' | 'fecha' | 'autor' | 'frase' = 'id';
  private filtrarPorFecha(lista: any[]): any[] {
    // Implementa la lógica de filtrado por fecha aquí
    // Puedes usar this.fechaBusqueda para obtener la fecha seleccionada
    return lista;
  }

  private filtrarPorCampo(lista: any[], filtro: string): any[] {
    return lista.filter(
      (frase) =>
        frase.frase.toLowerCase().includes(filtro) ||
        frase.autor.toLowerCase().includes(filtro)
    );
  }
  realizarBusqueda() {
    if (this.tipoBusqueda === 'fecha') {
      this.frases = this.filtrarPorFecha(this.frases);
      this.frasesUsuario = this.filtrarPorFecha(this.frasesUsuario);
    } else {
      const filtro = this.textoBusqueda.toLowerCase();
      this.frases = this.filtrarPorCampo(this.frases, filtro);
      this.frasesUsuario = this.filtrarPorCampo(this.frasesUsuario, filtro);
    }
  }
  ngOnInit() {
    this.obtenerFrases();
    this.obtenerFrasesUsuario();
    this.obtenerFrasesDelDia();
  }
  obtenerFrasesDelDia() {
    this.dataService.obtenerFrasesDelDia().subscribe((data) => {
      this.frasesDelDia = Object.values(data) || [];
    });
  }
  
  moverAFrasesDelDia(index: number) {
    if (index >= 0 && index < this.frases.length) {
      const fraseMovida = this.frases.splice(index, 1)[0];
      this.frasesDelDia.push({ ...fraseMovida, fecha: new Date().toISOString() }); // Agrega la fecha actual
      this.guardarFrasesYUsuarioYDelDia();
    }
  }
  // admin.page.ts

moverAFrasesDesdeDelDia(index: number) {
  if (index >= 0 && index < this.frasesDelDia.length) {
    const fraseMovida = this.frasesDelDia.splice(index, 1)[0];
    this.frases.push({ ...fraseMovida, fecha: new Date().toISOString() }); // Agrega la fecha actual
    this.guardarFrasesYUsuarioYDelDia();
  }
}
// admin.page.ts
 // Nueva propiedad para almacenar el texto de búsqueda
 searchText: string = '';

 filtrarFrases(lista: any[]): any[] {
  const lowerCasePipe = new LowerCasePipe();
  const filtro = lowerCasePipe.transform(this.searchText);

  // Filtrar frases según el texto de búsqueda
  return lista.filter(
    (frase) =>
      lowerCasePipe.transform(frase.frase).includes(filtro) ||
      lowerCasePipe.transform(frase.autor).includes(filtro)
  );
}

  moverAFrasesUsuarioDesdeDelDia(index: number) {
    if (index >= 0 && index < this.frasesDelDia.length) {
      const fraseMovida = this.frasesDelDia.splice(index, 1)[0];
      this.frasesUsuario.push(fraseMovida);
      this.guardarFrasesYUsuarioYDelDia();
    }
  }
  
  private guardarFrasesYUsuarioYDelDia() {
    this.dataService.guardarDatos(this.frases).subscribe(() => {
      this.dataService.guardarFrasesUsuario(this.frasesUsuario).subscribe(() => {
        this.dataService.guardarFrasesDelDia(this.frasesDelDia).subscribe(() => {
          // Puedes realizar acciones adicionales después de guardar los datos si es necesario
        });
      });
    });
  }
  
  obtenerFrases() {
    this.dataService.obtenerFrasesFirebase().subscribe((data) => {
      this.frases = Object.values(data) || [];
    });
  }

  crearFrase() {
    if (this.nuevaFrase && this.nuevaFrase.frase && this.nuevaFrase.autor) {
      this.frases.push({
        frase: this.nuevaFrase.frase,
        autor: this.nuevaFrase.autor,
      });
      this.guardarFrases();
      this.nuevaFrase = {};
    }
  }

  actualizarFrase(index: number, fraseActualizada: any) {
    if (index >= 0 && index < this.frases.length) {
      this.frases[index] = { ...this.frases[index], ...fraseActualizada };
      this.guardarFrases();
    }
  }

  abrirFormularioEdicion(index: number) {
    console.log('Index: ', index);
    const fraseSeleccionada = this.frases[index];

    if (fraseSeleccionada) {
      this.modalController
        .create({
          component: EdicionFraseModalPage,
          componentProps: { frase: fraseSeleccionada },
        })
        .then((modal) => {
          modal.present();
          modal.onDidDismiss().then((result) => {
            if (result && result.data) {
              this.actualizarFrase(index, result.data);
            }
          });
        });
    }
  }

  eliminarFrase(index: number) {
    if (index >= 0 && index < this.frases.length) {
      this.frases.splice(index, 1);
      this.guardarFrases();
    }
  }

  private guardarFrases() {
    this.dataService.guardarDatos(this.frases).subscribe(() => {
      // Puedes realizar acciones adicionales después de guardar los datos si es necesario
    });
  }
  eliminarFraseUsuario(index: number) {
    if (index >= 0 && index < this.frasesUsuario.length) {
      this.frasesUsuario.splice(index, 1);
      this.guardarFrasesYUsuario();
    }
  }
  obtenerFrasesUsuario() {
    this.dataService.obtenerFrasesUsuario().subscribe((data) => {
      this.frasesUsuario = Object.values(data) || [];
    });
  }

  moverAFrases(index: number) {
    if (index >= 0 && index < this.frasesUsuario.length) {
      const fraseMovida = this.frasesUsuario.splice(index, 1)[0];
      this.frases.push(fraseMovida);
      this.guardarFrasesYUsuario();
    }
  }

  moverAFrasesUsuario(index: number) {
    if (index >= 0 && index < this.frases.length) {
      const fraseMovida = this.frases.splice(index, 1)[0];
      this.frasesUsuario.push(fraseMovida);
      this.guardarFrasesYUsuario();
    }
  }

  private guardarFrasesYUsuario() {
    // Guardar en Firebase ambas listas
    this.dataService.guardarDatos(this.frases).subscribe(() => {
      this.dataService
        .guardarFrasesUsuario(this.frasesUsuario)
        .subscribe(() => {
          // Puedes realizar acciones adicionales después de guardar los datos si es necesario
        });
    });
  }
}
