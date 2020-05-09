import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '@services/user.service';
import { getToken, decodeToken, removeToken } from '@helpers/token';
import { User } from '@models/index';

@Injectable({
  providedIn: 'root',
})
export class IsAdminGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private userService: UserService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAdmin(next, state);
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAdmin(next, state);
  }

  isAdmin(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('Is Admin');
    if (!getToken()) {
      this.router.navigate(['/zaloguj']);
      return false;
    }

    const user: User = decodeToken(getToken());

    if (!user || (user && !user._id)) {
      removeToken();
      this.router.navigate(['/zaloguj']);
      return false;
    }

    return this.userService.fetchUser(user._id)
      .then((data: User) => {
        if (data.roles.indexOf('administratora') === -1) {
          this.router.navigate(['/admin']);
          return false;
        }
        return true;
      })
      .catch(error => {
        removeToken();
        this.router.navigate(['/zaloguj']);
        return false;
      });
  }
}
