import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SideNavComponent} from "./shared/side-nav/side-nav.component";
import {CookieService} from "./core/service/cookie/cookie.service";
import {NgIf} from "@angular/common";
import {AuthService} from "./core/service/auth/auth.service";

@Component({
    selector: 'app-root',
  imports: [RouterOutlet, SideNavComponent, NgIf],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'pos-client';
  isAuthenticated = false;

  constructor(private cookieService: CookieService, private authService:AuthService) { }

  ngOnInit(): void {
   this.authService.authenticated.subscribe(isAuthenticated => {
     this.isAuthenticated = isAuthenticated;
   })
  }


}
