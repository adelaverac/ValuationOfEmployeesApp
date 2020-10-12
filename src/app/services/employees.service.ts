import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../interfaces/employee/employee';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    constructor(
        private _httpClient: HttpClient
    ) { }

    getAllSampleData() {
        return this._httpClient.get<Employee[]>('/assets/sample-data/employees.json');
    }

}