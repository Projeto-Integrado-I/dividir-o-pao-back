import { Body, Controller, Get, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Doacoes } from './doacoes.entity';
import { DoacoesService } from './doacoes.service';

@Controller('doacoes')
@ApiTags('doacoes')
export class DoacoesController {
  constructor(private readonly doacoesService: DoacoesService) {}

  @Get()
  async get() {
    const doacao = await this.doacoesService.find();
    return doacao.valor ?? 0;
  }

  @Put()
  async update(@Body() doacoes: Doacoes) {
    const doacao = await this.doacoesService.update(doacoes);
    return doacao.valor ?? 0;
  }
}
