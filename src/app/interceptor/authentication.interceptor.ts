import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthenticationService} from '../services/authentication/authentication.service';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {mixStringWithKey} from '../utils/request-util';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationInterceptor implements HttpInterceptor {
  private COOKIE_NAME = 'cv_application';
  private KEY_CRYPTOGRAPHER = 'cryptographer';

  constructor(private authenticationService: AuthenticationService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentAuthenticationToken = this.authenticationService.currentAuthenticationTokenValue;
    if (currentAuthenticationToken) {
      req = req.clone({ setHeaders: {
          Authorization: `Bearer ${mixStringWithKey(atob(currentAuthenticationToken.accessToken), this.KEY_CRYPTOGRAPHER)}`
          // Authorization: `Bearer ${currentAuthenticationToken.accessToken}`
        } });
    }
    return next.handle(req)
      .pipe(catchError( (err) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status !== 200) {
          if (!req.headers.has('Authorization')) {
            if (currentAuthenticationToken) {
              req = req.clone({headers: req.headers.delete('Authorization', mixStringWithKey(atob(currentAuthenticationToken.accessToken), this.KEY_CRYPTOGRAPHER))});
              // req = req.clone({headers: req.headers.delete('Authorization', currentAuthenticationToken.accessToken)});
            }
          }
          return next.handle(req);
        }
      }
      return Observable.throw(err.error);
    }));
  }
}
