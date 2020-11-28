import { TestBed, inject } from '@angular/core/testing';

import { RelatorioTipoRedeService } from './relatorio-tipo-rede.service';

describe('RelatorioTipoRedeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RelatorioTipoRedeService]
    });
  });

  it('should be created', inject([RelatorioTipoRedeService], (service: RelatorioTipoRedeService) => {
    expect(service).toBeTruthy();
  }));
});
