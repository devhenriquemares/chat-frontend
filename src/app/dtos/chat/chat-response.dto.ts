import { UserResponseDTO } from "../auth/auth.response.dto"
import { Message } from "./message.dto"

export interface ChatResponseDTO {
    chatID: number
    friend: UserResponseDTO
    messages: Message[]
}