import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecursoDto } from './dto/recurso.dto';
import { Recurso } from './recurso.entity';

@Injectable()
export class RecursoService {
  constructor(
    @InjectRepository(Recurso)
    private repository: Repository<Recurso>,
  ) {}

  create(recursoDto: RecursoDto): Promise<Recurso> {
    const recurso = this.repository.create(recursoDto);
    return this.repository.save(recurso);
  }

  findAll(): Promise<Recurso[]> {
    return this.repository.createQueryBuilder('recurso').getMany();
  }

  findAllAtivos(): Promise<Recurso[]> {
    return this.repository
      .createQueryBuilder('recurso')
      .where('recurso.ativo = :ativo', { ativo: true })
      .getMany();
  }

  findAllPageable(options: IPaginationOptions): Promise<Pagination<Recurso>> {
    return paginate<Recurso>(this.repository, options);
  }

  findOne(id: number): Promise<Recurso> {
    return this.repository
      .createQueryBuilder('recurso')
      .where('recurso.id = :id', { id })
      .getOne();
  }

  async update(id: number, recursoDto: RecursoDto): Promise<Recurso> {
    const recurso: Recurso = await this.repository.preload({
      id: id,
      ...recursoDto,
    });
    if (!recurso) {
      throw new NotFoundException(`Recurso ${id} não encontrado`);
    }
    return this.repository.save(recurso);
  }

  async remove(id: number) {
    const recurso = await this.findOne(id);
    if (!recurso) {
      throw new NotFoundException(`Recurso ${id} não encontrado`);
    }

    return this.repository.remove(recurso);
  }
}
