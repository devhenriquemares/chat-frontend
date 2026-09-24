import { Component, inject, signal } from "@angular/core";
import { Options, ViewSwitcher } from "../../components/view-switcher/view-switcher";
import { FormInput } from "../../components/form-input/form-input";
import { AuthService } from "../../services/auth/auth.service";
import { ApiError, FieldError } from "../../dtos/api/http.error";
import { NotificationCard } from "../../components/notification-card/notification-card";
import { Router } from "@angular/router";
import { ApiResponseDTO } from "../../dtos/api/response.dto";
import { AuthResponseDTO } from "../../dtos/auth/auth.response.dto";
import { UserDataManager } from "../../managers/user/user-data.manager";

export interface AuthErrors {
    username: string | null,
    email: string | null,
    password: string | null
}

@Component({
    selector: 'auth',
    imports: [FormInput, ViewSwitcher, NotificationCard],
    templateUrl: './auth.html',
})
export class Auth {
    private authService = inject(AuthService)
    private router = inject(Router)

    fieldErrors = signal<AuthErrors>({
        username: null,
        email: null,
        password: null
    })
    optionSelected = signal<Options>("Left")
    usernameText = signal('')
    passwordText = signal('')
    emailText = signal('')
    cardMessage = signal('')
    success = false

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

    handleCardClose() {
        this.cardMessage.set('')
        if (this.success) {
            if (!this.authService.isUserEmailVerified()) {
                this.router.navigate(['email-validation'])
                return
            }
            this.router.navigate(['home'])
        }
    }

    private async register() {
        const result = await this.authService.sendRegister({
            username: this.usernameText(),
            email: this.emailText(),
            password: this.passwordText()
        })

        this.handleResponse(result)
    }

    private async login() {
        const result = await this.authService.sendLogin({
            email: this.emailText(),
            password: this.passwordText()
        })

        this.handleResponse(result)
    }

    private handleResponse(result: ApiResponseDTO<AuthResponseDTO>) {
        this.resetFieldErrors()
        this.success = result.success

        if (!result.success) {
            const error = result.error!
            this.handleErrors(error)
            return
        }

        const { userResponse } = result.data!
        this.cardMessage.set(`Bem-vindo(a) ${userResponse.username}!`)
        UserDataManager.saveData(userResponse)
    }

    private handleErrors(error: ApiError) {
        if (error.code === "EMAIL_OR_PASSWORD_INVALID") {
            this.cardMessage.set("Email ou senha incorretos")
        } else if (error.code === "EMAIL_ALREADY_EXISTS") {
            this.cardMessage.set("Email já cadastrado no sistema")
        } else if (error.errors.length > 0) { 
            this.handleFieldErrors(error.errors)
        } else {
            this.cardMessage.set('Alguma coisa deu errado, tente novamente mais tarde')
        }
    }

    private handleFieldErrors(errors: FieldError[]) {
        errors.forEach(error => {
            this.fieldErrors.update(current => ({
                ...current,
                [error.field]: error.error
            }))
        })
    }

    private resetFieldErrors() {
        this.fieldErrors.set({ username: null, email: null, password: null })
    }
}