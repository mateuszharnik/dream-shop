import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Contact, SocialMediaLinks } from '@models/index';
import { HeightService } from '@services/height.service';
import { WindowRefService } from '@services/window-ref.service';
import jump from 'jump.js';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FooterComponent implements OnInit, OnDestroy {
  @Input() socialMediaLinks: SocialMediaLinks = null;
  @Input() contact: Contact = null;
  @Output() whenLinkClick: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('footer') footer = null;

  height = 0;
  windowEl: Window = null;
  scrollTime = 0;
  subscriptions: Subscription[] = [];

  constructor(private heightService: HeightService, private windowRefService: WindowRefService) {
    this.windowEl = this.windowRefService.nativeWindow;
  }

  ngOnInit() {
    this.setHeight();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  setHeight() {
    this.subscriptions.push(this.heightService.getHeight().subscribe((height: number) => {
      this.height = height;
    }));
  }

  changeRoute(event: Event) {
    this.whenLinkClick.emit(event);
  }

  checkSocialMediaLinks(): number {
    return Object.values(this.socialMediaLinks).filter(link => link !== '').length;
  }

  checkContactInfo(): string {
    return this.contact.email || this.contact.phone;
  }

  checkContactInfoAndSocialMedia(): string | number {
    return this.checkContactInfo() || this.checkSocialMediaLinks();
  }

  scrollTo(event: FocusEvent) {
    const windowYScroll: number = this.windowEl.pageYOffset;
    const windowHeight: number = this.windowEl.innerHeight;
    const footerHeight: number = this.footer.nativeElement.offsetHeight;
    const distance: number = this.height + footerHeight - windowHeight - windowYScroll;

    if (distance !== 0) {
      jump(distance, {
        duration: this.scrollTime,
      });
    }
  }

  getYear() {
    return new Date().getFullYear();
  }
}
