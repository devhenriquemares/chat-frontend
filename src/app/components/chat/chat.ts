import { Component, input, output } from '@angular/core';
import { IconCircleButton } from '../icon-circle-button/icon-circle-button';
import { Input } from '../input/input';
import { ChatMessage } from '../chat-message/chat-message';

@Component({
  selector: 'chat',
  imports: [IconCircleButton, Input, ChatMessage],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {
    chatID = input.required<number>()
    closeChatEmitter = output()
    closeChat() {
        this.closeChatEmitter.emit()
    }
}
