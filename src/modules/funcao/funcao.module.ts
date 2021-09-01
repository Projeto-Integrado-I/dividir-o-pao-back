import { Module } from '@nestjs/common';
import { FuncaoService } from './funcao.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Funcao } from './funcao.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Funcao])],
  providers: [FuncaoService]
})
export class FuncaoModule {}
