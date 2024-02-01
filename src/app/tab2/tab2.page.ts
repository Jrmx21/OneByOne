import { Component, enableProdMode } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Share } from '@capacitor/share';
import { Camera, CameraResultType } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

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
  fotos: any[] = [];
  //DEMÁS VARIABLES
  fraseIdInput: number = 1;
  responseData: any;
  mostrarBienvenida: boolean = true;
  isFrase: boolean = false;
  autor: string = ' no hay autor';
  isModalOpen = false;
  constructor(
    private modalController: ModalController,
    private navCtrl: NavController,
    private dataService: DataService,
    private toastController: ToastController,

    
  ) {}
  ngOnInit() {
    this.seleccionarFraseAleatoria();
    this.activarFrase();
    this.dataService.obtenerFotos().subscribe((data) => {
      this.fotos = Object.values(data) || [];
      console.log('Fotos obtenidas: ', this.fotos);
      console.log('-------------------');
    }),(error:any)=> {
      console.log(error);
      this.presentarTostada('Error al cargar la foto', 'danger')
    }
    
  }
    
 
  ionViewWillEnter() {
    // Verificar si la cookie 'modal' está presente
    const modalCookie = this.getCookie('modal');
console.log("MODAL COOKASO------"+modalCookie);
    if (modalCookie == 'false') {
      this.mostrarBienvenida = false;
    } else if(modalCookie == 'true') {
      console.log(this.mostrarBienvenida+"ESTA ES LA BIENVENIDA");
      // Establecer la cookie 'modal' en 'false' para la próxima vez
      this.setCookie('modal', 'false', 365); // El tercer parámetro es la duración en días
    }
    for (let i = 0; i < this.fotos.length; i++) {
      
      if (this.fotos) {
        console.log('hay una foto favorita', [i]);
      }
    }
  }
  apagarModal(){
    this.mostrarBienvenida=false;
    this.setCookie('modal', 'false', 365);
  }
  private setCookie(name: string, value: string, days: number): void {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);

    const cookieValue = `${name}=${value};expires=${expirationDate.toUTCString()};path=/`;
    document.cookie = cookieValue;
  }

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


  // async moverFrase() {
  //   if (!this.fraseIdInput) {
  //     console.error('Por favor, ingrese una ID válida');
  //     return;
  //   }

  // //   this.dataService.moverFrase(this.fraseIdInput).subscribe(
  // //     (response) => {
  // //       console.log('Frase movida exitosamente', response);
  // //       // Puedes manejar la respuesta según tus necesidades
  // //     },
  // //     (error) => {
  // //       console.error('Error al mover la frase', error);
  // //       // Puedes manejar el error según tus necesidades
  // //     }
  // //   );
  // }
  compartir() {
    Share.share({
      title: '¡Mira esta frase!',
      text:
        'Buenas, te comparto esta frase: ' + this.frase + ' - ' + this.autor,
      // url: '',
      dialogTitle: 'Comparte a tus amigos :)',
    });
  }

  seleccionarFraseAleatoria() {
    this.frase = '';
    setTimeout(() => {
        this.dataService.obtenerFrasesDelDia().subscribe((data) => {
          let frases: any = Object.values(data);
          let indiceAleatorio = Math.floor(Math.random() * frases.length);
          this.frase = frases[indiceAleatorio].frase;
          this.autor = frases[indiceAleatorio].autor;
        });
     (error:any)=> {
        console.log(error);
        this.presentarTostada('Error al cargar la frase', 'danger')
      }
    }, 500);
  }

  //MUESTRA BIENVENIDA AL ENTRAR
  ionViewDidEnter() {
    this.mostrarBienvenida = true;
  }
  handleRefresh(event: any) {
    setTimeout(() => {
      event.target.complete();
      this.seleccionarFraseAleatoria();
    }, 500);
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

  // onClick() {
  //   this.authService
  //     .logout()
  //     .then(() => {
  //       this.router.navigate(['/login']);
  //     })
  //     .catch(async (error:any) => {
  //       const toast = await this.toastController.create({
  //         message: error.message,
  //         duration: 2000,
  //       });
  //       toast.present();
  //     });
  // }
}
//XXX NO FUNCIONAL DEMOMENTO XXX
// handleRefresh(event: any) {
//   setTimeout(() => {
//     //  QUE HACER CUANDO RECARGA
//     this.isFrase = false;
//     this.isFrase = true;
//     event.target.complete();
//   }, 2000);
// }

// PA TODO EL MUNDO NO ES LA MISMA FRASE DEL DIA A CADA UNO LE SALE UNA DIFERENTE IDEA
