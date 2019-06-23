import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { ItemComponent} from './item.component'
import { CanDeactivateGuard } from '../navigation-guard.service';

const routes: Routes = [

    { path: '', component: ProductComponent, canDeactivate: [CanDeactivateGuard] },
    { path: 'item', component: ItemComponent }
    
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})

export class ProductRoutingModule { }