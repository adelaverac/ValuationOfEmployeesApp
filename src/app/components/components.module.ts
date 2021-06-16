import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { SplashComponent } from './splash/splash.component';
import { ImageShellComponent } from './shell/image-shell/image-shell.component';
import { AspectRatioComponent } from './shell/aspect-ratio/aspect-ratio.component';
import { CompanyComponent } from './companies/company.component';
import { PipesModule } from '../pipes/pipes.module';
import { EmployeeComponent } from './employess/employee.component';
import { EmployeeDetailComponent } from './employess/detail/employeeDetail.component';
import { RatingInputComponent } from './rating-input/rating-input.component';
import { SkChaseComponent } from './loadings/sk-chase/sk-chase.component';
import { UploadImage } from './upload-image/uploadImage.component';

@NgModule({
  entryComponents: [
    EmployeeDetailComponent
  ],
  declarations: [
    HeaderComponent,
    SplashComponent,
    SkChaseComponent,
    CompanyComponent,
    EmployeeComponent,
    EmployeeDetailComponent,
    ImageShellComponent,
    AspectRatioComponent,
    RatingInputComponent,
    UploadImage
  ],
  exports: [
    HeaderComponent,
    SplashComponent,
    SkChaseComponent,
    CompanyComponent,
    EmployeeComponent,
    EmployeeDetailComponent,
    ImageShellComponent,
    AspectRatioComponent,
    RatingInputComponent,
    UploadImage
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule],
})
export class ComponentsModule { }
