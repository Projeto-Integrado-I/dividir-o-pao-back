import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { PedidoDto } from './dto/pedido.dto';
import { PedidoService } from './pedido.service';
@ApiTags('pedido')
@Controller('pedido')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  create(@Body() pedidoDto: PedidoDto) {
    return this.pedidoService.create(pedidoDto);
  }

  @Get()
  findAll() {
    return this.pedidoService.findAll();
  }

  @Get('/year')
  findAllByYear(@Req() request: Request) {
    const dateYear = request.query.dateYear ? new Date(request.query.dateYear.toString()) : new Date();
    return this.pedidoService.findAllByYear(dateYear);
  }

  @Get('/:idVoluntario/month')
  findByMonthVoluntario(@Param('idVoluntario') idVoluntario, @Req() request: Request) {
    const dateMonth = request.query.dateMonth ? new Date(request.query.dateMonth.toString()) : new Date();
    return this.pedidoService.findByMonthVoluntario(idVoluntario, dateMonth);
  }

  @Get('/find-by-voluntario/:idVoluntario')
  findAllByVoluntario(@Param('idVoluntario') idVoluntario) {
    return this.pedidoService.findAllByVoluntario(idVoluntario);
  }

  @Get('/month')
  findAllByMonth(@Req() request: Request) {
    const dateMonth = request.query.dateMonth ? new Date(request.query.dateMonth.toString()) : new Date();
    return this.pedidoService.findAllByMonth(dateMonth);
  }
}
