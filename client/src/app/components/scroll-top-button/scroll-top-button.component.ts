import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2, ViewEncapsulation } from '@angular/core';
import { WindowRefService } from '@services/window-ref.service';
import jump from 'jump.js';
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';

@Component({
  selector: 'app-scroll-top-button',
  templateUrl: './scroll-top-button.component.html',
  styleUrls: ['./scroll-top-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ScrollTopButtonComponent implements OnInit, OnDestroy {
  @Input() scrollTarget: '#'| HTMLElement = '#';
  @Input() scrollTime = 1000;
  @Output() whenScrollEnd: EventEmitter<any> = new EventEmitter<any>();

  throttleListener: () => void = null;
  debounceListener: () => void = null;
  windowEl: Window = null;
  isAnimated = false;
  isShow = false;
  listenerTime = 100;

  constructor(private windowRefService: WindowRefService, private renderer: Renderer2) {}

  ngOnInit() {
    this.windowEl = this.windowRefService.nativeWindow;
    this.throttleListener = this.renderer.listen('window', 'scroll', throttle(this.toggleVisibility, this.listenerTime));
    this.debounceListener = this.renderer.listen('window', 'scroll', debounce(this.toggleVisibility, this.listenerTime));
    this.toggleVisibility();
  }

  ngOnDestroy() {
    if (this.throttleListener) {
      this.throttleListener();
    }

    if (this.debounceListener) {
      this.debounceListener();
    }
  }

  toggleVisibility = () => {
    this.isShow = this.windowEl.scrollY > (this.windowEl.innerHeight / 2) ? true : false;
  }

  computedScrollTarget(): string {
    return this.scrollTarget === '#' ? this.scrollTarget : `#${this.scrollTarget.id}`;
  }

  getScrollTarget(): HTMLElement | number {
    return this.scrollTarget === '#' ? -this.windowEl.scrollY : this.scrollTarget;
  }

  computedClass(): string {
    const className = 'scroll-top-button fixed text-center';
    return this.isShow ? `${className} show` : className;
  }

  scrollTop(event: Event) {
    event.preventDefault();

    if (!this.isAnimated && this.isShow) {
      this.isAnimated = true;

      jump(this.getScrollTarget(), {
        duration: this.scrollTime,
        callback: () => {
          this.whenScrollEnd.emit(event);
          this.isAnimated = false;
        },
      });
    }
  }
}
