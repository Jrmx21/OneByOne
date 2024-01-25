// register.page.ts
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserI } from '../models';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
})
export class RegisterPage {
  email: string = '';
  //yes
  password: string = '';

  datos: UserI = {
    nombre: '',
    edad: 0,
    correo: '',
    uid: '',
    password: '',
    perfil: 'user',
  };
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  async register() {
    this.authService
      .registerWithEmailAndPassword(this.email, this.password)
      .then((res) => {
        console.log(res);
        this.router.navigate(['/']);
      });
    this.presentSuccessToast('Usuario registrado correctamente').catch(
      (err) => {
        console.log(err);
        this.presentErrorToast(this.getErrorMessage(err.code));
      }
    );
    //   await this.authService.registerWithEmailAndPassword(this.email, this.password);
    //   // Redirige a la página principal después de registrarse exitosamente
    //   this.router.navigate(['/']);

    // } catch (error:any) {
    //   // Manejar errores de registro
    //   console.error('Error al registrarse:', error);
  }

  // async registrar(){
  //   this.authService.registerWithEmailAndPassword(this.email, this.password).then((res)=>{
  //     console.log(res);
  //     this.datos.uid=res.user?.uid;
  //     this.datos.correo=res.user?.email;
  //     this.authService.guardarDatos(this.datos).subscribe((res)=>{
  //       console.log(res);
  //     })
  //     this.router.navigate(['/']);
  //     this.presentSuccessToast("Usuario registrado correctamente")
  //   }).catch((err)=>{
  //     console.log(err);
  //     this.presentErrorToast(this.getErrorMessage(err.code));
  //   })
  // }
  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'El correo electrónico ya está en uso. Por favor, use otro correo electrónico.';
      case 'auth/invalid-email':
        return 'Correo electrónico no válido. Por favor, verifique su dirección de correo electrónico.';
      case 'auth/weak-password':
        return 'Contraseña débil. Por favor, elija una contraseña más segura.';
      default:
        return 'Error de registro. Por favor, inténtelo de nuevo.';
    }
  }

  private async presentErrorToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      color: 'danger',
    });
    toast.present();
  }
  private async presentSuccessToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      color: 'success',
    });
    toast.present();
  }
}
