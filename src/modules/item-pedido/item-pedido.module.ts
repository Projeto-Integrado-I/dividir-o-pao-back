import { Module } from '@nestjs/common';
import { ItemPedidoService } from './item-pedido.service';
import { ItemPedidoController } from './item-pedido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemPedido } from './item-pedido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ItemPedido])],
  controllers: [ItemPedidoController],
  providers: [ItemPedidoService]
})
export class ItemPedidoModule {}
