import {
  Email,
  Order,
  FAQ,
  FAQs,
  Message,
  Product,
  ProductCategory,
} from '@models/index';

export interface EmailsModals {
  deleteEmails: Email[];
  deleteEmail: Email;
}

export interface OrdersModals {
  deleteOrders: Order[];
  deleteOrder: Order;
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

export interface ProductsModals {
  deleteProducts: Product[];
  deleteProduct: Product;
}
