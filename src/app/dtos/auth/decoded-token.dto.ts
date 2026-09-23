import { Roles } from "../../enums/auth/roles.enum";

export interface DecodedTokenDTO {
    sub: string,
    iat: number,
    exp: number,
    iss: string,
    roles: Roles[],
    isVerified: boolean
}