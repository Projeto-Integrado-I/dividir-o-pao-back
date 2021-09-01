import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoacoesController } from './doacoes.controller';
import { Doacoes } from './doacoes.entity';
import { DoacoesService } from './doacoes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Doacoes])],
  controllers: [DoacoesController],
  providers: [DoacoesService],
})
export class DoacoesModule {}
