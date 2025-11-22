import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {CookieService} from "../../core/service/cookie/cookie.service";
import {AuthService} from "../../core/service/auth/auth.service";

@Component({
    selector: 'app-side-nav',
    imports: [
        MatIcon,
        RouterLink,
        RouterLinkActive
    ],
    templateUrl: './side-nav.component.html',
    styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {

  constructor(private cookieService:CookieService, private router:Router, private authService:AuthService) {
  }

  logout() {
    this.cookieService.deleteCookie('token');
    this.authService.updateAuthStatus(this.authService.isAuthenticated());
    this.router.navigateByUrl('/login');

  }
}
