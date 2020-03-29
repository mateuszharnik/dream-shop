import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SpinnerService } from '@services/spinner.service';
import { Alert, Map } from '@models/index';
import { map as mapData } from '@helpers/fakeAPI';

@Component({
  selector: 'app-map-page',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MapComponent implements OnInit {
  form: FormGroup = null;
  isLoading = true;
  isDisabled = false;
  isSubmitted = false;

  latlngAlerts: Alert[] = [
    { id: '0', message: 'Podana pozycja nie jest prawidłowa.', key: 'pattern' },
  ];

  constructor(private spinnerService: SpinnerService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
      this.toggleSpinner();
      this.createForm(mapData);
    }, 1000);
  }

  createForm(map: Map) {
    this.form = this.formBuilder.group({
      latlng: [map.latlng, { validators: [
        Validators.pattern(/^\(-?[0-9]+\.[0-9]+,\s-?[0-9]+\.[0-9]+\)$/),
      ]}],
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

  submit() {
    this.isSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    this.isDisabled = true;
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
