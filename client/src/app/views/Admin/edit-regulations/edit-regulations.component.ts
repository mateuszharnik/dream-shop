import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Alert, Alerts, Regulations } from '@models/index';
import { RegulationsService } from '@services/regulations.service';
import { SpinnerService } from '@services/spinner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-regulations',
  templateUrl: './edit-regulations.component.html',
  styleUrls: ['./edit-regulations.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditRegulationsComponent implements OnInit, OnDestroy {
  form: FormGroup = null;
  isLoading = true;
  regulation: Regulations = null;
  isDisabled = false;
  isSubmitted = false;
  id: string = null;
  subscriptions: Subscription[] = [];
  alerts: Alerts = {
    server: '',
    error: '',
    success: '',
  };

  contentAlerts: Alert[] = [
    { id: '0', message: 'Musisz podać treść.', key: 'required' },
    { id: '2', message: 'Treść jest za krótka.', key: 'minlength' },
    { id: '3', message: 'Treść jest za długa.', key: 'maxlength' },
  ];

  constructor(
    private regulationsService: RegulationsService,
    private activateRoute: ActivatedRoute,
    private spinnerService: SpinnerService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}

  async ngOnInit() {
    this.id = this.activateRoute.snapshot.params.id;

    try {
      this.regulation = await this.regulationsService.fetchRegulation(this.id);

      this.createForm(this.regulation);
      this.setLoading();
    } catch (error) {
      if (error.status === 404) {
        this.router.navigate(['/404']);
        return;
      } else if (error.status === 0) {
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

  setAlerts(server = '', error = '', success = '') {
    this.alerts.server = server;
    this.alerts.error = error;
    this.alerts.success = success;
  }

  setLoading(loading = false) {
    this.isLoading = loading;
    setTimeout(() => {
      this.spinnerService.setLoading(this.isLoading);
    }, 50);
  }

  createForm(regulations: Regulations) {
    const content: string =
      regulations && regulations.content ? regulations.content : '';

    this.form = this.formBuilder.group({
      content: [
        content,
        {
          validators: [
            Validators.minLength(3),
            Validators.maxLength(20000),
            Validators.required,
          ],
        },
      ],
    });
  }

  validation(prop: string): boolean {
    return (
      (this.formControls[prop].errors &&
        (this.formControls[prop].dirty || this.formControls[prop].touched)) ||
      (this.formControls[prop].errors && this.isSubmitted)
    );
  }

  buttonText(value: boolean): 'Zapisz' | 'Zapisywanie' {
    return value ? 'Zapisywanie' : 'Zapisz';
  }

  buttonTitle(value: boolean): 'Zapisz zmiany' | 'Zapisywanie zmian' {
    return value ? 'Zapisywanie zmian' : 'Zapisz zmiany';
  }

  async updateRegulations() {
    this.isSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    this.isDisabled = true;

    try {
      const response: Regulations = await this.regulationsService.updateRegulations(
        this.id,
        this.form.value,
      );
      this.regulation = response;

      const regulations: Regulations[] = await this.regulationsService.fetchRegulations();
      this.regulationsService.setRegulations(regulations);
      this.setAlerts('', '', 'Pomyślnie zaktualizowano regulamin.');
    } catch (error) {
      if (error.status === 0 || error.status === 404) {
        this.setAlerts('Brak połączenia z serwerem.');
      } else {
        if (error.error.message === 'Musisz podać treść.') {
          this.formControls.content.setValue(this.form.value.content, {
            onlySelf: true,
          });
        }
        this.setAlerts('', error.error.message);
      }
    } finally {
      this.isDisabled = false;
      this.isSubmitted = false;
    }
  }

  get formControls() {
    return this.form.controls;
  }
}
