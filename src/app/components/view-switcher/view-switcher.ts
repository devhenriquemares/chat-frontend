import { NgClass } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

export type Options = "Left" | "Right"

@Component({
	selector: 'view-switcher',
	imports: [NgClass],
	templateUrl: './view-switcher.html',
	styleUrl: './view-switcher.css',
	host: {
		class: 'grid w-full'
	}
})
export class ViewSwitcher {
    optionSelected = input.required<Options>();

	leftOption = input.required<string>();
	rightOption = input.required<string>();

    leftClickEmitter = output();
    rightClickEmitter = output();

    leftClick() {
        this.leftClickEmitter.emit()
    }

    rightClick() {
        this.rightClickEmitter.emit()
    }
}
