import { Component, input, output } from '@angular/core';

@Component({
  selector: 'chat-card',
  imports: [],
  templateUrl: './chat-card.html',
  styleUrl: './chat-card.css',
})
export class ChatCard {
    selected = input(false);
    select = output<void>();
    username = input.required<string>()
    lastMessage = input<string>('')
}
