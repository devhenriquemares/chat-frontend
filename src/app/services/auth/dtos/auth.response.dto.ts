import { AccountProvidersEnum } from "../../../enums/account-providers";
import { TokensDTO } from "./tokens.dto";

export interface UserResponseDTO {
    username: string,
    email: string,
    provider: AccountProvidersEnum,
    createdAt: Date
}

export interface AuthResponseDTO {
    tokens: TokensDTO,
    userResponse: UserResponseDTO
}