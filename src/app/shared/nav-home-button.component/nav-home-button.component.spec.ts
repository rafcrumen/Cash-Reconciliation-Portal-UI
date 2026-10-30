import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavHomeButtonComponent } from './nav-home-button.component';

describe('NavHomeButtonComponent', () => {
  let component: NavHomeButtonComponent;
  let fixture: ComponentFixture<NavHomeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavHomeButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavHomeButtonComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
