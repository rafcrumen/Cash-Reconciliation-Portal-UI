import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from '../../services/http.service';
import { DashboardStats } from '../../model/model';
import { TranslatePipe, TranslateService } from '@ngx-translate/core'; // 1. Importas ambos
import { NavHomeButtonComponent } from '../../shared/nav-home-button.component/nav-home-button.component';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [
    TranslatePipe, // 2. Importante dejar el Module aquí para que funcione el HTML
    CommonModule,
    NavHomeButtonComponent,
  ],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private httpService = inject(HttpService);
  private translateService = inject(TranslateService);
  private isLoading = true;
  public stats: DashboardStats = {
    totalDeposits: 0,
    matchedDeposits: 0,
    shortages: 0,
    overages: 0,
    totalVarianceAmount: 0,
  };

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.httpService.getDashBoard('deposit/dashboard-stats').subscribe({
      next: (response) => {
        console.log('Dashboard stats loaded:', response);
        this.stats = response;
        this.isLoading = false;
      },
      error: (err) => {
        const errorMessage = this.translateService.instant('ERRORS-MESSAGES.DASHBOARD_LOADING');
        console.error(errorMessage, err);
      },
    });
  }
}
