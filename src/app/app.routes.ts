import { Routes } from '@angular/router';
import { DepositListComponent } from './pages/deposit-list.component/deposit-list.component';
import { DashboardComponent } from './pages/dashboard.component/dashboard.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    // {
    //     path: 'home',
    //     component: HomeComponent
    // },
    {
        path: 'deposit-list',
        component: DepositListComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
];