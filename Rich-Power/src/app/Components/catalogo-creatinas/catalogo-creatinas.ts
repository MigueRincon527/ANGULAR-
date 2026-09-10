import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ProductoCreatina {
  id: number;
  nombre: string;
  tipo: string;
  precio: number;
  precioAnterior?: number;
  imagen: string;
  rating: number;
  gramosPorPorcion: number;
  porciones: number;
  saborizada: boolean;
  etiqueta?: string;
}

@Component({
  selector: 'app-catalogo-creatinas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalogo-creatinas.html',
  styleUrls: ['./catalogo-creatinas.css']
})
export class CatalogoCreatinas {
  tipos: string[] = ['Todas', 'Monohidratada', 'Micronizada', 'HCL', 'Kre-Alkalyn'];
  tipoSeleccionado: string = 'Todas';
  soloSaborizadas: boolean = false;
  ordenSeleccionado: string = 'relevancia';

  productos: ProductoCreatina[] = [
    {
      id: 1,
      nombre: 'Creatina Monohidratada 500g',
      tipo: 'Monohidratada',
      precio: 95000,
      imagen: 'https://via.placeholder.com/300x300?text=Creatina+Mono',
      rating: 4.9,
      gramosPorPorcion: 5,
      porciones: 100,
      saborizada: false,
      etiqueta: 'Más vendido'
    },
    {
      id: 2,
      nombre: 'Creatina Micronizada 300g',
      tipo: 'Micronizada',
      precio: 78000,
      imagen: 'https://via.placeholder.com/300x300?text=Creatina+Micronizada',
      rating: 4.7,
      gramosPorPorcion: 5,
      porciones: 60,
      saborizada: false
    },
    {
      id: 3,
      nombre: 'Creatina HCL 250g',
      tipo: 'HCL',
      precio: 110000,
      precioAnterior: 130000,
      imagen: 'https://via.placeholder.com/300x300?text=Creatina+HCL',
      rating: 4.6,
      gramosPorPorcion: 2,
      porciones: 125,
      saborizada: false,
      etiqueta: '-15%'
    },
    {
      id: 4,
      nombre: 'Creatina Sabor Frutos Rojos 400g',
      tipo: 'Monohidratada',
      precio: 89000,
      imagen: 'https://via.placeholder.com/300x300?text=Creatina+Frutos+Rojos',
      rating: 4.5,
      gramosPorPorcion: 5,
      porciones: 80,
      saborizada: true,
      etiqueta: 'Nuevo'
    },
    {
      id: 5,
      nombre: 'Creatina Kre-Alkalyn 120 caps',
      tipo: 'Kre-Alkalyn',
      precio: 135000,
      imagen: 'https://via.placeholder.com/300x300?text=Kre-Alkalyn',
      rating: 4.4,
      gramosPorPorcion: 1.5,
      porciones: 120,
      saborizada: false
    },
    {
      id: 6,
      nombre: 'Creatina Monohidratada 1kg',
      tipo: 'Monohidratada',
      precio: 150000,
      imagen: 'https://via.placeholder.com/300x300?text=Creatina+1kg',
      rating: 4.8,
      gramosPorPorcion: 5,
      porciones: 200,
      saborizada: false
    }
  ];

  get productosFiltrados(): ProductoCreatina[] {
    let resultado = [...this.productos];

    if (this.tipoSeleccionado !== 'Todas') {
      resultado = resultado.filter(p => p.tipo === this.tipoSeleccionado);
    }

    if (this.soloSaborizadas) {
      resultado = resultado.filter(p => p.saborizada);
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

  agregarAlCarrito(producto: ProductoCreatina): void {
    console.log('Agregado al carrito:', producto.nombre);
  }

  formatearPrecio(valor: number): string {
    return valor.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 });
  }

  get estrellas(): number[] {
    return [1, 2, 3, 4, 5];
  }
}