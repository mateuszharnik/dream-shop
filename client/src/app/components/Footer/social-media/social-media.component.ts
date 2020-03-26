import { Component, EventEmitter, Output, ViewEncapsulation, Input } from '@angular/core';
import { SocialMediaLinks } from '@models/index';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SocialMediaComponent {
  @Input() socialMediaLinks: SocialMediaLinks = null;
  @Output() whenLinkFocus: EventEmitter<any> = new EventEmitter<any>();

  onFocus(event: FocusEvent) {
    this.whenLinkFocus.emit(event);
  }
}
