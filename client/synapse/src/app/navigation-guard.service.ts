
// import { Injectable } from '@angular/core';
// import { CanActivate, Route, NavigationEnd, Router } from '@angular/router';
// import { AppService } from './app.service';
// import { MatDialog } from '@angular/material/dialog';
// import { DialogComponent } from './dialog/dialog.component';
// import { resolve } from 'path';

// @Injectable()
// export class NavigationGuard implements CanActivate {
//     constructor(private router: Router, private appService: AppService, private matDialog: MatDialog) { }
//     canActivate(): Observale<boolean> {
// console.log(this.router.url,"url")
// return true;
//             this.router.events.subscribe((event)=>{
//                 console.log('eve')
//             if (event instanceof NavigationEnd){
//                 if (this.appService.isAuthenticated() && event.url === '/login'){
//                     const dialogRef = this.matDialog.open(DialogComponent);
//                     dialogRef.afterClosed().subscribe(result => {
//                         console.log(`Dialog result: ${result}`);
//                         if ( result === true ){
//                             localStorage.clear();
//                             this.appService.setHeaderType('false');
//                             this.appService.loginStatus.next(true);
//                                 return true
//                             // this.router.navigate(['login']);
//                         }else{
                
//                         }
//                     });
                
//                 } else if (event.url !== '/login') {
//                     // return true;
//                     console.log("inpin")
                   
             
//                 }
                
//             // }
//             // else {
//             //     return true;
//             // }
//         }else{
//                 console.log("hew")
//         }
//     })
   
       
 

// }
// }
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
    providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
    canDeactivate(component: CanComponentDeactivate) {
        console.log(component,"component")
        return component.canDeactivate ? component.canDeactivate() : true;
    }
}