import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SpinnerService } from '@services/spinner.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OrdersComponent implements OnInit {
  isLoading = true;
  isDisabled = false;
  isSubmitted = false;

  constructor(private spinnerService: SpinnerService) { }

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
      this.spinnerService.setLoading(this.isLoading);
    }, 1000);
  }
}
