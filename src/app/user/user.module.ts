import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { userRoutes, ProfileComponent } from './index';
import { LoginComponent } from './login';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(userRoutes),
    ],
    providers: [
    ],
    declarations: [
        ProfileComponent,
        LoginComponent
    ]
})
export class userModule { }