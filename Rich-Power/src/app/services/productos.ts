import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class Productos {
    private apiUrl: string = 'http://localhost:3000';
    private http = inject(HttpClient);

    // GET - Obtener todos los productos
    getProductos() {
        return this.http.get(`${this.apiUrl}/routes/productosRoutes`);
    }

    // GET - Obtener productos por categoría
    getProductosPorCategoria(categoria: string) {
        return this.http.get(`${this.apiUrl}/routes/productosRoutes/categoria/${categoria}`);
    }

    // GET - Obtener un producto por ID
    getProductoPorId(id: string) {
        return this.http.get(`${this.apiUrl}/routes/productosRoutes/${id}`);
    }

    // POST - Crear un nuevo producto
    crearProducto(data: any) {
        return this.http.post(`${this.apiUrl}/routes/productosRoutes`, data);
    }

    // PUT - Actualizar un producto
    actualizarProducto(id: string, data: any) {
        return this.http.put(`${this.apiUrl}/routes/productosRoutes/${id}`, data);
    }

    // DELETE - Eliminar un producto
    eliminarProducto(id: string) {
        return this.http.delete(`${this.apiUrl}/routes/productosRoutes/${id}`);
    }
}