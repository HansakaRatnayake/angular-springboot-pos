import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSelectSearchComponent } from './customer-select-search.component';

describe('CustomerSelectSearchComponent', () => {
  let component: CustomerSelectSearchComponent;
  let fixture: ComponentFixture<CustomerSelectSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerSelectSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerSelectSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
