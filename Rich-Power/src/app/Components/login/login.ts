import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

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

  constructor(private router: Router) {}

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

    // Aquí llamarías a tu AuthService real
    setTimeout(() => {
      this.cargando = false;
      console.log('Inicio de sesión con:', this.email, this.password, this.recordarme);
      // this.router.navigate(['/home']);
    }, 1200);
  }

  loginConGoogle(): void {
    console.log('Login con Google');
  }
}