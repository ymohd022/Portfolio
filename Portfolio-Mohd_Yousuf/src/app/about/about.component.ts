import { Component, OnInit, AfterViewInit } from '@angular/core';
import { trigger, state, style, transition, animate, query, stagger } from '@angular/animations';

interface Skill {
  name: string;
  logo: string;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
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
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger('100ms', [
            animate('500ms ease-out', 
              style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('textReveal', [
      transition(':enter', [
        query('.reveal-text', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
        ], { optional: true })
      ])
    ])
  ]
})
export class AboutComponent implements OnInit, AfterViewInit {
  skills: Skill[] = [
    { name: 'HTML', logo: 'html.png' },
    { name: 'CSS', logo: 'css.png'},
    { name: 'JavaScript', logo: 'javascript.png' },
    { name: 'TypeScript', logo: 'typescript.png' },
    { name: 'Angular.js', logo: 'angular.png' },
    { name: 'Node.js', logo: 'nodejs.png' },
    { name: 'Express.js', logo: 'express.png' },
    { name: 'MongoDB', logo: 'mongodb.png'},
    { name: 'MYSQL', logo: 'mysql.png'}
  ];

  hoveredSkill: string | null = null;
  isResumeHovered = false;

  constructor() { }

  ngOnInit(): void {
    // Initialize any necessary data or state here
  }

  ngAfterViewInit(): void {
    this.initScrollAnimation();
  }

  private initScrollAnimation(): void {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
      });
    }
  }

  downloadResume(): void {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'Mohd Yousuf-resume.pdf');
    link.setAttribute('download', 'Mohd Yousuf-resume.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  setHoveredSkill(skillName: string | null): void {
    this.hoveredSkill = skillName;
  }

  setResumeHovered(state: boolean): void {
    this.isResumeHovered = state;
  }
}

