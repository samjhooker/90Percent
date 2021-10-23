import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryContentComponent } from './primary-content.component';

describe('PrimaryContentComponent', () => {
  let component: PrimaryContentComponent;
  let fixture: ComponentFixture<PrimaryContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimaryContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimaryContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
