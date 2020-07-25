import {
  AfterViewChecked,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Contact, SocialMedia } from '@models/index';
import { HeightService } from '@services/height.service';
import { WindowRefService } from '@services/window-ref.service';
import { FooterService } from '@services/footer.service';
import { Subscription } from 'rxjs';
import jump from 'jump.js';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FooterComponent implements OnInit, OnDestroy, AfterViewChecked {
  @Input() socialMedia: SocialMedia = null;
  @Input() contact: Contact = null;
  @Output() whenLinkClick: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('footer') footer = null;

  height = 0;
  footerHeight = 0;
  windowEl: Window = null;
  scrollTime = 0;
  subscriptions: Subscription[] = [];

  constructor(
    private heightService: HeightService,
    private windowRefService: WindowRefService,
    private footerService: FooterService,
  ) {
    this.windowEl = this.windowRefService.nativeWindow;
  }

  ngOnInit() {
    this.setHeight();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  ngAfterViewChecked() {
    const height = this.footer.nativeElement.offsetHeight;

    if (this.footerHeight !== height) {
      this.footerHeight = height;
      this.footerService.setHeight(this.footerHeight);
    }
  }

  setHeight() {
    this.subscriptions.push(this.heightService.getHeight().subscribe((height: number) => {
      this.height = height;
    }));
  }

  changeRoute(event: Event) {
    this.whenLinkClick.emit(event);
  }

  checkSocialMedia(): string {
    return (
      this.socialMedia &&
      (this.socialMedia.facebook ||
        this.socialMedia.linkedin ||
        this.socialMedia.twitter ||
        this.socialMedia.instagram)
    );
  }

  checkContactInfo(): string {
    return this.contact && (this.contact.email || this.contact.phone);
  }

  checkContactInfoAndSocialMedia(): string | number {
    return this.checkContactInfo() || this.checkSocialMedia();
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
