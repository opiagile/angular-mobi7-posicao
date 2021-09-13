import { TestBed } from '@angular/core/testing';

import { PontoInteresseService } from './ponto-interesse.service';

describe('PontoInteresseService', () => {
  let service: PontoInteresseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PontoInteresseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
