import { ItemVendaRequest } from "./itemVendaRequest";

export interface VendaRequest {
  itens: ItemVendaRequest[];
  valorRecebido: number;
}