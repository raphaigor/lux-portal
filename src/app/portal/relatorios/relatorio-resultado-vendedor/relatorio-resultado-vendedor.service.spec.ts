import { TestBed, inject } from '@angular/core/testing';

import { RelatorioResultadoVendedorService } from './relatorio-resultado-vendedor.service';

describe('RelatorioResultadoVendedorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RelatorioResultadoVendedorService]
    });
  });

  it('should be created', inject([RelatorioResultadoVendedorService], (service: RelatorioResultadoVendedorService) => {
    expect(service).toBeTruthy();
  }));
});
