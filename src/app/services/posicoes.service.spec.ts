import { TestBed } from '@angular/core/testing';

import { PosicoesService } from './posicoes.service';

describe('PosicoesService', () => {
  let service: PosicoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PosicoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
