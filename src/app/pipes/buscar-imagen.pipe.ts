import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscarImagen'
})
export class BuscarImagenPipe implements PipeTransform {
  transform(listaImagenes: any[], searchText: string,campoBusqueda:string): any[] {
    if (!listaImagenes || !searchText) {
      return listaImagenes;
    }

    searchText = searchText.toLowerCase();

    return listaImagenes.filter(imagen => {
   
      const autorMatch = imagen.autor.toLowerCase().includes(searchText);
      
      const fechaSubidaMatch = imagen.fechaSubida.toLowerCase().includes(searchText);
      if (campoBusqueda=="autor") {
        return autorMatch;
      }
      if (campoBusqueda=="fechaSubida") {
        return fechaSubidaMatch;
      }
      return autorMatch || fechaSubidaMatch;
    });
  }
}
