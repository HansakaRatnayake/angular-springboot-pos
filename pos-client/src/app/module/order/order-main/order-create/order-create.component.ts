import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton, MatFabButton} from "@angular/material/button";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {ProductService} from "../../../../core/service/product/product.service";
import {SnackbarService} from "../../../../core/service/snackbar/snackbar.service";
import {OrderService} from "../../../../core/service/order/order.service";
import {CustomerService} from "../../../../core/service/customer/customer.service";
import {NgForOf} from "@angular/common";
import {CustomerSelectSearchComponent} from "./customer-select-search/customer-select-search.component";
import {CustomerDTO} from "../../../../core/dto/CustomerDTO";
import {MatIcon} from "@angular/material/icon";
import {ItemSelectSearchComponent} from "./item-select-search/item-select-search.component";
import {ProductDTO} from "../../../../core/dto/ProductDTO";
import {ItemDTO} from "../../../../core/dto/ItemDTO";
import {OrderDTO} from "../../../../core/dto/OrderDTO";


@Component({
    selector: 'app-order-create',
    imports: [
        FormsModule,
        MatButton,
        MatDialogActions,
        MatDialogClose,
        MatDialogContent,
        MatDialogTitle,
        ReactiveFormsModule,
        NgForOf,
        CustomerSelectSearchComponent,
        MatIcon,
        ItemSelectSearchComponent,
        MatFabButton,
    ],
    templateUrl: './order-create.component.html',
    styleUrl: './order-create.component.scss'
})
export class OrderCreateComponent {

  nett: number = 0.0;
  customer!: CustomerDTO;
  product: ProductDTO[] =[];
  itemDto!: Omit<ItemDTO, "id" | "orderId">;
  items: any[] = [];
  manageItemSearchComponent:number[]  = [];
  isItemAdded = false;


  readonly dialogref = inject(MatDialogRef<OrderCreateComponent>);

  constructor(private orderService: OrderService, private customerService: CustomerService, private productService: ProductService, private snackbarService: SnackbarService) {
  }

  manageSelectedCustomer(customer:CustomerDTO){
    this.customer = customer;
  }

  manageSelectedItem(product: ProductDTO) {
    this.product.push(product);
    this.itemDto = {
      productId:product.id,
      qty:0
    }
  }

  manageQty(qty: number) {
    console.log(qty);
    this.itemDto.qty = qty;
  }

  addItemComponent() {
    this.manageItemSearchComponent.push(this.manageItemSearchComponent.length);

    if(this.manageItemSearchComponent.length > 1){
      this.items.push(this.itemDto);
      this.isItemAdded = true;
    }

    if (this.items.length > 0) {
      this.nett = this.items.reduce((total, item, index) => {
        const product = this.product[index];
        return product ? total + item.qty * product.unitPrice : total;
      }, 0);
    }
  }

  removeItem(i: number) {
    this.manageItemSearchComponent.splice(i, 1);
    this.items.splice(i, 1);
    this.product.splice(i, 1);

    if (this.items.length > 0) {
      this.nett = this.items.reduce((total, item, index) => {
        const product = this.product[index];
        return product ? total + item.qty * product.unitPrice : total;
      }, 0);
    }
  }

  order() {
    const newOrder : Omit<OrderDTO, "orderId" | "date"> = {
      nett:this.nett,
      customer: this.customer.customerId,
      items:this.items,
    }
    this.orderService.create(newOrder).subscribe({
      next: (result) => {
        this.snackbarService.getSnackBar(result.message,'Close');
        this.dialogref.close(true);
      },
      error: (err) => {console.log(err)},
      complete: () => {console.log("success")}
    })
  }

  timeStamp(){
    const now = new Date();
    return now.getFullYear() + "-" +
      String(now.getMonth() + 1).padStart(2, '0') + "-" +
      String(now.getDate()).padStart(2, '0') + " " +
      String(now.getHours()).padStart(2, '0') + ":" +
      String(now.getMinutes()).padStart(2, '0') + ":" +
      String(now.getSeconds()).padStart(2, '0');
  }
}
