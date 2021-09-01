import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Funcao } from './funcao.entity';

@Injectable()
export class FuncaoService {
  constructor(
    @InjectRepository(Funcao)
    private repository: Repository<Funcao>,
  ) {}

  findAll(): Promise<Funcao[]> {
    return this.repository.createQueryBuilder('funcao').getMany();
  }
}
