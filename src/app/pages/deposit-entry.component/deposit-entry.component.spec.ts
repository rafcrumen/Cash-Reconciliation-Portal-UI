import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositEntryComponent } from './deposit-entry.component';

describe('DepositEntryComponent', () => {
  let component: DepositEntryComponent;
  let fixture: ComponentFixture<DepositEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepositEntryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DepositEntryComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
