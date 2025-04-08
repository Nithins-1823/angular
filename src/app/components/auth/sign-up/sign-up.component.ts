import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common'; // Import CommonModule
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterModule } from '@angular/router';
import {
  Auth,
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { signInWithPopup } from '@firebase/auth';

@Component({
  selector: 'app-sign-up',
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
    RouterModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  authForm!: FormGroup;

  // INIT GOOGLR PROVIDER
  googleAuthProvider = new GoogleAuthProvider();

  // auth instance

  auth = inject(Auth);

  isSubmissionInProgress: boolean = false;

  errorMessage: string = '';

  constructor(private router: Router) {
    this.initForm();
  }

  initForm() {
    this.authForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  onSubmit() {
    if (this.authForm.invalid) return;

    //IF THE FORM IS VALID, SIGN-IN USER
    createUserWithEmailAndPassword(
      this.auth,
      this.authForm.value.email,
      this.authForm.value.password
    )
      .then((res) => {
        this.isSubmissionInProgress = true;

        this.redirectToDashboard();
      })
      .catch((error) => {
        console.error('Error', error);
        if (error instanceof Error) {
          if (error.message.includes(AuthErrorCodes.INVALID_EMAIL)) {
            this.errorMessage = 'Invalid email address.';
          }
          if (error.message.includes(AuthErrorCodes.INVALID_EMAIL)) {
            this.errorMessage =
              'Invalid email address.Enter valid email address';
          } else if (error.message.includes(AuthErrorCodes.WEAK_PASSWORD)) {
            this.errorMessage = 'Password is too weak.';
          } else if (error.message.includes(AuthErrorCodes.EMAIL_EXISTS)) {
            this.errorMessage = 'Password is too weak.';
          } else {
            this.errorMessage = 'An error occurred. Please try again later.';
          }
        }
      });
  }

  onSignInWithGoogle() {
    signInWithPopup(this.auth, this.googleAuthProvider)
      .then((res) => {
        this.redirectToDashboard();
      })
      .catch((err) => {
        console.error(err);
        if (err instanceof Error) {
          if (err.message.includes(AuthErrorCodes.INVALID_EMAIL)) {
            this.errorMessage = 'Invalid email address.';
          }
          if (err.message.includes(AuthErrorCodes.INVALID_EMAIL)) {
            this.errorMessage =
              'Invalid email address. Enter valid email address';
          } else if (err.message.includes(AuthErrorCodes.WEAK_PASSWORD)) {
            this.errorMessage = 'Password is too weak.';
          } else if (err.message.includes(AuthErrorCodes.EMAIL_EXISTS)) {
            this.errorMessage = 'Password is too weak.';
          } else {
            this.errorMessage = 'An error occurred. Please try again later.';
          }
        }
      });
  }

  redirectToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
