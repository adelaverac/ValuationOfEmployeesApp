import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-createaccount',
    templateUrl: './createAccount.page.html',
})
export class CreateAccountPage implements OnInit {

    showPassword = false;
    passwordToggleIcon = 'eye-outline';
    constructor(
    ) {

    }

    ngOnInit() {

    }

}
