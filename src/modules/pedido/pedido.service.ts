import {
  BadRequestException, Injectable,
  InternalServerErrorException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PedidoDto } from './dto/pedido.dto';
import { Pedido } from './pedido.entity';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private repository: Repository<Pedido>,
  ) {}

  async create(pedidoDto: PedidoDto) {
    this.validRecursoWithoutId(pedidoDto);

    try {
      pedidoDto.valorTotal = pedidoDto.itensPedido
        .map((ip) => ip.quantidade * ip.valor)
        .reduce((accumulator, currentValue) => accumulator + currentValue);
    } catch (e) {
      throw new InternalServerErrorException(
        'Erro ao calcular valor total do pedido',
      );
    }

    const pedido = this.repository.create(pedidoDto);
    return await this.repository.save(pedido);
  }

  async findAll() {
    return await this.repository.find({ order: { createdDate: 'DESC' } });
  }

  async findAllByYear(
    dateYear: Date
  ): Promise<Pedido[]> {
    return await this.repository
      .createQueryBuilder('pedido')
      .innerJoinAndSelect('pedido.voluntario', 'voluntario')
      .where(' EXTRACT(YEAR FROM pedido.createdDate) = :date', { date: dateYear.getFullYear() })
      .orderBy('pedido.createdDate', 'DESC').getMany();
  }

  async findByMonthVoluntario(idVoluntario: number, dateMonth: Date): Promise<Pedido> {
    return await this.repository
      .createQueryBuilder('pedido')
      .innerJoinAndSelect('pedido.voluntario', 'voluntario')
      .innerJoinAndSelect('pedido.itensPedido', 'itensPedido')
      .innerJoinAndSelect('itensPedido.recurso', 'recurso')
      .where(' EXTRACT(MONTH FROM pedido.createdDate) = :date AND voluntario.cd_voluntario = :idVoluntario',
        {
          date: dateMonth.getMonth() + 1,
          idVoluntario: idVoluntario
        })
      .orderBy('pedido.createdDate', 'DESC').getOne();
  }

  async findAllByVoluntario(idVoluntario: number): Promise<Pedido[]> {
    return await this.repository
      .createQueryBuilder('pedido')
      .innerJoinAndSelect('pedido.voluntario', 'voluntario')
      .innerJoinAndSelect('pedido.itensPedido', 'itensPedido')
      .innerJoinAndSelect('itensPedido.recurso', 'recurso')
      .where(' voluntario.cd_voluntario = :idVoluntario ', { idVoluntario: idVoluntario })
      .orderBy('pedido.createdDate', 'DESC').getMany();
  }

  async findAllByMonth(dateMonth: Date): Promise<Pedido[]> {
    return await this.repository
      .createQueryBuilder('pedido')
      .innerJoinAndSelect('pedido.voluntario', 'voluntario')
      .innerJoinAndSelect('pedido.itensPedido', 'itensPedido')
      .innerJoinAndSelect('itensPedido.recurso', 'recurso')
      .where(' EXTRACT(MONTH FROM pedido.createdDate) = :date', { date: dateMonth.getMonth() + 1 })
      .orderBy('pedido.createdDate', 'DESC').getMany();
  }

  private validRecursoWithoutId(pedidoDto: PedidoDto) {
    if (pedidoDto.itensPedido.filter((itemP) => !itemP.recurso.id).length > 0)
      throw new BadRequestException(
        `Item pedido com recurso sem propriedade 'id'`,
      );
  }
}
