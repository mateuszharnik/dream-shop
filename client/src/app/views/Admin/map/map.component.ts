import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DocumentRefService } from '@services/document-ref.service';
import { MapService } from '@services/map.service';
import { SpinnerService } from '@services/spinner.service';
import { ButtonSaveText, ButtonSaveTitle } from '@models/buttons';
import { ValidationError } from '@models/errors';
import { Map, MapEvent } from '@models/index';
import { setAlerts } from '@helpers/alerts';
import { setLoading, startSubmittingForm } from '@helpers/components';
import { serverErrorMessage } from '@helpers/variables/errors';
import { NOT_FOUND } from '@helpers/variables/constants/status-codes';
import { successfullySavedMessage } from '@helpers/variables/success';
import { mapAdminPageTitle } from '@helpers/variables/titles';
import { latlngPattern, latlngRequired } from '@helpers/errors/messages/map';
import { validation } from '@helpers/validation';
import { latlngValidators } from '@helpers/validation/map';
import {
  saveText,
  saveTitle,
  savingText,
  savingTitle,
} from '@helpers/variables/buttons';
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
  isLoading = true;
  isDisabled = false;
  isSubmitted = false;
  serverErrorAlert = '';
  errorAlert = '';
  successAlert = '';
  subscriptions: Subscription[] = [];

  /* ====== Functions ====== */
  validation = null;
  setAlerts = null;
  setLoading = null;
  startSubmittingForm = null;

  /* ====== Validation Errors ====== */
  latlngValidationErrors: ValidationError[] = [latlngPattern, latlngRequired];

  constructor(
    private spinnerService: SpinnerService,
    private formBuilder: FormBuilder,
    private mapService: MapService,
    private documentRefService: DocumentRefService,
  ) {
    this.documentRefService.nativeDocument.title = mapAdminPageTitle;

    this.validation = validation(this, 'MapComponent');
    this.setAlerts = setAlerts(this, 'MapComponent');
    this.setLoading = setLoading(this, 'MapComponent');
    this.startSubmittingForm = startSubmittingForm(this, 'MapComponent');

    this.addMapSubscription();
  }

  async ngOnInit() {
    try {
      this.map = await this.mapService.fetchMap();
      this.mapService.setMap(this.map);
    } catch (error) {
      this.onError(error);
    } finally {
      this.createForm(this.map);
      this.setLoading();
    }
  }

  ngOnDestroy() {
    this.removeSubscriptions();
  }

  addMapSubscription() {
    this.subscriptions.push(
      this.mapService.getMap().subscribe((map: Map) => {
        this.map = map;
      }),
    );
  }

  removeSubscriptions() {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe(),
    );
  }

  createForm(map: Map) {
    const { latlng = '' } = map || {};

    this.form = this.formBuilder.group({
      latlng: [latlng, latlngValidators],
    });
  }

  buttonTitle(condition = false): ButtonSaveTitle {
    return condition ? savingTitle : saveTitle;
  }

  buttonText(condition = false): ButtonSaveText {
    return condition ? savingText : saveText;
  }

  async saveSettings() {
    if (!this.startSubmittingForm()) {
      return;
    }

    try {
      this.map = await this.mapService.saveMap(this.map._id, this.form.value);
      this.mapService.setMap(this.map);
      this.setAlerts({ successAlert: successfullySavedMessage });
    } catch (error) {
      this.onError(error);
    } finally {
      this.isDisabled = false;
      this.isSubmitted = false;
    }
  }

  onError(error) {
    if (!error.status || error.status === NOT_FOUND) {
      this.setAlerts({ serverErrorAlert: serverErrorMessage });
    } else {
      this.setAlerts({ errorAlert: error.error.message });
    }
  }

  setPosition(event: MapEvent) {
    this.form.setValue({
      latlng: `(${event.lat}, ${event.lng})`,
    });
  }

  get formControls() {
    return this.form.controls;
  }
}
