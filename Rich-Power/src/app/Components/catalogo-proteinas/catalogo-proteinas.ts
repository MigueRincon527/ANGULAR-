import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ProductoProteina {
  id: number;
  nombre: string;
  tipo: string;
  precio: number;
  precioAnterior?: number;
  imagen: string;
  rating: number;
  sabores: string[];
  gramosPorPorcion: number;
  etiqueta?: string;
}

@Component({
  selector: 'app-catalogo-proteinas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalogo-proteinas.html',
  styleUrls: ['./catalogo-proteinas.css']
})
export class CatalogoProteinas {
  tipos: string[] = ['Todas', 'Whey Concentrada', 'Whey Aislada', 'Caseína', 'Vegana'];
  tipoSeleccionado: string = 'Todas';
  ordenSeleccionado: string = 'relevancia';
  precioMaximo: number = 300000;

  productos: ProductoProteina[] = [
    {
      id: 1,
      nombre: 'Whey Protein Gold Standard 2kg',
      tipo: 'Whey Aislada',
      precio: 189000,
      precioAnterior: 220000,
      imagen: 'https://i.pinimg.com/1200x/3d/5b/83/3d5b832496bdd2a055a9cc064f6eb185.jpg',
      rating: 4.8,
      sabores: ['Chocolate', 'Vainilla', 'Fresa'],
      gramosPorPorcion: 24,
      etiqueta: 'Más vendido'
    },
    {
      id: 2,
      nombre: 'Whey Protein Concentrada 1kg',
      tipo: 'Whey Concentrada',
      precio: 95000,
      imagen: 'https://i.pinimg.com/736x/d3/d1/b7/d3d1b7f5eea649dd804d7fc7a8bd113d.jpg',
      rating: 4.5,
      sabores: ['Chocolate', 'Cookies & Cream'],
      gramosPorPorcion: 22
    },
    {
      id: 3,
      nombre: 'Caseína Micelar 900g',
      tipo: 'Caseína',
      precio: 135000,
      imagen: 'https://i.pinimg.com/1200x/1e/ef/2e/1eef2e57bea7cc20589049852e834049.jpg',
      rating: 4.6,
      sabores: ['Vainilla', 'Chocolate'],
      gramosPorPorcion: 25,
      etiqueta: 'Nuevo'
    },
    {
      id: 4,
      nombre: 'Proteína Vegana de Guisante 900g',
      tipo: 'Vegana',
      precio: 110000,
      precioAnterior: 130000,
      imagen: 'https://i.pinimg.com/1200x/b0/8a/25/b08a25c1fd420338441579eaa0974076.jpg',
      rating: 4.3,
      sabores: ['Vainilla', 'Cacao'],
      gramosPorPorcion: 20,
      etiqueta: '-15%'
    },
    {
      id: 5,
      nombre: 'Whey Protein Isolate 2kg',
      tipo: 'Whey Aislada',
      precio: 210000,
      imagen: 'https://i.pinimg.com/1200x/02/ab/07/02ab07ff86a1f2d19932a6dad6e7f074.jpg',
      rating: 4.9,
      sabores: ['Chocolate', 'Fresa', 'Vainilla', 'Cookies & Cream'],
      gramosPorPorcion: 27
    },
    {
      id: 6,
      nombre: 'Whey Protein Concentrada 2kg',
      tipo: 'Whey Concentrada',
      precio: 165000,
      imagen: 'https://i.pinimg.com/736x/52/c3/0a/52c30aeeb8ea2e358fcc91656fe147bf.jpg',
      rating: 4.4,
      sabores: ['Chocolate', 'Vainilla'],
      gramosPorPorcion: 23
    }
  ];

  get productosFiltrados(): ProductoProteina[] {
    let resultado = this.productos.filter(p => p.precio <= this.precioMaximo);

    if (this.tipoSeleccionado !== 'Todas') {
      resultado = resultado.filter(p => p.tipo === this.tipoSeleccionado);
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
    }

    return resultado;
  }

  seleccionarTipo(tipo: string): void {
    this.tipoSeleccionado = tipo;
  }

  agregarAlCarrito(producto: ProductoProteina): void {
    console.log('Agregado al carrito:', producto.nombre);
  }

  formatearPrecio(valor: number): string {
    return valor.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 });
  }

  get estrellas(): number[] {
    return [1, 2, 3, 4, 5];
  }
}