import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  precioAnterior?: number;
  imagen: string;
  rating: number;
  etiqueta?: string;
}

interface Categoria {
  id: number;
  nombre: string;
  icono: string;
}

interface Beneficio {
  icono: string;
  titulo: string;
  descripcion: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  email: string = '';
  suscrito: boolean = false;

  categorias: Categoria[] = [
    { id: 1, nombre: 'Proteínas', icono: '💪' },
    { id: 2, nombre: 'Pre-entreno', icono: '⚡' },
    { id: 3, nombre: 'Vitaminas', icono: '💊' },
    { id: 4, nombre: 'Creatina', icono: '🔥' },
    { id: 5, nombre: 'Aminoácidos', icono: '🧬' },
    { id: 6, nombre: 'Quemadores', icono: '🔥' }
  ];

  productosDestacados: Producto[] = [
    {
      id: 1,
      nombre: 'Whey Protein Gold Standard',
      categoria: 'Proteínas',
      precio: 189000,
      precioAnterior: 220000,
      imagen: 'https://via.placeholder.com/300x300?text=Whey+Protein',
      rating: 4.8,
      etiqueta: 'Más vendido'
    },
    {
      id: 2,
      nombre: 'Creatina Monohidratada 500g',
      categoria: 'Creatina',
      precio: 95000,
      imagen: 'https://via.placeholder.com/300x300?text=Creatina',
      rating: 4.9,
      etiqueta: 'Nuevo'
    },
    {
      id: 3,
      nombre: 'Pre-Entreno Explosive',
      categoria: 'Pre-entreno',
      precio: 130000,
      precioAnterior: 155000,
      imagen: 'https://via.placeholder.com/300x300?text=Pre-Entreno',
      rating: 4.6,
      etiqueta: '-15%'
    },
    {
      id: 4,
      nombre: 'Multivitamínico Diario',
      categoria: 'Vitaminas',
      precio: 65000,
      imagen: 'https://via.placeholder.com/300x300?text=Multivitaminico',
      rating: 4.7
    }
  ];

  beneficios: Beneficio[] = [
    { icono: '🚚', titulo: 'Envío rápido', descripcion: 'Recibe tu pedido en 24-48 horas hábiles' },
    { icono: '✅', titulo: 'Productos originales', descripcion: '100% garantizados y sellados de fábrica' },
    { icono: '🔒', titulo: 'Pago seguro', descripcion: 'Múltiples métodos de pago protegidos' },
    { icono: '💬', titulo: 'Asesoría experta', descripcion: 'Te ayudamos a elegir el suplemento ideal' }
  ];

  formatearPrecio(valor: number): string {
    return valor.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 });
  }

  agregarAlCarrito(producto: Producto): void {
    console.log('Producto agregado al carrito:', producto.nombre);
    // Aquí llamarías a tu CarritoService
  }

  suscribirse(): void {
    if (this.email.trim()) {
      this.suscrito = true;
      console.log('Suscrito con el correo:', this.email);
      setTimeout(() => (this.suscrito = false), 3000);
      this.email = '';
    }
  }

  filtrarPorCategoria(categoria: Categoria): void {
    console.log('Filtrando por categoría:', categoria.nombre);
    // Aquí navegarías a la vista de catálogo filtrada
  }

  get estrellas(): number[] {
    return [1, 2, 3, 4, 5];
  }
}