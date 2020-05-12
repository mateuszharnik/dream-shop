import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert, Alerts, Map } from '@models/index';
import { MapService } from '@services/map.service';
import { SpinnerService } from '@services/spinner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-map-page',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MapComponent implements OnInit, OnDestroy {
  form: FormGroup = null;
  map: Map = null;
  alerts: Alerts = {
    server: '',
    error: '',
    success: '',
  };
  isLoading = true;
  isDisabled = false;
  isSubmitted = false;
  subscriptions: Subscription[] = [];

  latlngAlerts: Alert[] = [
    { id: '0', message: 'Podana pozycja nie jest prawidłowa.', key: 'pattern' },
  ];

  constructor(
    private spinnerService: SpinnerService,
    private formBuilder: FormBuilder,
    private mapService: MapService,
    private router: Router,
  ) {
    this.subscriptions.push(this.mapService.getMap().subscribe((data: Map) => {
      this.map = data;
    }));
  }

  async ngOnInit() {
    try {
      const response: Map = await this.mapService.fetchMap();
      this.mapService.setMap(response);
      this.createForm(this.map);
      this.setLoading();
    } catch (error) {
      if (error.status === 0 || error.status === 404) {
        this.setAlerts('Brak połączenia z serwerem.');
      } else {
        this.setAlerts('', error.error.message);
      }

      this.createForm(this.map);
      this.setLoading();
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
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

  createForm(map: Map) {
    const latlng = map && map.latlng ? map.latlng : '';

    this.form = this.formBuilder.group({
      latlng: [latlng,
        {
          validators: [
            Validators.pattern(/^\(-?[0-9]+\.[0-9]+,\s-?[0-9]+\.[0-9]+\)$/),
          ],
        }],
    });
  }

  validation(prop: string): boolean {
    return (
      this.formControls[prop].errors && (this.formControls[prop].dirty || this.formControls[prop].touched))
      || (this.formControls[prop].errors && this.isSubmitted
      );
  }

  computedButtonTitle(): 'Zapisz zmiany' | 'Zapisywanie zmian' {
    return this.isDisabled ? 'Zapisywanie zmian' : 'Zapisz zmiany';
  }

  computedButtonText(): 'Zapisz' | 'Zapisywanie' {
    return this.isDisabled ? 'Zapisywanie' : 'Zapisz';
  }

  async submit() {
    this.isSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    this.isDisabled = true;

    try {
      const response: Map = await this.mapService.saveMap(this.map._id, this.form.value);
      this.mapService.setMap(response);
      this.setAlerts('', '', 'Pomyślnie zapisano.');
    } catch (error) {
      if (error.status === 0 || error.status === 404) {
        this.setAlerts('Brak połączenia z serwerem.');
      } else {
        this.setAlerts('', error.error.message);
      }
    } finally {
      this.isDisabled = false;
      this.isSubmitted = false;
    }
  }

  setPosition(event) {
    this.form.setValue({
      latlng: `(${event.lat}, ${event.lng})`,
    });
  }

  get formControls() {
    return this.form.controls;
  }
}
