import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSelectSearchComponent } from './item-select-search.component';

describe('ItemSelectSearchComponent', () => {
  let component: ItemSelectSearchComponent;
  let fixture: ComponentFixture<ItemSelectSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemSelectSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemSelectSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
