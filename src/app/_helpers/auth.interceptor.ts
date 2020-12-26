import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@app/_services';
import { environment } from '@environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const account = this.authService.accountValue;
    const isLoggedIn = account && account.JwtToken;

    const isApiUrl = request.url.startsWith(environment.apiURL);

    if (isLoggedIn && isApiUrl){
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${account.JwtToken}`}
      });
    }
    return next.handle(request);
  }
}
