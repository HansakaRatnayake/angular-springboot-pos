// login.component.ts
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import {NgIf} from "@angular/common";
import {AuthService} from "../../core/service/auth/auth.service";
import {CookieService} from "../../core/service/cookie/cookie.service";
import {GoogleAuthProvider} from "@angular/fire/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink
  ],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  googleLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AngularFireAuth,
    private authService : AuthService, private cookieService:CookieService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    if (this.cookieService.checkCookie('token')){
      this.router.navigateByUrl('/dashboard');
    }
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      try {
        const { email, password } = this.loginForm.value;
        let user = await this.auth.signInWithEmailAndPassword(email, password);
        this.authService.updateAuthStatus(true);
        this.cookieService.setCookie('token', user.user?.displayName, 1);
        this.router.navigateByUrl("/dashboard");
      } catch (error: any) {
        console.error(error);
        this.errorMessage = this.getErrorMessage(error.code);
      } finally {
        this.loading = false;
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

   loginWithGoogle() {
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
      case 'auth/user-not-found':
        return 'No account found with this email.';
      case 'auth/wrong-password':
        return 'Incorrect password.';
      case 'auth/too-many-requests':
        return 'Too many failed login attempts. Please try again later.';
      case 'auth/popup-closed-by-user':
        return 'Google sign-in was canceled. Please try again.';
      case 'auth/cancelled-popup-request':
        return 'The operation was canceled due to multiple requests. Please try again.';
      default:
        return 'An error occurred during login. Please try again.';
    }
  }

}
