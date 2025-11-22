import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {CustomerService} from "../../../../core/service/customer/customer.service";
import {SnackbarService} from "../../../../core/service/snackbar/snackbar.service";
import {CustomerDTO} from "../../../../core/dto/CustomerDTO";

@Component({
    selector: 'app-customer-create',
    imports: [
        ReactiveFormsModule,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        MatButton,
        MatDialogTitle,
        MatFormField,
        MatInput,
        MatLabel
    ],
    templateUrl: './customer-create.component.html',
    styleUrl: './customer-create.component.scss'
})
export class CustomerCreateComponent {
  form: FormGroup = new FormGroup({
    name:new FormControl("", [Validators.required]),
    address:new FormControl("", [Validators.required]),
    salary:new FormControl("", [Validators.required]),
  });

  readonly dialogref = inject(MatDialogRef<CustomerCreateComponent>);

  constructor(private customerService:CustomerService, private snackbarService : SnackbarService) {
  }

  create() {
    const newCustomer : Omit<CustomerDTO, 'customerId'> = {
      customerName: this.form.controls['name'].value,
      customerAddress: this.form.controls['address'].value,
      customerSalary: this.form.controls['salary'].value,
    }
    this.customerService.create(newCustomer).subscribe({
      next: response => {
        this.snackbarService.getSnackBar(response.message,'Close');
        this.dialogref.close(true);
      },
      error: error => {console.log(error);},
      complete: () => {console.log('Customer create completed')}
    })
  }

  close() {

  }

  updateErrorMessage() {

  }
}
