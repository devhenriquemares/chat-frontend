import { HttpMethod } from "../../enums/api/http-method.enum"

export interface ApiRequestDTO {
    url: string
    method: HttpMethod
    body?: any
    auth?: boolean 
}