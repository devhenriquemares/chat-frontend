import { Routes } from '@angular/router';
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