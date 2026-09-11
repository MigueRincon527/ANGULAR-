import { Component, inject } from '@angular/core';
import { RouterLink, Router } from "@angular/router";
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth'; // ajusta la ruta según tu estructura

@Component({
  imports: [RouterLink, CommonModule],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  private authService = inject(Auth);
  private router = inject(Router);

  get estaLogueado(): boolean {
    return this.authService.isLoggedIn();
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}