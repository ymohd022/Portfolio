import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss'
})
export class ResumeComponent{
  constructor(public dialogRef: MatDialogRef<ResumeComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}

