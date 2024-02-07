import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscarImagen'
})
export class BuscarImagenPipe implements PipeTransform {
  transform(listaImagenes: any[], searchText: string): any[] {
    if (!listaImagenes || !searchText) {
      return listaImagenes;
    }

    searchText = searchText.toLowerCase();

    return listaImagenes.filter(imagen => {
      // Puedes ajustar los campos que deseas incluir en la búsqueda
      const autorMatch = imagen.autor.toLowerCase().includes(searchText);
      const favMatch = imagen.fav.toString().toLowerCase().includes(searchText);

      return autorMatch || favMatch;
    });
  }
}
