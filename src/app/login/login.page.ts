// login.page.ts
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  username: string="";

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  //login pachucho
  login() {
    if (this.authService.login(this.username, this.password)) {
      // Redirige a la página principal después del login exitoso
      this.router.navigate(['/admin']); // Ajusta la ruta según tu configuración
    } else {
      // Muestra un mensaje de error o realiza alguna acción en caso de login fallido
      console.log('Error en el login');
    }
  }
  // login() {
  //   this.authService
  //     .signInWithEmailAndPassword(
  //       this.email,
  //       this.password,
  //     )
  //     .then((res) => {
  //       // Redirige a la página principal después de iniciar sesión exitosamente
  //       this.router.navigate(['/']);
  //       this.presentToastSucess('Sesión iniciada con correctamente');
  //       console.log(res.user?.getIdToken());
  //        res.user?.getIdTokenResult().then((idTokenResult) => {
  //         console.log(idTokenResult.token);
  //         localStorage.setItem('token-admin',idTokenResult.token);
  //       }).catch((error) => {
  //         console.log(error);
  //       }
  //       );
  //     })
  //     .catch((error) => {
  //       // Manejar errores de inicio de sesión
  //       console.error('Error al iniciar sesión:', error);
  //       this.presentErrorToast(this.getErrorMessage(error.code));
  //     });
  // }
  loginWithGoogle() {
    this.authService
      .signInWithGoogle()
      .then(() => {
        // Redirige a la página principal después de iniciar sesión exitosamente
        this.router.navigate(['/']);
        this.presentToastSucess('Sesión iniciada con Google correctamente');
      })
      .catch((error) => {
        // Manejar errores de inicio de sesión
        console.error('Error al iniciar sesión:', error);
        this.presentErrorToast(this.getErrorMessage(error.code));
      });
  }
  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'Usuario no encontrado. Por favor, verifique su correo electrónico.';
      case 'auth/wrong-password':
        return 'Contraseña incorrecta. Por favor, inténtelo de nuevo.';
      case 'auth/invalid-email':
        return 'Correo electrónico no válido. Por favor, verifique su dirección de correo electrónico.';
      default:
        return 'Error de inicio de sesión. Por favor, inténtelo de nuevo.';
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
  private async presentToastSucess(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      color: 'success',
    });
    toast.present();
  }
}
