import { Email, FAQ, FAQs, Message } from '@models/index';

export interface EmailsModals {
  deleteEmails: Email[];
  deleteEmail: Email;
}

export interface MessagesModals {
  deleteMessages: Message[];
  deleteMessage: Message;
}

export interface FAQModals {
  deleteFAQs: FAQs[] | FAQ[];
  deleteFAQ: FAQ;
}
