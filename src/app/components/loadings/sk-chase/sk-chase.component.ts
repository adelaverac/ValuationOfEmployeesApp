import { Component, OnInit } from '@angular/core';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'sk-chase',
    templateUrl: './sk-chase.component.html',
    styleUrls: ['./sk-chase.component.scss'],
})
export class SkChaseComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
        this.addListenerShow();
        this.addListenerHide();

        this.hide();
    }

    addListenerShow() {
        document.addEventListener('sk-chase:show', () => {
            this.show();
        });
    }

    addListenerHide() {
        document.addEventListener('sk-chase:hide', () => {
            this.hide();
        });
    }

    show() {
        const chase: HTMLElement = document.getElementById('sk-chase');
        chase.style.display = 'flex';
    }

    hide() {
        const chase: HTMLElement = document.getElementById('sk-chase');
        chase.style.display = 'none';
    }
}
