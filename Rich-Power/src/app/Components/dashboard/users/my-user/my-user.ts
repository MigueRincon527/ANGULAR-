import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Auth } from '../../../../services/auth';

@Component({
  selector: 'app-my-user',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-user.html',
  styleUrls: ['./my-user.css']
})
export class MyUser implements OnInit {
  private authService = inject(Auth);

  usuario: any = null;
  cargando: boolean = true;
  errorMensaje: string = '';

  ngOnInit(): void {
    this.cargarMiPerfil();
  }

  cargarMiPerfil(): void {
    this.authService.getMe().subscribe({
      next: (response: any) => {
        this.usuario = response.usuario;
        this.cargando = false;
      },
      error: (err) => {
        this.errorMensaje = 'No se pudo cargar tu información.';
        this.cargando = false;
      }
    });
  }
}