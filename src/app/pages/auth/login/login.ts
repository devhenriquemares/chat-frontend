import { Component } from '@angular/core';
import { AuthCard } from '../../../components/auth-card/auth-card';
import { FormInput } from '../../../components/form-input/form-input';

@Component({
  selector: 'app-login',
  imports: [AuthCard, FormInput],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {}
