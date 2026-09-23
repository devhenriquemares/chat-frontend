import { inject, Injectable } from "@angular/core";
import { TokensDTO } from "../../dtos/auth/tokens.dto";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({ providedIn: 'root' })
export class TokenManager {
    private jwtDecoder = new JwtHelperService()

    saveTokens(tokens: TokensDTO) {
        localStorage.setItem("access-token", tokens.accessToken)
        localStorage.setItem("refresh-token", tokens.refreshToken)
    }

    getAcessToken(): string {
        return localStorage.getItem('access-token')!
    }

    isVerified(token: string): boolean {
        return this.jwtDecoder.decodeToken(token).isVerified
    }
}