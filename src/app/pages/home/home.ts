import { Component } from '@angular/core';
import { IconCircleButton } from '../../components/icon-circle-button/icon-circle-button';
import { NgClass } from "../../../../node_modules/@angular/common/types/_common_module-chunk";
import { ChatCard } from '../../components/chat-card/chat-card';
import { signal } from '@angular/core'; 
import { NewChat } from '../new-chat/new-chat';
import { Chat } from '../chat/chat';

export type View = 'home' | 'chat' | 'new-chat';

@Component({
  selector: 'home',
  imports: [IconCircleButton, ChatCard, Chat, NewChat],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
    selectedView = signal<View>('home');
    selectedID = signal<number | null>(null);

    selectChat(chatID: number) {
        this.selectedView.set('chat');
        this.selectedID.set(chatID);
    }

    newChat() {
        this.selectedView.set('new-chat');
    }

    handleCloseChat() {
        this.selectedView.set('home');
        this.selectedID.set(null)
    }

    handleCloseNewChat() {
        this.selectedView.set('home');
    }
}
