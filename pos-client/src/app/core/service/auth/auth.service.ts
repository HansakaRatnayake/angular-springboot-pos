import {inject, Injectable, Signal} from '@angular/core';
import {Router} from "@angular/router";
import {Auth, GoogleAuthProvider, signInWithPopup, user, User} from '@angular/fire/auth';
import {toSignal} from "@angular/core/rxjs-interop";
import {CookieService} from "../cookie/cookie.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth: Auth = inject(Auth);
  private router: Router = inject(Router)
  private cookieService: CookieService = inject(CookieService)

  private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());
  authenticated = this.authStatus.asObservable();


  public async logout() {
    await this.auth.signOut().then(() => {
      this.cookieService.deleteCookie('token');
    });
  }


  isAuthenticated() {return this.cookieService.checkCookie('token');}

  updateAuthStatus(newValue : boolean){
    this.authStatus.next(newValue);
  }
}
