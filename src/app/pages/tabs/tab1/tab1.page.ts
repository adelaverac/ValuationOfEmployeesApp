import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from 'src/app/interfaces/company/company';
import { Employee } from 'src/app/interfaces/employee/employee';
import { CompanyService } from 'src/app/services/companies.service';
import { EmployeeService } from 'src/app/services/employees.service';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

    //companies: Company[] = [];
    companies: Observable<Company[]>;
    employees: Observable<Employee[]>;

    showCompany: boolean = true;

    constructor(
        private _companiesService: CompanyService,
        private _employeesService: EmployeeService
    ) {

    }

    ngOnInit() {
        this.loadCompanies();
        this.loadEmployees();
    }

    // loadInfiniteScroll(event) {
    //     this.loadCompanies(event);
    // }

    loadCompanies(event?) {
        this.companies = this._companiesService.getAllSampleData();
        // this._companiesService.getAllSampleData()
        //     .subscribe(result => {
        //         if (result.companies.length === 0) {
        //             event.target.disabled = true;
        //             event.target.complete();
        //             return;
        //         }

        //         this.companies.push(...result.companies);

        //         if (event) {
        //             event.target.complete();
        //         }

        //     });
    }

    loadEmployees() {
        this.employees = this._employeesService.getAllSampleData();
    }

    segmentChanged(event) {
        const option = event.detail.value;

        switch (option) {
            case 'company':
                this.showCompany = true;
                break;
            case 'customer':
                this.showCompany = false;
                break;
        }
    }

}
