import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { EndpointService } from './endpoint.service';
import { retry, catchError } from 'rxjs/operators';
import { AuthenticationRequest } from '../interfaces/authentication/authenticationRequest';
import { AuthenticationResponse } from '../interfaces/authentication/authenticationResponse';

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {

    // Http Headers
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
            'Access-Control-Allow-Headers': 'origin, x-requested-with',
        })
    }

    constructor(
        private http: HttpClient,
        private endpointService: EndpointService
    ) { }

    login(authenticationRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
        console.log(this.endpointService.pathLogin);
        console.log(this.httpOptions);
        return this.http.post<AuthenticationResponse>(
            `${this.endpointService.pathLogin}`,
            JSON.stringify(authenticationRequest),
            this.httpOptions
        ).pipe(
            retry(1),
            catchError(this.errorHandl)
        );
    }

    // Error handling
    errorHandl(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message; // Get client-side error
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`; // Get server-side error
        }
        return throwError(errorMessage);
    }

}
