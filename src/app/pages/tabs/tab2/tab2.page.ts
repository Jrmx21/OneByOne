import { Component } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { DataService } from '../../../services/data.service';
import { Share } from '@capacitor/share';
import { Foto } from '../../../models';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  
})
export class Tab2Page {
  
  //TITULO APP hay que ponerlo global
  public myApp: string = 'OneByOne';
  //FRASE QUE SE MUESTRA
  frase: string = '';
  fotos: Foto[] = [];
  //DEMÁS VARIABLES
  fraseIdInput: number = 1;
  responseData: any;
  mostrarBienvenida: boolean = true;
  verFoto: boolean = false;
  isFrase: boolean = false;
  autor: string = ' no hay autor';
  isModalOpen = false;
  autorFoto: string = 'autor';
  modalBienvenida: boolean = true;
  fotoUrl: string = '';
  constructor(
    private dataService: DataService,
    private toastController: ToastController,
  ) {}
  ngOnInit() {
    this.seleccionarFraseAleatoria();
    this.activarFrase();
    this.dataService.obtenerFotosFavoritas().subscribe(
      (data) => {
        this.fotos = Object.values(data) || [];
        console.log('Fotos obtenidas: ', this.fotos);

        // Filtrar fotos donde la propiedad 'fav' sea true
        const fotosFavoritas = this.fotos.filter((foto) => foto.fav === true);

        if (fotosFavoritas.length > 0) {
          console.log('Hay fotos favoritas:', fotosFavoritas);
          const fotoHtml = document.getElementById('foto') as HTMLImageElement;
          // Cambiar la URL de la imagen en el elemento HTML
          fotoHtml.src = fotosFavoritas[0].imagen;
          this.fotoUrl= fotosFavoritas[0].imagen;
          this.autorFoto = fotosFavoritas[0].autor;
        } else {
          console.log('No hay fotos favoritas.');
        }
      },
      (error: any) => {
        console.log(error);
        this.presentarTostada('Error al cargar la foto', 'danger');
      }
    );
    const modalCookie = this.getCookie('modal');
    console.log('MODAL COOKASO------' + modalCookie);
    if (modalCookie == 'true') {
      this.modalBienvenida = true;
    } else if (modalCookie == 'false') {
      this.modalBienvenida = false;
      this.setCookie('modal', 'false', 365); // El tercer parámetro es la duración en días
    
    }

  }

  visualizarFoto(abrir :boolean){
    this.verFoto = abrir;
  }
  //Se hace al entrar
  ionViewWillEnter() {
    // Verificar si la cookie 'modal' está presente
 
  }
  //APAGAR MODAL
  apagarModal() {
    this.mostrarBienvenida = false;
    this.setCookie('modal', 'false', 365);
  }
  // set COOKIES
  private setCookie(name: string, value: string, days: number): void {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);

    const cookieValue = `${name}=${value};expires=${expirationDate.toUTCString()};path=/`;
    document.cookie = cookieValue;
  }
  //cookie para modal
  public setCookieModal() {
    this.setCookie('modal', 'false', 365);
  }
  // get COOKIES
  private getCookie(name: string): string | null {
    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');

      if (cookieName.trim() === name) {
        return cookieValue;
      }
    }

    return null;
  }

  //Botón SHARE
  compartir() {
    Share.share({
      title: '¡Mira esta frase!',
      text:
        'Buenas, te comparto esta frase: ' + this.frase + ' - ' + this.autor,
      // url: '',
      dialogTitle: 'Comparte a tus amigos :)',
    });
  }

  // Selecciona una frase aleatoria de las que hay en la tabla frases_del_dia
  seleccionarFraseAleatoria() {
    this.frase = '';
    setTimeout(() => {
      // Filtrar las frases del día para obtener solo las favoritas
      this.dataService.obtenerFrasesFirebase().subscribe((data) => {
        let frases: any = Object.values(data).filter((frase: any) => frase.fav);
        
        // Verificar si hay frases favoritas
        if (frases.length > 0) {
          let indiceAleatorio = Math.floor(Math.random() * frases.length);
          this.frase = frases[indiceAleatorio].frase;
          this.autor = frases[indiceAleatorio].autor;
        } else {
          // Manejar el caso en el que no hay frases favoritas
          this.presentarTostada('No hay frases favoritas seleccionadas', 'warning');
        }
      },
      (error: any) => {
        console.log(error);
        this.presentarTostada('Error al cargar la frase', 'danger');
      });
    }, 500);
  }
  
  //MUESTRA BIENVENIDA AL ENTRAR
  ionViewDidEnter() {
    this.mostrarBienvenida = true;
  }

  handleRefresh(event: any) {
    //Refresher
    setTimeout(() => {
      event.target.complete();
      this.seleccionarFraseAleatoria();
      this.dataService.obtenerFotosFavoritas().subscribe(
        (data) => {
          this.fotos = Object.values(data) || [];
          console.log('Fotos obtenidas: ', this.fotos);
          console.log('-------------------');

          // Filtrar fotos donde la propiedad 'fav' sea true
          const fotosFavoritas = this.fotos.filter((foto) => foto.fav === true);

          if (fotosFavoritas.length > 0) {
            console.log('Hay fotos favoritas:', fotosFavoritas);
            const fotoHtml = document.getElementById(
              'foto'
            ) as HTMLImageElement;
            // Cambiar la URL de la imagen en el elemento HTML
            fotoHtml.src = fotosFavoritas[0].imagen;
          } else {
            console.log('No hay fotos favoritas.');
          }
        },
        (error: any) => {
          console.log(error);
          this.presentarTostada('Error al cargar la foto', 'danger');
        }
      );
    }, 500);
  }

  async presentarTostada(message: string, color: string) {
    //TOSTADA CON PARAMETROS
    const toast = await this.toastController.create({
      message: message,
      duration: 1000,
      color: color,
      position: 'bottom',
    });

    await toast.present();
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen; //ABRIR MODAL
  }

  activarFrase() {
    console.log('Frase activada');
    this.isFrase = true; //MUESTRA LA FRASE
  }

  desactivarFrase() {
    console.log('Frase desactivada');
    this.isFrase = false; //DEJA DE MOSTRAR LA FRASE
  }

}