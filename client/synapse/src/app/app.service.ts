import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {
   baseUrl="localhost:3000/"
  constructor(private http: HttpClient) {

   }
 
   signUp(): Observable<any>{
    return this.http.get(`${this.baseUrl}signup`)
    .pipe(retry(1));
   }
}
