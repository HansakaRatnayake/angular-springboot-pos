import {Component, Input, OnChanges, ViewChild} from '@angular/core';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {CustomerDTO} from "../../../../core/dto/CustomerDTO";
import {CustomerService} from "../../../../core/service/customer/customer.service";
import {MatDialog} from "@angular/material/dialog";
import {CustomerUpdateComponent} from "../customer-update/customer-update.component";
import {SnackbarService} from "../../../../core/service/snackbar/snackbar.service";
import {ConfirmBoxComponent} from "../../../../shared/confirm-box/confirm-box.component";

@Component({
    selector: 'app-customer-list',
    imports: [
        MatTable,
        MatHeaderCell,
        MatColumnDef,
        MatCell,
        MatHeaderRow,
        MatRow,
        MatPaginator,
        MatHeaderCellDef,
        MatCellDef,
        MatHeaderRowDef,
        MatRowDef,
        MatIcon,
        MatButton,
    ],
    templateUrl: './customer-list.component.html',
    styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent  implements OnChanges{
  customerDataList: CustomerDTO[] = [];
  page = 0;
  size = 10;
  @Input() searchText: string = '';
  count : number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'name', 'address', 'salary', 'actions'];
  dataSource = new MatTableDataSource<CustomerDTO>(this.customerDataList);

  constructor(private customerService: CustomerService, private dialog:MatDialog, private snackbarService : SnackbarService) {
  }

  ngOnChanges() {
    this.loadCustomerData();

    this.dataSource.paginator = this.paginator;
    console.log(this.customerDataList);

    this.customerService.isCreated.subscribe(isCreated => {
      if (isCreated) {
        this.loadCustomerData();
      }
    })

  }

  getServerData(pageData: PageEvent) {
    this.page = pageData.pageIndex;
    this.size = pageData.pageSize;
    this.loadCustomerData();

  }

  loadCustomerData(){

    this.customerService.search(this.searchText,this.page,this.size).subscribe({
      next: response => {
        console.log(response);
        this.customerDataList = response?.data.dataList;
        this.count = response?.data.count;
        this.dataSource.data = this.customerDataList;
      },
      error: error => console.error(error),
      complete: () => console.log('completed')
    })
  }

  openUpdateProductDialogBox(customer:any){
    let matDialogRef = this.dialog.open(CustomerUpdateComponent,{
      disableClose:true,
      width:'400px',
      data:customer
    })

    matDialogRef.afterClosed().subscribe((response)=>{
      console.log(response);
      if (response){
        this.snackbarService.getSnackBar("Customer Updated",'Close')
        this.loadCustomerData();
      }
    })
  }

  openDeleteConfirmDialogBox(customer:CustomerDTO) {
    let matDialogRef = this.dialog.open(ConfirmBoxComponent,{
      disableClose:true,
      width:'500px',
      data:{text:`Are you sure you want to delete ${customer.customerName} ?`},
    })
    matDialogRef.afterClosed().subscribe((response)=>{
      console.log(response);
      if (response){
        this.customerService.delete(customer.customerId).subscribe({
          next: response => {
            this.snackbarService.getSnackBar("Customer Deleted",'Close');
            this.loadCustomerData();
          },
          error: error => console.error(error),
          complete: () => console.log('customer deleted')
        })
      }
    })

  }
}
