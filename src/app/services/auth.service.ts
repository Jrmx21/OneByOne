// auth.service.ts
import { Injectable} from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
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
