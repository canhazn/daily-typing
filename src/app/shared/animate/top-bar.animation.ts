import { animation, trigger,transition, animate, style, query, stagger } from '@angular/animations';

export const topBarAnimation = animation([
  trigger('fadeInDown', [
    transition('* => *', [
      query(':enter', style({ opacity: 0, transform: 'translateY(-40px)' })),
      query(':enter', [
        stagger(100, [
          animate(300, style({ opacity: 1, transform: 'translateY(0)' }))
        ])
      ]),
    ])
  ])
])