import { Component, input } from '@angular/core';
import { IconCircleButton } from '../icon-circle-button/icon-circle-button';

export type FriendRequestCardType = "accept-reject" | "send"

@Component({
    selector: 'friend-request-card',
    imports: [IconCircleButton],
    templateUrl: './friend-request-card.html',
    styleUrl: './friend-request-card.css',
})
export class FriendRequestCard {
    cardType = input.required<FriendRequestCardType>();
    username = input.required<string>();
}
