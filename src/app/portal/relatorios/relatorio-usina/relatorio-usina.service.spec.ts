import { TestBed, inject } from '@angular/core/testing';

import { RelatorioUsinaService } from './relatorio-usina.service';

describe('RelatorioUsinaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RelatorioUsinaService]
    });
  });

  it('should be created', inject([RelatorioUsinaService], (service: RelatorioUsinaService) => {
    expect(service).toBeTruthy();
  }));
});
