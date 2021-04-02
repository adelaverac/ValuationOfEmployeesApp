import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { CreateOrEditUser } from 'src/app/interfaces/users/createOrEditUser';
import { DataProvider } from 'src/app/providers/data.provider';
import { AccountService } from 'src/app/services/account.service';
import { CommomService } from 'src/app/services/commom.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { StatusbarService } from 'src/app/services/statusbar.service';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {

    createOrEditUser = {} as CreateOrEditUser;

    constructor(
        private statusBarService: StatusbarService,
        private dataProvider: DataProvider,
        private commomService: CommomService,
        private accountService: AccountService,
        private localStorageService: LocalStorageService
    ) { }

    ngOnInit(): void {
        this.statusBarService.changeBackgroundStatusBar('#1a2639', false);
        this.loadUserInformation();
    }

    update(): void {
        const isValid = this.isValid();

        if (!(isValid === '')) {
            this.commomService.presentToastError(isValid);
            return;
        }

        this.commomService.showLoadingCustom();

        this.accountService.editUser(this.createOrEditUser)
            .pipe(finalize(() => { this.commomService.hideLoadingCustom(); }))
            .subscribe(result => {
                const { user, level, message } = result;
                console.log(result);
                if (!(level === 'SUCCESS')) {
                    this.commomService.presentToastError(message);
                    return;
                }

                this.localStorageService.removeKey('_userData')
                    .then(() => {
                        this.localStorageService.setUserData(user);
                        this.commomService.presentToastSuccess(message);
                    }).catch(err => {
                        this.commomService.presentToastError('Ocurrio un error inesperado, volver a intentarlo');
                    });
            }, err => {
                this.commomService.presentToastError(err);
            }, () => this.commomService.hideLoadingCustom());

    }

    private loadUserInformation(): void {
        this.createOrEditUser = this.dataProvider.userData as CreateOrEditUser;
        console.log(this.createOrEditUser);
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

        return '';
    }

}
