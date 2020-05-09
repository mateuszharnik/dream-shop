import { Component, OnInit, ViewEncapsulation, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alerts, Message } from '@models/index';
import { SpinnerService } from '@services/spinner.service';
import { MessageService } from '@services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MessagesComponent implements OnInit, OnDestroy {
  @ViewChild ('deleteButton') deleteButton: any = null;

  messages: Message[] = null;
  isLoading = true;
  isDisabled = false;
  isSubmitted = false;
  messageToDelete: Message = null;
  subscriptions: Subscription[] = [];
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
      console.log(response);
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

  toggleSpinner(isLoading = false) {
    if (this.spinnerService.getLoadingValue()) {
      this.spinnerService.setLoading(isLoading);
    }
  }

  async submit(id: string) {
    this.isSubmitted = true;
    this.isDisabled = true;

    try {
      const deleteMessageResponse: Message = await this.messageService.deleteMessage(id);
      const messagesResponse: Message[] = await this.messageService.fetchMessages();
      this.messageService.setMessages(messagesResponse);
      this.setAlerts('', '', 'Pomyślnie usunięto pytanie');
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

  openModal(message: Message) {
    if (!this.messageToDelete) {
      this.messageToDelete = message;
      this.setFocus();
    }
  }

  setFocus() {
    setTimeout(() => {
      this.deleteButton.button.nativeElement.focus();
    }, 50);
  }

  closeModal() {
    this.messageToDelete = null;
  }
}
