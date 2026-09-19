import { Component, signal } from "@angular/core";
import { AuthCard } from "../../components/auth-card/auth-card";
import { Options, ViewSwitcher } from "../../components/view-switcher/view-switcher";
import { FormInput } from "../../components/form-input/form-input";

interface RegisterErrors {
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
    errors: RegisterErrors = {
        username: null,
        email: null,
        password: null
    }
    optionSelected = signal<Options>("Left")

    handleLeftClick() {
        this.optionSelected.set("Left")
    }

    handleRightClick() {
        this.optionSelected.set("Right")
    }
}