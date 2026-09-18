import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { twMerge } from 'tailwind-merge';

export type InputTypes = "text" | "email" | "password"

@Component({
  selector: 'app-input',
  templateUrl: './input.html',
  styleUrl: './input.css',
})
export class Input {
    type = input.required<InputTypes>()
    placeholder = input.required<string>()
    customClass = input<string>("")
    inputClass = () => twMerge(`
        flex-1
        resize-none
        scrollbar-none
        w-full text-4xl
        pt-3 pb-3 pl-7
        focus:outline-none
        placeholder:opacity-50
        bg-dark-purple
        placeholder:text-[#fff]
        text-white
        rounded-full`,
        this.customClass()
    )
}
