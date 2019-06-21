import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AppService {
   baseUrl="http://localhost:3000/";
    constructor(private http: HttpClient, private snackbar: MatSnackBar,public jwtHelper: JwtHelperService) {}
    loginStatus = new BehaviorSubject(true);
    isLoggedIn = new BehaviorSubject('false')
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
  getAllProducts(){
    return this.http.get(`${this.baseUrl}getproducts`);
  }
  saveUserProducts(productObject) {
    return this.http.post(`${this.baseUrl}saveProducts`, {...productObject});
  }

}
