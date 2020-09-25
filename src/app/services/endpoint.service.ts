import { Injectable } from '@angular/core';
import { serverURL } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EndpointService {

    constructor() { }

    readonly pathLogin = serverURL + '/api/valuationofemployee/v1/account/login';

}
