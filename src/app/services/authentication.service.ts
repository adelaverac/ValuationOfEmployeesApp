import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AuthenticationRequest } from '../models/authentication/authenticationRequest';
import { EndpointService } from './endpoint.service';
import { retry, catchError } from 'rxjs/operators';
import { AuthenticationResponse } from '../models/authentication/authenticationResponse';

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {

    // Http Headers
    httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
            "Access-Control-Allow-Headers": "origin, x-requested-with",
        })
    }

    constructor(
        private _http: HttpClient,
        private _endpointService: EndpointService
    ) {

    }

    login(authenticationRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
        console.log(this._endpointService.pathLogin);
        console.log(this.httpOptions);
        return this._http.post<AuthenticationResponse>(`${this._endpointService.pathLogin}`, JSON.stringify(authenticationRequest), this.httpOptions)
            .pipe(
                retry(1),
                catchError(this.errorHandl)
            )

    }

    // Error handling
    errorHandl(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message; // Get client-side error
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`; // Get server-side error
        }
        return throwError(errorMessage);
    }

}
