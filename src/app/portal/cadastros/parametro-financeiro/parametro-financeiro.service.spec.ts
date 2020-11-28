import { TestBed, inject } from '@angular/core/testing';

import { ParametroFinanceiroService } from './parametro-financeiro.service';

describe('ParametroFinanceiroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParametroFinanceiroService]
    });
  });

  it('should be created', inject([ParametroFinanceiroService], (service: ParametroFinanceiroService) => {
    expect(service).toBeTruthy();
  }));
});
