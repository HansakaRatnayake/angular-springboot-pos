import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderToolBarComponent } from './order-tool-bar.component';

describe('OrderToolBarComponent', () => {
  let component: OrderToolBarComponent;
  let fixture: ComponentFixture<OrderToolBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderToolBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
