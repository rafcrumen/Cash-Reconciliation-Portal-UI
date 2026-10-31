import { Component, Inject, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'deposit-reconcile',
  standalone: true,
  imports: [
    TranslatePipe,
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './deposit-reconcile.component.html'
})

export class DepositReconcileComponent implements OnInit {
  public get dialogRef(): MatDialogRef<DepositReconcileComponent> {
    return this._dialogRef;
  }
  public set dialogRef(value: MatDialogRef<DepositReconcileComponent>) {
    this._dialogRef = value;
  }

  private fb = inject(FormBuilder);

  form = this.fb.group({
    actualAmount: [
      null,
      [
        Validators.required,
        Validators.min(0)
      ]
    ]
  });

  constructor(
    private _dialogRef: MatDialogRef<DepositReconcileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit(): void {
    this.form.patchValue(this.data.deposit);
  }

  save(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.dialogRef.close(
      this.form.value.actualAmount
    );
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
