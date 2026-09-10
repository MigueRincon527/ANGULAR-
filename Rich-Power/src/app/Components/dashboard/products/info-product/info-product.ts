import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Productos } from '../../../../services/productos';

@Component({
  selector: 'app-info-product',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './info-product.html',
  styleUrls: ['./info-product.css']
})
export class InfoProduct implements OnInit {
  private productosService = inject(Productos);
  private route = inject(ActivatedRoute);

  producto: any = null;
  cargando: boolean = true;
  errorMensaje: string = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';

    if (!id) {
      this.errorMensaje = 'Producto no encontrado.';
      this.cargando = false;
      return;
    }

    this.productosService.getProductoPorId(id).subscribe({
      next: (response: any) => {
        this.producto = response.datos;
        this.cargando = false;
      },
      error: (err) => {
        this.errorMensaje = 'No se pudo cargar el producto.';
        this.cargando = false;
      }
    });
  }
}