import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterModule } from '@angular/router';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';

@Component({
  selector: 'app-forgot-password',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  auth = inject(Auth);
  rougter = inject(Router);

  errorMessage : string = '';
  isSubmissionInProgress: boolean = false;
  isPasswordEmailSent: boolean = false;

  form!: FormGroup;
  constructor() {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    // reset password link
    this.isSubmissionInProgress = true;

    sendPasswordResetEmail(this.auth, this.form.value.email)
      .then(() => {
        console.log('Email Sent')
        this.isPasswordEmailSent = true;
      })
      .catch(() => {
        this.isSubmissionInProgress = false;
        this.errorMessage = 'An error occurred';
      });
  }


}
