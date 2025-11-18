import { TestBed } from '@angular/core/testing';

import { MovimentacaoEstoqueService } from './movimentacao-estoque.service';

describe('MovimentacaoEstoqueService', () => {
  let service: MovimentacaoEstoqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovimentacaoEstoqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
