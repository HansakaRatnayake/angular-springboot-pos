import {Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgForOf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProductDTO} from "../../../../../core/dto/ProductDTO";
import {ProductService} from "../../../../../core/service/product/product.service";

@Component({
    selector: 'app-item-select-search',
    imports: [
        MatFormField,
        MatInput,
        MatLabel,
        NgForOf,
        ReactiveFormsModule,
        FormsModule
    ],
    templateUrl: './item-select-search.component.html',
    styleUrl: './item-select-search.component.scss'
})
export class ItemSelectSearchComponent implements OnChanges {
  filteredData: any = []
  searchText: string = "";
  qty: number = 0;
  @Output() itemQty: EventEmitter<number> = new EventEmitter();
  @Output() selectedItem: EventEmitter<ProductDTO> = new EventEmitter();
  @Input() isItemAdded!: boolean;

  @ViewChild('qtyInput') qtyInput!: ElementRef;
  @ViewChild('customerInput') customerInput!: ElementRef;

  isQtyDisabled: boolean = true;
  isItemDisabled: boolean = false;

  constructor(private productService: ProductService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
       this.isQtyDisabled = true;
    }

  onValueChange(searchText:string){
    if (searchText === ""){
      this.filteredData=[];
    }else {
      this.productService.search(searchText,0,10).subscribe({
        next:data=>{
          this.filteredData = data.data.dataList;
        },
        error:error=>{console.log(error)},
        complete:()=>console.log("complete")
      })
    }

  }

  onQtyValue(qty:number){
    console.log(qty)
    this.itemQty.emit(qty);
  }

  onValueSelect(item:ProductDTO){
    this.selectedItem.emit(item);
    this.searchText = item.id;
    this.filteredData = [];

    this.isQtyDisabled = false;
    this.isItemDisabled = true;

  }
}
