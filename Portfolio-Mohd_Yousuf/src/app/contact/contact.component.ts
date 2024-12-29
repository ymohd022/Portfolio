import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { EmailService } from '../services/email.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
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
    private emailService: EmailService
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  async onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      try {
        await this.emailService.sendEmail(this.contactForm.value).toPromise();
        this.contactForm.reset();
        alert('Message sent successfully!');
      } catch (error) {
        alert('Failed to send message. Please try again.');
        console.error('Error sending email:', error);
      } finally {
        this.isSubmitting = false;
      }
    }
  }
}