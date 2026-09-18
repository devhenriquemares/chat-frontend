import { Component, effect, Injectable, input } from '@angular/core';
import { Input, InputTypes } from '../input/input';

@Component({
  selector: 'form-input',
  imports: [Input],
  templateUrl: './form-input.html',
  styleUrl: './input.css',
})
export class FormInput {
    constructor() {
        effect(() => {
            if (this.iconSrc() && !this.iconAlt()) {
                throw new Error("IconAlt is required when using iconSrc")
            }
        })
    }

    type = input.required<InputTypes>();
    placeholder = input<string>("");

    iconSrc = input<string>();
    iconAlt = input<string>();

    error = input<string | null>();
}