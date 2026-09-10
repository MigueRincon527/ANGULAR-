import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Usuarios } from '../../../../services/usuarios';

@Component({
  selector: 'app-all-user',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './all-user.html',
  styleUrls: ['./all-user.css']
})
export class AllUser implements OnInit {
  private usuariosService = inject(Usuarios);

  usuarios: any[] = [];
  cargando: boolean = true;
  errorMensaje: string = '';

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.cargando = true;
    this.usuariosService.getUsuarios().subscribe({
      next: (data: any) => {
        this.usuarios = data;
        this.cargando = false;
      },
      error: (err) => {
        this.errorMensaje = 'No se pudieron cargar los usuarios.';
        this.cargando = false;
      }
    });
  }

  eliminarUsuario(id: string): void {
    const confirmar = confirm('¿Estás seguro de eliminar este usuario?');
    if (!confirmar) return;

    this.usuariosService.eliminarUsuario(id).subscribe({
      next: () => {
        this.usuarios = this.usuarios.filter((u: any) => u._id !== id);
      },
      error: (err) => {
        alert('Error al eliminar el usuario.');
      }
    });
  }
}