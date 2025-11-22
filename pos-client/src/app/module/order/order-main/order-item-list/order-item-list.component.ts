import {Component, inject, Input, OnInit} from '@angular/core';

import {MatButton, MatFabButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA, MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";

@Component({
    selector: 'app-order-item-list',
    imports: [
        MatButton,
        MatDialogActions,
        MatDialogClose,
        MatDialogContent,
        MatDialogTitle,
        MatTable,
        MatColumnDef,
        MatHeaderCell,
        MatCell,
        MatHeaderCellDef,
        MatCellDef,
        MatHeaderRow,
        MatRow,
        MatHeaderRowDef,
        MatRowDef
    ],
    templateUrl: './order-item-list.component.html',
    styleUrl: './order-item-list.component.scss'
})
export class OrderItemListComponent implements OnInit {


  readonly dialogref = inject(MatDialogRef<OrderItemListComponent>);
  readonly orderItems = inject<any>(MAT_DIALOG_DATA);

  displayedColumns: string[] = ['id', 'qty', 'unitPrice', 'product'];
  dataSource : any[] = [];

  ngOnInit(): void {
    this.dataSource = this.orderItems;
  }

}
