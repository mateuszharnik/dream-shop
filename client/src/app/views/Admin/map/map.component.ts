import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SpinnerService } from '@services/spinner.service';
import { Alert, Map } from '@models/index';
import { Subscription } from 'rxjs';
import { MapService } from '@services/map.service';

@Component({
  selector: 'app-map-page',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MapComponent implements OnInit, OnDestroy {
  form: FormGroup = null;
  map: Map = null;
  alerts = {
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

  constructor(private spinnerService: SpinnerService, private formBuilder: FormBuilder, private mapService: MapService) {
    this.subscriptions.push(this.mapService.getMap().subscribe((data: Map) => {
      this.map = data;
    }));
  }

  async ngOnInit() {
    try {
      const response = await this.mapService.getData();
      console.log(response);
      this.mapService.setMap(response);
    } catch (error) {
      if (error.status === 0) {
        this.setAlerts('Brak połączenia z serwerem');
      }
    } finally {
      this.isLoading = false;
      this.createForm(this.map);
      this.toggleSpinner();
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
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
      const response = await this.mapService.setData(this.map._id, this.form.value);
      this.mapService.setMap(response);
      this.setAlerts('', '', 'Pomyślnie zapisano');
    } catch (error) {
      console.error(error);
      if (error.status === 0) {
        this.setAlerts('Brak połączenia z serwerem');
      } else if (error.status === 500) {
        this.setAlerts('', error.error.message);
      }
    } finally {
      this.isDisabled = false;
      this.isSubmitted = false;
    }
  }

  toggleSpinner(isLoading = false) {
    if (this.spinnerService.getLoadingValue()) {
      this.spinnerService.setLoading(isLoading);
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
