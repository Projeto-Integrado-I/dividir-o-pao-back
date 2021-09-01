import { TipoRecurso } from './../recurso/enum/tipo-recurso.enum';
import { ItemPedido } from 'src/modules/item-pedido/item-pedido.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Recurso extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'cd_recurso' })
  id: number;

  @Column({ length: 40, type: 'varchar' })
  nome: string;

  @Column({ name: 'preco', type: 'decimal', precision: 10, scale: 2 })
  preco: number;

  @Column({ name: 'tipo_medida', type: 'varchar', nullable: true })
  tipoMedida: string;

  @Column({ name: 'ativo', type: 'boolean', nullable: true, default: true })
  ativo: boolean;

  @Column({
    name: 'tipo_recurso',
    type: 'enum',
    enum: TipoRecurso,
    default: TipoRecurso.INSUMO,
  })
  tipoRecurso: TipoRecurso;

  @OneToMany(() => ItemPedido, (itemPedido) => itemPedido.recurso)
  itensPedido: ItemPedido[];
}
