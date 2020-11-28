import { TestBed, inject } from '@angular/core/testing';

import { OemService } from './oem.service';

describe('OemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OemService]
    });
  });

  it('should be created', inject([OemService], (service: OemService) => {
    expect(service).toBeTruthy();
  }));
});
