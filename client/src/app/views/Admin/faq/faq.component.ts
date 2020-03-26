import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SpinnerService } from '@services/spinner.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FAQComponent implements OnInit {
  form: FormGroup = null;
  isLoading = true;
  isDisabled = false;
  isSubmitted = false;

  constructor(private spinnerService: SpinnerService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
      this.toggleSpinner();
    }, 1000);
  }

  toggleSpinner(isLoading = false) {
    if (this.spinnerService.getLoadingValue()) {
      this.spinnerService.setLoading(isLoading);
    }
  }
}
