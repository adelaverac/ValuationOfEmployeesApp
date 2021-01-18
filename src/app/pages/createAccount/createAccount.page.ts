import { Component, OnInit } from '@angular/core';
import { CreateOrEditUser } from 'src/app/interfaces/users/createOrEditUser';
import { CommomService } from 'src/app/services/commom.service';
import { StatusbarService } from 'src/app/services/statusbar.service';

@Component({
    selector: 'app-createaccount',
    templateUrl: './createAccount.page.html',
})
export class CreateAccountPage implements OnInit {

    createOrEditUser = {} as CreateOrEditUser;

    showPassword = false;
    passwordToggleIcon = 'eye-outline';
    constructor(
        private statusBarService: StatusbarService,
        private commomService: CommomService
    ) {

    }

    ngOnInit() { }

    createNewAccount(): void {
        const isValid = this.isValid();

        if (!(isValid === '')) {
            this.commomService.presentToastError(isValid);
            return;
        }
    }

    closeCreateNewAccount(): void {
        this.statusBarService.changeBackgroundStatusBar('#EEF3FF', true);
    }

    private isValid(): string {
        if (this.createOrEditUser.name === '') {
            return 'Ingrese su nombre';
        }

        if (this.createOrEditUser.lastName === '') {
            return 'Ingrese su apellido';
        }

        if (this.createOrEditUser.email === '') {
            return 'Ingrese su correo';
        }

        if (this.createOrEditUser.password === '') {
            return 'Ingrese su contraseña';
        }

        if (this.createOrEditUser.password.length <= 6) {
            return 'La contraseña debe contener más de 6 caracteres';
        }

        return '';
    }
}
