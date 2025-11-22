import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatFormField, MatLabel, MatPrefix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatDialog} from "@angular/material/dialog";
import {ProductService} from "../../../../core/service/product/product.service";
import {ProductCreateComponent} from "../../../product/product-main/product-create/product-create.component";
import {OrderCreateComponent} from "../order-create/order-create.component";

@Component({
    selector: 'app-order-tool-bar',
    imports: [
        FormsModule,
        MatButton,
        MatCard,
        MatCardContent,
        MatCardHeader,
        MatFormField,
        MatIcon,
        MatInput,
        MatLabel,
        MatPrefix,
        ReactiveFormsModule
    ],
    templateUrl: './order-tool-bar.component.html',
    styleUrl: './order-tool-bar.component.scss'
})
export class OrderToolBarComponent {
  @Output() textChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(private dialog:MatDialog, private productService:ProductService) {
  }

  searchform: FormGroup = new FormGroup({
    text : new FormControl(''),
  });

  openNewProductDialogBox(){
    let matDialogRef = this.dialog.open(OrderCreateComponent,{
      disableClose:true,
      width:'600px',
    })

    matDialogRef.afterClosed().subscribe((response)=>{
      if (response){
        console.log(response);
        this.productService.isCreated.next(true);
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
