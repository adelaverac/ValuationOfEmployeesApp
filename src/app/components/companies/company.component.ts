import { Component, Input, OnInit } from '@angular/core';
import { Company } from 'src/app/interfaces/company/company';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'companies',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

    @Input() companies: Company[] = [];

    searchCompany = '';

    constructor() { }

    ngOnInit() { }

    onSearchChange(event) {
        this.searchCompany = event.detail.value;
    }
}
