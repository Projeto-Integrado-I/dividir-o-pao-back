import { Module } from '@nestjs/common';
import { VoluntarioService } from './voluntario.service';
import { VoluntarioController } from './voluntario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voluntario } from './voluntario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Voluntario])],
  controllers: [VoluntarioController],
  providers: [VoluntarioService],
})
export class VoluntarioModule {}
