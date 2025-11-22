import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {SnackbarService} from "../../../../core/service/snackbar/snackbar.service";
import {ConfirmBoxComponent} from "../../../../shared/confirm-box/confirm-box.component";
import {OrderDTO} from "../../../../core/dto/OrderDTO";
import {OrderService} from "../../../../core/service/order/order.service";
import {OrderItemListComponent} from "../order-item-list/order-item-list.component";
import {CurrencyPipe, DatePipe} from "@angular/common";
import {ItemDTO} from "../../../../core/dto/ItemDTO";

@Component({
    selector: 'app-order-list',
    imports: [
        MatButton,
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatIcon,
        MatPaginator,
        MatRow,
        MatRowDef,
        MatTable,
        MatHeaderCellDef,
        CurrencyPipe,
        DatePipe
    ],
    templateUrl: './order-list.component.html',
    styleUrl: './order-list.component.scss'
})
export class OrderListComponent implements OnChanges, OnInit{
  orderDataList: OrderDTO[] = [];
  page = 0;
  size = 10;
  @Input() searchText: string = '';
  count : number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['orderId', 'date', 'nett', 'customer', 'actions'];
  dataSource = new MatTableDataSource<OrderDTO>(this.orderDataList);

  constructor(private orderService: OrderService, private dialog:MatDialog, private snackbarService : SnackbarService) {
  }

  ngOnChanges() {
    this.loadOrderData();

    this.dataSource.paginator = this.paginator;
    console.log(this.orderDataList);



  }

  ngOnInit() {
    this.orderService.isCreated.subscribe(isCreated => {
      if (isCreated) {
        this.loadOrderData();
      }
    })
  }

  getServerData(pageData: PageEvent) {
    this.page = pageData.pageIndex;
    this.size = pageData.pageSize;
    this.loadOrderData();

  }

  loadOrderData(){

    this.orderService.search(this.searchText,this.page,this.size).subscribe({
      next: response => {
        console.log(response);
        this.orderDataList = response?.data.dataList;
        this.count = response?.data.count;
        this.dataSource.data = this.orderDataList;
      },
      error: error => console.error(error),
      complete: () => console.log('completed')
    })
  }

  openOrderItemListDialogBox(order:any){
    let matDialogRef = this.dialog.open(OrderItemListComponent,{
      disableClose:true,
      width:'900px',
      data:order.items
    })

    // matDialogRef.afterClosed().subscribe((response)=>{
    //   console.log(response);
    //   if (response){
    //     this.snackbarService.getSnackBar("Product Updated",'Close')
    //     this.loadOrderData();
    //   }
    // })
  }

  openDeleteConfirmDialogBox(order:OrderDTO) {
    let matDialogRef = this.dialog.open(ConfirmBoxComponent,{
      disableClose:true,
      width:'500px',
      data:{text:`Are you sure you want to delete ${order.orderId} ?`},
    })
    matDialogRef.afterClosed().subscribe((response)=>{
      console.log(response);
      if (response){
        this.orderService.delete(order.orderId).subscribe({
          next: response => {
            this.snackbarService.getSnackBar("Order Deleted",'Close');
            this.loadOrderData();
          },
          error: error => console.error(error),
          complete: () => console.log('Order deleted')
        })
      }
    })

  }
}
