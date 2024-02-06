import { Pipe, PipeTransform } from '@angular/core';
import { Foto } from '../models';

@Pipe({
  name: 'buscarImagen'
})
export class BuscarImagenPipe implements PipeTransform {
  transform(imagenes: any[] | null, searchText: string): any[] | null {
    if (!imagenes || !searchText) {
      return imagenes;
    }

    searchText = searchText.toLowerCase();

    return imagenes.filter((imagen, index) => {
      // Verifica que las propiedades esperadas estén definidas
      if (imagen && imagen.autor && imagen.imagen) {
        const fechaSubida =
          imagen.fechaSubida && typeof imagen.fechaSubida === 'string'
            ? imagen.fechaSubida.toLowerCase()
            : '';

        return (
          imagen.autor.toLowerCase().includes(searchText) ||
          imagen.imagen.toLowerCase().includes(searchText) ||
          fechaSubida.includes(searchText) ||
          index.toString().includes(searchText)
        );
      } else {
        return false;  // Evitar errores si alguna propiedad falta
      }
    }) as any[];
  }
}