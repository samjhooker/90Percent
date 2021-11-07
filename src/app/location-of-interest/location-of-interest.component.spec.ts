import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationOfInterestComponent } from './location-of-interest.component';

describe('LocationOfInterestComponent', () => {
  let component: LocationOfInterestComponent;
  let fixture: ComponentFixture<LocationOfInterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationOfInterestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationOfInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
