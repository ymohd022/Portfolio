import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  github: string; // Add github link property
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
    ])
  ]
})
export class PortfolioComponent implements OnInit {
  projects: Project[] = [
    {
      id: 1,
      title: 'SDHUB Management Portal',
      description: 'Delivering Job Oriented Training Programs',
      image: 'SDHUB.jpg',
      link: '#',
      github: 'https://github.com/Skill-Development-Hub/Mohd_yousuf'
    },
    {
      id: 2,
      title: 'Luminate Web Solutions',
      description: 'Professional Web Development Services',
      image: 'lws.jpg',
      link: 'https://luminatewebsol.com/',
      github: 'https://github.com/shahriarhus/Luminate-solutions'
    },
    {
      id: 3,
      title: 'Mini E-commerce Store',
      description: 'Modern E-commerce Platform',
      image: '/assets/images/ecommerce-project.jpg',
      link: '#',
      github: 'https://github.com/yourusername/mini-ecommerce'
    }
  ];

  constructor() { }

  ngOnInit(): void { }
}