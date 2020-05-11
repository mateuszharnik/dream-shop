import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from '@services/spinner.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NotFoundComponent implements OnInit, OnDestroy {
  countdown = 10;
  timer: any = null;

  constructor(private router: Router, private spinnerService: SpinnerService) { }

  ngOnInit() {
    setTimeout(() => {
      this.spinnerService.setLoading(false);
    }, 50);

    this.timer = window.setInterval(() => {
      if (this.countdown === 0) {
        window.clearInterval(this.timer);
        this.router.navigate(['/']);
      }

      this.countdown--;
    }, 1000);
  }

  ngOnDestroy() {
    window.clearInterval(this.timer);
  }
}
