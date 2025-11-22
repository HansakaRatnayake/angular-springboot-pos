import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatFormField, MatLabel, MatPrefix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatDialog} from "@angular/material/dialog";
import {ProductCreateComponent} from "../product-create/product-create.component";
import {ProductService} from "../../../../core/service/product/product.service";

@Component({
    selector: 'app-product-tool-bar',
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
    templateUrl: './product-tool-bar.component.html',
    styleUrl: './product-tool-bar.component.scss'
})
export class ProductToolBarComponent {
  @Output() textChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(private dialog:MatDialog, private productService:ProductService) {
  }

  searchform: FormGroup = new FormGroup({
    text : new FormControl(''),
  });

  openNewProductDialogBox(){
    let matDialogRef = this.dialog.open(ProductCreateComponent,{
      disableClose:true,
      width:'500px',
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
