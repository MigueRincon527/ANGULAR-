import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class Usuarios {
    private apiUrl: string = 'http://localhost:3000';
    private http = inject(HttpClient);

    getUsuarios() {
        return this.http.get(`${this.apiUrl}/usuarios`);          // antes: /routes/usuariosRoutes
    }

    getUsuarioPorId(id: string) {
        return this.http.get(`${this.apiUrl}/usuarios/${id}`);
    }

    crearUsuario(data: any) {
        return this.http.post(`${this.apiUrl}/usuarios`, data);
    }

    actualizarUsuario(id: string, data: any) {
        return this.http.put(`${this.apiUrl}/usuarios/${id}`, data);
    }

    eliminarUsuario(id: string) {
        return this.http.delete(`${this.apiUrl}/usuarios/${id}`);
    }
}