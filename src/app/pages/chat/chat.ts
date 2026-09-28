import { Component, inject, input, OnDestroy, OnInit, output, signal } from '@angular/core';
import { ChatMessage } from '../../components/chat-message/chat-message';
import { IconCircleButton } from '../../components/icon-circle-button/icon-circle-button';
import { Input } from '../../components/input/input';
import { ChatService } from '../../services/chat/chat.service';
import { SocketService } from '../../services/socket/socket.service';
import { ChatResponseDTO } from '../../dtos/chat/chat-response.dto';
import { UserDataManager } from '../../managers/user/user-data.manager';
import { MessageResponseDTO } from '../../dtos/message/message-response.dto';
import { SendMessageDTO } from '../../dtos/message/send-message.dto';

@Component({
  selector: 'chat',
  imports: [IconCircleButton, Input, ChatMessage],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat implements OnInit, OnDestroy {
    socketService = inject(SocketService)
    closeChatEmitter = output()
    username = input.required<string>()
    message = signal<string>('')
    messages = signal<MessageResponseDTO[]>([])
    chatData = input.required<ChatResponseDTO>()
    sendMessageEmitter = output<MessageResponseDTO>()

    ngOnInit(): void {
        this.messages.set(this.chatData().messages)
        this.socketService.connect(this.chatData().chatID)
        this.socketService.message.subscribe((incomingMessage: MessageResponseDTO) => {
            this.messages.update(current => ([
                ...current,
                incomingMessage
            ]))

            this.sendMessageEmitter.emit(incomingMessage)
        })
    }

    ngOnDestroy(): void {
        this.socketService.disconnect()
    }

    sendMessage() {
        const sendMessage: SendMessageDTO = {
            chatID: this.chatData().chatID,
            message: this.message(),
            senderID: UserDataManager.getData().userID
        }
        this.socketService.send(sendMessage)
        this.message.set('')
    }

    closeChat() {
        this.closeChatEmitter.emit()
    }
}
