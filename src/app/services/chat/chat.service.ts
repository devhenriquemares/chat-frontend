import { inject, Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpMethod } from '../../enums/api/http-method.enum';
import { FriendResponseDTO } from '../../dtos/friend/friend-response.dto';
import { ApiResponseDTO } from '../../dtos/api/response.dto';
import { FriendRequestResponseDTO } from '../../dtos/friend/friend-request-response.dto';
import { ChatResponseDTO } from '../../dtos/chat/chat-response.dto';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
	private apiService = inject(ApiService)
	private friendBaseUrl = "friends"
	private chatBaseUrl = "chats"

	async searchUserByPublicID(publicID: string) {
		return await this.apiService.sendRequest<FriendResponseDTO>({
			url: `users/publicID/${publicID}`,
			method: HttpMethod.GET,
			auth: true
		})
	}

	async sendFriendRequest(publicID: string) {
		return await this.apiService.sendRequest<string>({
			url: `${this.friendBaseUrl}`,
			method: HttpMethod.POST,
			body: { publicID },
			auth: true
		})
	}

	async loadFriendRequests() {
		return await this.apiService.sendRequest<FriendRequestResponseDTO[]>({
			url: `${this.friendBaseUrl}/requests`,
			method: HttpMethod.GET,
			auth: true
		})
	}

	async acceptFriendRequest(requestID: number) {
		return await this.apiService.sendRequest<string>({
			url: `${this.friendBaseUrl}/accept/${requestID}`,
			method: HttpMethod.GET,
			auth: true
		})
	}

	async rejectFriendRequest(requestID: number) {
		return await this.apiService.sendRequest<string>({
			url: `${this.friendBaseUrl}/reject/${requestID}`,
			method: HttpMethod.GET,
			auth: true
		})
	}

	async loadChats() {
		return await this.apiService.sendRequest<ChatResponseDTO[]>({
			url: `${this.chatBaseUrl}`,
			method: HttpMethod.GET,
			auth: true
		})
	}
}