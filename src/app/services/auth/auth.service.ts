import { inject, Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { RegisterRequestDTO } from '../../dtos/auth/register.request.dto';
import { LoginRequesDTO } from '../../dtos/auth/login.request.dto';
import { AuthResponseDTO } from '../../dtos/auth/auth.response.dto';
import { TokenManager } from '../../managers/token/token.manager';
import { HttpMethod } from '../../enums/api/http-method.enum';
import { ApiResponseDTO } from '../../dtos/api/response.dto';
import { TokensDTO } from '../../dtos/auth/tokens.dto';

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

    async resendEmailCode(): Promise<ApiResponseDTO<string>> {
        const result = await this.apiService.sendRequest<string>("auth/email-code", HttpMethod.GET, null, true)
        if (!result.success) console.log(result.error)

        return result
    }

    async validateEmail(code: string): Promise<ApiResponseDTO<TokensDTO>> {
        const result = await this.apiService.sendRequest<TokensDTO>("auth/email-code", HttpMethod.POST, { code }, true)

        if (!result.success) console.log(result.error)
        this.tokenManager.saveTokens(result.data!)

        return result
    }

    isUserEmailVerified(): boolean {
        const token = this.tokenManager.getAcessToken() ?? ""
        return this.tokenManager.decode(token).isVerified
    }   
}