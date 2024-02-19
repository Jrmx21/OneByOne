import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import {
  MenuController,
  ModalController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { EdicionFraseModalPage } from '../modals/edicion-frase-modal/edicion-frase-modal.page';
import { AuthService } from '../services/auth.service';
import { LowerCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { BuscarImagenPipe } from '../pipes/buscar-imagen.pipe';
import { CookieService } from 'ngx-cookie-service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

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
  isModalOpen = false;
  listaImagenes: any[] = [];
  searchTextImage: any;
  selectedImage: any;
  muestraMenuFrase: 'imagen' | 'frase' = 'frase';
  tipoBusqueda: 'id' | 'fecha' | 'autor' | 'frase' = 'id';
  fotoUrl: string = '';
  mostrarFoto: boolean = true;
  autorFoto: string = '';
  tipoAutorFoto: any;
  constructor(
    private dataService: DataService,
    private navCtrl: NavController,
    private modalController: ModalController,
    private auth: AuthService,
    private router: Router,
    private menuCtrl: MenuController,
    private toastController: ToastController,
    private cookieService: CookieService
  ) {}
  ngOnInit() {
    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Initialize the dark theme based on the initial
    // value of the prefers-color-scheme media query
    this.initializeDarkTheme(prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener('change', (mediaQuery) =>
      this.initializeDarkTheme(mediaQuery.matches)
    );
    this.obtenerFrases();
    this.obtenerFrasesUsuario();
    this.dataService.obtenerFotos().subscribe((data) => {
      this.listaImagenes = Object.values(data) || [];
      console.log('Frases obtenidas: ', this.listaImagenes);
    });
  }

  toggleFav(imagen: any) {
    // Cambiar el valor de la propiedad 'fav' (alternar entre true y false)
    for (let i = 0; i < this.listaImagenes.length; i++) {
      this.listaImagenes[i].fav = false;
    }
    imagen.fav = !imagen.fav;
    imagen.usada=true;
    imagen.fechaUsada = new Date().toISOString();
    // Guardar los cambios en Firebase u otro servicio, según sea necesario
    this.dataService.guardarDatosFoto(this.listaImagenes).subscribe(() => {
      console.log('Cambio en la propiedad fav guardado correctamente.');
    });
  }
  eliminarFoto(imagen: any) {
    const confirmacion = window.confirm(
      '¿Estás seguro de que quieres eliminar esta foto?'
    );

    if (confirmacion) {
      this.listaImagenes = this.listaImagenes.filter((img) => img !== imagen);
      this.dataService.guardarDatosFoto(this.listaImagenes).subscribe(
        () => {
          console.log('Foto eliminada correctamente.');
        },
        (error) => {
          console.error('Error al eliminar la foto:', error);
        }
      );
    } else {
      console.log('Operación de eliminación cancelada por el usuario.');
    }
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  modoAutomaticoFotos() {
    let indiceAleatorio = Math.floor(Math.random() * this.listaImagenes.length);
    this.toggleFav(this.listaImagenes[indiceAleatorio]);
  }
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
  moverAFrasesDelDia(index: number) {
    if (index >= 0 && index < this.frases.length) {
      const fraseMovida = this.frases.splice(index, 1)[0];
      this.frasesDelDia.push({
        ...fraseMovida,
        fecha: new Date().toISOString(),
      }); // Agrega la fecha actual
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
  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });
    this.fotoUrl = image.dataUrl!;
    const imageElement = document.getElementById(
      'capturedImage'
    ) as HTMLImageElement;
    imageElement.src = this.fotoUrl;
    this.mostrarFoto = false;
    if (
      this.autorFoto == '' ||
      this.autorFoto == null ||
      this.autorFoto == undefined ||
      this.autorFoto == ' ' ||
      this.tipoAutorFoto == 'anonimo'
    ) {
      this.autorFoto = 'Anónimo';
    }
  };

  savePhotoWithoutCookie(photo: string) {
    this.dataService.guardarFoto(photo, this.autorFoto);
    this.presentarTostada('Foto publicada correctamente.', 'success');
    this.listaImagenes.push({
      imagen: photo,
      autor: this.autorFoto,
      fechaSubida: new Date().toISOString(),
      fav: false,
    });
  }
  async presentarTostada(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000,
      color: color,
      position: 'bottom',
    });

    await toast.present();
  }

  private guardarFrasesYUsuarioYDelDia() {
    this.dataService.guardarDatos(this.frases).subscribe(() => {
      this.dataService
        .guardarFrasesUsuario(this.frasesUsuario)
        .subscribe(() => {
          this.dataService
            .guardarFrasesDelDia(this.frasesDelDia)
            .subscribe(() => {
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
  toggleFavFrase(index: number) {
    if (index >= 0 && index < this.frases.length) {
      // Desmarcar todas las frases
      this.frases.forEach((frase) => (frase.fav = false));

      // Marcar la frase actual como favorita
      this.frases[index].fav = true;

      // Guardar el estado actualizado
      this.guardarFrases();
    }
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
  modoAutomatico() {
    //indice aleatorio
    let indiceAleatorio = Math.floor(Math.random() * this.frases.length);
    //frase aleatoria
    this.toggleFavFrase(indiceAleatorio);
  }
  actualizarFrase(
    index: number,
    fraseActualizada: any,
    esFrasesUsuario: boolean = false
  ) {
    // Seleccionar la lista correspondiente según el parámetro esFrasesUsuario
    const lista = esFrasesUsuario ? this.frasesUsuario : this.frases;

    if (index >= 0 && index < lista.length) {
      lista[index] = { ...lista[index], ...fraseActualizada };

      // Guardar las frases según la lista correspondiente
      esFrasesUsuario ? this.guardarFrasesYUsuario() : this.guardarFrases();
    }
  }
  abrirFormularioEdicion(index: number, esFrasesUsuario: boolean = false) {
    console.log('Index: ', index);

    // Seleccionar la lista correspondiente según el parámetro esFrasesUsuario
    const lista = esFrasesUsuario ? this.frasesUsuario : this.frases;

    const fraseSeleccionada = lista[index];

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
              // Actualizar la frase en la lista correspondiente
              this.actualizarFrase(index, result.data, esFrasesUsuario);
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
  eliminarFraseDelDia(index: number) {
    if (index >= 0 && index < this.frasesUsuario.length) {
      this.frasesDelDia.splice(index, 1);
      this.guardarFrasesYUsuarioYDelDia();
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
  ionViewWillEnter() {
    // Verificar si el usuario está autenticado al entrar en la vista
    if (!this.auth.isLoggedIn()) {
      // Si no está autenticado, redirigir a la página de login
      this.router.navigate(['/login']);
    }
  }
  openMenu() {
    this.menuCtrl.open('menu');
  }
  themeToggle = false;

  // Check/uncheck the toggle and update the theme based on isDark
  initializeDarkTheme(isDark: any) {
    this.themeToggle = isDark;
    this.toggleDarkTheme(isDark);
  }

  // Listen for the toggle check/uncheck to toggle the dark theme
  toggleChange(ev: any) {
    this.toggleDarkTheme(ev.detail.checked);
  }

  // Add or remove the "dark" class on the document body
  toggleDarkTheme(shouldAdd: any) {
    document.body.classList.toggle('dark', shouldAdd);
  }
}
