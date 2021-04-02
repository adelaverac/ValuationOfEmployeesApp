import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AuthenticationResponse } from '../interfaces/authentication/authenticationResponse';
import { CreateOrEditUser } from '../interfaces/users/createOrEditUser';
import { ProfileResponse } from '../interfaces/users/profileResponse';
import { AppServiceBase } from '../shared/app.service';
import { EndpointService } from './endpoint.service';

@Injectable({
    providedIn: 'root'
})

export class AccountService extends AppServiceBase {

    constructor(
        private http: HttpClient,
        private endpointService: EndpointService
    ) {
        super();
    }

    createNewUser(createOrEdit: CreateOrEditUser): Observable<AuthenticationResponse> {
        return this.http.post<AuthenticationResponse>(
            `${this.endpointService.pathCreateNewUser}`,
            JSON.stringify(createOrEdit),
            this.httpOptions
        ).pipe(
            retry(1),
            catchError(this.errorHandl)
        );
    }

    editUser(createOrEdit: CreateOrEditUser): Observable<ProfileResponse> {
        return this.http.post<ProfileResponse>(
            `${this.endpointService.pathEditUser}`,
            JSON.stringify(createOrEdit),
            this.httpOptions
        ).pipe(
            retry(1),
            catchError(this.errorHandl)
        );
    }

}
