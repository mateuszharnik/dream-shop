import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SpinnerService } from '@services/spinner.service';
import { emails as emailsData} from '@helpers/fakeAPI';
import { EmailsList } from '@models/index';

@Component({
  selector: 'app-newsletter-page',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NewsletterComponent implements OnInit {
  @ViewChild ('deleteButton') deleteButton: any = null;

  form: FormGroup = null;
  isLoading = true;
  isDisabled = false;
  isSubmitted = false;
  emailToDelete: EmailsList = null;
  emails: EmailsList[] = [];

  constructor(private spinnerService: SpinnerService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    setTimeout(() => {
      this.emails = emailsData;
      this.isLoading = false;
      this.toggleSpinner();
      this.createForm();
    }, 1000);
  }

  createForm() {
    this.form = this.formBuilder.group({});
  }

  computedButtonTitle(): 'Usuń adres email' | 'Usuwanie adresu email' {
    return this.isDisabled ? 'Usuwanie adresu email' : 'Usuń adres email';
  }

  computedButtonText(): 'Usuń' | 'Usuwanie' {
    return this.isDisabled ? 'Usuwanie' : 'Usuń';
  }

  submit() {
    this.isSubmitted = true;

    this.isDisabled = true;
  }

  toggleSpinner(isLoading = false) {
    if (this.spinnerService.getLoadingValue()) {
      this.spinnerService.setLoading(isLoading);
    }
  }

  openModal(email: EmailsList) {
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

  get formControls() {
    return this.form.controls;
  }
}
