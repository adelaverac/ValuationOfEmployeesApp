import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-createaccount',
    templateUrl: './createAccount.page.html',
})
export class CreateAccountPage implements OnInit {

    showPassword = false;
    passwordToggleIcon = 'eye-outline';
    constructor(
        private navCtrl: NavController,
    ) {

    }

    ngOnInit() {

    }

}
