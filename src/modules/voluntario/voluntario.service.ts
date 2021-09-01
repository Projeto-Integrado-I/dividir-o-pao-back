import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { FindManyOptions, Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { VoluntarioDto } from './dto/voluntario.dto';
import { Voluntario } from './voluntario.entity';

@Injectable()
export class VoluntarioService {
  constructor(
    @InjectRepository(Voluntario)
    protected voluntarioRepository: Repository<Voluntario>,
  ) {}

  async create(createVoluntarioDto: VoluntarioDto): Promise<Voluntario> {
    return await this.voluntarioRepository.save(createVoluntarioDto);
  }

  async findAll() {
    return await this.voluntarioRepository.find();
  }

  async findAllPageable(
    options: IPaginationOptions,
  ): Promise<Pagination<Voluntario>> {
    return paginate<Voluntario>(this.voluntarioRepository, options);
  }

  async find(options: FindManyOptions<Voluntario>) {
    return await this.voluntarioRepository.find(options);
  }

  async findByUser(email: string, senha: string): Promise<Voluntario> {
    const voluntario = await this.voluntarioRepository.findOne({
      where: {
        usuario: {
          email,
          senha,
        },
      },
      relations: ['usuario'],
    });
    if (!voluntario) throw new NotFoundException('Usuário não encontrado');
    return voluntario;
  }

  async findOne(id: number) {
    return await this.voluntarioRepository.findOne(id);
  }

  async update(id: number, updateVoluntarioDto: VoluntarioDto) {
    return await this.voluntarioRepository.save({ id, ...updateVoluntarioDto });
  }

  async remove(id: number) {
    return await this.voluntarioRepository.delete(id);
  }
}
