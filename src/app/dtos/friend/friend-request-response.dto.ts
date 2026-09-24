import { UserResponseDTO } from "../auth/auth.response.dto"

export interface FriendRequestResponseDTO {
    requestID: number
    requester: UserResponseDTO
}