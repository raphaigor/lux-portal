import { TestBed, inject } from '@angular/core/testing';

import { SimuladorService } from './simulador.service';

describe('SimuladorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SimuladorService]
    });
  });

  it('should be created', inject([SimuladorService], (service: SimuladorService) => {
    expect(service).toBeTruthy();
  }));
});
