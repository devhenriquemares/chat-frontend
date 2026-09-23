import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Auth } from './pages/auth/auth';
import { authGuard } from './guards/auth.guard';
import { EmailValidation } from './pages/email-validation/email-validation';

export const routes: Routes = [
    { path: 'auth', component: Auth },
    { path: 'email-validation', component: EmailValidation },
    {
        path: '',
        canActivate: [authGuard],
        children: [
            { path: 'home', component: Home },
        ]
    },
];