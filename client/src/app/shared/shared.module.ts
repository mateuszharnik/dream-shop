import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccordionItemComponent } from '@components/Accordion/accordion-item/accordion-item.component';
import { AccordionComponent } from '@components/Accordion/accordion/accordion.component';
import { AlertComponent } from '@components/alert/alert.component';
import { AuthWrapperComponent } from '@components/auth-wrapper/auth-wrapper.component';
import { ButtonComponent } from '@components/button/button.component';
import { FaIconComponent } from '@components/fa-icon/fa-icon.component';
import { FileInputComponent } from '@components/Form/file-input/file-input.component';
import { FormComponent } from '@components/Form/form/form.component';
import { InputComponent } from '@components/Form/input/input.component';
import { SelectComponent } from '@components/Form/select/select.component';
import { TextareaComponent } from '@components/Form/textarea/textarea.component';
import { ImageComponent } from '@components/image/image.component';
import { LinkComponent } from '@components/link/link.component';
import { ListItemComponent } from '@components/list-item/list-item.component';
import { MapComponent } from '@components/map/map.component';
import { ModalComponent } from '@components/modal/modal.component';
import { HamburgerButtonComponent } from '@components/Navbar/hamburger-button/hamburger-button.component';
import { RouterLinkComponent } from '@components/router-link/router-link.component';
import { SkipLinkComponent } from '@components/skip-link/skip-link.component';
import { SpinnerComponent } from '@components/spinner/spinner.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    ButtonComponent,
    AccordionComponent,
    AccordionItemComponent,
    SkipLinkComponent,
    FormComponent,
    InputComponent,
    TextareaComponent,
    FaIconComponent,
    RouterLinkComponent,
    AuthWrapperComponent,
    LinkComponent,
    ImageComponent,
    HamburgerButtonComponent,
    ListItemComponent,
    ModalComponent,
    FileInputComponent,
    MapComponent,
    SelectComponent,
    AlertComponent,
  ],
  exports: [
    SpinnerComponent,
    ButtonComponent,
    AccordionComponent,
    AccordionItemComponent,
    SkipLinkComponent,
    FormComponent,
    InputComponent,
    TextareaComponent,
    FaIconComponent,
    RouterLinkComponent,
    AuthWrapperComponent,
    LinkComponent,
    ImageComponent,
    HamburgerButtonComponent,
    ListItemComponent,
    ModalComponent,
    MapComponent,
    FileInputComponent,
    SelectComponent,
    AlertComponent,
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
