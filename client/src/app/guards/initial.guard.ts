import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { UserService } from '@services/user.service';
import { User } from '@models/index';
import { decodeToken, getToken } from '@helpers/token';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InitialGuard implements CanActivate, CanActivateChild {
  constructor(private userService: UserService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkToken(next, state);
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkToken(next, state);
  }

  checkToken(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!getToken()) {
      return true;
    }

    const user: User = decodeToken(getToken());

    if (!user || (user && !user._id)) {
      this.userService.removeUser();
      return true;
    }

    return this.userService
      .fetchUser(user._id)
      .then((userData: User) => {
        this.userService.setUser(userData);
        return true;
      })
      .catch((error) => {
        this.userService.removeUser();
        return true;
      });
  }
}
