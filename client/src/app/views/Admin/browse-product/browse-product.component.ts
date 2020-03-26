import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SpinnerService } from '@services/spinner.service';

@Component({
  selector: 'app-browse-product',
  templateUrl: './browse-product.component.html',
  styleUrls: ['./browse-product.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BrowseProductComponent implements OnInit {
  isLoading = true;

  constructor(private spinnerService: SpinnerService) {}

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
