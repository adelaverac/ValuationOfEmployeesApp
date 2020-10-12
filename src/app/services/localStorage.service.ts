import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor(private _localStorage: Storage) { }

    setToken(token: string) {
        this._localStorage.set('_token', token);
    }

    async getToken() {
        await this._localStorage.get('_token');
    }

    clearStorage() {
        this._localStorage.clear();
    }

}