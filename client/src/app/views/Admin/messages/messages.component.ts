import { Component, OnDestroy, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { markdown, trackID } from '@helpers/index';
import { Alerts, DeleteResponse, Message, MessageWithPagination, Pagination } from '@models/index';
import { MessagesModals } from '@models/modals';
import { MessageService } from '@services/message.service';
import { SpinnerService } from '@services/spinner.service';
import { WindowRefService } from '@services/window-ref.service';
import { Subscription } from 'rxjs';
import jump from 'jump.js';
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MessagesComponent implements OnInit, OnDestroy {
  @ViewChild('deleteButton') deleteButton: any = null;
  @ViewChild('messagesWrapper') messagesWrapper: any = null;

  messages: Message[] = null;
  isLoading = true;
  isLoadingMessages = false;
  isDisabled = false;
  isSubmitted = false;
  pagination: Pagination = null;
  windowEl: Window = null;
  trackID = null;
  subscriptions: Subscription[] = [];
  listenerTime = 100;
  throttleListener = null;
  debounceListener = null;
  modals: MessagesModals = {
    deleteMessages: [],
    deleteMessage: null,
  };
  alerts: Alerts = {
    server: '',
    error: '',
    success: '',
  };

  constructor(
    private spinnerService: SpinnerService,
    private messageService: MessageService,
    private renderer: Renderer2,
    private windowRefService: WindowRefService,
    private router: Router,
  ) {
    this.trackID = trackID;

    this.subscriptions.push(this.messageService.getMessages().subscribe((data: Message[]) => {
      this.messages = data
        ? data.map((message: Message) => {
            message.purify_subject = markdown(message.purify_subject);
            message.purify_message = markdown(message.purify_message);

            return message;
          })
        : data;
    }));

    this.windowEl = this.windowRefService.nativeWindow;
    this.throttleListener = this.renderer.listen('window', 'scroll', throttle(this.loadMessages, this.listenerTime));
    this.debounceListener = this.renderer.listen('window', 'scroll', debounce(this.loadMessages, this.listenerTime));
  }

  async ngOnInit() {
    try {
      const response: MessageWithPagination = await this.messageService.fetchMessages();
      this.pagination = response.pagination;
      this.messageService.setMessages(response.messages);
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
  computedButtonTitle(): 'Usuń pytanie' | 'Usuwanie pytania' {
    return this.isDisabled ? 'Usuwanie pytania' : 'Usuń pytanie';
  }

  computedButtonText(): 'Usuń' | 'Usuwanie' {
    return this.isDisabled ? 'Usuwanie' : 'Usuń';
  }

  setAlerts(server = '', error = '', success = '') {
    this.alerts.server = server;
    this.alerts.error = error;
    this.alerts.success = success;
  }

  async deleteMessage(id: string) {
    this.isSubmitted = true;
    this.isDisabled = true;

    try {
      const deleteMessageResponse: Message = await this.messageService.deleteMessage(id);
      const messagesResponse: MessageWithPagination = await this.messageService.fetchMessages();
      this.messageService.setMessages(messagesResponse.messages);
      this.setAlerts('', '', 'Pomyślnie usunięto wiadomość.');
    } catch (error) {
      if (error.status === 0 || error.status === 404) {
        this.setAlerts('Brak połączenia z serwerem.');
      } else {
        this.setAlerts('', error.error.message);
      }
    } finally {
      this.closeModal('deleteMessage');
      this.isDisabled = false;
      this.isSubmitted = false;
      jump('.admin-page-section', {
        duration: 1000,
      });
    }
  }

  loadMessages = async () => {
    if (!this.messagesWrapper) {
      return;
    }

    const rect: DOMRect = this.messagesWrapper.nativeElement.getBoundingClientRect();
    const shouldLoad: boolean = rect.bottom - 200 < this.windowEl.innerHeight;

    if (shouldLoad && !this.isLoadingMessages && this.pagination.remaining) {
      try {
        this.isLoadingMessages = true;
        const skip: number = this.pagination.skip + this.pagination.limit;
        const response: MessageWithPagination = await this.messageService.fetchMessages(skip);
        this.pagination = response.pagination;
        this.messageService.setMessages([
          ...this.messages,
          ...response.messages,
        ]);
      } catch (error) {
        if (error.status === 0 || error.status === 404) {
          this.setAlerts('Brak połączenia z serwerem.');
        } else {
          this.setAlerts('', error.error.message);
        }
      } finally {
        this.isLoadingMessages = false;
      }
    }
  }

  async deleteMessages() {
    this.isSubmitted = true;
    this.isDisabled = true;

    try {
      const response: DeleteResponse = await this.messageService.deleteMessages();
      this.messageService.setMessages([]);
      this.setAlerts('', '', 'Pomyślnie usunięto wszystkie wiadomości.');
    } catch (error) {
      if (error.status === 0 || error.status === 404) {
        this.setAlerts('Brak połączenia z serwerem.');
      } else {
        this.setAlerts('', error.error.message);
      }
    } finally {
      this.closeModal('deleteMessages');
      this.isDisabled = false;
      this.isSubmitted = false;
    }
  }

  openModal(message: Message) {
    if (this.modals.deleteMessage || this.modals.deleteMessages.length) {
      return;
    }

    if (message) {
      this.modals.deleteMessage = message;
    } else {
      this.modals.deleteMessages = this.messages;
    }

    this.setFocus();
  }

  setFocus() {
    setTimeout(() => {
      this.deleteButton.button.nativeElement.focus();
    }, 50);
  }

  closeModal(key: 'deleteMessage' | 'deleteMessages') {
    if (key === 'deleteMessage') {
      this.modals.deleteMessage = null;
      return;
    }

    this.modals.deleteMessages = [];
  }
}
