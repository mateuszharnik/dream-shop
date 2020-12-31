import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

// Router Animations
export const RouterFade = trigger('RouterFade', [
  transition('* <=> *', [
    group([
      query(
        ':enter',
        [style({ opacity: 0 }), animate('0.5s 0.5s', style({ opacity: 1 }))],
        { optional: true },
      ),
      query(
        ':leave',
        [style({ opacity: 1 }), animate('0.5s', style({ opacity: 0 }))],
        { optional: true },
      ),
    ]),
  ]),
]);

// Animations
export const Fade = trigger('Fade', [
  transition('void => first', [style({ opacity: 1 })]),
  transition('void => *', [
    style({ opacity: 0 }),
    animate('1s', style({ opacity: 1 })), // Dealy
  ]),
  transition('* => void', [
    style({ opacity: 1 }),
    animate('1s', style({ opacity: 0 })),
  ]),
]);

export const Slide = trigger('Slide', [
  transition('void => *', [
    style({ height: '0' }),
    animate('0.3s', style({ height: '*' })),
  ]),
  transition('* => void', [
    style({ height: '*' }),
    animate('0.3s', style({ height: '0' })),
  ]),
]);

export const SlideLeft = trigger('SlideLeft', [
  transition('void => true', [
    style({ width: '0' }),
    animate('0.3s', style({ width: '*' })),
  ]),
  transition('true => void', [
    style({ width: '*' }),
    animate('0.3s', style({ width: '0' })),
  ]),
]);
