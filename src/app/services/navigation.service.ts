import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Navigation } from '../interfaces/nav/navigation';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    constructor(
        private httpClient: HttpClient
    ) { }

    getAll() {
        return this.httpClient.get<Navigation[]>('/assets/navigation/navigation-options.json');
    }

}