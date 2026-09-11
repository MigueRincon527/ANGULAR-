import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class Productos {
    private apiUrl: string = 'http://localhost:3000';
    private http = inject(HttpClient);

    getProductos() {
        return this.http.get(`${this.apiUrl}/productos`);          // antes: /routes/productosRoutes
    }

    getProductosPorCategoria(categoria: string) {
        return this.http.get(`${this.apiUrl}/productos/categoria/${categoria}`);
    }

    getProductoPorId(id: string) {
        return this.http.get(`${this.apiUrl}/productos/${id}`);
    }

    crearProducto(data: any) {
        return this.http.post(`${this.apiUrl}/productos`, data);
    }

    actualizarProducto(id: string, data: any) {
        return this.http.put(`${this.apiUrl}/productos/${id}`, data);
    }

    eliminarProducto(id: string) {
        return this.http.delete(`${this.apiUrl}/productos/${id}`);
    }
}