import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> | boolean {
    if (!this.loginService.isLogado()) {
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }
}
