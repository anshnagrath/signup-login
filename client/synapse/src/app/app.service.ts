import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {
   baseUrl="http://localhost:3000/"
  constructor(private http: HttpClient, private snackbar: MatSnackBar) {

   }
 
   signUp(signUpObject): Observable<any>{
     //http error are handled in the interceptor
     return this.http.post(`${this.baseUrl}signup`, { user: signUpObject});
   }
  openSnackBar(message: any, action: any) {
    this.snackbar.open(message, action, {
      duration: 2000,
    });
  }

}
