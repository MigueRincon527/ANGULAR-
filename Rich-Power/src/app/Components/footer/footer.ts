import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface EnlaceFooter {
  etiqueta: string;
  ruta: string;
}

interface RedSocial {
  nombre: string;
  icono: string;
  url: string;
}

interface MetodoPago {
  nombre: string;
  icono: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class Footer {
  anioActual: number = new Date().getFullYear();

  email: string = '';
  suscrito: boolean = false;

  telefono: string = '+57 300 123 4567';
  correo: string = 'contacto@fitsupps.com';
  direccion: string = 'Cra 45 #26-85, Bogotá, Colombia';
  horario: string = 'Lun - Sáb: 8:00am - 7:00pm';

  redesSociales: RedSocial[] = [
    { nombre: 'Facebook', icono: '📘', url: 'https://facebook.com' },
    { nombre: 'Instagram', icono: '📷', url: 'https://instagram.com' },
    { nombre: 'TikTok', icono: '🎵', url: 'https://tiktok.com' },
    { nombre: 'YouTube', icono: '▶️', url: 'https://youtube.com' },
    { nombre: 'WhatsApp', icono: '💬', url: 'https://wa.me/573001234567' }
  ];

  enlacesTienda: EnlaceFooter[] = [
    { etiqueta: 'Proteínas', ruta: '/proteinas' },
    { etiqueta: 'Creatinas', ruta: '/creatinas' },
    { etiqueta: 'Pre-entrenos', ruta: '/preentrenos' },
    { etiqueta: 'Accesorios', ruta: '/accesorios' }
  ];

  enlacesEmpresa: EnlaceFooter[] = [
    { etiqueta: 'Sobre nosotros', ruta: '/nosotros' },
    { etiqueta: 'Contacto', ruta: '/contacto' },
    { etiqueta: 'Blog', ruta: '/blog' },
    { etiqueta: 'Trabaja con nosotros', ruta: '/empleos' }
  ];

  enlacesAyuda: EnlaceFooter[] = [
    { etiqueta: 'Preguntas frecuentes', ruta: '/faq' },
    { etiqueta: 'Envíos y entregas', ruta: '/envios' },
    { etiqueta: 'Cambios y devoluciones', ruta: '/devoluciones' },
    { etiqueta: 'Política de privacidad', ruta: '/privacidad' },
    { etiqueta: 'Términos y condiciones', ruta: '/terminos' }
  ];

  metodosPago: MetodoPago[] = [
    { nombre: 'Visa', icono: '💳' },
    { nombre: 'Mastercard', icono: '💳' },
    { nombre: 'PSE', icono: '🏦' },
    { nombre: 'Nequi', icono: '📱' },
    { nombre: 'Contraentrega', icono: '💵' }
  ];

  suscribirse(): void {
    if (this.email.trim()) {
      this.suscrito = true;
      console.log('Suscrito con el correo:', this.email);
      setTimeout(() => (this.suscrito = false), 3000);
      this.email = '';
    }
  }
}