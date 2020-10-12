import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Employee } from 'src/app/interfaces/employee/employee';
import { StatusbarService } from 'src/app/services/statusbar.service';

@Component({
    selector: "employeeDetail",
    templateUrl: "./employeeDetail.component.html",
    styleUrls: [
        './styles/employeeDetail.component.scss',
        './styles/employeeDetail.shell.scss'
    ]
})
export class EmployeeDetailComponent implements OnInit {

    @Input() employee: Employee;

    ratingForm: FormGroup;

    constructor(
        private _statusBarService: StatusbarService,
        private _modalController: ModalController
    ) {
        this.ratingForm = new FormGroup({
            rate: new FormControl(2.5)
        });
    }

    ngOnInit() {
        console.log(this.employee);
    }

    close() {
        console.log("Cerrar");
        this._statusBarService.changeBackgroundStatusBar("white");
        this._modalController.dismiss();
    }

}