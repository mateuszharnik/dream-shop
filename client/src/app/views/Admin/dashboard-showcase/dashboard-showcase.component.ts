import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { user } from '@helpers/fakeAPI';
import { User } from '@models/index';
import { SpinnerService } from '@services/spinner.service';

@Component({
  selector: 'app-dashboard-showcase',
  templateUrl: './dashboard-showcase.component.html',
  styleUrls: ['./dashboard-showcase.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardShowcaseComponent implements OnInit {
  isLoading = true;
  user: User = null;

  constructor(private spinnerService: SpinnerService) { }

  ngOnInit() {
    setTimeout(() => {
      this.user = user;
      this.isLoading = false;
      this.toggleSpinner();
    }, 1000);
  }

  toggleSpinner(isLoading = false) {
    if (this.spinnerService.getLoadingValue()) {
      this.spinnerService.setLoading(isLoading);
    }
  }
}
