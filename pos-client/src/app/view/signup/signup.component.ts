import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import {NgIf} from "@angular/common";
import {GoogleAuthProvider} from "@angular/fire/auth";
import {AuthService} from "../../core/service/auth/auth.service";
import {CookieService} from "../../core/service/cookie/cookie.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  imports: [
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  loading = false;
  googleLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AngularFireAuth,
    private authService : AuthService, private cookieService:CookieService
  ) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    if (this.cookieService.checkCookie('token')){
      this.router.navigateByUrl('/dashboard');
    }
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    return null;
  }

  async onSubmit() {
    if (this.signupForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      try {
        const { email, password, name } = this.signupForm.value;

        // Create the user
        const credential = await this.auth.createUserWithEmailAndPassword(email, password);

        // Update the user profile with the name
        await credential.user?.updateProfile({
          displayName: name
        });

        this.authService.updateAuthStatus(true);
        this.cookieService.setCookie('token', credential.user?.displayName, 1);
        this.router.navigateByUrl("/dashboard")
      } catch (error: any) {
        console.error(error);
        this.errorMessage = this.getErrorMessage(error.code);
      } finally {
        this.loading = false;
      }
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

  async signupWithGoogle() {
    this.googleLoading = true;
    this.errorMessage = '';


      try {
        this.auth.signInWithPopup(new GoogleAuthProvider())
          .then((res)=>{
            console.log(res);
            this.authService.updateAuthStatus(true);
            this.cookieService.setCookie('token', res.user?.displayName, 1);
            this.router.navigateByUrl("/dashboard").then((res)=>{
              console.log(res);
            }).catch((err)=>{
              console.log(err);
            })
          })
          .catch((err)=>{
            console.log(err);
          })
      } catch (error: any) {
      console.error(error);
      this.errorMessage = this.getErrorMessage(error.code);
    } finally {
      this.googleLoading = false;
    }
  }

  private getErrorMessage(code: string): string {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'This email is already registered. Please use a different email or try to log in.';
      case 'auth/invalid-email':
        return 'The email address is not valid.';
      case 'auth/weak-password':
        return 'The password is too weak. Please use a stronger password.';
      case 'auth/operation-not-allowed':
        return 'This type of account is not enabled.';
      case 'auth/popup-closed-by-user':
        return 'Google sign-in was canceled. Please try again.';
      default:
        return 'An error occurred during signup. Please try again.';
    }
  }
}
