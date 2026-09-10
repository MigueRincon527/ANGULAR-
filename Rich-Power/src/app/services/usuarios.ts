import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class Usuarios {
    private apiUrl: string = 'http://localhost:3000';
    private http = inject(HttpClient);

    // GET - Obtener todos los usuarios (público)
    getUsuarios() {
        return this.http.get(`${this.apiUrl}/routes/usuariosRoutes`);
    }

    // GET - Obtener un usuario por ID (protegida: requiere token)
    getUsuarioPorId(id: string) {
        return this.http.get(`${this.apiUrl}/routes/usuariosRoutes/${id}`);
    }

    // POST - Crear un nuevo usuario (público - esto es básicamente tu registro)
    crearUsuario(data: any) {
        return this.http.post(`${this.apiUrl}/routes/usuariosRoutes`, data);
    }

    // PUT - Actualizar un usuario (protegida: solo admin)
    actualizarUsuario(id: string, data: any) {
        return this.http.put(`${this.apiUrl}/routes/usuariosRoutes/${id}`, data);
    }

    // DELETE - Eliminar un usuario (protegida: solo admin)
    eliminarUsuario(id: string) {
        return this.http.delete(`${this.apiUrl}/routes/usuariosRoutes/${id}`);
    }
}