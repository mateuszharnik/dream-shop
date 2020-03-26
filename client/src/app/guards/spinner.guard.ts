import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SpinnerService } from '@services/spinner.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerGuard implements CanActivate {
  constructor(private spinnerService: SpinnerService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.toggleSpinner(next.data.showSpinner ? true : false);
      return true;
  }

  toggleSpinner(isLoading = false) {
    if (this.spinnerService.getLoadingValue() === !isLoading) {
      this.spinnerService.setLoading(isLoading);
    }
  }
}
