import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl =
    'https://by1-1db5a-default-rtdb.europe-west1.firebasedatabase.app/';

  constructor(private http: HttpClient, private cookieService: CookieService) {}
  public obtenerFrasesUsuario(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + `frases_usuario.json`);
  }

  public publicarFraseEnFirebase(nuevaFrase: any): void {
    const fechaSubida = new Date().toUTCString();
    nuevaFrase.fechaSubida = fechaSubida.substring(0, fechaSubida.length - 5);
    this.http.put(this.apiUrl + `frases_usuario.json`, nuevaFrase).subscribe(
      (response) => {
        console.log('Frase publicada exitosamente en Firebase:', response);
      },
      (error) => {
        console.error('Error al publicar la frase en Firebase:', error);
      }
    );
  }

  public obtenerFrasesDelDia(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + `frases_del_dia.json`);
  }
  public guardarFrasesDelDia(frasesDelDia: any[]): Observable<any> {
    return this.http.put(this.apiUrl + `frases_del_dia.json`, frasesDelDia);
  }

  guardarDatos(frases: any): Observable<any> {
    return this.http.put(this.apiUrl + `frases.json`, frases);
  }
  obtenerFrasesFirebase() {
    return this.http.get(this.apiUrl + `frases.json`);
  }
  fraseUsuario(frase: any, autor: any): Observable<any> {
    return this.http.put(
      this.apiUrl+`frases_usuario.json`,
      frase,
      autor
    );
  }
  public guardarFrasesUsuario(frasesUsuario: any[]): Observable<any> {
    return this.http.put(
      this.apiUrl+`frases_usuario.json`,
      frasesUsuario
    );
  }
  public guardarFoto(foto: string, usuario: string): void {
    const fechaSubida = new Date().toISOString(); // Obtener la fecha actual en formato ISO

    const data = { imagen: foto, autor: usuario, fechaSubida: fechaSubida, fav: false};

    // Guardar la frase en una cookie con una duración de 12 horas
    this.setCookie('imagenUrl', foto, 12 / 24);

    this.http
      .post(
        this.apiUrl+'fotos_usuario.json',
        data
      )
      .subscribe(
        (response) => {
          console.log('FOTO publicada exitosamente en Firebase:', response);
          this.cookieService.set('imagenUrl', foto, 12 / 24);
        },
        (error) => {
          console.error('Error al publicar la FOTO en Firebase:', error);
        }
      );

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
  private setCookie(name: string, value: string, days: number): void {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);

    const cookieValue = `${name}=${value};expires=${expirationDate.toUTCString()};path=/`;
    document.cookie = cookieValue;
  }
  public obtenerFotos() {
    return this.http.get(
      this.apiUrl+`fotos_usuario.json`
    );
  }
  public eliminarFoto(imagen:any): Observable<any> {
    return this.http.delete(
      this.apiUrl+`fotos_usuario/${imagen}.json`
    );
  }

  public obtenerFotosFavoritas(): Observable<any[]> {
    return this.http.get(
      this.apiUrl + `fotos_usuario.json`
    ).pipe(
      map((data: any) => {
        // Filtrar solo las fotos con fav == true
        const fotosFavoritas = Object.values(data || {}).filter((foto: any) => foto.fav === true);
        return fotosFavoritas;
      })
    );
  }
  guardarDatosFoto(fotos: any): Observable<any> {
    return this.http.put(
      this.apiUrl+`fotos_usuario.json`,
      fotos
    );
  }
}
