import { UserResponseDTO } from "../auth/auth.response.dto"

export interface Message {
    id: string
    message: string
    timestamp: Date
    sender: UserResponseDTO
}