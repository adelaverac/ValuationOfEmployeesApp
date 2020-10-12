import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Navigation } from '../interfaces/nav/navigation';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    constructor(
        private _httpClient: HttpClient
    ) { }

    getAll() {
        return this._httpClient.get<Navigation[]>('/assets/navigation/navigation-options.json');
    }

}