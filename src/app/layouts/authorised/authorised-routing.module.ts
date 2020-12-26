import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '@app/views/dashboard/dashboard.component';

const dmModule = () => import('../../views/cat/app.dm.module').then(x => x.AppDmModulue);
const routes: Routes = [
    { path: '', redirectTo: 'dashboard'},
    { path: 'dashboard', component: DashboardComponent },
    { 
        path: 'danh-muc', 
        loadChildren: dmModule
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AuthorisedRoutingModule {}