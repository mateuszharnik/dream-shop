import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SpinnerService } from '@services/spinner.service';
import { About } from '@models/index';

const about: About = {
  id: '0',
  text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit
corrupti ipsam, voluptatibus est, veniam dignissimos adipisci atque
eum eligendi esse, voluptatem minima reiciendis temporibus delectus
perferendis id ducimus optio voluptate quam? Libero quaerat iure sunt
ex qui architecto officiis velit aliquam id quas dicta itaque
veritatis quos neque doloribus necessitatibus sequi aliquid, facilis
ipsum! Sapiente laborum eveniet fugit illum animi eligendi odio. Nam
quo voluptas consectetur dolorem enim alias, doloribus quisquam
excepturi fuga consequuntur natus quis mollitia. Rem laboriosam, vero
enim porro alias nam illum, similique omnis odio unde dolorem veniam?
Distinctio consequatur dolor nisi maxime esse repudiandae aliquid
modi!

Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui
inventore voluptatibus repellat fugiat recusandae temporibus dolore
sint vitae. Dolor consectetur molestias beatae quia ipsam quae illum,
non consequatur dolores libero. Nostrum voluptas dicta nam ipsam iusto
facilis alias laboriosam vitae, omnis, facere, odit maiores rem
molestiae. Dolor doloribus quae voluptatem.`,
};

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AboutComponent implements OnInit {
  about: About = null;
  isLoading = true;

  constructor(private spinnerService: SpinnerService) {}

  ngOnInit() {
    setTimeout(() => {
      this.about = about;
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
