import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AppService {
   baseUrl="http://13.233.164.239/api/";
  constructor(private http: HttpClient, private router:Router ,private snackbar: MatSnackBar,public jwtHelper: JwtHelperService) {}
    loginStatus = new BehaviorSubject(true);
    isLoggedIn = new BehaviorSubject('false');
    backbutton:Boolean = false;

    public isAuthenticated(): boolean {
    const token = localStorage.getItem('x-access-token');
    this.setHeaderType(!this.jwtHelper.isTokenExpired(token));
    return !this.jwtHelper.isTokenExpired(token);
  }
  setHeaderType(loggedIn)  {
    sessionStorage.setItem('loggedIn', loggedIn.toString());
    this.isLoggedIn.next(loggedIn.toString())
  }
  getHeaderType() {
   const currentValue = sessionStorage.getItem('loggedIn');
    this.isLoggedIn.next(currentValue.toString());
    return this.isLoggedIn;
  }
   signUp(signUpObject): Observable<any>{
     return this.http.post(`${this.baseUrl}signup`, { user: signUpObject});
   }
   login(loginObject){
    return this.http.post(`${this.baseUrl}login`, {loginObject});
   }
  openSnackBar(message: any, action: any) {
    this.snackbar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top', 
      horizontalPosition: 'end'

    });
  }
  setBackButton(state: Boolean) {
    if (this.router.url !== '/product/item') {
      this.backbutton  = state;
    }
  }
  getBackButtonStatus(): Boolean {
    return this.backbutton;
  }
  getAllProducts(){
    return this.http.get(`${this.baseUrl}getproducts`);
  }
  getUserProducts(userId){
    return this.http.get(`${this.baseUrl}getuserproducts/${userId}`);
  }
  saveUserProducts(productObject) {
    return this.http.post(`${this.baseUrl}saveProducts`, {...productObject});
  }

}
