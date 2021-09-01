import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { HttpErrorsInterceptor } from 'src/interceptors/http-errors.interceptor';
import { LoginDto } from './dto/login.dto';
import { VoluntarioDto } from './dto/voluntario.dto';
import { Voluntario } from './voluntario.entity';
import { VoluntarioService } from './voluntario.service';

@UseInterceptors(new HttpErrorsInterceptor())
@ApiTags('voluntario')
@Controller('voluntario')
export class VoluntarioController {
  constructor(private readonly voluntarioService: VoluntarioService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createVoluntarioDto: VoluntarioDto) {
    return this.voluntarioService.create(createVoluntarioDto);
  }

  @Get('pageable')
  findAllPageable(
    @Param('page') page: number,
    @Param('limit') limit: number,
  ): Promise<Pagination<Voluntario>> {
    page = page ? page : 1;
    limit = limit ? limit : 10;
    return this.voluntarioService.findAllPageable({
      page,
      limit,
    });
  }

  @Get('')
  findAll() {
    return this.voluntarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.voluntarioService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() voluntarioDto: VoluntarioDto) {
    return this.voluntarioService.update(id, voluntarioDto);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() loginDto: LoginDto) {
    return this.voluntarioService.findByUser(
      loginDto.usuario.email,
      loginDto.usuario.senha,
    );
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.voluntarioService.remove(+id);
  }
}
