import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Alerts, Email } from '@models/index';
import { NewsletterService } from '@services/newsletter.service';
import { SpinnerService } from '@services/spinner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-newsletter-page',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NewsletterComponent implements OnInit, OnDestroy {
  @ViewChild ('deleteButton') deleteButton: any = null;

  isLoading = true;
  isDisabled = false;
  isSubmitted = false;
  emailToDelete: Email = null;
  alerts: Alerts = {
    server: '',
    error: '',
    success: '',
  };
  subscriptions: Subscription[] = [];
  emails: Email[] = [];

  constructor(private spinnerService: SpinnerService, private newsletterService: NewsletterService) {
    this.subscriptions.push(this.newsletterService.getEmails().subscribe((data: Email[]) => {
      this.emails = data;
    }));
  }

  async ngOnInit() {
    try {
      const response = await this.newsletterService.fetchEmails();
      this.newsletterService.setEmails(response);
    } catch (error) {
      if (error.status === 0) {
        this.setAlerts('Brak połączenia z serwerem');
      } else {
        this.setAlerts('', error.error.message);
      }
    } finally {
      this.isLoading = false;
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

  computedButtonTitle(): 'Usuń adres email' | 'Usuwanie adresu email' {
    return this.isDisabled ? 'Usuwanie adresu email' : 'Usuń adres email';
  }

  computedButtonText(): 'Usuń' | 'Usuwanie' {
    return this.isDisabled ? 'Usuwanie' : 'Usuń';
  }

  async submit(id: string) {
    this.isSubmitted = true;
    this.isDisabled = true;

    try {
      const response = await this.newsletterService.deleteEmail(id);
      this.newsletterService.setEmails(response);
      this.setAlerts('', '', 'Pomyślnie usunięto');
    } catch (error) {
      if (error.status === 0) {
        this.setAlerts('Brak połączenia z serwerem');
      } else {
        this.setAlerts('', error.error.message);
      }
    } finally {
      this.closeModal();
      this.isDisabled = false;
      this.isSubmitted = false;
    }
  }

  toggleSpinner(isLoading = false) {
    if (this.spinnerService.getLoadingValue()) {
      this.spinnerService.setLoading(isLoading);
    }
  }

  openModal(email: Email) {
    if (!this.emailToDelete) {
      this.emailToDelete = email;
      this.setFocus();
    }
  }

  setFocus() {
    setTimeout(() => {
      this.deleteButton.button.nativeElement.focus();
    }, 50);
  }

  closeModal() {
    this.emailToDelete = null;
  }
}
