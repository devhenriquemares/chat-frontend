import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { firstValueFrom, Observable } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { ApiResponseDTO } from "../../dtos/api/response.dto";
import { HttpMethod } from "../../enums/api/http-method.enum";
import { ApiError } from "../../dtos/api/http.error";
import { TokenManager } from "../../managers/token/token.manager";
import { ApiRequestDTO } from "../../dtos/api/request.dto";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private baseUrl = environment.apiUrl
    private httpClient = inject(HttpClient)
    private tokenManager = inject(TokenManager)

    async sendRequest<T>({ url, method, auth = false, body = {} }: ApiRequestDTO): Promise<ApiResponseDTO<T>> {
        const handledUrl = `${this.baseUrl}/${this.handleUrl(url)}`
        let result: Observable<T> = new Observable()
        const headers = auth ? 
            new HttpHeaders().set('Authorization', `Bearer ${this.tokenManager.getAcessToken() ?? ""}`)
            : {}

        switch (method) {
            case HttpMethod.GET:
                result = this.httpClient.get<T>(handledUrl, { headers })
                break;
            case HttpMethod.POST:
                result = this.httpClient.post<T>(handledUrl, body, { headers })
                break;
            case HttpMethod.PUT: break;
            case HttpMethod.PATCH: break;
            case HttpMethod.DELETE: break;
        }
        
        try {
            const response = await firstValueFrom(result)
            return { success: true, data: response }
        } catch (error: any) {
            const apiError: ApiError = error.error
            console.error(apiError)

            return { success: false, error: apiError }
        }
    }

    private handleUrl(url: string): string {
        return url.startsWith('/') ? url.substring(1) : url
    }
}