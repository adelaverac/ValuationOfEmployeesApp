import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { User } from '../interfaces/users/user';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor(private localStorage: Storage) { }

    setToken(token: string): void {
        this.localStorage.set('_token', token);
    }

    getToken() {
        return this.localStorage.get('_token');
    }

    setUserData(user: User): void {
        this.localStorage.set('_userData', JSON.stringify(user));
    }

    async getUserData(): Promise<User> {
        return await this.localStorage.get('_userData')
            .then(data => {
                if (data) {
                    const userData = JSON.parse(data) as User;
                    return userData;
                } else {
                    const userdata = {} as User;
                    return userdata;
                }
            });
    }

    clearStorage(): void {
        this.localStorage.clear();
    }

    removeKey(key: string): Promise<any> {
        return this.localStorage.remove(key);
    }

}
