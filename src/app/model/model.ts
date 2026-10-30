export interface Deposit {
    depositId: number;
    depositNumber: string;
    storeNumber: string;
    expectedAmount: number;
    actualAmount: number | null;
    variance: number;
    status: number;
    depositDate: string;
}

export interface DashboardStats {
    totalDeposits: number;
    matchedDeposits: number;
    shortages: number;
    overages: number;
    totalVarianceAmount: number;
}