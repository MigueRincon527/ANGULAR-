import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuarios } from '../../../../services/usuarios';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-user.html',
  styleUrls: ['./update-user.css']
})
export class UpdateUser implements OnInit {
  private usuariosService = inject(Usuarios);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  usuarioId: string = '';
  nombre: string = '';
  email: string = '';
  role: string = '';

  cargando: boolean = true;
  guardando: boolean = false;
  errorMensaje: string = '';
  exitoMensaje: string = '';

  ngOnInit(): void {
    this.usuarioId = this.route.snapshot.paramMap.get('id') || '';

    if (!this.usuarioId) {
      this.errorMensaje = 'No se especificó un usuario para editar.';
      this.cargando = false;
      return;
    }

    this.cargarUsuario();
  }

  cargarUsuario(): void {
    this.usuariosService.getUsuarioPorId(this.usuarioId).subscribe({
      next: (data: any) => {
        this.nombre = data.nombre;
        this.email = data.email;
        this.role = data.role;
        this.cargando = false;
      },
      error: (err) => {
        this.errorMensaje = 'No se pudo cargar el usuario.';
        this.cargando = false;
      }
    });
  }

  guardarCambios(): void {
    this.errorMensaje = '';
    this.exitoMensaje = '';
    this.guardando = true;

    const datosActualizados = {
      nombre: this.nombre,
      email: this.email,
      role: this.role
    };

    this.usuariosService.actualizarUsuario(this.usuarioId, datosActualizados).subscribe({
      next: () => {
        this.guardando = false;
        this.exitoMensaje = 'Usuario actualizado correctamente.';
        setTimeout(() => this.router.navigate(['/dashboard/usuarios']), 1200);
      },
      error: (err) => {
        this.guardando = false;
        this.errorMensaje = err.error?.message || 'Error al actualizar el usuario.';
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/dashboard/usuarios']);
  }
}