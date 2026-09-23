import { inject, Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { RegisterRequestDTO } from '../../dtos/auth/register.request.dto';
import { LoginRequesDTO } from '../../dtos/auth/login.request.dto';
import { AuthResponseDTO } from '../../dtos/auth/auth.response.dto';
import { TokenManager } from '../../managers/token/token.manager';
import { HttpMethod } from '../../enums/api/http-method.enum';
import { ApiResponseDTO } from '../../dtos/api/response.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private apiService = inject(ApiService)
    private tokenManager = inject(TokenManager)

    async sendRegister(request: RegisterRequestDTO): Promise<ApiResponseDTO<AuthResponseDTO>> {
        const result = await this.apiService.sendRequest<AuthResponseDTO>("auth/register", HttpMethod.POST, request)
        result.success ? this.tokenManager.saveTokens(result.data!.tokens) : console.log(result.error)

        return result
    }

    async sendLogin(request: LoginRequesDTO): Promise<ApiResponseDTO<AuthResponseDTO>> {
        const result = await this.apiService.sendRequest<AuthResponseDTO>("auth/login", HttpMethod.POST, request)
        result.success ? this.tokenManager.saveTokens(result.data!.tokens) : console.log(result.error)

        return result
    }
}
