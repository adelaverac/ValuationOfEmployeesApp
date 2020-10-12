import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from '@ionic/angular';
import { Employee } from 'src/app/interfaces/employee/employee';
import { StatusbarService } from 'src/app/services/statusbar.service';
import { EmployeeDetailComponent } from './detail/employeeDetail.component';

@Component({
    selector: "employees",
    templateUrl: "./employee.component.html",
    styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

    @Input() employees: Employee[] = [];

    searchEmployee: string = '';

    constructor(
        private _modalController: ModalController,
        private _statusBarService: StatusbarService
    ) { }

    ngOnInit() { }

    onSearchChange(event) {
        this.searchEmployee = event.detail.value;
    }

    async viewEmployee(employee: Employee) {
        const modal = await this._modalController.create({
            animated: true,
            component: EmployeeDetailComponent,
            componentProps: {
                employee
            }
        });
        this._statusBarService.changeBackgroundStatusBar("black");
        modal.present();
    }

}
