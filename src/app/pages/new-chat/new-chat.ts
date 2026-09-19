import { Component, inject, output, signal } from '@angular/core';
import { IconCircleButton } from '../../components/icon-circle-button/icon-circle-button';
import { Options, ViewSwitcher } from '../../components/view-switcher/view-switcher';
import { Router } from '@angular/router';
import { FriendRequestCard } from '../../components/friend-request-card/friend-request-card';
import { Input } from '../../components/input/input';

@Component({
    selector: 'new-chat',
    imports: [IconCircleButton, ViewSwitcher, Input],
    templateUrl: './new-chat.html',
    styleUrl: './new-chat.css',
    host: {
        class: 'h-full w-full'
    }
})
export class NewChat {
    closeViewEmmiter = output();
    optionSelected = signal<Options>("Left");
    requests = signal<[]>([]);

    closeView() {
        this.closeViewEmmiter.emit();
    }

    handleLeftClick() {
        this.optionSelected.set("Left");
    }

    handleRightClick() {
        this.optionSelected.set("Right");
    }
}