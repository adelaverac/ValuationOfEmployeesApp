import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '../interfaces/company/company';

@Injectable({
    providedIn: 'root'
})
export class CompanyService {

    //pages = 0;

    constructor(
        private _httpClient: HttpClient
    ) { }

    getAllSampleData() {
        return this._httpClient.get<Company[]>('/assets/sample-data/companies.json');
        //this.pages++;
        //return this._httpClient.get<GetAllCompanies>('/assets/sample-data/companies.json');
    }

}