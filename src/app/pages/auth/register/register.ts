import { Component } from '@angular/core';
import { AuthCard } from '../../../components/auth-card/auth-card';
import { FormInput } from '../../../components/form-input/form-input';

interface RegisterErrors {
    username: string | null,
    email: string | null,
    password: string | null
}

@Component({
  selector: 'app-register',
  imports: [AuthCard, FormInput],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
    errors: RegisterErrors = {
        username: null,
        email: null,
        password: null
    }
}
