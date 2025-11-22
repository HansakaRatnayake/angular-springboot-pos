import {Component, EventEmitter, Output} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatFormField, MatLabel, MatPrefix} from "@angular/material/form-field";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {CustomerCreateComponent} from "../customer-create/customer-create.component";
import {MatDialog} from "@angular/material/dialog";
import {CustomerService} from "../../../../core/service/customer/customer.service";


@Component({
    selector: 'app-customer-tool-bar',
    imports: [
        MatCard,
        MatCardHeader,
        MatLabel,
        ReactiveFormsModule,
        MatFormField,
        MatCardContent,
        MatIcon,
        MatInput,
        MatButton,
        MatPrefix
    ],
    templateUrl: './customer-tool-bar.component.html',
    styleUrl: './customer-tool-bar.component.scss'
})
export class CustomerToolBarComponent {
  @Output() textChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(private dialog:MatDialog, private customerService:CustomerService) {
  }

  searchform: FormGroup = new FormGroup({
    text : new FormControl(''),
  });

  openNewCustomerDialogBox(){
    let matDialogRef = this.dialog.open(CustomerCreateComponent,{
      disableClose:true,
      width:'500px',
    })

    matDialogRef.afterClosed().subscribe((response)=>{
      if (response){
        this.customerService.isCreated.next(true);
      }
    })
  }

  onInputChange() {
    const inputValue = this.searchform.controls['text'].value;
    this.textChange.emit(inputValue);
  }

  resetFilter() {
    this.searchform.controls['text'].setValue('');
    this.textChange.emit('');
  }
}
