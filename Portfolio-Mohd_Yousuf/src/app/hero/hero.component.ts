import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { ResumeComponent } from '../resume/resume.component';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
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
export class HeroComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openResume(): void {
    this.dialog.open(ResumeComponent, {
      width: '90%',
      maxWidth: '800px',
      panelClass: 'resume-modal-container',
      autoFocus: false
    });
  }
}
