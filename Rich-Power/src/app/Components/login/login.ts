import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth'; // ajusta la ruta según tu estructura de carpetas

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  email: string = '';
  password: string = '';
  recordarme: boolean = false;
  mostrarPassword: boolean = false;

  cargando: boolean = false;
  errorMensaje: string = '';

  private router = inject(Router);
  private authService = inject(Auth);

  togglePassword(): void {
    this.mostrarPassword = !this.mostrarPassword;
  }

  validarFormulario(): boolean {
    this.errorMensaje = '';

    if (!this.email.trim() || !this.password.trim()) {
      this.errorMensaje = 'Por favor completa todos los campos.';
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorMensaje = 'Ingresa un correo electrónico válido.';
      return false;
    }

    if (this.password.length < 6) {
      this.errorMensaje = 'La contraseña debe tener al menos 6 caracteres.';
      return false;
    }

    return true;
  }

  iniciarSesion(): void {
    if (!this.validarFormulario()) return;

    this.cargando = true;
    this.errorMensaje = '';

    const credenciales = {
      email: this.email,
      password: this.password
    };

    this.authService.login(credenciales).subscribe({
      next: (response: any) => {
        this.cargando = false;

        // Ajusta 'token' y 'role' según lo que realmente devuelva tu backend
        const token = response.token;
        const role = response.role ?? response.user?.role;

        this.authService.saveToken(token, role);

        // Redirige siempre al home tras un login exitoso
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.cargando = false;
        this.errorMensaje = err.error?.message || 'Credenciales incorrectas. Intenta de nuevo.';
      }
    });
  }

  loginConGoogle(): void {
    console.log('Login con Google');
  }
}