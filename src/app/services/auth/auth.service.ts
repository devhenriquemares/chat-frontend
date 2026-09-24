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

    async sendRegister(body: RegisterRequestDTO): Promise<ApiResponseDTO<AuthResponseDTO>> {
        const result = await this.apiService.sendRequest<AuthResponseDTO>({
            url: "auth/register",
            method: HttpMethod.POST,
            body
        })
        if (result.success) this.tokenManager.saveTokens(result.data!.tokens)

        return result
    }

    async sendLogin(body: LoginRequesDTO): Promise<ApiResponseDTO<AuthResponseDTO>> {
        const result = await this.apiService.sendRequest<AuthResponseDTO>({
            url: "auth/login", 
            method: HttpMethod.POST,
            body
        })
        if (result.success) this.tokenManager.saveTokens(result.data!.tokens)

        return result
    }

    async resendEmailCode(): Promise<ApiResponseDTO<string>> {
        const result = await this.apiService.sendRequest<string>({
            url: "auth/email-code",
            method: HttpMethod.GET,
            auth: true
        })

        return result
    }

    async validateEmail(code: string): Promise<ApiResponseDTO<TokensDTO>> {
        const result = await this.apiService.sendRequest<TokensDTO>({
            url: "auth/email-code",
            method: HttpMethod.POST,
            body: { code },
            auth: true
        })
        if (result.success) this.tokenManager.saveTokens(result.data!)

        return result
    }

    isUserEmailVerified(): boolean {
        const token = this.tokenManager.getAcessToken() ?? ""
        return this.tokenManager.decode(token).isVerified
    }   
}