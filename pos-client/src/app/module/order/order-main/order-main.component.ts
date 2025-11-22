import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../../../shared/header/header.component";
import {MatIcon} from "@angular/material/icon";
import {OrderToolBarComponent} from "./order-tool-bar/order-tool-bar.component";
import {OrderListComponent} from "./order-list/order-list.component";
import {CookieService} from "../../../core/service/cookie/cookie.service";

@Component({
    selector: 'app-order-main',
    imports: [
        HeaderComponent,
        MatIcon,
        OrderToolBarComponent,
        OrderListComponent
    ],
    templateUrl: './order-main.component.html',
    styleUrl: './order-main.component.scss'
})
export class OrderMainComponent implements OnInit {
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
