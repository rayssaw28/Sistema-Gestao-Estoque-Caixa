import { TipoMovimentacao } from "./tipoMovimentacao";

export interface MovimentacaoEstoqueRequest {
  produtoId: number;
  tipo: TipoMovimentacao;
  quantidade: number;
  motivo: string;
}