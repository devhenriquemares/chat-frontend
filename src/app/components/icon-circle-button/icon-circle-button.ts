import { NgClass } from '@angular/common';
import { Component, effect, input } from '@angular/core';
import { twMerge } from 'tailwind-merge';

@Component({
  selector: 'icon-circle-button',
  templateUrl: './icon-circle-button.html',
  styleUrl: './icon-circle-button.css',
})
export class IconCircleButton {
    iconSrc = input.required<string>();
    buttonCustomClass = input<string>("");
    iconCustomClass = input<string>("");

    iconClass = () => twMerge(`
            bg-white
            h-full w-full
            object-contain mask-no-repeat mask-contain
        `,
        this.iconCustomClass()
    )
    buttonClass = () => twMerge(`
            rounded-full cursor-pointer
            p-3 w-24 h-24
            shadow-[0_0_5px_3px_rgba(0,0,0,.2)] hover:shadow-[0_3px_5px_3px_rgba(0,0,0,.2)]
            hover:-translate-y-3
            transition duration-500
        `,
        this.buttonCustomClass()
    )
}
