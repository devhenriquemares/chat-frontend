import { Component, inject, OnInit } from '@angular/core';
import { IconCircleButton } from '../../components/icon-circle-button/icon-circle-button';
import { ChatCard } from '../../components/chat-card/chat-card';
import { signal } from '@angular/core'; 
import { NewChat } from '../new-chat/new-chat';
import { Chat } from '../chat/chat';
import { ChatResponseDTO } from '../../dtos/chat/chat-response.dto';
import { ChatService } from '../../services/chat/chat.service';
import { UserDataManager } from '../../managers/user/user-data.manager';
import { SendMessageDTO } from '../../dtos/message/send-message.dto';
import { MessageResponseDTO } from '../../dtos/message/message-response.dto';
import { NgClass } from '@angular/common';

export type View = 'home' | 'chat' | 'new-chat';

@Component({
  selector: 'home',
  imports: [IconCircleButton, ChatCard, Chat, NewChat, NgClass],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
    private chatService = inject(ChatService)
    selectedView = signal<View>('home');
    selectedChat = signal<ChatResponseDTO | null>(null)
    chats = signal<ChatResponseDTO[]>([])
    username = UserDataManager.getData().username
    isSidebarOpen = signal<boolean>(true)

    ngOnInit(): void {
        this.loadChats()
    }

    async loadChats() {
        const result = await this.chatService.loadChats()
        if (result.success) this.chats.set(result.data!)
    }

    newChat() {
        this.selectedView.set('new-chat');
    }

    handleCloseChat() {
        this.selectedView.set('home');
        this.selectedChat.set(null)
    }

    handleCloseNewChat() {
        this.selectedView.set('home');
    }

    selectChat(chat: ChatResponseDTO) {
        this.selectedView.set('chat')
        this.selectedChat.set(chat)
    }

    updateLastMessage(lastMessage: MessageResponseDTO) {
        this.chats.update(currentChats => currentChats.map(chat =>
            chat.chatID === this.selectedChat()!.chatID ?
                { ...chat, messages: [ ...chat.messages, lastMessage ] }
                : chat
        ))
    }

    switchSidebarStatus() {
        this.isSidebarOpen.set(!this.isSidebarOpen())
    }
}
