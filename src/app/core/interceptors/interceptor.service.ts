import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';
@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private loginService: LoginService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.loginService.isLogado())
      this.router.navigate(['login']);

    return next.handle(request);
  }
}