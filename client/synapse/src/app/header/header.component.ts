import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
@Output() loginMode = new EventEmitter();
  constructor() { }
  onLogin() {
    this.loginMode.emit('login');
  }
  onSignUp() {
    this.loginMode.emit('signup');
  }
}
