import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { UserService } from '@services/user.service';
import { AlertsService } from '@services/alerts.service';
import { User } from '@models/index';
import { decodeToken, getToken } from '@helpers/token';
import { clientRoutes } from '@helpers/variables/routes';
import { sessionExpiredMessage } from '@helpers/variables/errors';
import { ADMIN } from '@helpers/variables/constants/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardGuard implements CanActivate, CanActivateChild {
  timeout = 50;

  constructor(
    private router: Router,
    private userService: UserService,
    private alertsService: AlertsService,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.dashboard(next, state);
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
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
      this.router.navigate([clientRoutes.login]);
      return false;
    }

    const user: User = decodeToken(getToken());

    if (!user || (user && !user._id)) {
      this.userService.removeUser();
      this.router.navigate([clientRoutes.login]);

      return false;
    }

    return this.userService
      .fetchUser(user._id)
      .then((userData: User) => {
        if (next.data.isAdmin && userData.roles.indexOf(ADMIN) === -1) {
          this.router.navigate([clientRoutes.admin]);
          return false;
        }

        return true;
      })
      .catch((error) => {
        this.userService.removeUser();
        this.router.navigate([clientRoutes.login]);

        setTimeout(() => {
          this.alertsService.setAlert(sessionExpiredMessage);
        }, this.timeout);

        return false;
      });
  }
}
