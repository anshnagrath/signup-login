import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { HTTPStatus } from './http-error.interceptor';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  loadinController;
  constructor(private httpStatus: HTTPStatus){
    sessionStorage.setItem('loggedIn', 'false'); 
  }
  ngAfterViewInit() {
    this.httpStatus.getHttpStatus().pipe(delay(0)).subscribe((status)=>{
      this.loadinController = status;
    });
  }
}
