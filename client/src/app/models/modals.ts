import { Email, FAQ, FAQs, Message, ProductCategory } from '@models/index';

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

export interface CategoriesModals {
  deleteCategories: ProductCategory[];
  deleteCategory: ProductCategory;
}
