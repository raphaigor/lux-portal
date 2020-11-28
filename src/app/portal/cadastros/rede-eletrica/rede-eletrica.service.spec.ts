import { TestBed, inject } from '@angular/core/testing';

import { RedeEletricaService } from './rede-eletrica.service';

describe('RedeEletricaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RedeEletricaService]
    });
  });

  it('should be created', inject([RedeEletricaService], (service: RedeEletricaService) => {
    expect(service).toBeTruthy();
  }));
});
