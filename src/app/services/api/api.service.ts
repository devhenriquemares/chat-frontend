import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private baseUrl = environment.apiUrl
    private httpClient = inject(HttpClient)

    get<T>(url: string) {
        const handledUrl = this.handleUrl(url)
        return this.httpClient.get<T>(`${this.baseUrl}/${handledUrl}`)
    }

    post<T>(url: string, body: any) {
        const handledUrl = this.handleUrl(url)
        return this.httpClient.post<T>(`${this.baseUrl}/${handledUrl}`, body)
    }

    private handleUrl(url: string): string {
        return url.startsWith('/') ? url.substring(1) : url
    }
}