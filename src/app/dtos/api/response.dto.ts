import { ApiError } from "./http.error";

export interface ApiResponseDTO<T> {
    success: boolean,
    data?: T,
    error?: ApiError,
}