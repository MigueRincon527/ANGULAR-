import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ProductoAccesorio {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  precioAnterior?: number;
  imagen: string;
  rating: number;
  colores: string[];
  marca: string;
  etiqueta?: string;
}

@Component({
  selector: 'app-catalogo-accesorios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalogo-accesorios.html',
  styleUrls: ['./catalogo-accesorios.css']
})
export class CatalogoAccesorios {
  categorias: string[] = ['Todas', 'Shakers', 'Guantes', 'Cinturones', 'Straps y muñequeras', 'Cuerdas de saltar', 'Bolsos y maletas'];
  categoriaSeleccionada: string = 'Todas';

  marcas: string[] = ['Todas', 'FitGear', 'PowerGrip', 'ShakeMax', 'IronWear'];
  marcaSeleccionada: string = 'Todas';

  ordenSeleccionado: string = 'relevancia';

  productos: ProductoAccesorio[] = [
    {
      id: 1,
      nombre: 'Shaker Premium 700ml',
      categoria: 'Shakers',
      precio: 35000,
      imagen: 'https://via.placeholder.com/300x300?text=Shaker',
      rating: 4.6,
      colores: ['Negro', 'Azul', 'Blanco'],
      marca: 'ShakeMax',
      etiqueta: 'Más vendido'
    },
    {
      id: 2,
      nombre: 'Guantes de Entrenamiento Pro',
      categoria: 'Guantes',
      precio: 58000,
      precioAnterior: 70000,
      imagen: 'https://via.placeholder.com/300x300?text=Guantes',
      rating: 4.5,
      colores: ['Negro', 'Gris'],
      marca: 'PowerGrip',
      etiqueta: '-17%'
    },
    {
      id: 3,
      nombre: 'Cinturón de Levantamiento de Cuero',
      categoria: 'Cinturones',
      precio: 120000,
      imagen: 'https://via.placeholder.com/300x300?text=Cinturon',
      rating: 4.9,
      colores: ['Negro', 'Marrón'],
      marca: 'IronWear',
      etiqueta: 'Premium'
    },
    {
      id: 4,
      nombre: 'Straps de Agarre para Peso Muerto',
      categoria: 'Straps y muñequeras',
      precio: 42000,
      imagen: 'https://via.placeholder.com/300x300?text=Straps',
      rating: 4.4,
      colores: ['Negro', 'Rojo'],
      marca: 'PowerGrip'
    },
    {
      id: 5,
      nombre: 'Muñequeras de Compresión (Par)',
      categoria: 'Straps y muñequeras',
      precio: 38000,
      imagen: 'https://via.placeholder.com/300x300?text=Munequeras',
      rating: 4.3,
      colores: ['Negro', 'Azul', 'Rosa'],
      marca: 'FitGear',
      etiqueta: 'Nuevo'
    },
    {
      id: 6,
      nombre: 'Cuerda de Saltar Velocidad Pro',
      categoria: 'Cuerdas de saltar',
      precio: 45000,
      precioAnterior: 55000,
      imagen: 'https://via.placeholder.com/300x300?text=Cuerda',
      rating: 4.7,
      colores: ['Negro', 'Naranja'],
      marca: 'FitGear',
      etiqueta: '-18%'
    },
    {
      id: 7,
      nombre: 'Maleta Deportiva de Gimnasio',
      categoria: 'Bolsos y maletas',
      precio: 135000,
      imagen: 'https://via.placeholder.com/300x300?text=Maleta',
      rating: 4.6,
      colores: ['Negro', 'Gris', 'Azul'],
      marca: 'IronWear'
    },
    {
      id: 8,
      nombre: 'Shaker con Compartimentos 800ml',
      categoria: 'Shakers',
      precio: 48000,
      imagen: 'https://via.placeholder.com/300x300?text=Shaker+Pro',
      rating: 4.8,
      colores: ['Negro', 'Verde'],
      marca: 'ShakeMax',
      etiqueta: 'Nuevo'
    },
    {
      id: 9,
      nombre: 'Guantes Antideslizantes con Muñequera',
      categoria: 'Guantes',
      precio: 65000,
      imagen: 'https://via.placeholder.com/300x300?text=Guantes+Pro',
      rating: 4.5,
      colores: ['Negro'],
      marca: 'FitGear'
    }
  ];

  get productosFiltrados(): ProductoAccesorio[] {
    let resultado = [...this.productos];

    if (this.categoriaSeleccionada !== 'Todas') {
      resultado = resultado.filter(p => p.categoria === this.categoriaSeleccionada);
    }

    if (this.marcaSeleccionada !== 'Todas') {
      resultado = resultado.filter(p => p.marca === this.marcaSeleccionada);
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

  seleccionarCategoria(categoria: string): void {
    this.categoriaSeleccionada = categoria;
  }

  seleccionarMarca(marca: string): void {
    this.marcaSeleccionada = marca;
  }

  agregarAlCarrito(producto: ProductoAccesorio): void {
    console.log('Agregado al carrito:', producto.nombre);
  }

  formatearPrecio(valor: number): string {
    return valor.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 });
  }

  get estrellas(): number[] {
    return [1, 2, 3, 4, 5];
  }
}