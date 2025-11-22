import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerToolBarComponent } from './customer-tool-bar.component';

describe('CustomerSearchComponent', () => {
  let component: CustomerToolBarComponent;
  let fixture: ComponentFixture<CustomerToolBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerToolBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
