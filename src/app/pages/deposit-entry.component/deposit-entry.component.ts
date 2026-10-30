import { NgIf } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'deposit-entry.component',
  imports: [NgIf, TranslatePipe, ReactiveFormsModule, MatLabel, MatFormField, MatError],
  templateUrl: './deposit-entry.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './deposit-entry.component.css',
})
export class DepositEntryComponent {
  // Inyecciones modernas con inject()
  public dialogRef = inject(MatDialogRef<DepositEntryComponent>);
  public data = inject(MAT_DIALOG_DATA);

  form: FormGroup;

  constructor() {
    // Construcción limpia del formulario según los requisitos de tu examen
    this.form = new FormGroup({
      depositId: new FormControl(0),
      depositNumber: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      storeNumber: new FormControl('', [Validators.required]),
      expectedAmount: new FormControl(0, [Validators.required, Validators.min(0.01)]),
      depositDate: new FormControl(new Date().toISOString().substring(0, 10), [
        Validators.required,
      ]),
    });
  }

  ngOnInit(): void {
    if (this.data.mode === 'Edit' && this.data.deposit) {
      this.form.patchValue(this.data.deposit);
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    if (this.form.valid) {
      // Retorna el valor puro del formulario al componente padre para que él haga el POST/PUT
      this.dialogRef.close(this.form.value);
    }
  }
}
