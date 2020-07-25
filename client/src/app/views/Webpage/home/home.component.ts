import { AfterViewChecked, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Data, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Contact, SocialMedia, ProductCategory } from '@models/index';
import { ContactService } from '@services/contact.service';
import { HeightService } from '@services/height.service';
import { MatchMediaService } from '@services/match-media.service';
import { NavigationService } from '@services/navigation.service';
import { SocialMediaService } from '@services/social-media.service';
import { Subscription } from 'rxjs';
import { FooterService } from '@services/footer.service';
import { ProductsService } from '@services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NavigationService, HeightService, FooterService],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('mainEl') mainEl: any;
  @ViewChild('header') header: any;

  tabIndex = -1;
  isLoading = true;
  subscriptions: Subscription[] = [];
  height: number = null;
  footerMargin = '0px';
  isDesktop = false;
  contact: Contact = null;
  socialMedia: SocialMedia = null;

  constructor(
    private router: Router,
    private navigationService: NavigationService,
    private heightService: HeightService,
    private contactService: ContactService,
    private matchMediaService: MatchMediaService,
    private socialMediaService: SocialMediaService,
    private footerService: FooterService,
    private productsService: ProductsService,
  ) {
    this.subscriptions.push(this.contactService.getContact().subscribe((data: Contact) => {
      this.contact = data;
    }));

    this.subscriptions.push(this.socialMediaService.getSocialMedia().subscribe((data: SocialMedia) => {
      this.socialMedia = data;
    }));

    this.subscriptions.push(this.matchMediaService.getDevice().subscribe((isDesktop: boolean) => {
      this.isDesktop = isDesktop;
    }));
  }

  async ngOnInit() {
    this.setHeight();
    this.closeMenuOnRouteChange();

    try {
      const socialMediaResponse: SocialMedia = await this.socialMediaService.fetchSocialMedia();
      const contactResponse: Contact = await this.contactService.fetchContact();
      const productCategories: ProductCategory[] = await this.productsService.fetchProductCategories();
      this.productsService.setCategories(productCategories);
      this.socialMediaService.setSocialMedia(socialMediaResponse);
      this.contactService.setContact(contactResponse);
    } catch (error) { } finally {
      this.isLoading = false;
    }
  }

  ngOnDestroy() {
    this.navigationService.closeMenu();
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  ngAfterViewChecked() {
    setTimeout(() => {
      this.footerMargin = `${this.footerService.getHeight()}px`;
    }, 0);

    if (this.mainEl) {
      const height: number = this.mainEl.nativeElement.offsetHeight + this.mainEl.nativeElement.offsetTop;

      if (height !== this.height) {
        this.heightService.setHeight(height);
      }
    }
  }

  closeMenuOnRouteChange() {
    this.subscriptions.push(this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.navigationService.closeMenu();
        this.setFocus();
      }
    }));
  }

  skipNavigation() {
    this.navigationService.closeMenu();
    this.setFocus();
  }

  setHeight() {
    this.subscriptions.push(this.heightService.getHeight().subscribe((height: number) => {
      this.height = height;
    }));
  }

  setFocus() {
    this.tabIndex = 0;
    this.header.nativeElement.focus();

    setTimeout(() => {
      this.tabIndex = -1;
    }, 10);
  }

  prepareRoute(outlet: RouterOutlet): RouterOutlet | Data {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }
}
