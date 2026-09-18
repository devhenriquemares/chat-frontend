import { Routes } from '@angular/router';
import { Register } from './pages/auth/register/register';
import { authRoutes } from './pages/auth/auth.routes';
import { Home } from './pages/home/home';

export const routes: Routes = [
    {
        path: 'auth',
        children: authRoutes
    },
    {
        path: 'home',
        component: Home
    }
];