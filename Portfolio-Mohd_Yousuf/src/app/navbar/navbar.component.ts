import { Component, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate('300ms ease-in-out')),
    ]),
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateY(0)',
        opacity: 1
      })),
      state('out', style({
        transform: 'translateY(-100%)',
        opacity: 0
      })),
      transition('in => out', animate('300ms ease-in-out')),
      transition('out => in', animate('300ms ease-in-out'))
    ])
  ]
})
export class NavbarComponent {
  isScrolled = false;
  prevScrollpos = 0;
  visible = true;
  isMobileMenuOpen = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.prevScrollpos = window.pageYOffset;
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (typeof window !== 'undefined') {
      const currentScrollPos = window.pageYOffset;
      this.visible = this.prevScrollpos > currentScrollPos || currentScrollPos < 50;
      this.prevScrollpos = currentScrollPos;
      this.isScrolled = window.scrollY > 20;
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}

