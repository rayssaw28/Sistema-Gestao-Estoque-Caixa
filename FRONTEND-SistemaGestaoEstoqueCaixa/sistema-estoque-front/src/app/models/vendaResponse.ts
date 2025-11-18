import { ItemVendaResponse } from "./itemVendaResponse";

export interface VendaResponse {
  id: number;
  usuarioNome: string;
  valorTotal: number;
  valorRecebido: number;
  troco: number;
  dataHora: string;
  itens: ItemVendaResponse[];
}