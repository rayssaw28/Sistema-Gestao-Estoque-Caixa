export interface MovimentacaoEstoqueResponse {
  id: number;
  produtoNome: string;
  tipo: string;
  quantidade: number;
  dataHora: string;
  usuarioNome: string;
  motivo: string;
}