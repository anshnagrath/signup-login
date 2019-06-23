import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { AppService } from '../app.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
  loggedIn :Boolean;
  constructor(private router: Router, private appService:AppService) {
    this.appService.getHeaderType().subscribe((loginState) => {
      loginState == 'true' ? this.loggedIn = true : this.loggedIn=false;
    });
   }
  onLoginAndSignUp(type) {
    type === 'login' ? this.appService.loginStatus.next(true) : this.appService.loginStatus.next(false);
    this.router.navigate(['login']);
  }
  showUserItems(){
    this.router.navigate(['/product/item']);
  }
  logout(){
    localStorage.clear();
    this.appService.setHeaderType('false');
    this.appService.loginStatus.next(true);
    this.router.navigate(['login']);
  }

}
