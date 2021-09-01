import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { RecursoDto } from './dto/recurso.dto';
import { Recurso } from './recurso.entity';
import { RecursoService } from './recurso.service';

@ApiTags('recurso')
@Controller('recurso')
export class RecursoController {
  constructor(private readonly recursoService: RecursoService) {}

  @Post()
  create(@Body() recursoDto: RecursoDto) {
    return this.recursoService.create(recursoDto);
  }

  @Get()
  findAll() {
    return this.recursoService.findAll();
  }

  @Get('/ativos')
  findAllAtivos() {
    return this.recursoService.findAllAtivos();
  }

  @Get('pageable')
  findAllPageable(
    @Param('page') page: number,
    @Param('limit') limit: number,
  ): Promise<Pagination<Recurso>> {
    page = page ? page : 1;
    limit = limit ? limit : 10;
    return this.recursoService.findAllPageable({
      page,
      limit,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.recursoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() recursoDto: RecursoDto) {
    return this.recursoService.update(id, recursoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.recursoService.remove(id);
  }
}
