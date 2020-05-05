import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { SpinnerService } from '@services/spinner.service';
import { About } from '@models/index';
import { AboutService } from '@services/about.service';
import { Subscription } from 'rxjs';
import { markdown } from '@helpers/index';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AboutComponent implements OnInit, OnDestroy {
  about: About = null;
  isLoading = true;
  subscriptions: Subscription[] = [];

  constructor(private spinnerService: SpinnerService, private aboutService: AboutService) {
    this.subscriptions.push(this.aboutService.getAbout().subscribe((data: About) => {
      if (data) {
        data.information = markdown(data.information);
      }
      this.about = data;
    }));

    this.isLoading = this.about ? false : true;
  }

  async ngOnInit() {
    if (this.about) {
      this.isLoading = false;
      return this.toggleSpinner();
    }

    try {
      const response = await this.aboutService.getData();
      this.aboutService.setAbout(response);
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
      this.toggleSpinner();
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  hasData(): boolean {
    return this.about && this.about.information !== '';
  }

  toggleSpinner(isLoading = false) {
    if (this.spinnerService.getLoadingValue()) {
      this.spinnerService.setLoading(isLoading);
    }
  }
}
