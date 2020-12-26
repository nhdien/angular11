import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';
import { AuthorisedRoutingModule } from './authorised-routing.module';

import { DashboardComponent } from '@app/views/dashboard/dashboard.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AuthorisedRoutingModule
    ],
    declarations: [
        DashboardComponent
    ]
})

export class AuthorisedModule {}