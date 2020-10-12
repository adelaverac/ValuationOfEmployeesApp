import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { IonicModule } from "@ionic/angular";
import { SplashComponent } from "./splash/splash.component";
import { ImageShellComponent } from "./shell/image-shell/image-shell.component";
import { AspectRatioComponent } from "./shell/aspect-ratio/aspect-ratio.component";
import { CompanyComponent } from './companies/company.component';
import { PipesModule } from '../pipes/pipes.module';
import { EmployeeComponent } from './employess/employee.component';
import { EmployeeDetailComponent } from './employess/detail/employeeDetail.component';
import { RatingInputComponent } from './rating-input/rating-input.component';

@NgModule({
  entryComponents: [
    EmployeeDetailComponent
  ],
  declarations: [
    HeaderComponent,
    SplashComponent,
    CompanyComponent,
    EmployeeComponent,
    EmployeeDetailComponent,
    ImageShellComponent,
    AspectRatioComponent,
    RatingInputComponent
  ],
  exports: [
    HeaderComponent,
    SplashComponent,
    CompanyComponent,
    EmployeeComponent,
    EmployeeDetailComponent,
    ImageShellComponent,
    AspectRatioComponent,
    RatingInputComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule],
})
export class ComponentsModule { }
