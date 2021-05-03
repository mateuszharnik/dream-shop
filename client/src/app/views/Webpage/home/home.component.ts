import {
  AfterViewChecked,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  Data,
  NavigationEnd,
  Router,
  Event,
  RouterOutlet,
} from '@angular/router';
import {
  Contact,
  SocialMedia,
  ProductCategory,
  Regulations,
  ProductCategoryWithPagination,
} from '@models/index';
import { ContactService } from '@services/contact.service';
import { HeightService } from '@services/height.service';
import { MatchMediaService } from '@services/match-media.service';
import { NavigationService } from '@services/navigation.service';
import { SocialMediaService } from '@services/social-media.service';
import { FooterService } from '@services/footer.service';
import { ProductsService } from '@services/products.service';
import { RegulationsService } from '@services/regulations.service';
import { Subscription } from 'rxjs';
import { ModalService } from '@services/modal.service';

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
  regulations: Regulations[] = [];
  height: number = null;
  footerMargin = 0;
  isDesktop = false;
  contact: Contact = null;
  socialMedia: SocialMedia = null;
  modal: Regulations = null;

  constructor(
    private router: Router,
    private navigationService: NavigationService,
    private heightService: HeightService,
    private contactService: ContactService,
    private matchMediaService: MatchMediaService,
    private socialMediaService: SocialMediaService,
    private footerService: FooterService,
    private productsService: ProductsService,
    private regulationsService: RegulationsService,
    private modalService: ModalService,
  ) {
    this.subscriptions.push(
      this.contactService.getContact().subscribe((data: Contact) => {
        this.contact = data;
      }),
    );

    this.subscriptions.push(
      this.modalService.getModal().subscribe((data: Regulations) => {
        this.modal = data;
      }),
    );

    this.subscriptions.push(
      this.socialMediaService
        .getSocialMedia()
        .subscribe((data: SocialMedia) => {
          this.socialMedia = data;
        }),
    );

    this.subscriptions.push(
      this.matchMediaService.getDevice().subscribe((isDesktop: boolean) => {
        this.isDesktop = isDesktop;
      }),
    );
  }

  async ngOnInit() {
    this.setHeight();
    this.closeMenuOnRouteChange();

    try {
      const socialMediaResponse: SocialMedia = await this.socialMediaService.fetchSocialMedia();
      const contactResponse: Contact = await this.contactService.fetchContact();
      const productCategories: ProductCategoryWithPagination = await this.productsService.fetchProductCategories();
      const regulations: Regulations[] = await this.regulationsService.fetchRegulations();
      this.productsService.setCategories(productCategories);
      this.socialMediaService.setSocialMedia(socialMediaResponse);
      this.contactService.setContact(contactResponse);
      this.regulationsService.setRegulations(regulations);
    } catch (error) {
    } finally {
      this.isLoading = false;
    }
  }

  ngOnDestroy() {
    this.navigationService.closeMenu();
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe(),
    );
  }

  ngAfterViewChecked() {
    if (this.footerMargin !== this.footerService.getHeight()) {
      setTimeout(() => {
        this.footerMargin = this.footerService.getHeight();
      }, 0);
    }

    if (this.mainEl) {
      const height: number =
        this.mainEl.nativeElement.offsetHeight +
        this.mainEl.nativeElement.offsetTop;

      if (height !== this.height) {
        this.heightService.setHeight(height);
      }
    }
  }

  closeModal() {
    this.modalService.closeModal();
  }

  closeMenuOnRouteChange() {
    this.subscriptions.push(
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          this.modalService.closeModal();
          this.skipNavigation();
        }
      }),
    );
  }

  skipNavigation() {
    this.navigationService.closeMenu();
    this.setFocus();
  }

  setHeight() {
    this.subscriptions.push(
      this.heightService.getHeight().subscribe((height: number) => {
        this.height = height;
      }),
    );
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
