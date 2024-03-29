import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductShowcaseComponent } from '@components/product-showcase/product-showcase.component';
import { AccordionItemComponent } from '@components/Accordion/accordion-item/accordion-item.component';
import { AccordionComponent } from '@components/Accordion/accordion/accordion.component';
import { AlertComponent } from '@components/alert/alert.component';
import { AuthWrapperComponent } from '@components/auth-wrapper/auth-wrapper.component';
import { AvatarComponent } from '@components/avatar/avatar.component';
import { ButtonComponent } from '@components/button/button.component';
import { FaIconComponent } from '@components/fa-icon/fa-icon.component';
import { CheckboxComponent } from '@components/Form/checkbox/checkbox.component';
import { RadioComponent } from '@components/Form/radio/radio.component';
import { FileInputComponent } from '@components/Form/file-input/file-input.component';
import { FormComponent } from '@components/Form/form/form.component';
import { InputComponent } from '@components/Form/input/input.component';
import { OrderSummaryComponent } from '@components/order-summary/order-summary.component';
import { SelectComponent } from '@components/Form/select/select.component';
import { TextareaComponent } from '@components/Form/textarea/textarea.component';
import { ImageComponent } from '@components/image/image.component';
import { LinkComponent } from '@components/link/link.component';
import { MapComponent } from '@components/map/map.component';
import { ModalComponent } from '@components/modal/modal.component';
import { TermsCheckboxComponent } from '@components/Form/terms-checkbox/terms-checkbox.component';
import { HamburgerButtonComponent } from '@components/Navbar/hamburger-button/hamburger-button.component';
import { RouterLinkComponent } from '@components/router-link/router-link.component';
import { SkipLinkComponent } from '@components/skip-link/skip-link.component';
import { SpinnerComponent } from '@components/spinner/spinner.component';
import { PageWrapperComponent } from '@components/page-wrapper/page-wrapper.component';
import { ProductsSortComponent } from '@components/products-sort/products-sort.component';
import { ProductsFiltersComponent } from '@components/products-filters/products-filters.component';
import { AdminWrapperComponent } from '@components/admin-wrapper/admin-wrapper.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    ButtonComponent,
    PageWrapperComponent,
    AccordionComponent,
    AccordionItemComponent,
    SkipLinkComponent,
    FormComponent,
    InputComponent,
    TextareaComponent,
    FaIconComponent,
    RouterLinkComponent,
    AuthWrapperComponent,
    AdminWrapperComponent,
    LinkComponent,
    ImageComponent,
    HamburgerButtonComponent,
    ModalComponent,
    FileInputComponent,
    MapComponent,
    TermsCheckboxComponent,
    SelectComponent,
    AlertComponent,
    AvatarComponent,
    CheckboxComponent,
    RadioComponent,
    ProductShowcaseComponent,
    OrderSummaryComponent,
    ProductsSortComponent,
    ProductsFiltersComponent,
  ],
  exports: [
    SpinnerComponent,
    ButtonComponent,
    PageWrapperComponent,
    AccordionComponent,
    AccordionItemComponent,
    SkipLinkComponent,
    FormComponent,
    InputComponent,
    TextareaComponent,
    FaIconComponent,
    RouterLinkComponent,
    AuthWrapperComponent,
    AdminWrapperComponent,
    LinkComponent,
    ImageComponent,
    HamburgerButtonComponent,
    ModalComponent,
    FileInputComponent,
    MapComponent,
    TermsCheckboxComponent,
    SelectComponent,
    AlertComponent,
    AvatarComponent,
    CheckboxComponent,
    RadioComponent,
    ProductShowcaseComponent,
    OrderSummaryComponent,
    ProductsSortComponent,
    ProductsFiltersComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  providers: [],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
