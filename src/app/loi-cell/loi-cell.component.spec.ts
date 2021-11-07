import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoiCellComponent } from './loi-cell.component';

describe('LoiCellComponent', () => {
  let component: LoiCellComponent;
  let fixture: ComponentFixture<LoiCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoiCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoiCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
