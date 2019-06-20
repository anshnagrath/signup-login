import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AppService {
   baseUrl="http://localhost:3000/"
    constructor(private http: HttpClient, private snackbar: MatSnackBar,public jwtHelper: JwtHelperService) {}
   public isAuthenticated(): boolean {
    const token = localStorage.getItem('x-access-token');
    console.log(token,this.jwtHelper.isTokenExpired(token),"tokens")
    return !this.jwtHelper.isTokenExpired(token);
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

}
