import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface MetricaCard {
  titulo: string;
  valor: string;
  cambio: number;
  icono: string;
  color: string;
}

interface Pedido {
  id: string;
  cliente: string;
  fecha: string;
  productos: number;
  total: number;
  estado: 'Pendiente' | 'Enviado' | 'Entregado' | 'Cancelado';
}

interface ProductoTop {
  id: number;
  nombre: string;
  categoria: string;
  imagen: string;
  unidadesVendidas: number;
  ingresos: number;
}

interface AlertaStock {
  id: number;
  nombre: string;
  stock: number;
  stockMinimo: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {
  rangoSeleccionado: string = '7dias';

  metricas: MetricaCard[] = [
    { titulo: 'Ventas totales', valor: '$12.480.000', cambio: 8.4, icono: '💰', color: '#ff6b35' },
    { titulo: 'Pedidos', valor: '284', cambio: 5.2, icono: '📦', color: '#3498db' },
    { titulo: 'Clientes nuevos', valor: '67', cambio: -2.1, icono: '👤', color: '#27ae60' },
    { titulo: 'Ticket promedio', valor: '$139.500', cambio: 3.6, icono: '🧾', color: '#9b59b6' }
  ];

  pedidosRecientes: Pedido[] = [
    { id: '#ORD-1042', cliente: 'Carlos Martínez', fecha: '09 sep 2026', productos: 3, total: 254000, estado: 'Pendiente' },
    { id: '#ORD-1041', cliente: 'Laura Pérez', fecha: '09 sep 2026', productos: 1, total: 95000, estado: 'Enviado' },
    { id: '#ORD-1040', cliente: 'Andrés Torres', fecha: '08 sep 2026', productos: 2, total: 178000, estado: 'Entregado' },
    { id: '#ORD-1039', cliente: 'María Gómez', fecha: '08 sep 2026', productos: 4, total: 412000, estado: 'Entregado' },
    { id: '#ORD-1038', cliente: 'Juan Rodríguez', fecha: '07 sep 2026', productos: 1, total: 65000, estado: 'Cancelado' },
    { id: '#ORD-1037', cliente: 'Paula Ramírez', fecha: '07 sep 2026', productos: 2, total: 235000, estado: 'Enviado' }
  ];

  productosTop: ProductoTop[] = [
    { id: 1, nombre: 'Whey Protein Gold Standard 2kg', categoria: 'Proteínas', imagen: 'https://via.placeholder.com/60?text=WP', unidadesVendidas: 142, ingresos: 26838000 },
    { id: 2, nombre: 'Creatina Monohidratada 500g', categoria: 'Creatinas', imagen: 'https://via.placeholder.com/60?text=CR', unidadesVendidas: 118, ingresos: 11210000 },
    { id: 3, nombre: 'Pre-Entreno Explosive 300g', categoria: 'Pre-entrenos', imagen: 'https://via.placeholder.com/60?text=PE', unidadesVendidas: 95, ingresos: 12350000 },
    { id: 4, nombre: 'Shaker Premium 700ml', categoria: 'Accesorios', imagen: 'https://via.placeholder.com/60?text=SH', unidadesVendidas: 87, ingresos: 3045000 }
  ];

  alertasStock: AlertaStock[] = [
    { id: 1, nombre: 'Caseína Micelar 900g', stock: 4, stockMinimo: 10 },
    { id: 2, nombre: 'Pre-Entreno Extreme Pump 250g', stock: 2, stockMinimo: 8 },
    { id: 3, nombre: 'Guantes de Entrenamiento Pro', stock: 6, stockMinimo: 15 }
  ];

  cambiarRango(rango: string): void {
    this.rangoSeleccionado = rango;
    console.log('Rango cambiado a:', rango);
    // Aquí recargarías las métricas desde el backend según el rango
  }

  formatearPrecio(valor: number): string {
    return valor.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 });
  }

  claseEstado(estado: string): string {
    switch (estado) {
      case 'Pendiente': return 'estado-pendiente';
      case 'Enviado': return 'estado-enviado';
      case 'Entregado': return 'estado-entregado';
      case 'Cancelado': return 'estado-cancelado';
      default: return '';
    }
  }

  get porcentajeStock(): (alerta: AlertaStock) => number {
    return (alerta: AlertaStock) => Math.min((alerta.stock / alerta.stockMinimo) * 100, 100);
  }
}