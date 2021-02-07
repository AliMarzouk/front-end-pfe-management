import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "../service/auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  token: string;

  constructor(private authService: AuthService) {
  }
  AUTH_HEADER = "Authorization"

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService.user.subscribe(value => {
      this.token = value.token
    })
    if (req) {
      const duplicate = req.clone({headers: req.headers.set(this.AUTH_HEADER, "Bearer " + this.token)});
      return next.handle(duplicate);
    }
    return next.handle(req);
  }
}
