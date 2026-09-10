import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Usuarios } from '../../../../services/usuarios';
import { Auth } from '../../../../services/auth';

@Component({
  selector: 'app-my-user',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-user.html',
  styleUrls: ['./my-user.css']
})
export class MyUser implements OnInit {
  private usuariosService = inject(Usuarios);
  private authService = inject(Auth);

  usuario: any = null;
  cargando: boolean = true;
  errorMensaje: string = '';

  ngOnInit(): void {
    this.cargarMiUsuario();
  }

  cargarMiUsuario(): void {
    const id = this.authService.getUserId();

    if (!id) {
      this.errorMensaje = 'No se pudo identificar tu usuario. Vuelve a iniciar sesión.';
      this.cargando = false;
      return;
    }

    this.usuariosService.getUsuarioPorId(id).subscribe({
      next: (data: any) => {
        this.usuario = data;
        this.cargando = false;
      },
      error: (err) => {
        this.errorMensaje = 'No se pudo cargar tu información.';
        this.cargando = false;
      }
    });
  }
}