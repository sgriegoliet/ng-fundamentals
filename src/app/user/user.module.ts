import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { userRoutes, ProfileComponent } from './index';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(userRoutes)
    ],
    providers: [
    ],
    declarations: [
        ProfileComponent
    ]
})
export class userModule { }