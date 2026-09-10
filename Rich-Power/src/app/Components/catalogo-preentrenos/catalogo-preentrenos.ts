import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ProductoPreEntreno {
  id: number;
  nombre: string;
  precio: number;
  precioAnterior?: number;
  imagen: string;
  rating: number;
  sabores: string[];
  miligramosCafeina: number;
  conCafeina: boolean;
  porciones: number;
  etiqueta?: string;
}

@Component({
  selector: 'app-catalogo-preentrenos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalogo-preentrenos.html',
  styleUrls: ['./catalogo-preentrenos.css']
})
export class CatalogoPreentrenos {
  filtroCafeina: string = 'todos';
  ordenSeleccionado: string = 'relevancia';

  productos: ProductoPreEntreno[] = [
    {
      id: 1,
      nombre: 'Pre-Entreno Explosive 300g',
      precio: 130000,
      precioAnterior: 155000,
      imagen: 'https://via.placeholder.com/300x300?text=Pre-Entreno+Explosive',
      rating: 4.6,
      sabores: ['Sandía', 'Ponche de frutas'],
      miligramosCafeina: 300,
      conCafeina: true,
      porciones: 30,
      etiqueta: '-15%'
    },
    {
      id: 2,
      nombre: 'Pre-Entreno Extreme Pump 250g',
      precio: 145000,
      imagen: 'https://via.placeholder.com/300x300?text=Extreme+Pump',
      rating: 4.8,
      sabores: ['Mora azul', 'Limonada'],
      miligramosCafeina: 350,
      conCafeina: true,
      porciones: 25,
      etiqueta: 'Más vendido'
    },
    {
      id: 3,
      nombre: 'Pre-Entreno Sin Cafeína 300g',
      precio: 120000,
      imagen: 'https://via.placeholder.com/300x300?text=Sin+Cafeina',
      rating: 4.3,
      sabores: ['Manzana verde'],
      miligramosCafeina: 0,
      conCafeina: false,
      porciones: 30,
      etiqueta: 'Nuevo'
    },
    {
      id: 4,
      nombre: 'Pre-Entreno Focus & Energy 280g',
      precio: 138000,
      imagen: 'https://via.placeholder.com/300x300?text=Focus+Energy',
      rating: 4.5,
      sabores: ['Uva', 'Naranja'],
      miligramosCafeina: 250,
      conCafeina: true,
      porciones: 28
    },
    {
      id: 5,
      nombre: 'Pre-Entreno Alta Intensidad 320g',
      precio: 160000,
      precioAnterior: 185000,
      imagen: 'https://via.placeholder.com/300x300?text=Alta+Intensidad',
      rating: 4.7,
      sabores: ['Sandía', 'Mango'],
      miligramosCafeina: 400,
      conCafeina: true,
      porciones: 32,
      etiqueta: '-13%'
    },
    {
      id: 6,
      nombre: 'Pre-Entreno Natural Sin Cafeína 250g',
      precio: 105000,
      imagen: 'https://via.placeholder.com/300x300?text=Natural',
      rating: 4.2,
      sabores: ['Limón'],
      miligramosCafeina: 0,
      conCafeina: false,
      porciones: 25
    }
  ];

  get productosFiltrados(): ProductoPreEntreno[] {
    let resultado = [...this.productos];

    if (this.filtroCafeina === 'con') {
      resultado = resultado.filter(p => p.conCafeina);
    } else if (this.filtroCafeina === 'sin') {
      resultado = resultado.filter(p => !p.conCafeina);
    }

    switch (this.ordenSeleccionado) {
      case 'precio-asc':
        resultado = [...resultado].sort((a, b) => a.precio - b.precio);
        break;
      case 'precio-desc':
        resultado = [...resultado].sort((a, b) => b.precio - a.precio);
        break;
      case 'rating':
        resultado = [...resultado].sort((a, b) => b.rating - a.rating);
        break;
      case 'cafeina':
        resultado = [...resultado].sort((a, b) => b.miligramosCafeina - a.miligramosCafeina);
        break;
    }

    return resultado;
  }

  seleccionarFiltroCafeina(valor: string): void {
    this.filtroCafeina = valor;
  }

  agregarAlCarrito(producto: ProductoPreEntreno): void {
    console.log('Agregado al carrito:', producto.nombre);
  }

  formatearPrecio(valor: number): string {
    return valor.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 });
  }

  get estrellas(): number[] {
    return [1, 2, 3, 4, 5];
  }
}