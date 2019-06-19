import { Component, OnInit } from '@angular/core';
import { HTTPStatus } from '../http-error.interceptor';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  showSignUp: Boolean;
  selectedMode: string;
  loadinController: Observable<Boolean>;
  constructor(private httpStatus: HTTPStatus) {
    this.loadinController = this.httpStatus.getHttpStatus();
    
   }

  ngOnInit() {
  }
  selectedMethod(selectedMode: string) {
    this.selectedMode = selectedMode;
    (selectedMode) ? this.showSignUp = true : this.showSignUp = false;
  }
}
