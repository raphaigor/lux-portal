import { TestBed, inject } from '@angular/core/testing';

import { ParceiroService } from './parceiro.service';

describe('ParceiroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParceiroService]
    });
  });

  it('should be created', inject([ParceiroService], (service: ParceiroService) => {
    expect(service).toBeTruthy();
  }));
});
