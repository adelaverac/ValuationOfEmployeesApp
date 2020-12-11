import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '../../components/components.module';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountPage } from './createAccount.page';

const routes: Routes = [
    {
        path: '',
        component: CreateAccountPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        ComponentsModule
    ],
    declarations: [CreateAccountPage]
})
export class CreateAccountPageModule { }
