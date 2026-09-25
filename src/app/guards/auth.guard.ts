import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { TokenManager } from "../managers/token/token.manager";
import { AuthService } from "../services/auth/auth.service";

export const authGuard: CanActivateFn = async (route, state) => {
    const tokenManager = inject(TokenManager)
    const router = inject(Router)
    const authService = inject(AuthService)
    const accessToken = TokenManager.getAcessToken()

    if (!accessToken) {
        router.navigate(['/auth'])
        return false
    }

    if (tokenManager.isExpired(accessToken)) {
        try {
            const success = (await authService.refreshTokens()).success
            if (!success) throw new Error()
            return true
        } catch {
            router.navigate(['/auth'])
            return false
        }
        
    }

    if (!tokenManager.decode(accessToken).isVerified) {
        router.navigate(['/email-validation'], { queryParams: { redirected: true } })
        return false
    }
    
    return true
}