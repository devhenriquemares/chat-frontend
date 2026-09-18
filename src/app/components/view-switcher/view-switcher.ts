import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
	selector: 'view-switcher',
	imports: [NgClass, RouterLink],
	templateUrl: './view-switcher.html',
	styleUrl: './view-switcher.css',
	host: {
		class: 'grid'
	}
})
export class ViewSwitcher {
	firstPageName = input.required<string>();
	secondPageName = input.required<string>();
	isFirstPageSelected = input.required<boolean>();
	firstButtonRedirect = input.required<string>();
	secondButtonRedirect = input.required<string>();
}
