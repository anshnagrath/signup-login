
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { AuthGuardService as AuthGuard } from './auth-guard.service';

const appRoutes: Routes = [
    { path: 'login', component: SignupComponent, pathMatch: 'full'},
    { path: 'product', loadChildren: '../app/product/product.module#ProductModule', canActivate: [AuthGuard] },
   
  
]


@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }