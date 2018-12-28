import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { BasicAuthenticationService } from '../basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterService implements HttpInterceptor {

  constructor(private basicAuthenticationService: BasicAuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    let basicAuthHeaderString = this.basicAuthenticationService.getAuthenticatedToken();
    let username = this.basicAuthenticationService.getAuthenticatedUser();

    if (basicAuthHeaderString && username) {
      // request cannot be changed so we have to clone it
      request = request.clone({
        setHeaders: {
          Authorization: basicAuthHeaderString
        }
      })
    }

    // sending out the modified request
    return next.handle(request)
  }
}
