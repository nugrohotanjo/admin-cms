import { NgModule }                           from '@angular/core';
import { Routes, RouterModule }     from '@angular/router';

import { environment }                          from '../environments/environment';

// import { ClientComponent }                      from './client/client.component'
// import { AdminComponent }                       from './admin/admin.component'
import { AuthComponent }                        from './auth/auth.component'


const routes: Routes = [

  {
    path: 'login',
    component: AuthComponent 
  },
  {
    path: '',
    loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule)
  },
  {
    path: 'logout',
    component: AuthComponent 
  },
  {
    path: '**', 
    redirectTo: 'dashboard', 
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes), 
    // RouterModule.forRoot(routes, { useHash: true }) 
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
