import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { SpinnerService } from '@services/spinner.service';
import { RegulationsService } from '@services/regulations.service';
import { trackID } from '@helpers/index';
import { Alerts, Regulations } from '@models/index';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-regulations',
  templateUrl: './regulations.component.html',
  styleUrls: ['./regulations.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegulationsComponent implements OnInit, OnDestroy {
  isLoading = true;
  trackID = null;
  regulations: Regulations[] = [];
  subscriptions: Subscription[] = [];
  alerts: Alerts = {
    server: '',
    error: '',
    success: '',
  };

  constructor(
    private spinnerService: SpinnerService,
    private regulationsService: RegulationsService,
  ) {
    this.trackID = trackID;

    this.subscriptions.push(
      this.regulationsService
        .getRegulations()
        .subscribe((data: Regulations[]) => {
          this.regulations = data;
        }),
    );
  }

  async ngOnInit() {
    try {
      const response: Regulations[] = await this.regulationsService.fetchRegulations();
      this.regulationsService.setRegulations(response);
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

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe(),
    );
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

  editLink(id: string): string {
    return `edytuj/${id}`;
  }
}
