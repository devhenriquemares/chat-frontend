import { inject, Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpMethod } from '../../enums/api/http-method.enum';
import { FriendResponseDTO } from '../../dtos/friend/friend-response.dto';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
	private apiService = inject(ApiService)

	async searchUserByPublicID(publicID: string) {
		const result = await this.apiService.sendRequest<FriendResponseDTO>(`friends/${publicID}`, HttpMethod.GET, null, true)
		if (!result.success) console.log(result.error!)

		return result
	}
}