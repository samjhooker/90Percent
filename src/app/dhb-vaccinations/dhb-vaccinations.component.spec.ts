import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DhbVaccinationsComponent } from './dhb-vaccinations.component';

describe('DhbVaccinationsComponent', () => {
  let component: DhbVaccinationsComponent;
  let fixture: ComponentFixture<DhbVaccinationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DhbVaccinationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DhbVaccinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
