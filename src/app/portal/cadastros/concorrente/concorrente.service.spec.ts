import { TestBed, inject } from '@angular/core/testing';

import { ConcorrenteService } from './concorrente.service';

describe('ConcorrenteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConcorrenteService]
    });
  });

  it('should be created', inject([ConcorrenteService], (service: ConcorrenteService) => {
    expect(service).toBeTruthy();
  }));
});
