import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { ToastController } from '@ionic/angular';
import { TabsPage } from '../tabs/tabs.page';
import { Camera, CameraResultType } from '@capacitor/camera';
import { CookieService } from 'ngx-cookie-service';
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
  autorFoto: string = '';
  tipoAutor: string = 'autor';
  fotoUrl: string = '';
  mostrarFoto: boolean = true;
  tipoAutorFoto: string = 'autor';
  puedePublicarFoto: boolean = true;
  fotoPublicadaUrl: string= '';

  private readonly duracionCookie: number = 4 * 60 * 60; // 4 horas en segundos
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
  takePicture = async () => {
    // Verifica si la cookie de publicación está presente
    if (!this.cookieService.get('fotoPublicada')) {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
      });
      this.fotoUrl = image.dataUrl!;
      const imageElement = document.getElementById('capturedImage') as HTMLImageElement;
      imageElement.src = this.fotoUrl;
      this.cookieService.set('imagenUrl', "prueba", this.duracionCookie);
      this.mostrarFoto = false;

      if (this.autorFoto == "" || this.autorFoto == null || this.autorFoto == undefined || this.autorFoto == " " || this.tipoAutorFoto == "anonimo") {
        this.autorFoto = "Anónimo";
      }


      // Establece la cookie de publicación con una duración de 4 horas
      
    } else {
      this.presentarTostada('Solo se permite publicar una foto cada 4 horas.', 'tertiary');
      // Puedes mostrar un mensaje al usuario indicando que solo se permite una foto cada 4 horas
    }
  };

  savePhoto(photo: string) {
    if (!this.cookieService.get('fotoPublicada')) {
    this.dataService.guardarFoto(photo, this.autorFoto);
    this.cookieService.set('fotoPublicada', 'true', this.duracionCookie);
    this.presentarTostada('Foto publicada correctamente.', 'success');
   
    console.log("---------------------------------",this.fotoUrl);
  }
    else{
      this.presentarTostada('Solo se permite publicar una foto cada 4 horas.', 'tertiary');
    }
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
  ngOnInit() {
    if (!this.cookieService.get('fotoPublicada')) {
      this.puedePublicarFoto = true;
    }
    else{
      this.puedePublicarFoto = false;
    }
    this.fotoPublicadaUrl=this.cookieService.get('imagenUrl');
  }
  constructor(
    private http: HttpClient,
    private router: Router,
    private dataService: DataService,
    private toastController: ToastController,
    public tabs: TabsPage,
    private cookieService: CookieService,

  ) {}
  frase: string = '';
  autor: string = '';
  reloadPage() {
   this.router.navigate(['/tabs/tab3']);
  }
  async publicarFrase(): Promise<void> {
    if (this.tipoAutor == 'anonimo') {
      this.autor = 'Anónimo';
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
