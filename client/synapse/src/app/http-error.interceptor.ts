import { HttpEvent,HttpInterceptor,HttpHandler,HttpRequest,HttpResponse,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { retry, catchError, tap, finalize } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AppService } from './app.service';
@Injectable()
export class HTTPStatus {
  public showLoader: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() {
   }

  setHttpStatus(inFlight: boolean) {
    if(inFlight === false){
      setTimeout(()=>{
        this.showLoader.next(inFlight);
      },2000)
    }else{

      this.showLoader.next(inFlight);
    }
  }

  getHttpStatus(): Observable<boolean> {
    return this.showLoader.asObservable();
  }
}

@Injectable()
  export class HttpErrorInterceptor implements HttpInterceptor {
  requestCounter: Number = 0;
  responseCounter: Number = 0; 
  constructor(private httpstatus: HTTPStatus, private appService: AppService){}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.httpstatus.setHttpStatus(true)
      this.requestCounter = Number(this.requestCounter) + Number(1);
      const token = localStorage.getItem('x-access-token') ? localStorage.getItem('x-access-token') : '';
      const authReq = request.clone({
        headers: request.headers.set('x-access-token', token)
      });
      return next.handle(authReq)
        .pipe(
          retry(1),
          catchError((error: HttpErrorResponse) => {
            let errorMessage = '';
            if (error.error instanceof ErrorEvent) {
              // client-side error
              errorMessage = `Error: ${error.error.message}`;
              this.appService.openSnackBar('Error Occured','Try again');
            } else {
              // server-side error
              errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
              console.error(error.status)
              if(error.status == 500) this.appService.openSnackBar('Server Unable to process request', 'Try again');
            }
            return throwError(errorMessage);
          }), tap(
        (event: any) => {
          if (event instanceof HttpResponse) {
            console.log(event.headers.get('x-access-token'),event,'eee')
              this.responseCounter = Number(this.responseCounter)+ Number(1);
              console.log(event,event.headers.get('x-access-token'),'jwt',event.body.status.code)
              if(request.url.includes("login") &&  event.body.status.code == 200){
                localStorage.setItem("x-access-token",event.headers.get('x-access-token'));
                localStorage.setItem("id",event.body.data[0].id);

              }
              
          }

        },
        err => {
          if (event instanceof HttpErrorResponse) {
            this.responseCounter = Number( this.responseCounter) + Number(1);
          }
        }
      ), finalize(() => {
        if (this.requestCounter === this.responseCounter) {
          console.log('stop loader');
          this.httpstatus.setHttpStatus(false)
          this.requestCounter = 0;
          this.responseCounter = 0;

        }
      })
      );
    }
   }