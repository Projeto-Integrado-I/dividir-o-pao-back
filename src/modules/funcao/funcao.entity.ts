import { Voluntario } from 'src/modules/voluntario/voluntario.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Funcao extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'cd_funcao' })
  id: number;

  @Column({ length: 30, type: 'varchar', unique: true })
  descricao: string;

  @ManyToMany(() => Voluntario, { lazy: true })
  voluntarios: Voluntario[];
}
