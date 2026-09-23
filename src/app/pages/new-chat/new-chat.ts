import { Component, inject, output, signal } from '@angular/core';
import { IconCircleButton } from '../../components/icon-circle-button/icon-circle-button';
import { Options, ViewSwitcher } from '../../components/view-switcher/view-switcher';
import { Input } from '../../components/input/input';
import { ChatService } from '../../services/chat/chat-service';
import { FriendRequestCard } from '../../components/friend-request-card/friend-request-card';
import { FriendResponseDTO } from '../../dtos/friend/friend-response.dto';

@Component({
    selector: 'new-chat',
    imports: [IconCircleButton, ViewSwitcher, Input, FriendRequestCard],
    templateUrl: './new-chat.html',
    styleUrl: './new-chat.css',
    host: {
        class: 'h-full w-full'
    }
})
export class NewChat {
    private chatService = inject(ChatService)

    closeViewEmmiter = output();
    optionSelected = signal<Options>("Left");
    requests = signal<[]>([]);
    searchUserID = signal('')
    foundedUsername = signal('')

    closeView() {
        this.closeViewEmmiter.emit();
    }

    handleLeftClick() {
        this.optionSelected.set("Left");
    }

    handleRightClick() {
        this.optionSelected.set("Right");
    }

    async handleSearchUser() {
        const result = await this.chatService.searchUserByPublicID(this.searchUserID())
        if (result.success) {
            const { friend } = result.data!
            this.foundedUsername.set(friend.username)
        }
    }
}