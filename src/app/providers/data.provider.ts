import { Injectable } from '@angular/core';
import { User } from '../interfaces/users/user';
import { LocalStorageService } from '../services/localStorage.service';

@Injectable()

export class DataProvider {

    public userData: User;
    public token: string;
    public state: boolean;

    constructor(
        private localStorageService: LocalStorageService
    ) {
        this.fillProviderData();
    }

    fillProviderData(): void {
        this.localStorageService.getUserData()
            .then(result => {
                this.userData = result;
                if (this.userData) {
                    this.state = true;
                } else {
                    this.state = false;
                }
            });

        this.localStorageService.getToken()
            .then(result => {
                this.token = result;
            });
    }

    destroyData(): void {
        this.userData = {} as User;
        this.token = '';
        this.state = false;
    }

}
