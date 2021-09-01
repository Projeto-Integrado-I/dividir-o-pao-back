import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Recurso } from '../recurso/recurso.entity';
import { Pedido } from '../pedido/pedido.entity';

@Entity({ name: 'item_pedido' })
export class ItemPedido extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'cd_item_pedido' })
  id: number;

  @ManyToOne(() => Recurso, (recurso) => recurso.itensPedido, { eager: true })
  @JoinColumn({ name: 'cd_recurso' })
  recurso: Recurso;

  @ManyToOne(() => Pedido, (pedido) => pedido.itensPedido, { lazy: true })
  @JoinColumn({ name: 'cd_pedido' })
  pedido: Pedido;

  @Column({ name: 'quantidade', type: 'int' })
  quantidade: number;

  @Column({ name: 'valor', type: 'decimal', precision: 10, scale: 2 })
  valor: number;
}
