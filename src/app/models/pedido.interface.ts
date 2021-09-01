import { Voluntario } from './voluntario.interface';
import { ItemPedido } from './itens-pedido.interface';

export interface Pedido {
  id?: number;
  valorTotal: number;
  itensPedido: ItemPedido[];
  voluntario: Voluntario;
  createdDate: Date;
}
