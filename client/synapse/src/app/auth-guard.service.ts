
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AppService } from './app.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public appService: AppService, public router: Router) {}
  canActivate(): boolean {
    if (!this.appService.isAuthenticated()) {
      this.router.navigate(['']);
      this.appService.openSnackBar("You are not Authorised to login",'Error')
      return false;
    }
    return true;
  }
}