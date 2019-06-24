import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductRoutingModule } from './product-routing.module';
import { MaterialModule } from '../material/material.module';
import { ItemComponent } from './item.component';
import { DialogComponent } from '../dialog/dialog.component';



@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    MaterialModule
  ],
  declarations: [ProductComponent, DialogComponent, ItemComponent],
  entryComponents: [DialogComponent]
})
export class ProductModule { }
