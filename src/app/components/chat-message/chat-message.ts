import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'chat-message',
  imports: [NgClass],
  templateUrl: './chat-message.html',
  styleUrl: './chat-message.css',
})
export class ChatMessage {
    isSender = input.required<boolean>()
    message = input.required<string>()
}
