import { inject, Injectable } from "@angular/core";
import { TokensDTO } from "../../dtos/auth/tokens.dto";
import { JwtHelperService } from "@auth0/angular-jwt";
import { DecodedTokenDTO } from "../../dtos/auth/decoded-token.dto";

@Injectable({ providedIn: 'root' })
export class TokenManager {
    private jwtDecoder = new JwtHelperService()

    saveTokens(tokens: TokensDTO) {
        localStorage.setItem("access-token", tokens.accessToken)
        localStorage.setItem("refresh-token", tokens.refreshToken)
    }

    getAcessToken(): string | null {
        return localStorage.getItem('access-token') ?? null
    }

    decode(token: string): DecodedTokenDTO {
        const payload = this.jwtDecoder.decodeToken(token)
        if (!payload) throw new Error("Invalid JWT token")

        return payload
    }
}