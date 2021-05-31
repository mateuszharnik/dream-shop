import {
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
  OnChanges,
} from '@angular/core';
import { checkRequiredProp } from '@helpers/validation';

@Component({
  selector: 'app-auth-wrapper',
  templateUrl: './auth-wrapper.component.html',
  styleUrls: ['./auth-wrapper.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AuthWrapperComponent implements OnInit, OnChanges {
  @Input() pageTitle: string;

  ngOnInit() {
    checkRequiredProp(this.pageTitle, 'pageTitle');
  }

  ngOnChanges() {
    checkRequiredProp(this.pageTitle, 'pageTitle');
  }
}
