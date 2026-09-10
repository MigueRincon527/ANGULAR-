import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Productos } from '../../../../services/productos';
import { Auth } from '../../../../services/auth';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './all-products.html',
  styleUrls: ['./all-products.css']
})
export class AllProducts implements OnInit {
  private productosService = inject(Productos);
  private authService = inject(Auth);

  productos: any[] = [];
  cargando: boolean = true;
  errorMensaje: string = '';

  ngOnInit(): void {
    this.cargarProductos();
  }

  get esAdmin(): boolean {
    return this.authService.isAdmin();
  }

  cargarProductos(): void {
    this.cargando = true;
    this.productosService.getProductos().subscribe({
      next: (response: any) => {
        this.productos = response.datos; // el backend envuelve en { exitoso, cantidad, datos }
        this.cargando = false;
      },
      error: (err) => {
        this.errorMensaje = 'No se pudieron cargar los productos.';
        this.cargando = false;
      }
    });
  }

  eliminarProducto(id: string): void {
    const confirmar = confirm('¿Estás seguro de eliminar este producto?');
    if (!confirmar) return;

    this.productosService.eliminarProducto(id).subscribe({
      next: () => {
        this.productos = this.productos.filter((p: any) => p._id !== id);
      },
      error: (err) => {
        alert('Error al eliminar el producto.');
      }
    });
  }
}