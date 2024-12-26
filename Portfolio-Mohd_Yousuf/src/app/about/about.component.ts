import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface Skill {
  name: string;
  logo: string;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  animations: [
    trigger('fadeInUp', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(20px)'
      })),
      transition('void => *', [
        animate('600ms ease-out')
      ])
    ])
  ]
})
export class AboutComponent implements OnInit {
  skills: Skill[] = [
    { name: 'HTML', logo: 'html.png' },
    { name: 'CSS', logo: 'css.png' },
    { name: 'JavaScript', logo: 'javascript.png' },
    { name: 'TypeScript', logo: 'typescript.png' },
    { name: 'Angular', logo: 'angular.png' },
    { name: 'Nodejs', logo: 'nodejs.png' },
    { name: 'Expressjs', logo: 'express.png' },
    { name: 'MongoDB', logo: 'mongodb.png' }
  ];
  constructor() { }

  ngOnInit(): void { }

  downloadResume() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'Mohd Yousuf-resume.pdf');
    link.setAttribute('download', 'Mohd Yousuf-resume.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
