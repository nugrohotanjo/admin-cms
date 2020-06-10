// Core
import { NgModule }                         from "@angular/core"
import { RouterModule, Routes }             from "@angular/router"

// Environtment
import { environment }                      from '../../../../../../environments/environment'

// Component
import { UnderwritingQuestionnaireManagementComponent }  from './underwriting-questionnaire-management.component'

// Package
import { NgxPermissionsGuard } from 'ngx-permissions';

const routes: Routes = [
    { 
        path        : '',             
        component   : UnderwritingQuestionnaireManagementComponent
        // canActivate     : [NgxPermissionsGuard],
        // data            : {
        //     permissions : {
        //       only      : 'view-questionnaire',
        //       redirectTo: `${environment.prefix}`
        //     }
        // }
    }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class UnderwritingQuestionnaireRoutingModule { }