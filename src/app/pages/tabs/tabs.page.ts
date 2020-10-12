import { Component } from '@angular/core';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['./styles/tabs.page.scss']
})
export class TabsPage {

    iconChat = "chatbubbles-outline";
    iconHome = "home";
    iconPerson = "person-outline";

    changeIconChat(): void {
        this.iconChat = "chatbubbles";
        this.iconHome = "home-outline";
        this.iconPerson = "person-outline";
    }

    changeIconHome(): void {
        this.iconChat = "chatbubbles-outline";
        this.iconHome = "home";
        this.iconPerson = "person-outline";
    }

    changeIconPerson(): void {
        this.iconChat = "chatbubbles-outline";
        this.iconHome = "home-outline";
        this.iconPerson = "person";
    }

}
