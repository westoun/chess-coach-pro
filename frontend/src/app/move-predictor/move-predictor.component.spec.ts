import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovePredictorComponent } from './move-predictor.component';

describe('MovePredictorComponent', () => {
  let component: MovePredictorComponent;
  let fixture: ComponentFixture<MovePredictorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovePredictorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovePredictorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
