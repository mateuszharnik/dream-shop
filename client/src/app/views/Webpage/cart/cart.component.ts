import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SpinnerService } from '@services/spinner.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CartComponent implements OnInit {
  isLoading = true;

  constructor(private spinnerService: SpinnerService) { }

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
