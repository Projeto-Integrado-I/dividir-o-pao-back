import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Funcao } from './../funcao/funcao.entity';
import { Pedido } from './../pedido/pedido.entity';

@Entity()
export class Voluntario extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'cd_voluntario' })
  id: number;

  @Column({ length: 50, type: 'varchar' })
  nome: string;

  @Column({ length: 11, type: 'varchar' })
  telefone: string;

  @OneToOne(() => User, { cascade: true, eager: true })
  @JoinColumn({ name: 'cd_usuario' })
  usuario: User;

  @ManyToMany(() => Funcao, { eager: true })
  @JoinTable({
    name: 'voluntario_funcao',
    joinColumn: {
      name: 'cd_voluntario',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'cd_funcao',
      referencedColumnName: 'id',
    },
  })
  funcoes: Funcao[];

  @OneToMany(() => Pedido, (pedido) => pedido.voluntario, {
    eager: false,
    lazy: true,
  })
  pedidos: Pedido[];
}
