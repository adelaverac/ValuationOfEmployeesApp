import { Injectable } from '@angular/core';
import { serverURL } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EndpointService {

    constructor() { }

    // Authentication
    readonly pathLogin = `${serverURL}/api/valuationofemployee/v1/account/login`;
    readonly pathLogout = `${serverURL}/api/valuationofemployee/v1/account/logout`;

    // Account
    readonly pathCreateOrEditUser = `${serverURL}/api/valuationofemployee/v1/account/createOrEditUser`;
}
