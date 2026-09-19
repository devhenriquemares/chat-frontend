import { Routes } from '@angular/router';
import { Register } from './pages/auth/register/register';
import { authRoutes } from './pages/auth/auth.routes';
import { Home } from './pages/home/home';
import { Auth } from './pages/auth/auth';

export const routes: Routes = [
    {
        path: 'auth',
        component: Auth
    },
    {
        path: 'home',
        component: Home
    }
];