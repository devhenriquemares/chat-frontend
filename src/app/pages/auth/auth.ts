import { Component, inject, signal } from "@angular/core";
import { Options, ViewSwitcher } from "../../components/view-switcher/view-switcher";
import { FormInput } from "../../components/form-input/form-input";
import { AuthService } from "../../services/auth/auth.service";
import { ApiError } from "../../services/api/dtos/http.error";
import { HttpErrorResponse } from "@angular/common/http";

export interface AuthErrors {
    username: string | null,
    email: string | null,
    password: string | null
}

@Component({
    selector: 'auth',
    imports: [FormInput, ViewSwitcher],
    templateUrl: './auth.html',
})
export class Auth {
    private authService = inject(AuthService)

    errors = signal<AuthErrors>({
        username: null,
        email: null,
        password: null
    })
    optionSelected = signal<Options>("Left")

    usernameText = signal('')
    passwordText = signal('')
    emailText = signal('')

    onSubmit(event: Event) {
        event.preventDefault()

        this.optionSelected() === "Left" ? this.register() : this.login()
    }

    handleLeftClick() {
        this.optionSelected.set("Left")
    }

    handleRightClick() {
        this.optionSelected.set("Right")
    }

    private register() {
        const errors = this.authService.sendRegister({
            username: this.usernameText(),
            email: this.emailText(),
            password: this.passwordText()
        })
    }

    private login() {
        this.resetErrors()

        this.authService.sendLogin({
            email: this.emailText(),
            password: this.passwordText()
        }).subscribe({
            next: (response) => {
                console.log(response)
            },
            error: (error) => this.handleApiFieldErrors(error)
        })
    }

    

    private resetErrors() {
        this.errors.set({ username: null, email: null, password: null })
    }
}