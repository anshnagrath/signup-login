import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '../app.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { HttpResponse } from '@angular/common/http';


@Component({
  selector: 'product-login',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit,OnDestroy {
  allProducts: Observable<any>;
  userProducts: Array<String> = [];
  subscriptions: Array<Subscription> = [ ];
  constructor(public appService: AppService, public router: Router, public matDialog: MatDialog) {
   
   }

  ngOnInit() {
    const allProduct = this.appService.getAllProducts().subscribe((products: HttpResponse<any>) => {
      this.allProducts = products['data'];
    });
    this.subscriptions.push(allProduct);
  }
  selectedProducts(checkStatus: Boolean, productId: String) {
    if(checkStatus === true) {
      this.userProducts.push(productId) ;
    } else if (checkStatus === false && this.userProducts.indexOf(productId)) {
      this.userProducts.splice(this.userProducts.indexOf(productId), 1);
    }
  }
  submitProductList(){
    const userId = localStorage.getItem('id');
    if(this.userProducts && this.userProducts.length === 0) {
      return this.appService.openSnackBar("Please add an product and then proceed","sucess")
    }
    if(userId){
      const obj = {
        'userId': userId,
        'products': this.userProducts
      }
     const userSubcription = this.appService.saveUserProducts(obj).subscribe((data) => {
        if(data['status'].code === 200){
          this.appService.openSnackBar("products sucessfully saved","sucess")
        }
      },(err)=>{console.error(err)});
       (userSubcription) ? this.subscriptions.push(userSubcription):' '
    }else{
      this.appService.loginStatus.next(false);
      this.appService.openSnackBar("Please Login Again to  continue","error")
      this.router.navigate(['login']);
    }
   
  }
  showDialog(): Promise<Boolean>{
    const dialogRef = this.matDialog.open(DialogComponent);
   return  dialogRef.afterClosed().toPromise();
   
  }
  showUserProducts(){
    this.router.navigate(['item'])
  }
  async canDeactivate() {
    if (this.appService.getBackButtonStatus()){
      console.log(this.appService.getBackButtonStatus(),'statusssss')
    this.appService.setBackButton(false);
    const message = await this.showDialog();
    if(message){
      localStorage.clear();
      this.appService.setHeaderType('false');
      this.appService.loginStatus.next(true);
    }  
    return message;
  }else{
    return true;
  }
}
  ngOnDestroy(){
    this.subscriptions.forEach((subscription)=>{
      subscription.unsubscribe();
    })
  }
}
