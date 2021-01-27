import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { CreateOrEditUser } from 'src/app/interfaces/users/createOrEditUser';
import { AccountService } from 'src/app/services/account.service';
import { CommomService } from 'src/app/services/commom.service';

@Component({
    selector: 'app-createaccount',
    templateUrl: './createAccount.page.html',
    styleUrls: ['./styles/createAccount.scss']
})
export class CreateAccountPage implements OnInit {

    createOrEditUser = {} as CreateOrEditUser;

    showPassword = false;
    passwordToggleIcon = 'eye-outline';
    constructor(
        private commomService: CommomService,
        private navController: NavController,
        private accountService: AccountService,
        private menuController: MenuController
    ) {

    }

    ngOnInit() {
        this.initValues();
    }

    createNewAccount(): void {
        const isValid = this.isValid();

        if (!(isValid === '')) {
            this.commomService.presentToastError(isValid);
            return;
        }

        this.commomService.showLoadingCustom();

        this.accountService.createOrEditUser(this.createOrEditUser)
            .pipe(finalize(() => { this.commomService.hideLoadingCustom(); }))
            .subscribe(result => {
                const { token, level, message } = result;
                if (!(level === 'SUCCESS')) {
                    this.commomService.presentToastError(message);
                    return;
                }

                this.menuController.enable(true);
                this.navController.navigateRoot('/main/tabs/tab1', { animated: true });
            }, err => {
                this.commomService.presentToastError(err);
            }, () => this.commomService.hideLoadingCustom());
    }

    closeCreateNewAccount(): void {
        this.navController.navigateRoot('/login', { animated: true });
    }

    private initValues(): void {
        this.createOrEditUser.name = '';
        this.createOrEditUser.lastName = '';
        this.createOrEditUser.cellPhone = '';
        this.createOrEditUser.email = '';
        this.createOrEditUser.password = '';
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
