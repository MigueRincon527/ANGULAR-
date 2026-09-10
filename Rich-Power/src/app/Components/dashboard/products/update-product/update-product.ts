import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Productos } from '../../../../services/productos';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-product.html',
  styleUrls: ['./update-product.css']
})
export class UpdateProduct implements OnInit {
  private productosService = inject(Productos);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  categorias: string[] = ['Proteina', 'creatina', 'pre-entrenos', 'accesorios'];

  productoId: string = '';
  nombre: string = '';
  descripcion: string = '';
  imagen: string = '';
  precio: number | null = null;
  cantidad: number | null = null;
  categoria: string = '';
  sku: string = '';
  disponible: boolean = true;

  cargando: boolean = true;
  guardando: boolean = false;
  errorMensaje: string = '';
  exitoMensaje: string = '';

  ngOnInit(): void {
    this.productoId = this.route.snapshot.paramMap.get('id') || '';

    if (!this.productoId) {
      this.errorMensaje = 'No se especificó un producto para editar.';
      this.cargando = false;
      return;
    }

    this.cargarProducto();
  }

  cargarProducto(): void {
    this.productosService.getProductoPorId(this.productoId).subscribe({
      next: (response: any) => {
        const p = response.datos;
        this.nombre = p.nombre;
        this.descripcion = p.descripcion;
        this.imagen = p.imagen;
        this.precio = p.precio;
        this.cantidad = p.cantidad;
        this.categoria = p.categoria;
        this.sku = p.sku || '';
        this.disponible = p.disponible;
        this.cargando = false;
      },
      error: (err) => {
        this.errorMensaje = 'No se pudo cargar el producto.';
        this.cargando = false;
      }
    });
  }

  guardarCambios(): void {
    this.errorMensaje = '';
    this.exitoMensaje = '';
    this.guardando = true;

    const datosActualizados: any = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      imagen: this.imagen,
      precio: this.precio,
      cantidad: this.cantidad,
      categoria: this.categoria,
      disponible: this.disponible
    };

    if (this.sku.trim()) {
      datosActualizados.sku = this.sku;
    }

    this.productosService.actualizarProducto(this.productoId, datosActualizados).subscribe({
      next: () => {
        this.guardando = false;
        this.exitoMensaje = 'Producto actualizado correctamente.';
        setTimeout(() => this.router.navigate(['/dashboard/productos']), 1200);
      },
      error: (err) => {
        this.guardando = false;
        this.errorMensaje = err.error?.mensaje || 'Error al actualizar el producto.';
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/dashboard/productos']);
  }
}