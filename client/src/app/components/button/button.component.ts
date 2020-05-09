import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent implements OnInit, OnDestroy {
  @ViewChild('button') button: any = null;
  @Input() buttonClass = 'button button-primary';
  @Input() buttonControls: string = null;
  @Input() buttonAriaLabel: string = null;
  @Input() buttonType: 'button' | 'reset' | 'submit' = 'button';
  @Input() buttonTitle: string = null;
  @Input() buttonDisabled = false;
  @Input() buttonAriaExpanded: boolean = null;
  @Input() buttonOnClick = false;
  @Output() whenButtonClick: EventEmitter<any> = new EventEmitter<any>();

  listener: () => void = null;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    if (this.buttonOnClick) {
      this.listener = this.renderer.listen(this.button.nativeElement, 'click', (event: Event) => {
        this.whenButtonClick.emit(event);
      });
    }
  }

  ngOnDestroy() {
    if (this.listener) {
      this.listener();
    }
  }

  checkRequiredProp(prop: any, name: string) {
    if (!prop) {
      throw new Error(`Property "${name}" is required.`);
    }
  }
}
