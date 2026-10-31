import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DepositFilterComponent } from './deposit-filter.component';

describe('FilterDepositComponent', () => {
  let component: DepositFilterComponent;
  let fixture: ComponentFixture<DepositFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepositFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DepositFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
