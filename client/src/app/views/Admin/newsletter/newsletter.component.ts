import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Alerts, DeleteResponse, Email, Pagination, EmailWithPagination } from '@models/index';
import { EmailsModals } from '@models/modals';
import { NewsletterService } from '@services/newsletter.service';
import { SpinnerService } from '@services/spinner.service';
import { Subscription } from 'rxjs';
import jump from 'jump.js';
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';
import { WindowRefService } from '@services/window-ref.service';

@Component({
  selector: 'app-newsletter-page',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NewsletterComponent implements OnInit, OnDestroy {
  @ViewChild('deleteButton') deleteButton: any = null;
  @ViewChild('emailsWrapper') emailsWrapper: any = null;

  isLoading = true;
  isLoadingEmails = false;
  isDisabled = false;
  isSubmitted = false;
  pagination: Pagination = null;
  listenerTime = 100;
  throttleListener: () => void = null;
  debounceListener: () => void = null;
  windowEl: Window = null;
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
    private renderer: Renderer2,
    private windowRefService: WindowRefService,
    private spinnerService: SpinnerService,
    private newsletterService: NewsletterService,
    private router: Router,
  ) {
    this.subscriptions.push(this.newsletterService.getEmails().subscribe((data: Email[]) => {
      this.emails = data;
    }));

    this.windowEl = this.windowRefService.nativeWindow;
    this.throttleListener = this.renderer.listen('window', 'scroll', throttle(this.loadEmails, this.listenerTime));
    this.debounceListener = this.renderer.listen('window', 'scroll', debounce(this.loadEmails, this.listenerTime));
  }

  async ngOnInit() {
    try {
      const response: EmailWithPagination = await this.newsletterService.fetchEmails();
      this.pagination = response.pagination;
      this.newsletterService.setEmails(response.emails);
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
    if (this.throttleListener) {
      this.throttleListener();
    }

    if (this.debounceListener) {
      this.debounceListener();
    }

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
      const emailsResponse: EmailWithPagination = await this.newsletterService.fetchEmails();
      this.newsletterService.setEmails(emailsResponse.emails);
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

  loadEmails = async () => {
    if (!this.emailsWrapper) {
      return;
    }

    const rect = this.emailsWrapper.nativeElement.getBoundingClientRect();
    const shouldLoad = rect.bottom - 200 < this.windowEl.innerHeight;

    if (shouldLoad && !this.isLoadingEmails && this.pagination.remaining) {
      try {
        this.isLoadingEmails = true;
        const skip = this.pagination.skip + this.pagination.limit;
        const response: EmailWithPagination = await this.newsletterService.fetchEmails(skip);
        this.pagination = response.pagination;
        this.newsletterService.setEmails([
          ...this.emails,
          ...response.emails,
        ]);
      } catch (error) {
        if (error.status === 0 || error.status === 404) {
          this.setAlerts('Brak połączenia z serwerem.');
        } else {
          this.setAlerts('', error.error.message);
        }
      } finally {
        this.isLoadingEmails = false;
      }
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
