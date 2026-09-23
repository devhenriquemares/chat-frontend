import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { firstValueFrom, Observable } from "rxjs";
import { ApiResponseDTO } from "../../dtos/api/response.dto";
import { HttpMethod } from "../../enums/api/http-method.enum";
import { ApiError } from "../../dtos/api/http.error";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private baseUrl = environment.apiUrl
    private httpClient = inject(HttpClient)

    async sendRequest<T>(url: string, method: HttpMethod, body: any = {}): Promise<ApiResponseDTO<T>> {
        const handledUrl = `${this.baseUrl}/${this.handleUrl(url)}`
        let result: Observable<T> = new Observable()
        switch (method) {
            case HttpMethod.GET:
                result = this.httpClient.get<T>(handledUrl)
                break;
            case HttpMethod.POST:
                result = this.httpClient.post<T>(handledUrl, body)
                break;
            case HttpMethod.PUT: break;
            case HttpMethod.PATCH: break;
            case HttpMethod.DELETE: break;
        }
        
        try {
            const response = await firstValueFrom(result)
            return { success: true, data: response }
        } catch (error: any) {
            return { success: false, error: (error.error) as ApiError }
        }
    }

    private handleUrl(url: string): string {
        return url.startsWith('/') ? url.substring(1) : url
    }
}