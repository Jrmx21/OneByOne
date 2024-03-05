import { Component } from '@angular/core';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  myApp: string = 'OneByOne';
  frases: any[] = [];
  filtro: string = '';
  campoBusqueda: 'frase' | 'autor' = 'frase';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.obtenerFrases();
  }

  obtenerFrases() {
    this.dataService.obtenerFrasesFirebase().subscribe((data) => {
      this.frases = Object.values(data) || [];
    });
  }

  realizarBusqueda() {
    // Filtrar frases que contengan el texto de búsqueda en la frase o el autor
    if (this.filtro.trim() !== '') {
      this.frases = this.frases.filter((f) =>
        this.obtenerCampoBusqueda(f)
          .toLowerCase()
          .includes(this.filtro.toLowerCase())
      );
    } else {
      // Si el campo de búsqueda está vacío, mostrar todas las frases
      this.obtenerFrases();
    }
  }

  obtenerCampoBusqueda(frase: any): string {
    return this.campoBusqueda === 'frase' ? frase.frase : frase.autor;
  }
}