import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentRefService } from '@services/document-ref.service';
import { RegulationsService } from '@services/regulations.service';
import { SpinnerService } from '@services/spinner.service';
import { ButtonSaveText, ButtonSaveTitle } from '@models/buttons';
import { ValidationError } from '@models/errors';
import { Regulation } from '@models/index';
import { setAlerts } from '@helpers/alerts';
import { setLoading, startSubmittingForm } from '@helpers/components';
import { contentRequired } from '@helpers/errors/messages/regulations';
import { validation } from '@helpers/validation';
import { contentValidators } from '@helpers/validation/regulation';
import { clientRoutes } from '@helpers/variables/routes';
import { successfullySavedMessage } from '@helpers/variables/success';
import { editRegulationAdminPageTitle } from '@helpers/variables/titles';
import { NOT_FOUND } from '@helpers/variables/constants/status-codes';
import {
  saveText,
  saveTitle,
  savingText,
  savingTitle,
} from '@helpers/variables/buttons';
import {
  contentIsRequired,
  serverErrorMessage,
} from '@helpers/variables/errors';
import {
  contentMaxLength,
  contentMinLength,
} from '@helpers/errors/messages/regulations';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-regulations',
  templateUrl: './edit-regulations.component.html',
  styleUrls: ['./edit-regulations.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditRegulationsComponent implements OnInit, OnDestroy {
  form: FormGroup = null;
  regulation: Regulation = null;
  id: string = null;
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
  contentValidationErrors: ValidationError[] = [
    contentMaxLength,
    contentMinLength,
    contentRequired,
  ];

  constructor(
    private regulationsService: RegulationsService,
    private activateRoute: ActivatedRoute,
    private spinnerService: SpinnerService,
    private formBuilder: FormBuilder,
    private documentRefService: DocumentRefService,
    private router: Router,
  ) {
    this.documentRefService.nativeDocument.title = editRegulationAdminPageTitle;
    this.id = this.activateRoute.snapshot.params.id;

    this.validation = validation(this, 'EditRegulationsComponent');
    this.setAlerts = setAlerts(this, 'EditRegulationsComponent');
    this.setLoading = setLoading(this, 'EditRegulationsComponent');
    this.startSubmittingForm = startSubmittingForm(
      this,
      'EditRegulationsComponent',
    );
  }

  async ngOnInit() {
    try {
      this.regulation = await this.regulationsService.fetchRegulation(this.id);
    } catch (error) {
      this.onErrorInit(error);
    } finally {
      this.createForm(this.regulation);
      this.setLoading();
    }
  }

  ngOnDestroy() {
    this.removeSubscriptions();
  }

  removeSubscriptions() {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe(),
    );
  }

  onErrorInit(error) {
    if (!error.status) {
      this.setAlerts({ serverErrorAlert: serverErrorMessage });
    } else if (error.status === NOT_FOUND) {
      this.router.navigate([clientRoutes.notFound]);
    } else {
      this.setAlerts({ errorAlert: error.error.message });
    }
  }

  createForm(regulation: Regulation) {
    const { content = '' } = regulation || {};

    this.form = this.formBuilder.group({
      content: [content, contentValidators],
    });
  }

  buttonTitle(condition = false): ButtonSaveTitle {
    return condition ? savingTitle : saveTitle;
  }

  buttonText(condition = false): ButtonSaveText {
    return condition ? savingText : saveText;
  }

  regulationsLink(): string {
    const { admin, regulations } = clientRoutes;

    return `${admin}${regulations}`;
  }

  async saveSettings() {
    if (!this.startSubmittingForm()) {
      return;
    }

    try {
      this.regulation = await this.regulationsService.updateRegulation(
        this.regulation._id,
        this.form.value,
      );

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
      if (error.error.message === contentIsRequired) {
        this.formControls.content.setValue(this.form.value.content, {
          onlySelf: true,
        });
      }

      this.setAlerts({ errorAlert: error.error.message });
    }
  }

  get formControls() {
    return this.form.controls;
  }
}
