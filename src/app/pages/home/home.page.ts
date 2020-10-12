import { Component, OnInit } from "@angular/core";
import { CommomService } from 'src/app/services/commom.service';

@Component({
    selector: "app-home",
    templateUrl: "./home.page.html",
    styleUrls: [
        "./styles/home.page.scss",
    ],
})
export class HomePage implements OnInit {

    constructor(
        private _commomService: CommomService
    ) {

    }

    ngOnInit() {

    }


}
