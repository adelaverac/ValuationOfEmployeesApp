import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AuthenticationRequest } from '../interfaces/authentication/authenticationRequest';
import { AuthenticationResponse } from '../interfaces/authentication/authenticationResponse';
import { LogoutRequest } from '../interfaces/authentication/logoutRequest';
import { BasicResponse } from '../interfaces/commom/basicResponse';
import { AppServiceBase } from '../shared/app.service';
import { EndpointService } from './endpoint.service';

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService extends AppServiceBase {

    constructor(
        private http: HttpClient,
        private endpointService: EndpointService
    ) {
        super();
    }

    login(authenticationRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
        return this.http.post<AuthenticationResponse>(
            `${this.endpointService.pathLogin}`,
            JSON.stringify(authenticationRequest),
            this.httpOptions
        ).pipe(
            retry(1),
            catchError(this.errorHandl)
        );
    }

    logout(logoutRequest: LogoutRequest): Observable<BasicResponse> {
        return this.http.post<BasicResponse>(
            `${this.endpointService.pathLogout}`,
            JSON.stringify(logoutRequest),
            this.httpOptions
        ).pipe(
            retry(1),
            catchError(this.errorHandl)
        );
    }

}
