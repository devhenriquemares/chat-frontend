import { inject, Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { RegisterRequestDTO } from './dtos/register.request.dto';
import { LoginRequesDTO } from './dtos/login.request.dto';
import { AuthResponseDTO } from './dtos/auth.response.dto';
import { ApiError, FieldError } from '../api/dtos/http.error';
import { ApiErrorHandler } from '../../handlers/api-error.handler';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private apiService = inject(ApiService)
    private apiErrorHandler = inject(ApiErrorHandler)

    async sendRegister(request: RegisterRequestDTO) {
        // const response = await firstValueFrom(this.apiService.post<AuthResponseDTO>("auth/register", request))
        //     .catch((error: HttpErrorResponse) => {
        //         const apiError: ApiError = error.error
        //         console.error(apiError)

        //         if (if )
        //     })
    }

    async sendLogin(request: LoginRequesDTO): Promise<AuthResponseDTO | FieldError[] | string | void> {
        try {
            const response = await firstValueFrom(this.apiService.post<AuthResponseDTO>("auth/login", request))
            return response
        } catch (error) {
            const httpError = (error as HttpErrorResponse)
            const apiError: ApiError = httpError.error
            console.error(apiError)

            if (httpError.status === 400) {
                if (apiError.errors.length > 0) return apiError.errors
                return apiError.message
            }
        }
    }
}
