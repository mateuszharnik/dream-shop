import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { SpinnerService } from '@services/spinner.service';
import { About, Alerts } from '@models/index';
import { AboutService } from '@services/about.service';
import { Subscription } from 'rxjs';
import { markdown } from '@helpers/index';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AboutComponent implements OnInit, OnDestroy {
  about: About = null;
  isLoading = true;
  alerts: Alerts = {
    server: '',
    error: '',
    success: '',
  };
  subscriptions: Subscription[] = [];

  constructor(private spinnerService: SpinnerService, private aboutService: AboutService) {
    this.subscriptions.push(this.aboutService.getAbout().subscribe((data: About) => {
      if (data) {
        data.information = markdown(data.information);
      }
      this.about = data;
    }));

    this.isLoading = this.about ? false : true;
  }

  async ngOnInit() {
    if (this.about) {
      this.isLoading = false;
      return this.toggleSpinner();
    }

    try {
      const response: About = await this.aboutService.fetchAbout();
      this.aboutService.setAbout(response);
    } catch (error) {
      if (error.status === 0) {
        this.setAlerts('Brak połączenia z serwerem');
      } else {
        this.setAlerts('', error.error.message);
      }
    } finally {
      this.isLoading = false;
      this.toggleSpinner();
    }
  }

  setAlerts(server = '', error = '', success = '') {
    this.alerts.server = server;
    this.alerts.error = error;
    this.alerts.success = success;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  show(): boolean {
    return this.about && this.about.information !== '';
  }

  toggleSpinner(isLoading = false) {
    if (this.spinnerService.getLoadingValue()) {
      this.spinnerService.setLoading(isLoading);
    }
  }
}
