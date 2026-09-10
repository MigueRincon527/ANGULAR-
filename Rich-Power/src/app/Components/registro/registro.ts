import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css']
})
export class Registro {
  nombre: string = '';
  email: string = '';
  password: string = '';
  confirmarPassword: string = '';
  aceptaTerminos: boolean = false;
  mostrarPassword: boolean = false;

  cargando: boolean = false;
  errorMensaje: string = '';

  constructor(private router: Router) {}

  togglePassword(): void {
    this.mostrarPassword = !this.mostrarPassword;
  }

  get fortalezaPassword(): { nivel: number; texto: string; color: string } {
    const pass = this.password;
    if (!pass) return { nivel: 0, texto: '', color: '#eee' };

    let puntos = 0;
    if (pass.length >= 6) puntos++;
    if (pass.length >= 10) puntos++;
    if (/[A-Z]/.test(pass) && /[0-9]/.test(pass)) puntos++;
    if (/[^A-Za-z0-9]/.test(pass)) puntos++;

    if (puntos <= 1) return { nivel: 1, texto: 'Débil', color: '#e74c3c' };
    if (puntos <= 2) return { nivel: 2, texto: 'Media', color: '#f39c12' };
    if (puntos <= 3) return { nivel: 3, texto: 'Buena', color: '#3498db' };
    return { nivel: 4, texto: 'Fuerte', color: '#27ae60' };
  }

  validarFormulario(): boolean {
    this.errorMensaje = '';

    if (!this.nombre.trim() || !this.email.trim() || !this.password.trim() || !this.confirmarPassword.trim()) {
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

    if (this.password !== this.confirmarPassword) {
      this.errorMensaje = 'Las contraseñas no coinciden.';
      return false;
    }

    if (!this.aceptaTerminos) {
      this.errorMensaje = 'Debes aceptar los términos y condiciones.';
      return false;
    }

    return true;
  }

  registrar(): void {
    if (!this.validarFormulario()) return;

    this.cargando = true;

    // Aquí llamarías a tu AuthService real
    setTimeout(() => {
      this.cargando = false;
      console.log('Usuario registrado:', {
        nombre: this.nombre,
        email: this.email,
        password: this.password
      });
      // this.router.navigate(['/login']);
    }, 1200);
  }

  registrarConGoogle(): void {
    console.log('Registro con Google');
  }
}