import { Recurso } from './recurso.interface';

export interface ItemPedido {
  id?: number;
  recurso: Recurso;
  quantidade: number;
  valor: number;
}
