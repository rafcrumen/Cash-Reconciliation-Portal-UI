import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { Deposit } from '../../model/model';
import { DepositEntryComponent } from '../deposit-entry.component/deposit-entry.component'; // Componente de diálogo para agregar/editar depósitos
import { HttpService } from '../../services/http.service';
import { TranslatePipe } from '@ngx-translate/core';
import { DepositReconciliateComponent } from '../deposit-reconciliate.component/deposit-reconciliate.component';
import { NavHomeButtonComponent } from './../../shared/nav-home-button.component/nav-home-button.component'
@Component({
  selector: 'deposit-list',
  standalone: true,
  imports: [TranslatePipe,
    CommonModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule, NavHomeButtonComponent],
  templateUrl: './deposit-list.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './deposit-list.component.css',
})
export class DepositListComponent implements OnInit {
  private httpService = inject(HttpService);
  private dialog = inject(MatDialog);

  error: string = '';
  data: Deposit[] = [];

  dataSource = new MatTableDataSource<Deposit>([]);

  displayedColumns: string[] = [
    'depositNumber',
    'storeNumber',
    'expectedAmount',
    'actualAmount',
    'variance',
    'status',
    'actions',
  ];
  private readonly _url = 'Deposit';
  ngOnInit(): void {
    this.loadDeposits();
  }
  loadDeposits(): void {
    this.error = '';
    this.httpService.getDeposit(this._url).subscribe({
      next: (response) => {
        this.data = response;
        this.dataSource.data = response;
      },
      error: (err) => {
        this.error = 'Error al cargar los depósitos del servidor.';
        console.error(err);
      },
    });
  }
  getStatusKey(status: number): string {
    switch (status) {
      case 1:
        return 'STATUS.PENDING';
      case 2:
        return 'STATUS.MATCHED';
      case 3:
        return 'STATUS.OVERAGE';
      case 4:
        return 'STATUS.SHORTAGE';
      default:
        return '';
    }
  }
  add(): void {
    const dialogRef = this.dialog.open(DepositEntryComponent, {
      width: '600px',
      disableClose: true,
      panelClass: 'custom-dialog-container',
      data: { mode: 'Add', deposit: null },
    });
    dialogRef.afterClosed().subscribe((result: Partial<Deposit> | undefined) => {
      if (result) {
        this.httpService.post(this._url, result).subscribe({
          next: () => {
            this.loadDeposits();
          },
          error: (err) => {
            this.error = 'No se pudo guardar el depósito.';
            console.error(err);
          },
        });
      }
    });
  }
  edit(item: Deposit): void {
    const dialogRef = this.dialog.open(DepositEntryComponent, {
      width: '450px',
      disableClose: true,
      data: { mode: 'Edit', deposit: item }, // Le pasamos el registro completo seleccionado
    });
    dialogRef.afterClosed().subscribe((result: Deposit | undefined) => {
      if (result) {
        this.httpService.put(`${this._url}/${item.depositId}`, result).subscribe({
          next: () => this.loadDeposits(),
          error: (err) => {
            this.error = 'No se pudieron actualizar los datos del depósito.';
            console.error(err);
          },
        });
      }
    });
  }
  setOptions(item: Deposit): void {
    const dialogRef = this.dialog.open(DepositReconciliateComponent, {
      width: '400px',
      disableClose: true,
      data: { deposit: item },
    });
    dialogRef.afterClosed().subscribe((actualAmount: number | undefined) => {
      if (actualAmount !== undefined) {
        const payload = { actualAmount };
        // Invocamos la ruta exacta requerida en tu examen: PUT /api/deposits/{id}/reconcile
        this.httpService.put(`${this._url}/${item.depositId}/reconcile`, payload).subscribe({
          next: () => this.loadDeposits(),
          error: (err) => {
            this.error = 'Ocurrió un error durante la conciliación.';
            console.error(err);
          },
        });
      }
    });
  }
  delete(item: Deposit): void {
    if (confirm(`¿Está seguro que desea eliminar el depósito ${item.depositNumber}?`)) {
      this.httpService.delete(`${this._url}/${item.depositId}`).subscribe({
        next: () => this.loadDeposits(),
        error: (err) => {
          this.error = 'No se pudo eliminar el registro.';
          console.error(err);
        },
      });
    }
  }
}
