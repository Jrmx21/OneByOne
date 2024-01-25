import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:3000/api/datos';
  public obtenerFrasesUsuario(): Observable<any[]> {
    return this.http.get<any[]>(
      `https://by1-1db5a-default-rtdb.europe-west1.firebasedatabase.app/frases_usuario.json`
    );
  }

  public publicarFraseEnFirebase(nuevaFrase: any): void {
    const fechaSubida = new Date().toUTCString();
    nuevaFrase.fechaSubida = fechaSubida.substring(0, fechaSubida.length - 5);
    this.http
      .post(
        `https://by1-1db5a-default-rtdb.europe-west1.firebasedatabase.app/frases_usuario.json`,
        nuevaFrase
      )
      .subscribe(
        (response) => {
          console.log('Frase publicada exitosamente en Firebase:', response);
        },
        (error) => {
          console.error('Error al publicar la frase en Firebase:', error);
        }
      );
  }

  constructor(private http: HttpClient) {}

  public obtenerFrasesDelDia(): Observable<any[]> {
    return this.http.get<any[]>(
      `https://by1-1db5a-default-rtdb.europe-west1.firebasedatabase.app/frases_del_dia.json`
    );
  }
  public guardarFrasesDelDia(frasesDelDia: any[]): Observable<any> {
    return this.http.put(
      `https://by1-1db5a-default-rtdb.europe-west1.firebasedatabase.app/frases_del_dia.json`,
      frasesDelDia
    );
  }

  guardarDatos(frases: any): Observable<any> {
    return this.http.put(
      `https://by1-1db5a-default-rtdb.europe-west1.firebasedatabase.app/frases.json`,
      frases
    );
  }
  obtenerFrasesFirebase() {
    return this.http.get(
      `https://by1-1db5a-default-rtdb.europe-west1.firebasedatabase.app/frases.json`
    );
  }
  fraseUsuario(frase: any, autor: any): Observable<any> {
    return this.http.put(
      `https://by1-1db5a-default-rtdb.europe-west1.firebasedatabase.app/frases_usuario.json`,
      frase,
      autor
    );
  }
  public guardarFrasesUsuario(frasesUsuario: any[]): Observable<any> {
    return this.http.put(
      `https://by1-1db5a-default-rtdb.europe-west1.firebasedatabase.app/frases_usuario.json`,
      frasesUsuario
    );
  }

  // crearFrase(frase: any): Observable<any> {
  //   return this.http.post(`https://by1-1db5a-default-rtdb.europe-west1.firebasedatabase.app/frases.json`, frase);
  // }
  // obtenerFrasePorId(id: string): Observable<any> {
  //   return this.http.get(`https://by1-1db5a-default-rtdb.europe-west1.firebasedatabase.app/frases/${id}.json`);
  // }
  // actualizarFrase(id: string, frase: any): Observable<any> {
  //   return this.http.put(`https://by1-1db5a-default-rtdb.europe-west1.firebasedatabase.app/frases/${id}.json`, frase);
  // }
  // eliminarFrase(id: string): Observable<any> {
  //   return this.http.delete(`https://by1-1db5a-default-rtdb.europe-west1.firebasedatabase.app/frases/${id}.json`);
  // }
}
