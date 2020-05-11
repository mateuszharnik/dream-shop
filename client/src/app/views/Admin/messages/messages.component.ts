import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Alerts, DeleteResponse, Message } from '@models/index';
import { MessagesModals } from '@models/modals';
import { MessageService } from '@services/message.service';
import { SpinnerService } from '@services/spinner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MessagesComponent implements OnInit, OnDestroy {
  @ViewChild('deleteButton') deleteButton: any = null;

  messages: Message[] = null;
  isLoading = true;
  isDisabled = false;
  isSubmitted = false;
  subscriptions: Subscription[] = [];
  modals: MessagesModals = {
    deleteMessages: [],
    deleteMessage: null,
  };
  alerts: Alerts = {
    server: '',
    error: '',
    success: '',
  };

  constructor(private spinnerService: SpinnerService, private messageService: MessageService) {
    this.subscriptions.push(this.messageService.getMessages().subscribe((data: Message[]) => {
      this.messages = data;
    }));
  }

  async ngOnInit() {
    try {
      const response: Message[] = await this.messageService.fetchMessages();
      this.messageService.setMessages(response);
    } catch (error) {
      if (error.status === 0) {
        this.setAlerts('Brak połączenia z serwerem');
      } else {
        this.setAlerts('', error.error.message);
      }
    } finally {
      this.isLoading = false;
      this.spinnerService.setLoading(this.isLoading);
    }
  }

  ngOnDestroy() {
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
      const messagesResponse: Message[] = await this.messageService.fetchMessages();
      this.messageService.setMessages(messagesResponse);
      this.setAlerts('', '', 'Pomyślnie usunięto wiadomość');
    } catch (error) {
      if (error.status === 0) {
        this.setAlerts('Brak połączenia z serwerem');
      } else {
        this.setAlerts('', error.error.message);
      }
    } finally {
      this.closeModal('deleteMessage');
      this.isDisabled = false;
      this.isSubmitted = false;
    }
  }

  async deleteMessages() {
    this.isSubmitted = true;
    this.isDisabled = true;

    try {
      const response: DeleteResponse = await this.messageService.deleteMessages();
      this.messageService.setMessages([]);
      this.setAlerts('', '', 'Pomyślnie usunięto wszystkie wiadomości');
    } catch (error) {
      if (error.status === 0) {
        this.setAlerts('Brak połączenia z serwerem');
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
