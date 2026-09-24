import { UserResponseDTO } from "../auth/auth.response.dto"

export interface ChatResponseDTO {
    chatID: number
    friend: UserResponseDTO
}