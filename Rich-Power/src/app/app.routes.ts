import { Routes } from '@angular/router';
import { Home } from './Components/home/home';
import { Login } from './Components/login/login';
import { Registro } from './Components/registro/registro';
import { CatalogoProteinas } from './Components/catalogo-proteinas/catalogo-proteinas';
import { CatalogoCreatinas } from './Components/catalogo-creatinas/catalogo-creatinas';
import { CatalogoPreentrenos } from './Components/catalogo-preentrenos/catalogo-preentrenos';
import { CatalogoAccesorios } from './Components/catalogo-accesorios/catalogo-accesorios';
import { Carrito } from './Components/carrito/carrito';
import { Dashboard } from './Components/dashboard/dashboard';
import { adminGuard } from './guards/admin.guards';

export const routes: Routes = [
    //Ruta principal Home
    {path :'', redirectTo : 'home', pathMatch: 'full'},
    //Rutas
    {path : 'home', component : Home},
    {path : 'login', component : Login},
    {path : 'register', component : Registro},
    {path : 'proteinas', component : CatalogoProteinas},
    {path : 'creatinas', component : CatalogoCreatinas},
    {path : 'pre-entrenos', component : CatalogoPreentrenos},
    {path : 'accesorios', component : CatalogoAccesorios},
    {path : 'carrito', component : Carrito},

    //ruta protegida
    {path : 'dashboard', component : Dashboard, canActivate : [adminGuard]},

    //Ruta principal Home
    {path :'', redirectTo : 'home', pathMatch: 'full'},
    {path : '**', redirectTo : 'home' }
];
