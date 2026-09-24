import { Component, inject, OnInit, output, signal } from '@angular/core';
import { IconCircleButton } from '../../components/icon-circle-button/icon-circle-button';
import { Options, ViewSwitcher } from '../../components/view-switcher/view-switcher';
import { Input } from '../../components/input/input';
import { ChatService } from '../../services/chat/chat.service';
import { FriendRequestCard } from '../../components/friend-request-card/friend-request-card';
import { FriendResponseDTO } from '../../dtos/friend/friend-response.dto';
import { NotificationCard } from '../../components/notification-card/notification-card';
import { ApiError } from '../../dtos/api/http.error';
import { FriendRequestResponseDTO } from '../../dtos/friend/friend-request-response.dto';

@Component({
    selector: 'new-chat',
    imports: [IconCircleButton, ViewSwitcher, Input, FriendRequestCard, NotificationCard],
    templateUrl: './new-chat.html',
    styleUrl: './new-chat.css',
    host: {
        class: 'h-full w-full'
    }
})
export class NewChat implements OnInit {
    private chatService = inject(ChatService)

    closeViewEmmiter = output();
    optionSelected = signal<Options>("Left");
    searchUserID = signal('')
    foundedUsername = signal('')
    friendRequests = signal<FriendRequestResponseDTO[]>([])
    notificationMessage = signal('')
    success = signal(false)

    ngOnInit(): void {
        this.loadFriendRequest()
    }

    closeView() {
        this.closeViewEmmiter.emit();
    }

    handleLeftClick() {
        this.optionSelected.set("Left");
    }

    handleRightClick() {
        this.optionSelected.set("Right");
    }

    handleClose() {
        this.notificationMessage.set('')
    }

    async handleSearchUser() {
        const result = await this.chatService.searchUserByPublicID(this.searchUserID())
        if (result.success) {
            const { friend } = result.data!
            this.foundedUsername.set(friend.username)
        }
    }

    async handleSend() {
        const response = await this.chatService.sendFriendRequest(this.searchUserID())
        this.success.set(response.success)

        this.notificationMessage.set(response.success ? 'Pedido de amizade enviado!' : this.handleErrors(response.error!))
    }

    async handleAccept(requestID: number) {
        await this.chatService.acceptFriendRequest(requestID)

        this.loadFriendRequest()
    }

    async handleReject(requestID: number) {
        await this.chatService.rejectFriendRequest(requestID)

        this.loadFriendRequest()
    }

    async loadFriendRequest() {
        const response = await this.chatService.loadFriendRequests()
        if (response.success) this.friendRequests.set(response.data!)
    }

    handleErrors(error: ApiError): string {
        return 'Algo de errado aconteceu, tente novamente mais tarde'
    }
}