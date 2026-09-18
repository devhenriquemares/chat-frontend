import { Component, effect, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { authRoutes } from '../../pages/auth/auth.routes';

@Component({
  selector: 'auth-card',
  imports: [RouterLink],
  templateUrl: './auth-card.html',
  styleUrl: './auth-card.css',
})
export class AuthCard {
    constructor() {
        effect(() => {
            if (this.page() === "Register") {
                this.isRegisterPage = true
            }
        })
    }

    page = input.required<"Register" | "Login">()
    isRegisterPage = false
}
