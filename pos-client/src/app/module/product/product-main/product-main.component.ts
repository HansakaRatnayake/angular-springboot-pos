import {Component, OnInit} from '@angular/core';
import {CustomerListComponent} from "../../customer/customer-main/customer-list/customer-list.component";
import {CustomerToolBarComponent} from "../../customer/customer-main/customer-tool-bar/customer-tool-bar.component";
import {HeaderComponent} from "../../../shared/header/header.component";
import {MatIcon} from "@angular/material/icon";
import {ProductToolBarComponent} from "./product-tool-bar/product-tool-bar.component";
import {ProductListComponent} from "./product-list/product-list.component";
import {CookieService} from "../../../core/service/cookie/cookie.service";

@Component({
    selector: 'app-product-main',
    imports: [
        HeaderComponent,
        MatIcon,
        ProductToolBarComponent,
        ProductListComponent
    ],
    templateUrl: './product-main.component.html',
    styleUrl: './product-main.component.scss'
})
export class ProductMainComponent implements OnInit {
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
