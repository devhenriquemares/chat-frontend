import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { twMerge } from 'tailwind-merge';

@Component({
  selector: 'notification-card',
  imports: [NgClass],
  templateUrl: './notification-card.html',
  styleUrl: './notification-card.css',
  host: {
    class: 'absolute z-1000'
  }
})
export class NotificationCard {
    isDismissing = false

    message = input.required<string>()
    closeEmitter = output()
    customClass = input<string>()
    cardClass = () => twMerge(`
            notification-card
            min-w-50 max-w-xl p-4
            bg-red-500 rounded-xl
        `, this.customClass())

    onCloseClick() {        
        this.isDismissing = true
    }
    
    onFinishAnimation() {
        if (this.isDismissing) {
            this.closeEmitter.emit()
        }
    }
}
