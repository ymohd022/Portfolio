import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { EmailService } from '../services/email.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
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
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService,
    private snackBar: MatSnackBar
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {}

  async onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      try {
        await this.emailService.sendEmail(this.contactForm.value).toPromise();
        this.contactForm.reset();
        this.snackBar.open('Message sent successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      } catch (error) {
        this.snackBar.open('Failed to send message. Please try again.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        console.error('Error sending email:', error);
      } finally {
        this.isSubmitting = false;
      }
    } else {
      this.snackBar.open('Please fill all required fields correctly.', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.contactForm.get(controlName);
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    if (control?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    if (control?.hasError('minlength')) {
      return `Minimum ${control.errors?.['minlength'].requiredLength} characters required`;
    }
    return '';
  }
}