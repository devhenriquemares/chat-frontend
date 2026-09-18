import { Component } from '@angular/core';
import { IconCircleButton } from '../../components/icon-circle-button/icon-circle-button';
import { NgClass } from "../../../../node_modules/@angular/common/types/_common_module-chunk";
import { ChatCard } from '../../components/chat-card/chat-card';
import { signal } from '@angular/core'; 
import { Chat } from '../../components/chat/chat';

@Component({
  selector: 'home',
  imports: [IconCircleButton, ChatCard, Chat],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
    selectedID = signal<number | null>(null)

    handleSelect(index: number) {
        this.selectedID.set(index)
    }

    handleCloseChat() {
        this.selectedID.set(null)
    }
}
