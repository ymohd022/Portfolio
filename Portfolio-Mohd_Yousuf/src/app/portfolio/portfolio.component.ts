import { Component, OnInit, AfterViewInit } from '@angular/core';
import { trigger, state, style, transition, animate, query, stagger } from '@angular/animations';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  github: string;
  technologies?: string[];
}

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  animations: [
    trigger('fadeInUp', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(20px)'
      })),
      transition('void => *', [
        animate('600ms ease-out')
      ])
    ]),
    trigger('staggerFade', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(50px)' }),
          stagger('200ms', [
            animate('500ms ease-out', 
              style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('cardHover', [
      state('normal', style({
        transform: 'scale(1)'
      })),
      state('hovered', style({
        transform: 'scale(1.05)'
      })),
      transition('normal <=> hovered', [
        animate('200ms ease-in-out')
      ])
    ])
  ]
})
export class PortfolioComponent implements OnInit, AfterViewInit {
  projects: Project[] = [
    {
      id: 1,
      title: 'SDHUB Management Portal',
      description: 'Delivering Job Oriented Training Programs',
      image: 'SDHUB.jpg',
      link: '#',
      github: 'https://github.com/Skill-Development-Hub/Mohd_yousuf',
    },
    {
      id: 2,
      title: 'Luminate Web Solutions',
      description: 'Professional Web Development Services',
      image: 'lws.jpg',
      link: 'https://luminatewebsol.com/',
      github: 'https://github.com/shahriarhus/Luminate-solutions',
    },
    {
      id: 3,
      title: 'Mini E-commerce Store',
      description: 'Modern E-commerce Platform',
      image: 'e-commerce.png',
      link: '#',
      github: 'https://github.com/yourusername/mini-ecommerce',
    }
  ];

  hoveredIndex: number = -1;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.animateOnScroll();
  }

  private animateOnScroll(): void {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      }, { threshold: 0.1 });

      // Wait for DOM to be ready
      setTimeout(() => {
        const cards = document.querySelectorAll('.project-card');
        if (cards.length) {
          cards.forEach(card => {
            observer.observe(card);
          });
        }
      }, 0);
    }
  }

  setHoveredIndex(index: number): void {
    this.hoveredIndex = index;
  }
}

