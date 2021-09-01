import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doacoes } from './doacoes.entity';

@Injectable()
export class DoacoesService {
  constructor(
    @InjectRepository(Doacoes)
    private repository: Repository<Doacoes>,
  ) {}

  async find(): Promise<Doacoes> {
    return await this.repository.findOne(1);
  }

  async update(doacoes: Doacoes): Promise<Doacoes> {
    return await this.repository.save(doacoes);
  }
}
