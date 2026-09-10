import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ProductoCarrito {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen?: string;
}

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.css']
})
export class Carrito {
  productos: ProductoCarrito[] = [
    { id: 1, nombre: 'Proteina', precio: 45000, cantidad: 1, imagen: 'https://via.placeholder.com/80' },
    { id: 2, nombre: 'Creatina', precio: 89000, cantidad: 2, imagen: 'https://via.placeholder.com/80' },
    { id: 3, nombre: 'Straps', precio: 150000, cantidad: 1, imagen: 'https://via.placeholder.com/80' }
  ];

  aumentarCantidad(producto: ProductoCarrito): void {
    producto.cantidad++;
  }

  disminuirCantidad(producto: ProductoCarrito): void {
    if (producto.cantidad > 1) {
      producto.cantidad--;
    }
  }

  eliminarProducto(id: number): void {
    this.productos = this.productos.filter(p => p.id !== id);
  }

  get subtotal(): number {
    return this.productos.reduce((total, p) => total + p.precio * p.cantidad, 0);
  }

  get envio(): number {
    return this.productos.length > 0 ? 10000 : 0;
  }

  get total(): number {
    return this.subtotal + this.envio;
  }

  vaciarCarrito(): void {
    this.productos = [];
  }

  formatearPrecio(valor: number): string {
    return valor.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 });
  }
}