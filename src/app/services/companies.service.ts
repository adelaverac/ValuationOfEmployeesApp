import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import { Company } from '../interfaces/company/company';
import { AppServiceBase } from '../shared/app.service';
import { EndpointService } from './endpoint.service';

@Injectable({
    providedIn: 'root'
})
export class CompanyService extends AppServiceBase {

    constructor(
        private http: HttpClient,
        private endpointService: EndpointService
    ) {
        super();
    }

    getAllSampleData() {
        return this.http.get<Company[]>('/assets/sample-data/companies.json');
    }

    getCompanies() {
        return this.http.get<Company[]>(
            `${this.endpointService.pathGetCompanies}`,
            this.httpOptions
        ).pipe(
            retry(1),
            catchError(this.errorHandl)
        );
    }

}