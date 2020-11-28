import { TestBed, inject } from '@angular/core/testing';

import { UsinaService } from './usina.service';

describe('UsinaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsinaService]
    });
  });

  it('should be created', inject([UsinaService], (service: UsinaService) => {
    expect(service).toBeTruthy();
  }));
});
