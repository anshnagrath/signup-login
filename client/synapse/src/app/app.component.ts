import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HTTPStatus } from './http-error.interceptor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadinController: Observable<Boolean>;
  constructor(private httpStatus: HTTPStatus){
    this.loadinController = this.httpStatus.getHttpStatus();
  }
}
