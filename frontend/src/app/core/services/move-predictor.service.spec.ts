import { TestBed } from '@angular/core/testing';

import { MovePredictorService } from './move-predictor.service';

describe('MovePredictorService', () => {
  let service: MovePredictorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovePredictorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
