import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '@app/_services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
    ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      const account= this.authService.accountValue;
      if (account){
        /**
         * check if route is restricted by role
         * redirect to home if role not authorize
         */

        return true;
      }

      this.router.navigate(['/front/login'], { queryParams: { returnUrl: state.url }});
      return false;
  }
  
}
