import {Component, inject, Input, OnChanges, OnInit} from '@angular/core';
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
import {CustomerDTO} from "../../../../core/dto/CustomerDTO";
import {SnackbarService} from "../../../../core/service/snackbar/snackbar.service";

@Component({
    selector: 'app-customer-update',
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
    templateUrl: './customer-update.component.html',
    styleUrl: './customer-update.component.scss'
})
export class CustomerUpdateComponent implements OnInit {


  form : FormGroup = new FormGroup({
    id: new FormControl({value:"", disabled: true}),
    name:new FormControl("", [Validators.required]),
    address: new FormControl("", [Validators.required]),
    salary: new FormControl("", [Validators.required]),
  });

  readonly data = inject<any>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<CustomerUpdateComponent>);

  constructor(private customerService: CustomerService, private snackbarService: SnackbarService) {
  }

  ngOnInit(): void {
    this.loadCustomer();
  }

  loadCustomer(){
    this.form.patchValue({
      id: this.data.customerId,
      name: this.data.customerName,
      address: this.data.customerAddress,
      salary: this.data.customerSalary
    })
  }

  update() {
    const updateCustomer : Omit<CustomerDTO, 'customerId'> = {
      customerName:this.form.controls['name'].value,
      customerAddress:this.form.controls['address'].value,
      customerSalary:this.form.controls['salary'].value
    }
    this.customerService.update(updateCustomer, this.data.customerId).subscribe({
      next: (response)=> {
        this.dialogRef.close(true);
      },
      error: (err)=> {console.log(err)},
      complete: ()=> {console.log('Update Customer Successfully')},
    })
  }

  close() {

  }
}
