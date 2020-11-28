import { TestBed, inject } from '@angular/core/testing';

import { FaturamentoService } from './faturamento.service';

describe('FaturamentoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FaturamentoService]
    });
  });

  it('should be created', inject([FaturamentoService], (service: FaturamentoService) => {
    expect(service).toBeTruthy();
  }));
});
