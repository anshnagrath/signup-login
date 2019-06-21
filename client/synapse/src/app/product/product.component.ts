import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '../app.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'product-login',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit,OnDestroy {
  allProducts: Observable<any>;
  userProducts: Array<String> = [];
  subscriptions: Subscription;
  constructor(public appService: AppService,public router:Router) {
   
   }

  ngOnInit() {
    this.subscriptions = this.appService.getAllProducts().subscribe((products) => {
      this.allProducts = products['data'];
    });
  }
  selectedProducts(checkStatus, productId) {
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
      })
      this.subscriptions.add(userSubcription)
    }else{
      this.appService.loginStatus.next(false);
      this.appService.openSnackBar("Please Login Again to  continue","error")
      this.router.navigate(['login']);
    }
   
  }
  showUserProducts(){
    this.router.navigate(['item'])
  }
  ngOnDestroy(){
    (this.subscriptions)?this.subscriptions.unsubscribe():'';
  }
}
