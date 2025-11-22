import {Component, Input, OnChanges, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {SnackbarService} from "../../../../core/service/snackbar/snackbar.service";
import {ConfirmBoxComponent} from "../../../../shared/confirm-box/confirm-box.component";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {ProductDTO} from "../../../../core/dto/ProductDTO";
import {ProductService} from "../../../../core/service/product/product.service";
import {ProductUpdateComponent} from "../product-update/product-update.component";

@Component({
    selector: 'app-product-list',
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
        MatHeaderCellDef
    ],
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnChanges {
  productDataList: ProductDTO[] = [];
  page = 0;
  size = 10;
  @Input() searchText: string = '';
  count : number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'description', 'unitPrice', 'qtyOnHand', 'actions'];
  dataSource = new MatTableDataSource<ProductDTO>(this.productDataList);

  constructor(private productService: ProductService, private dialog:MatDialog, private snackbarService : SnackbarService) {
  }

  ngOnChanges() {
    this.loadProductData();

    this.dataSource.paginator = this.paginator;
    console.log(this.productDataList);

    this.productService.isCreated.subscribe(isCreated => {
      if (isCreated) {
        this.loadProductData();
      }
    })

  }

  getServerData(pageData: PageEvent) {
    this.page = pageData.pageIndex;
    this.size = pageData.pageSize;
    this.loadProductData();

  }

  loadProductData(){

    this.productService.search(this.searchText,this.page,this.size).subscribe({
      next: response => {
        console.log(response);
        this.productDataList = response?.data.dataList;
        this.count = response?.data.count;
        this.dataSource.data = this.productDataList;
      },
      error: error => console.error(error),
      complete: () => console.log('completed')
    })
  }

  openUpdateProductDialogBox(product:any){
    let matDialogRef = this.dialog.open(ProductUpdateComponent,{
      disableClose:true,
      width:'400px',
      data:product
    })

    matDialogRef.afterClosed().subscribe((response)=>{
      console.log(response);
      if (response){
        this.snackbarService.getSnackBar("Product Updated",'Close')
        this.loadProductData();
      }
    })
  }

  openDeleteConfirmDialogBox(product:ProductDTO) {
    let matDialogRef = this.dialog.open(ConfirmBoxComponent,{
      disableClose:true,
      width:'500px',
      data:{text:`Are you sure you want to delete ${product.description} ?`},
    })
    matDialogRef.afterClosed().subscribe((response)=>{
      console.log(response);
      if (response){
        this.productService.delete(product.id).subscribe({
          next: response => {
            this.snackbarService.getSnackBar("Product Deleted",'Close');
            this.loadProductData();
          },
          error: error => console.error(error),
          complete: () => console.log('Product deleted')
        })
      }
    })

  }
}
