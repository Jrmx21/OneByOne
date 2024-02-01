import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscarImagen'
})
export class BuscarImagenPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();

    return items.filter((item, index) => {
      return (
        item.autor.toLowerCase().includes(searchText) ||
        (index !== undefined && index.toString().includes(searchText))
      );
    });
  }

}
