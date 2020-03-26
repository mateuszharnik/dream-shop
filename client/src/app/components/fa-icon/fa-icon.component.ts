import { Component, Input, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { checkRequiredProp } from '@helpers/index';

@Component({
  selector: 'app-fa-icon',
  templateUrl: './fa-icon.component.html',
  styleUrls: ['./fa-icon.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FaIconComponent implements OnInit, OnChanges {
  @Input() faClass = '';

  ngOnInit() {
    checkRequiredProp(this.faClass, 'faClass');
  }

  ngOnChanges() {
    checkRequiredProp(this.faClass, 'faClass');
  }
}
