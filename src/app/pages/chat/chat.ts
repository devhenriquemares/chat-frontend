import { Component, input, output } from '@angular/core';
import { ChatMessage } from '../../components/chat-message/chat-message';
import { IconCircleButton } from '../../components/icon-circle-button/icon-circle-button';
import { Input } from '../../components/input/input';

@Component({
  selector: 'chat',
  imports: [IconCircleButton, Input, ChatMessage],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {
    // chatID = input.required<number>()
    closeChatEmitter = output()
    username = input.required<string>()

    closeChat() {
        this.closeChatEmitter.emit()
    }
}
