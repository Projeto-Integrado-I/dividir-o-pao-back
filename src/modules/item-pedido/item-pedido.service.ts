import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemPedidoDto } from './dto/item-pedido.dto';
import { ItemPedido } from './item-pedido.entity';

@Injectable()
export class ItemPedidoService {
  constructor(
    @InjectRepository(ItemPedido)
    private repository: Repository<ItemPedido>,
  ) {}
}
