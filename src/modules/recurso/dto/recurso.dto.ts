import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { TipoRecurso } from '../enum/tipo-recurso.enum';

export class RecursoDto {
  @ApiPropertyOptional({ description: 'Id do recurso' })
  @IsInt()
  @IsOptional()
  id: number;

  @ApiProperty({ description: 'Nome', example: 'Arroz' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ description: 'Preço', example: 5.5 })
  @Min(0)
  preco: number;

  @ApiPropertyOptional({ description: 'Tipo de medida', example: 'Kg' })
  @IsString()
  @IsOptional()
  tipoMedida: string;

  @ApiPropertyOptional({
    example: 'true | false',
    description: 'Recurso ativo',
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  ativo: boolean;

  @ApiProperty({ example: 'AUXILIO | INSUMO', description: 'Tipo de recurso' })
  @IsString()
  tipoRecurso: TipoRecurso;
}
