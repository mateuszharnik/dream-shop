import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { decodeToken, getToken } from '@helpers/token';
import { User } from '@models/index';
import { UserService } from '@services/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private userService: UserService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.dashboard(next, state);
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.dashboard(next, state);
  }

  dashboard(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!getToken()) {
      this.router.navigate(['/zaloguj']);
      return false;
    }

    const user: User = decodeToken(getToken());

    if (!user || (user && !user._id)) {
      this.userService.removeUser();
      this.router.navigate(['/zaloguj']);
      return false;
    }

    return this.userService.fetchUser(user._id)
      .then((data: User) => {
        if (next.data.isAdmin && data.roles.indexOf('administrator') === -1) {
          this.router.navigate(['/admin']);
          return false;
        }
        return true;
      })
      .catch(error => {
        this.userService.removeUser();
        this.router.navigate(['/zaloguj']);
        return false;
      });
  }
}
