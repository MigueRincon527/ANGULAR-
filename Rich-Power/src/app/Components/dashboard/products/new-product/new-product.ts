import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Productos } from '../../../../services/productos';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-product.html',
  styleUrls: ['./new-product.css']
})
export class NewProduct {
  private productosService = inject(Productos);
  private router = inject(Router);

  categorias: string[] = ['Proteina', 'creatina', 'pre-entrenos', 'accesorios'];

  nombre: string = '';
  descripcion: string = '';
  imagen: string = '';
  precio: number | null = null;
  cantidad: number | null = null;
  categoria: string = '';
  sku: string = '';
  disponible: boolean = true;

  guardando: boolean = false;
  errorMensaje: string = '';
  exitoMensaje: string = '';

  validarFormulario(): boolean {
    this.errorMensaje = '';

    if (!this.nombre.trim() || !this.descripcion.trim() || !this.imagen.trim() || !this.categoria) {
      this.errorMensaje = 'Completa todos los campos obligatorios.';
      return false;
    }

    if (this.precio === null || this.precio < 0) {
      this.errorMensaje = 'Ingresa un precio válido.';
      return false;
    }

    if (this.cantidad === null || this.cantidad < 0) {
      this.errorMensaje = 'Ingresa una cantidad válida.';
      return false;
    }

    return true;
  }

  crearProducto(): void {
    if (!this.validarFormulario()) return;

    this.guardando = true;
    this.errorMensaje = '';

    const nuevoProducto: any = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      imagen: this.imagen,
      precio: this.precio,
      cantidad: this.cantidad,
      categoria: this.categoria
    };

    // sku es opcional (unique + sparse en el modelo), solo lo mandamos si tiene valor
    if (this.sku.trim()) {
      nuevoProducto.sku = this.sku;
    }

    this.productosService.crearProducto(nuevoProducto).subscribe({
      next: () => {
        this.guardando = false;
        this.exitoMensaje = 'Producto creado correctamente.';
        setTimeout(() => this.router.navigate(['/dashboard/productos']), 1200);
      },
      error: (err) => {
        this.guardando = false;
        this.errorMensaje = err.error?.mensaje || 'Error al crear el producto.';
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/dashboard/productos']);
  }
}