import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { SpinnerService } from '@services/spinner.service';
import { RegulationsService } from '@services/regulations.service';
import { DocumentRefService } from '@services/document-ref.service';
import { Regulation } from '@models/index';
import { trackID } from '@helpers/index';
import { setAlerts } from '@helpers/alerts';
import { setLoading } from '@helpers/components';
import { NOT_FOUND } from '@helpers/variables/constants/status-codes';
import { serverErrorMessage } from '@helpers/variables/errors';
import { regulationsAdminPageTitle } from '@helpers/variables/titles';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-regulations',
  templateUrl: './regulations.component.html',
  styleUrls: ['./regulations.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegulationsComponent implements OnInit, OnDestroy {
  isLoading = true;
  serverErrorAlert = '';
  errorAlert = '';
  successAlert = '';
  regulations: Regulation[] = [];
  subscriptions: Subscription[] = [];

  /* ====== Functions ====== */
  trackID = null;
  setLoading = null;
  setAlerts = null;

  constructor(
    private spinnerService: SpinnerService,
    private documentRefService: DocumentRefService,
    private regulationsService: RegulationsService,
  ) {
    this.documentRefService.nativeDocument.title = regulationsAdminPageTitle;

    this.trackID = trackID;
    this.setAlerts = setAlerts(this, 'RegulationsComponent');
    this.setLoading = setLoading(this, 'RegulationsComponent');

    this.addRegulationsSubscription();
  }

  async ngOnInit() {
    try {
      this.regulations = await this.regulationsService.fetchRegulations();
      this.regulationsService.setRegulations(this.regulations);
    } catch (error) {
      this.onError(error);
    } finally {
      this.setLoading();
    }
  }

  ngOnDestroy() {
    this.removeSubscriptions();
  }

  addRegulationsSubscription() {
    this.subscriptions.push(
      this.regulationsService
        .getRegulations()
        .subscribe((regulations: Regulation[]) => {
          this.regulations = regulations;
        }),
    );
  }

  removeSubscriptions() {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe(),
    );
  }

  onError(error) {
    if (!error.status || error.status === NOT_FOUND) {
      this.setAlerts({ serverErrorAlert: serverErrorMessage });
    } else {
      this.setAlerts({ errorAlert: error.error.message });
    }
  }

  editLink(id: string): string {
    return `edytuj/${id}`;
  }
}
