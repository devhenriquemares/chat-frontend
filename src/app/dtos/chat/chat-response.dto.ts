import { UserResponseDTO } from "../auth/auth.response.dto"
import { MessageResponseDTO } from "../message/message-response.dto"

export interface ChatResponseDTO {
    chatID: number
    friend: UserResponseDTO
    messages: MessageResponseDTO[]
}