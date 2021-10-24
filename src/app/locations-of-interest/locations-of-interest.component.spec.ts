import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsOfInterestComponent } from './locations-of-interest.component';

describe('LocationsOfInterestComponent', () => {
  let component: LocationsOfInterestComponent;
  let fixture: ComponentFixture<LocationsOfInterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationsOfInterestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationsOfInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
