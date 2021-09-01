import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFuncaoDto {
  @ApiProperty({ example: 'Coordenador' })
  @IsString()
  @IsNotEmpty()
  descricao: string;
}
