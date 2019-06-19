import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  //http error are handled in the interceptor
   baseUrl="http://localhost:3000/"
  constructor(private http: HttpClient, private snackbar: MatSnackBar) {

   }
   signUp(signUpObject): Observable<any>{
     return this.http.post(`${this.baseUrl}signup`, { user: signUpObject});
   }
   login(loginObject){
    return this.http.post(`${this.baseUrl}signup`, {loginObject});
   }
  openSnackBar(message: any, action: any) {
    this.snackbar.open(message, action, {
      duration: 2000,
    });
  }

}
