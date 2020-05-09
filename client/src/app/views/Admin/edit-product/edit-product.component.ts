import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SpinnerService } from '@services/spinner.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditProductComponent implements OnInit {
  form: FormGroup = null;
  isLoading = true;
  isDisabled = false;
  isSubmitted = false;

  constructor(private spinnerService: SpinnerService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
      this.toggleSpinner();
      this.createForm();
    }, 1000);
  }

  createForm() {
    this.form = this.formBuilder.group({});
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

  get formControls() {
    return this.form.controls;
  }
}
