import {Component, inject, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef, MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
    selector: 'app-confirm-box',
    imports: [
        FormsModule,
        MatButton,
        MatDialogActions,
        MatDialogClose,
        MatDialogContent,
        MatLabel,
        ReactiveFormsModule,
        MatDialogTitle
    ],
    templateUrl: './confirm-box.component.html',
    styleUrl: './confirm-box.component.scss'
})
export class ConfirmBoxComponent implements OnInit {

  readonly data = inject<any>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<ConfirmBoxComponent>);

  message : string = "dfdfdfdf";

  ngOnInit(): void {
    this.message = this.data.text;
  }

}
