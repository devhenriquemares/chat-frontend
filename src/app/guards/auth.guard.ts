import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { TokenManager } from "../managers/token/token.manager";

export const authGuard: CanActivateFn = (route, state) => {
    const tokenManager = inject(TokenManager)
    const accessToken = tokenManager.getAcessToken()
    const router = inject(Router)

    if (tokenManager.isVerified(accessToken)) return true

    router.navigate(['/email-validation'], { queryParams: { redirected: true } })
    return false
}