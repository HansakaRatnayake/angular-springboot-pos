import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../../../shared/header/header.component";
import {MatIcon} from "@angular/material/icon";
import {CustomerToolBarComponent} from "./customer-tool-bar/customer-tool-bar.component";
import {CustomerListComponent} from "./customer-list/customer-list.component";
import {CookieService} from "../../../core/service/cookie/cookie.service";


@Component({
    selector: 'app-customer-main',
    imports: [
        HeaderComponent,
        MatIcon,
        CustomerToolBarComponent,
        CustomerListComponent
    ],
    templateUrl: './customer-main.component.html',
    styleUrl: './customer-main.component.scss'
})
export class CustomerMainComponent implements OnInit {

  searchText: string = '';

  user: any;

  constructor(private cookieService:CookieService) {
  }

  ngOnInit() {
    this.user = this.cookieService.getCookie('token').valueOf();
  }


  updateSearchText(text: string) {
    this.searchText = text;
    console.log(this.searchText);
    // this.loadAllCustomers();
  }
}
