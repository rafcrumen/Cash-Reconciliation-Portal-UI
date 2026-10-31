import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositReconciliateComponent } from './deposit-reconcile.component';

describe('DepositConciliateComponent', () => {
  let component: DepositReconciliateComponent;
  let fixture: ComponentFixture<DepositReconciliateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepositReconciliateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DepositReconciliateComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
