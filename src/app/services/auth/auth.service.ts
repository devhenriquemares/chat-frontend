import { inject, Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { RegisterRequestDTO } from '../../dtos/auth/register.request.dto';
import { LoginRequesDTO } from '../../dtos/auth/login.request.dto';
import { AuthResponseDTO } from '../../dtos/auth/auth.response.dto';
import { TokenManager } from '../../managers/token/token.manager';
import { HttpMethod } from '../../enums/api/http-method.enum';
import { ApiResponseDTO } from '../../dtos/api/response.dto';
import { TokensDTO } from '../../dtos/auth/tokens.dto';
import { UserDataManager } from '../../managers/user/user-data.manager';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private apiService = inject(ApiService)
    private tokenManager = inject(TokenManager)
    private authBaseUrl = "auth"

    async sendRegister(body: RegisterRequestDTO): Promise<ApiResponseDTO<AuthResponseDTO>> {
        const result = await this.apiService.sendRequest<AuthResponseDTO>({
            url: `${this.authBaseUrl}/register`,
            method: HttpMethod.POST,
            body
        })
        if (result.success) TokenManager.saveTokens(result.data!.tokens)

        return result
    }

    async sendLogin(body: LoginRequesDTO): Promise<ApiResponseDTO<AuthResponseDTO>> {
        const result = await this.apiService.sendRequest<AuthResponseDTO>({
            url: `${this.authBaseUrl}/login`,
            method: HttpMethod.POST,
            body
        })
        if (result.success) TokenManager.saveTokens(result.data!.tokens)

        return result
    }

    async resendEmailCode(): Promise<ApiResponseDTO<string>> {
        const result = await this.apiService.sendRequest<string>({
            url: `${this.authBaseUrl}/email-code`,
            method: HttpMethod.GET,
            auth: true
        })

        return result
    }

    async validateEmail(code: string): Promise<ApiResponseDTO<TokensDTO>> {
        const result = await this.apiService.sendRequest<TokensDTO>({
            url: `${this.authBaseUrl}/email-code`,
            method: HttpMethod.POST,
            body: { code },
            auth: true
        })
        if (result.success) TokenManager.saveTokens(result.data!)

        return result
    }

    isUserEmailVerified(): boolean {
        const token = TokenManager.getAcessToken() ?? ""
        return this.tokenManager.decode(token).isVerified
    }

    async refreshTokens() {
        const refreshToken = TokenManager.getRefreshToken()
        if (!refreshToken) throw new Error("No refresh token available")

        const result = await this.apiService.sendRequest<AuthResponseDTO>({
            url: `${this.authBaseUrl}/refresh`,
            method: HttpMethod.POST,
            body: {
                refreshToken
            }
        })

        if (result.success) {
            TokenManager.saveTokens(result.data!.tokens)
            UserDataManager.saveData(result.data!.userResponse)
        }

        return result
    }
}