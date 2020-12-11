import { Component, OnInit } from '@angular/core';
import { CreateOrEditUser } from 'src/app/interfaces/users/createOrEditUser';
import { CommomService } from 'src/app/services/commom.service';
import { StatusbarService } from 'src/app/services/statusbar.service';

@Component({
    selector: 'app-createaccount',
    templateUrl: './createAccount.page.html',
})
export class CreateAccountPage implements OnInit {

    createOrEdit: CreateOrEditUser;

    showPassword = false;
    passwordToggleIcon = 'eye-outline';
    constructor(
        private statusBarService: StatusbarService,
        private commomService: CommomService
    ) {

    }

    ngOnInit() {

    }

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
        if (this.createOrEdit.user.name === '') {
            return 'Ingrese su nombre';
        }

        if (this.createOrEdit.user.lastName === '') {
            return 'Ingrese su apellido';
        }

        if (this.createOrEdit.user.email === '') {
            return 'Ingrese su correo';
        }

        if (this.createOrEdit.user.password === '') {
            return 'Ingrese su contraseña';
        }

        if (this.createOrEdit.user.password.length <= 6) {
            return 'La contraseña debe contener más de 6 caracteres';
        }

        return '';
    }
}
