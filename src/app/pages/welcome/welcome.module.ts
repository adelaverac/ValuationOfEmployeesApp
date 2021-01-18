import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '../../components/components.module';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePage } from './welcome.page';

const routes: Routes = [
    {
        path: '',
        component: WelcomePage
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
    declarations: [WelcomePage]
})
export class WelcomePageModule { }
