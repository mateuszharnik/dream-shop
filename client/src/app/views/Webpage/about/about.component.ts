import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { markdown } from '@helpers/index';
import { About, Alerts } from '@models/index';
import { AboutService } from '@services/about.service';
import { SpinnerService } from '@services/spinner.service';
import { Subscription } from 'rxjs';

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
      this.setLoading();
    }

    try {
      const response: About = await this.aboutService.fetchAbout();
      this.aboutService.setAbout(response);
      this.setLoading();
    } catch (error) {
      if (error.status === 0 || error.status === 404) {
        this.setAlerts('Brak połączenia z serwerem.');
      } else {
        this.setAlerts('', error.error.message);
      }

      this.setLoading();
    }
  }

  setLoading(loading = false) {
    this.isLoading = loading;
    setTimeout(() => {
      this.spinnerService.setLoading(this.isLoading);
    }, 50);
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
}
