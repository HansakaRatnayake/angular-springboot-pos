import {Component, EventEmitter, Output} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {CustomerService} from "../../../../../core/service/customer/customer.service";
import {CustomerDTO} from "../../../../../core/dto/CustomerDTO";

@Component({
    selector: 'app-customer-select-search',
    imports: [
        MatLabel,
        MatFormField,
        MatInput,
        FormsModule,
        NgForOf
    ],
    templateUrl: './customer-select-search.component.html',
    styleUrl: './customer-select-search.component.scss'
})
export class CustomerSelectSearchComponent {

  filteredData:any = []
  searchText: string = "";
  @Output() selectedCustomer : EventEmitter<CustomerDTO> = new EventEmitter();

  constructor(private customerService:CustomerService) {
  }


  onValueChange(searchText:string){
    if (searchText === ""){
      this.filteredData=[];
    }else {
      this.customerService.search(searchText,0,10).subscribe({
        next:data=>{
          this.filteredData = data.data.dataList;
        },
        error:error=>{console.log(error)},
        complete:()=>console.log("complete")
      })
    }

  }

  onValueSelect(customer:CustomerDTO){
    this.selectedCustomer.emit(customer);
    this.searchText = customer.customerName;
    this.filteredData = [];
    console.log(this.selectedCustomer);
  }
}
