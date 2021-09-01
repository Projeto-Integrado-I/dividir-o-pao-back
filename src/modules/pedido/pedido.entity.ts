import { ItemPedido } from 'src/modules/item-pedido/item-pedido.entity';
import { Voluntario } from 'src/modules/voluntario/voluntario.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Pedido extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'cd_pedido' })
  id: number;

  @Column({ name: 'valor_total', type: 'decimal', precision: 10, scale: 2 })
  valorTotal: number;

  @OneToMany(() => ItemPedido, (itemPedido) => itemPedido.pedido, {
    cascade: true,
    eager: true,
  })
  itensPedido: ItemPedido[];

  @ManyToOne(() => Voluntario, (voluntario) => voluntario.pedidos, {
    lazy: true,
  })
  @JoinColumn({ name: 'cd_voluntario' })
  voluntario: Voluntario;

  @CreateDateColumn({ name: 'created_at' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedDate: Date;
}
