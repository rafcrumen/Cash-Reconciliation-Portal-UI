import { Component, Inject, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslatePipe } from '@ngx-translate/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'deposit-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDatepickerModule, CommonModule,
    ReactiveFormsModule, MatFormFieldModule, MatInputModule, TranslatePipe
  ],
  templateUrl: './deposit-filter.component.html'
})
export class DepositFilterComponent {
  public get dialogRef(): MatDialogRef<DepositFilterComponent> {
    return this._dialogRef;
  }

  public set dialogRef(value: MatDialogRef<DepositFilterComponent>) {
    this._dialogRef = value;
  }

  private fb = inject(FormBuilder);
  constructor(
    private _dialogRef: MatDialogRef<DepositFilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  form: FormGroup = this.fb.group(
    {
      depositNumber: [''],
      storeNumber: [''],
      fechaInicio: [null],
      fechaFin: [null]
    },
    {
      validators: [this.rangoFechasValidator]
    }
  );

  rangoFechasValidator(
    group: AbstractControl
  ): ValidationErrors | null {

    const fechaInicio =
      group.get('fechaInicio')?.value;

    const fechaFin =
      group.get('fechaFin')?.value;

    if (!fechaInicio || !fechaFin) {
      return null;
    }

    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    if (inicio > fin) {
      return {
        rangoFechasInvalido: true
      };
    }

    return null;
  }
  cancel(): void {
    this.dialogRef.close();
  }
  filter(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // if (this.form.valid) {
    //   const filtros = Object.fromEntries(
    //     Object.entries(this.form.value).filter(([_, v]) => v !== null && v !== '')
    //   );
    //   console.log('Filtros activos enviados:', filtros);
    // }
    console.log(this.form.value);
    this.dialogRef.close(
      this.form.value
    );
  }

  clean(): void {

    this.form.reset({
      depositNumber: '',
      storeNumber: '',
      fechaInicio: null,
      fechaFin: null
    });
  }
}