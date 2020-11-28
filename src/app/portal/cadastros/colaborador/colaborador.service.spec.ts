import { TestBed, inject } from '@angular/core/testing';

import { ColaboradorService } from './colaborador.service';

describe('ColaboradorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ColaboradorService]
    });
  });

  it('should be created', inject([ColaboradorService], (service: ColaboradorService) => {
    expect(service).toBeTruthy();
  }));
});
