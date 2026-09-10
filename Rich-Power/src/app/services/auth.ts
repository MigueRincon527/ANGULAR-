import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";


@Injectable({
    providedIn : 'root'
})

export class Auth{
    private apiUrl : string = 'http://localhost:3000';
    private http = inject(HttpClient);

    register(data : any){
        return this.http.post(this.apiUrl + '/routes/usuariosRoutes', data)
    }
    login (data : any){
        return this.http.post(this.apiUrl + '/api/auth/login', data)
    }

    saveToken(token : string, role : string){
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
    }

    getToken(){
        return localStorage.getItem('token');
    }

    logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    }

    isLoggedIn(){
        return !!localStorage.getItem('token');
    }

    isAdmin(){
        const role = localStorage.getItem('role');
        return role === 'admin' 
    }

    getRole(){
        return localStorage.getItem('role')
    }

    verfyUser(token : string){
        return this.http.get(`${this.apiUrl}/api/auth/verify/${token}`)
    }
}

