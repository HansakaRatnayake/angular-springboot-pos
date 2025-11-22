import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {CustomerService} from "../../../../core/service/customer/customer.service";
import {SnackbarService} from "../../../../core/service/snackbar/snackbar.service";
import {CustomerDTO} from "../../../../core/dto/CustomerDTO";
import {ProductDTO} from "../../../../core/dto/ProductDTO";
import {ProductService} from "../../../../core/service/product/product.service";

@Component({
    selector: 'app-product-update',
    imports: [
        FormsModule,
        MatButton,
        MatDialogActions,
        MatDialogClose,
        MatDialogContent,
        MatDialogTitle,
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule
    ],
    templateUrl: './product-update.component.html',
    styleUrl: './product-update.component.scss'
})
export class ProductUpdateComponent implements OnInit {
  form : FormGroup = new FormGroup({
    id: new FormControl({value:"", disabled: true}),
    description:new FormControl("", [Validators.required]),
    unitPrice: new FormControl("", [Validators.required]),
    qtyOnHand: new FormControl("", [Validators.required]),
  });

  readonly data = inject<any>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<ProductUpdateComponent>);

  constructor(private productService: ProductService, private snackbarService: SnackbarService) {
  }

  ngOnInit(): void {
    this.loadCustomer();
  }

  loadCustomer(){
    this.form.patchValue({
      id: this.data.id,
      description: this.data.description,
      unitPrice: this.data.unitPrice,
      qtyOnHand: this.data.qtyOnHand
    })
  }

  update() {
    const updateProduct : Omit<ProductDTO, 'id'> = {
      description: this.form.controls['description'].value,
      unitPrice: this.form.controls['unitPrice'].value,
      qtyOnHand: this.form.controls['qtyOnHand'].value,
    }
    this.productService.update(updateProduct, this.data.id).subscribe({
      next: (response)=> {
        this.dialogRef.close(true);
      },
      error: (err)=> {console.log(err)},
      complete: ()=> {console.log('Update Product Successfully')},
    })
  }

  close() {

  }
}
