import {
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
  OnChanges,
} from '@angular/core';
import { checkRequiredProp } from '@helpers/index';

@Component({
  selector: 'app-auth-wrapper',
  templateUrl: './auth-wrapper.component.html',
  styleUrls: ['./auth-wrapper.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AuthWrapperComponent implements OnInit, OnChanges {
  @Input() pageTitle: string;

  ngOnInit() {
    this.checkAllRequiredProp();
  }

  ngOnChanges() {
    this.checkAllRequiredProp();
  }

  checkAllRequiredProp() {
    checkRequiredProp(this.pageTitle, 'pageTitle');
  }
}
