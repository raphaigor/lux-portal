import { TestBed, inject } from '@angular/core/testing';

import { RelatorioVendedorService } from './relatorio-vendedor.service';

describe('RelatorioVendedorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RelatorioVendedorService]
    });
  });

  it('should be created', inject([RelatorioVendedorService], (service: RelatorioVendedorService) => {
    expect(service).toBeTruthy();
  }));
});
