import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { ResumeComponent } from '../resume/resume.component';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
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
    trigger('typing', [
      state('void', style({
        width: '0'
      })),
      state('*', style({
        width: '100%'
      })),
      transition('void => *', [
        animate('3.5s steps(40, end)')
      ])
    ])
  ]
})
export class HeroComponent implements OnInit {
  isTypingComplete = false;
  showSubtitle = false;
  showButton = false;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    setTimeout(() => this.isTypingComplete = true, 3500);
    setTimeout(() => this.showSubtitle = true, 4000);
    setTimeout(() => this.showButton = true, 4500);
  }

  openResume(): void {
    this.dialog.open(ResumeComponent, {
      width: '90%',
      maxWidth: '800px',
      panelClass: 'resume-modal-container',
      autoFocus: false
    });
  }

  scrollToPortfolio(): void {
    const portfolioSection = document.querySelector('app-portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

