import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Alerts, DeleteResponse, Email } from '@models/index';
import { EmailsModals } from '@models/modals';
import { NewsletterService } from '@services/newsletter.service';
import { SpinnerService } from '@services/spinner.service';
import { Subscription } from 'rxjs';
import jump from 'jump.js';

@Component({
  selector: 'app-newsletter-page',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NewsletterComponent implements OnInit, OnDestroy {
  @ViewChild('deleteButton') deleteButton: any = null;

  isLoading = true;
  isDisabled = false;
  isSubmitted = false;
  alerts: Alerts = {
    server: '',
    error: '',
    success: '',
  };
  modals: EmailsModals = {
    deleteEmails: [],
    deleteEmail: null,
  };
  subscriptions: Subscription[] = [];
  emails: Email[] = [];

  constructor(
    private spinnerService: SpinnerService,
    private newsletterService: NewsletterService,
    private router: Router,
  ) {
    this.subscriptions.push(this.newsletterService.getEmails().subscribe((data: Email[]) => {
      this.emails = data;
    }));
  }

  async ngOnInit() {
    try {
      const response: Email[] = await this.newsletterService.fetchEmails();
      this.newsletterService.setEmails(response);
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

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  setAlerts(server = '', error = '', success = '') {
    this.alerts.server = server;
    this.alerts.error = error;
    this.alerts.success = success;
  }

  computedButtonTitle(): 'Usuń adres email' | 'Usuwanie adresu email' {
    return this.isDisabled ? 'Usuwanie adresu email' : 'Usuń adres email';
  }

  computedButtonText(): 'Usuń' | 'Usuwanie' {
    return this.isDisabled ? 'Usuwanie' : 'Usuń';
  }

  async deleteEmail(id: string) {
    this.isSubmitted = true;
    this.isDisabled = true;

    try {
      const deleteResponse: Email = await this.newsletterService.deleteEmail(id);
      const emailsResponse: Email[] = await this.newsletterService.fetchEmails();
      this.newsletterService.setEmails(emailsResponse);
      this.setAlerts('', '', 'Pomyślnie usunięto email.');
    } catch (error) {
      if (error.status === 0 || error.status === 404) {
        this.setAlerts('Brak połączenia z serwerem.');
      } else {
        this.setAlerts('', error.error.message);
      }
    } finally {
      this.closeModal('deleteEmail');
      this.isDisabled = false;
      this.isSubmitted = false;
      jump('.admin-page', {
        duration: 1000,
      });
    }
  }

  async deleteEmails() {
    this.isSubmitted = true;
    this.isDisabled = true;

    try {
      const response: DeleteResponse = await this.newsletterService.deleteEmails();
      this.newsletterService.setEmails([]);
      this.setAlerts('', '', 'Pomyślnie usunięto wszystkie adresy email.');
    } catch (error) {
      if (error.status === 0 || error.status === 404) {
        this.setAlerts('Brak połączenia z serwerem.');
      } else {
        this.setAlerts('', error.error.message);
      }
    } finally {
      this.closeModal('deleteEmails');
      this.isDisabled = false;
      this.isSubmitted = false;
    }
  }

  openModal(email: Email) {
    if (this.modals.deleteEmail || this.modals.deleteEmails.length) {
      return;
    }

    if (email) {
      this.modals.deleteEmail = email;
    } else {
      this.modals.deleteEmails = this.emails;
    }

    this.setFocus();
  }

  setFocus() {
    setTimeout(() => {
      this.deleteButton.button.nativeElement.focus();
    }, 50);
  }

  closeModal(key: 'deleteEmail' | 'deleteEmails') {
    if (key === 'deleteEmail') {
      this.modals.deleteEmail = null;
      return;
    }

    this.modals.deleteEmails = [];
  }
}
