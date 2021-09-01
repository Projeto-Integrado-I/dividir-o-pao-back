import { Controller, Get } from '@nestjs/common';
import { ItemPedidoService } from './item-pedido.service';

@Controller('item-pedido')
export class ItemPedidoController {
  constructor(private readonly itemPedidoService: ItemPedidoService) {}
}
