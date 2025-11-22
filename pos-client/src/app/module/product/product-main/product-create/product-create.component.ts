import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {CustomerService} from "../../../../core/service/customer/customer.service";
import {SnackbarService} from "../../../../core/service/snackbar/snackbar.service";
import {CustomerDTO} from "../../../../core/dto/CustomerDTO";
import {ProductUpdateComponent} from "../product-update/product-update.component";
import {ProductService} from "../../../../core/service/product/product.service";
import {ProductDTO} from "../../../../core/dto/ProductDTO";

@Component({
    selector: 'app-product-create',
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
    templateUrl: './product-create.component.html',
    styleUrl: './product-create.component.scss'
})
export class ProductCreateComponent {
  form: FormGroup = new FormGroup({
    description:new FormControl("", [Validators.required]),
    unitPrice:new FormControl("", [Validators.required]),
    qtyOnHand:new FormControl("", [Validators.required]),
  });

  readonly dialogref = inject(MatDialogRef<ProductCreateComponent>);

  constructor(private productService:ProductService, private snackbarService : SnackbarService) {
  }

  create() {
    const newProduct : Omit<ProductDTO, 'id'> = {
      description: this.form.controls['description'].value,
      unitPrice: this.form.controls['unitPrice'].value,
      qtyOnHand: this.form.controls['qtyOnHand'].value,
    }
    this.productService.create(newProduct).subscribe({
      next: response => {
        this.snackbarService.getSnackBar(response.message,'Close');
        this.dialogref.close(true);
      },
      error: error => {console.log(error);},
      complete: () => {console.log('Product create completed')}
    })
  }

  close() {

  }

}
