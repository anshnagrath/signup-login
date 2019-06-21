import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { ItemComponent} from './item.component'

const routes: Routes = [

    {
        path: '', component: ProductComponent },
    { path: 'item', component: ItemComponent }
    
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})

export class ProductRoutingModule { }