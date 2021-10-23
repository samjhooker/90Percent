import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DhbCellComponent } from './dhb-cell.component';

describe('DhbCellComponent', () => {
  let component: DhbCellComponent;
  let fixture: ComponentFixture<DhbCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DhbCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DhbCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
