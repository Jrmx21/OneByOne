// auth.service.ts
import { Injectable, Inject, InjectionToken } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  Auth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afs: AngularFireAuth) {}

  signInWithGoogle() {
    return this.afs.signInWithPopup(new GoogleAuthProvider());
  }
  registerWithEmailAndPassword(email: string, password: string) {
    return this.afs.createUserWithEmailAndPassword(email, password);
  }
  signInWithEmailAndPassword(email: string, password: string) {
    return this.afs.signInWithEmailAndPassword(email, password);
  }
  // logout(){
  //   return this.afs.signOut();
  // }
  getAuth(){
    return this.afs;
  }
  private isAuthenticated: boolean = false;
  private allowedUsername: string = 'root';

  login(username: string, password: string): boolean {
    // Lógica de autenticación básica (ejemplo)
    if (username === this.allowedUsername && password === 'eminem') {
      this.isAuthenticated = true;
      return true;
    } else {
      this.isAuthenticated = false;
      return false;
    }
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
