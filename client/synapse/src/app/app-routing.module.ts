
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AuthGuardService as AuthGuard } from './auth-guard.service';
const appRoutes: Routes = [
    { path: '', component: MainComponent, pathMatch: 'full'},
    { path: 'product', loadChildren: '../app/product/product.module#ProductModule',canActivate: [AuthGuard] , pathMatch: 'full'}
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