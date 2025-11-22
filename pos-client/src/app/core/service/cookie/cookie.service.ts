import { Injectable } from '@angular/core';
import { CookieService as NgxCookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor(private cookieService: NgxCookieService) {
  }

  setCookie(name: string, value: any, days: number = 7): void {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + days);
    this.cookieService.set(name, value, expiryDate);
  }

  getCookie(name: string): string {
    return this.cookieService.get(name);
  }

  checkCookie(name: string): boolean {
    return this.cookieService.check(name);
  }

  // Delete a cookie
  deleteCookie(name: string): void {
    this.cookieService.delete(name);
  }
}
