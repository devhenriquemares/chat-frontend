import { Component, effect, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { authRoutes } from '../../pages/auth/auth.routes';
import { Options, ViewSwitcher } from '../view-switcher/view-switcher';

@Component({
  selector: 'auth-card',
  imports: [ViewSwitcher],
  templateUrl: './auth-card.html',
  styleUrl: './auth-card.css',
})
export class AuthCard {
    router = inject(Router)
    submitButtonText = input.required<string>()
    optionSelected: Options = "Left"

    handleLeftClick() {
        this.router.navigate(['/auth/register'])
    }

    handleRightClick() {
        this.router.navigate(['/auth/login'])
    }
}
