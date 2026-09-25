import { inject, Injectable } from "@angular/core";
import { TokensDTO } from "../../dtos/auth/tokens.dto";
import { JwtHelperService } from "@auth0/angular-jwt";
import { DecodedTokenDTO } from "../../dtos/auth/decoded-token.dto";
import { ApiService } from "../../services/api/api.service";

@Injectable({ providedIn: 'root' })
export class TokenManager {
    private jwtDecoder = new JwtHelperService()

    static saveTokens(tokens: TokensDTO) {
        localStorage.setItem("access-token", tokens.accessToken)
        localStorage.setItem("refresh-token", tokens.refreshToken)
    }

    static getAcessToken(): string | null {
        return localStorage.getItem('access-token') ?? null
    }

    static getRefreshToken(): string | null {
        return localStorage.getItem('refresh-token') ?? null
    }

    isExpired(token: string): boolean {
        return this.jwtDecoder.isTokenExpired(token)
    }

    decode(token: string): DecodedTokenDTO {
        const payload = this.jwtDecoder.decodeToken(token)
        if (!payload) throw new Error("Invalid JWT token")

        return payload
    }
}