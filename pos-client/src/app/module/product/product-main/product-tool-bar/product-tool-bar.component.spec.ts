import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductToolBarComponent } from './product-tool-bar.component';

describe('ProductToolBarComponent', () => {
  let component: ProductToolBarComponent;
  let fixture: ComponentFixture<ProductToolBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductToolBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
