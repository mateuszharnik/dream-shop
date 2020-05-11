import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SpinnerService } from '@services/spinner.service';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ShowcaseComponent implements OnInit {
  isLoading = true;

  constructor(private spinnerService: SpinnerService) { }

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
      this.spinnerService.setLoading(this.isLoading);
    }, 1000);
  }
}
